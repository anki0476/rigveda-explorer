import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import * as d3 from 'd3';
import deitiesData from '../data/deities.json';
import connectionsData from '../data/connections.json';
import BookLoadingAnimation from './BookLoadingAnimation';

const DeityNetwork = () => {
  const svgRef = useRef();
  const [selectedDeity, setSelectedDeity] = useState(null);
  const [tooltip, setTooltip] = useState({ visible: false, content: '', x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);  // ← ADDED

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoading) return;  // ← ADDED - Don't render D3 until loaded

    const width = 1200;
    const height = 800;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('background', 'var(--color-parchment-light)')
      .style('border-radius', '12px');

    svg.selectAll('*').remove();

    const nodes = deitiesData.deities.map(d => ({
      id: d.id,
      name: d.name,
      category: d.category,
      color: d.color,
      iconSuggestion: d.iconSuggestion,
      hymnCount: d.hymnCount,
      description: d.description,
      domains: d.domains,
      attributes: d.attributes,
      keyMyths: d.keyMyths,
      sampleHymns: d.sampleHymns,
      alternateNames: d.alternateNames,
      mandalas: d.mandalas,
      peakMandalas: d.peakMandalas
    }));

    const links = connectionsData.connections.map(c => ({
      source: c.source,
      target: c.target,
      type: c.type
    }));

    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.id).distance(150))
      .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(50));

    const link = svg.append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', '#d4af37')
      .attr('stroke-opacity', 0.3)
      .attr('stroke-width', 2);

    const node = svg.append('g')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .style('cursor', 'pointer')
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended))
      .on('click', (event, d) => {
        event.stopPropagation();
        setSelectedDeity(d);
      })
      .on('mouseenter', (event, d) => {
        const [x, y] = d3.pointer(event, svg.node());
        setTooltip({
          visible: true,
          content: `${d.name} - ${d.hymnCount} hymns`,
          x,
          y
        });

        // Highlight connected nodes and links
        const connectedNodeIds = new Set();
        connectedNodeIds.add(d.id);

        // Find all connected links
        link
          .style('stroke-opacity', l => {
            if (l.source.id === d.id || l.target.id === d.id) {
              connectedNodeIds.add(l.source.id);
              connectedNodeIds.add(l.target.id);
              return 0.8;
            }
            return 0.05;
          })
          .style('stroke-width', l => {
            if (l.source.id === d.id || l.target.id === d.id) {
              return 3;
            }
            return 2;
          });

        // Dim non-connected nodes
        node.style('opacity', n => connectedNodeIds.has(n.id) ? 1 : 0.2);
      })
      .on('mouseleave', () => {
        setTooltip({ visible: false, content: '', x: 0, y: 0 });

        // Reset all nodes and links
        link
          .style('stroke-opacity', 0.3)
          .style('stroke-width', 2);
        
        node.style('opacity', 1);
      });

    node.append('circle')
      .attr('r', d => d.category === 'major' ? 25 : 15)
      .attr('fill', d => d.color || '#d4af37')
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .style('filter', 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))')
      .on('mouseenter', function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', d.category === 'major' ? 30 : 20);
      })
      .on('mouseleave', function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', d.category === 'major' ? 25 : 15);
      });

    node.append('text')
      .text(d => d.iconSuggestion || '✨')
      .attr('text-anchor', 'middle')
      .attr('dy', '.35em')
      .style('font-size', d => d.category === 'major' ? '20px' : '12px')
      .style('pointer-events', 'none')
      .style('user-select', 'none');

    node.append('text')
      .text(d => d.name)
      .attr('text-anchor', 'middle')
      .attr('dy', d => d.category === 'major' ? '40px' : '28px')
      .style('font-size', '12px')
      .style('fill', 'var(--color-ink)')
      .style('font-family', 'var(--font-family-header)')
      .style('pointer-events', 'none')
      .style('user-select', 'none');

    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return () => simulation.stop();
  }, [isLoading]);  // ← ADDED isLoading to dependency array

  // Modal Component
  const Modal = () => {
    if (!selectedDeity) return null;

    return createPortal(
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          zIndex: 999999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
          overflow: 'auto'
        }}
        onClick={() => setSelectedDeity(null)}
      >
        <div
          style={{
            backgroundColor: 'var(--color-parchment-light)',
            borderRadius: '1rem',
            maxWidth: '56rem',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
            position: 'relative',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ padding: '2rem' }}>
            {/* Close Button */}
            <button
              onClick={() => setSelectedDeity(null)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                width: '2.5rem',
                height: '2.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                color: 'var(--color-ink-light)',
                backgroundColor: 'var(--color-parchment-dark)',
                border: 'none',
                borderRadius: '50%',
                cursor: 'pointer',
                lineHeight: 1
              }}
              onMouseOver={(e) => e.target.style.color = 'var(--color-ink)'}
              onMouseOut={(e) => e.target.style.color = 'var(--color-ink-light)'}
            >
              ×
            </button>

            {/* Deity Icon & Name */}
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>
                {selectedDeity.iconSuggestion}
              </div>
              <h2 style={{ 
                fontSize: '2.25rem', 
                fontFamily: 'var(--font-family-header)', 
                color: 'var(--color-ink)', 
                marginBottom: '0.5rem' 
              }}>
                {selectedDeity.name}
              </h2>
              {selectedDeity.alternateNames && selectedDeity.alternateNames.length > 0 && (
                <p style={{ fontSize: '0.875rem', color: 'var(--color-ink-light)', fontStyle: 'italic' }}>
                  Also known as: {selectedDeity.alternateNames.join(', ')}
                </p>
              )}
            </div>

            {/* Stats Bar */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ backgroundColor: 'var(--color-parchment-dark)', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.875rem', fontFamily: 'var(--font-family-header)', color: 'var(--color-saffron)' }}>
                  {selectedDeity.hymnCount}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-ink-light)' }}>Hymns</div>
              </div>
              <div style={{ backgroundColor: 'var(--color-parchment-dark)', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.875rem', fontFamily: 'var(--font-family-header)', color: 'var(--color-saffron)', textTransform: 'capitalize' }}>
                  {selectedDeity.category}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-ink-light)' }}>Category</div>
              </div>
              <div style={{ backgroundColor: 'var(--color-parchment-dark)', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.875rem', fontFamily: 'var(--font-family-header)', color: 'var(--color-saffron)' }}>
                  {selectedDeity.mandalas?.length || 0}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-ink-light)' }}>Mandalas</div>
              </div>
            </div>

            {/* Description */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-family-header)', color: 'var(--color-ink)', marginBottom: '0.75rem' }}>
                Description
              </h3>
              <p style={{ color: 'var(--color-ink-light)', fontFamily: 'var(--font-family-body)', lineHeight: 1.75, fontSize: '1.125rem' }}>
                {selectedDeity.description}
              </p>
            </div>

            {/* Domains */}
            {selectedDeity.domains && selectedDeity.domains.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-family-header)', color: 'var(--color-ink)', marginBottom: '0.75rem' }}>
                  Domains
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {selectedDeity.domains.map((domain, idx) => (
                    <span
                      key={idx}
                      style={{
                        backgroundColor: 'rgba(212, 175, 55, 0.2)',
                        padding: '0.5rem 1rem',
                        borderRadius: '9999px',
                        fontSize: '0.875rem',
                        color: 'var(--color-ink)',
                        textTransform: 'capitalize'
                      }}
                    >
                      {domain}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Key Myths */}
            {selectedDeity.keyMyths && selectedDeity.keyMyths.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-family-header)', color: 'var(--color-ink)', marginBottom: '0.75rem' }}>
                  Key Myths
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {selectedDeity.keyMyths.map((myth, idx) => (
                    <li key={idx} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <span style={{ color: 'var(--color-gold)', marginTop: '0.25rem' }}>•</span>
                      <span style={{ color: 'var(--color-ink-light)', fontFamily: 'var(--font-family-body)' }}>
                        {myth}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>,
      document.body
    );
  };

  // ← ADDED: Show book animation while loading
  if (isLoading) {
    return (
      <div className="p-4">
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-[family:--font-family-header] text-[--color-ink] mb-3">
            🕸️ Deity Network
          </h1>
          <p className="text-lg text-[--color-ink-light] font-[family:--font-family-body]">
            Interactive network of Vedic deities and their relationships
          </p>
        </div>
        <BookLoadingAnimation size="medium" text="Mapping divine connections..." />
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-[family:--font-family-header] text-[--color-ink] mb-3">
          🕸️ Deity Network
        </h1>
        <p className="text-lg text-[--color-ink-light] font-[family:--font-family-body]">
          Explore {deitiesData.deities.length} Vedic deities and their interconnections. Click any deity for details!
        </p>
      </div>

      <div className="flex justify-center mb-4 relative">
        <svg ref={svgRef} className="shadow-lg" />
        
        {/* Tooltip */}
        {tooltip.visible && (
          <div
            style={{
              position: 'absolute',
              left: tooltip.x + 10,
              top: tooltip.y + 10,
              backgroundColor: 'var(--color-ink)',
              color: 'white',
              padding: '0.5rem 0.75rem',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              pointerEvents: 'none',
              zIndex: 10,
              boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
              whiteSpace: 'nowrap'
            }}
          >
            {tooltip.content}
          </div>
        )}
      </div>

      <Modal />
    </div>
  );
};

export default DeityNetwork;
