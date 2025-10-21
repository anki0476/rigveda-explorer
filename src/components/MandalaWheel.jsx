import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import * as d3 from 'd3';
import BookLoadingAnimation from './BookLoadingAnimation';

const MandalaWheel = () => {
  const svgRef = useRef();
  const navigate = useNavigate();
  const [selectedMandala, setSelectedMandala] = useState(null);
  const [tooltip, setTooltip] = useState({ visible: false, content: '', x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const isRotatingRef = useRef(true);
  const rotationTimerRef = useRef(null);
  const currentRotationRef = useRef(0);

  const mandalasData = [
    { number: 1, suktas: 191, verses: 2006, description: "Longest mandala. Hymns to various deities, especially Indra and Agni. Composed by multiple families of rishis.", character: "Diverse authorship, varied themes, includes some of most famous hymns" },
    { number: 2, suktas: 43, verses: 429, description: "Family mandala of the Gritsamadas. Dedicated primarily to Agni and Indra.", character: "Oldest core material. Consistent style. Known for powerful Indra hymns." },
    { number: 3, suktas: 62, verses: 617, description: "Family mandala of the Vishvamitras. Contains the Gayatri Mantra.", character: "Most sacred mandala due to Gayatri. Balanced coverage of deities." },
    { number: 4, suktas: 58, verses: 589, description: "Family mandala of the Vamadevas. Hymns to Agni, Indra, and the Ribhus.", character: "Notable for Ribhu hymns. Technical and priestly focus." },
    { number: 5, suktas: 87, verses: 727, description: "Family mandala of the Atris. Diverse deities, strong nature hymns.", character: "Balanced, includes beautiful hymns to Ushas, Parjanya, Heaven and Earth." },
    { number: 6, suktas: 75, verses: 765, description: "Family mandala of the Bharadvajas. Primarily Agni and Indra.", character: "Liturgical focus. Ritual precision." },
    { number: 7, suktas: 104, verses: 841, description: "Family mandala of the Vasisthas. Considered the most beautiful for poetry.", character: "Most refined poetry. Famous Varuna hymns. Peak of Vedic composition." },
    { number: 8, suktas: 103, verses: 1716, description: "Mixed authorship. Many Soma hymns and Indra-Soma pairs.", character: "Soma-centric. Some of latest material. Long hymns." },
    { number: 9, suktas: 114, verses: 1108, description: "Entirely dedicated to Soma Pavamana (purifying Soma).", character: "Unique single-deity mandala. Repetitive but hypnotic. Ritual focus." },
    { number: 10, suktas: 191, verses: 1754, description: "Longest mandala with most diverse content. Philosophical hymns, dialogues.", character: "Latest material. Most philosophically mature. Includes Nasadiya Sukta." }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const width = 1000;
    const height = 1000;
    const centerX = width / 2;
    const centerY = height / 2;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('background', 'var(--color-parchment-light)')
      .style('border-radius', '12px');

    svg.selectAll('*').remove();

    const colorPalette = ["#8B4513", "#CD853F", "#DEB887", "#D2691E", "#F4A460", "#8B7355", "#C19A6B", "#B8860B", "#DAA520", "#CD8500"];

    const nodes = mandalasData.map((m, idx) => {
      const angle = (idx * 2 * Math.PI) / 10 - Math.PI / 2;
      const radius = 320;
      return {
        number: m.number,
        name: `Mandala ${m.number}`,
        suktas: m.suktas,
        verses: m.verses,
        description: m.description,
        character: m.character,
        color: colorPalette[idx],
        period: m.number >= 2 && m.number <= 7 ? "Family Book" : m.number === 9 ? "Soma Mandala" : "Later Collection",
        angle: angle,
        radius: radius,
        circleRadius: 35 + (m.suktas / 10)
      };
    });

    // Create rotating group for mandalas
    const rotatingGroup = svg.append('g')
      .attr('class', 'rotating-group')
      .attr('transform', `translate(${centerX},${centerY})`);

    const links = nodes.map(n => ({
      source: { x: 0, y: 0 },
      target: { x: n.radius * Math.cos(n.angle), y: n.radius * Math.sin(n.angle) }
    }));

    // Draw links in rotating group
    const link = rotatingGroup.append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y)
      .attr('stroke', '#d4af37')
      .attr('stroke-opacity', 0.3)
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '5,5');

    // Draw nodes in rotating group
    const node = rotatingGroup.append('g')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .attr('class', 'mandala-node')
      .style('cursor', 'pointer')
      .on('click', (event, d) => {
        event.stopPropagation();
        isRotatingRef.current = false;
        setSelectedMandala(d);
      })
      .on('mouseenter', (event, d) => {
        isRotatingRef.current = false;
        
        const rect = svgRef.current.getBoundingClientRect();
        const [mouseX, mouseY] = d3.pointer(event, document.body);
        setTooltip({ 
          visible: true, 
          content: `${d.name} - ${d.suktas} hymns`, 
          x: mouseX - rect.left, 
          y: mouseY - rect.top 
        });

        const connectedLinks = new Set();
        links.forEach((l, i) => {
          const targetX = d.radius * Math.cos(d.angle);
          const targetY = d.radius * Math.sin(d.angle);
          if (Math.abs(l.target.x - targetX) < 1 && Math.abs(l.target.y - targetY) < 1) {
            connectedLinks.add(i);
          }
        });

        link.style('stroke-opacity', (l, i) => connectedLinks.has(i) ? 0.8 : 0.05)
            .style('stroke-width', (l, i) => connectedLinks.has(i) ? 4 : 2);
      })
      .on('mouseleave', () => {
        setTooltip({ visible: false, content: '', x: 0, y: 0 });
        link.style('stroke-opacity', 0.3).style('stroke-width', 2);
        
        // Resume rotation after 2 seconds
        if (rotationTimerRef.current) clearTimeout(rotationTimerRef.current);
        rotationTimerRef.current = setTimeout(() => {
          isRotatingRef.current = true;
        }, 2000);
      });

    // Circles
    node.append('circle')
      .attr('cx', d => d.radius * Math.cos(d.angle))
      .attr('cy', d => d.radius * Math.sin(d.angle))
      .attr('r', 0)
      .attr('fill', d => d.color)
      .attr('stroke', '#fff')
      .attr('stroke-width', 3)
      .style('filter', 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))')
      .on('mouseenter', function(event, d) {
        d3.select(this)
          .transition().duration(200)
          .attr('r', d.circleRadius + 10)
          .style('filter', 'drop-shadow(0 0 15px rgba(218, 165, 32, 0.8))');
      })
      .on('mouseleave', function(event, d) {
        d3.select(this)
          .transition().duration(200)
          .attr('r', d.circleRadius)
          .style('filter', 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))');
      })
      .transition().duration(800).delay((d, i) => i * 80)
      .attr('r', d => d.circleRadius);

    // Mandala numbers - with counter-rotation group
    node.append('g')
      .attr('class', 'text-number')
      .attr('transform', d => `translate(${d.radius * Math.cos(d.angle)}, ${d.radius * Math.sin(d.angle) - 5})`)
      .append('text')
      .attr('text-anchor', 'middle').attr('dy', '.35em')
      .style('font-size', '22px').style('font-weight', 'bold')
      .style('fill', '#ffffff').style('text-shadow', '2px 2px 4px rgba(0,0,0,0.9)')
      .style('pointer-events', 'none').style('user-select', 'none').style('opacity', 0)
      .text(d => d.number)
      .transition().duration(600).delay((d, i) => i * 80 + 400).style('opacity', 1);

    // Hymn count - with counter-rotation group
    node.append('g')
      .attr('class', 'text-suktas')
      .attr('transform', d => `translate(${d.radius * Math.cos(d.angle)}, ${d.radius * Math.sin(d.angle) + 15})`)
      .append('text')
      .attr('text-anchor', 'middle').attr('dy', '.35em')
      .style('font-size', '13px').style('font-weight', '600')
      .style('fill', '#f4e4c1').style('text-shadow', '1px 1px 3px rgba(0,0,0,0.9)')
      .style('pointer-events', 'none').style('user-select', 'none').style('opacity', 0)
      .text(d => `${d.suktas}`)
      .transition().duration(600).delay((d, i) => i * 80 + 500).style('opacity', 0.9);

    // Mandala names - with counter-rotation group
    node.append('g')
      .attr('class', 'text-name')
      .attr('transform', d => `translate(${d.radius * Math.cos(d.angle)}, ${d.radius * Math.sin(d.angle) + d.circleRadius + 20})`)
      .append('text')
      .attr('text-anchor', 'middle')
      .style('font-size', '13px').style('fill', 'var(--color-ink)')
      .style('font-family', 'var(--font-family-header)').style('font-weight', '600')
      .style('pointer-events', 'none').style('user-select', 'none').style('opacity', 0)
      .text(d => d.name)
      .transition().duration(600).delay((d, i) => i * 80 + 600).style('opacity', 1);

    // Draw center Om (stationary)
    const centerG = svg.append('g')
      .attr('transform', `translate(${centerX},${centerY})`);

    const gradient = svg.append('defs').append('radialGradient')
      .attr('id', 'center-gradient-om').attr('cx', '50%').attr('cy', '50%').attr('r', '50%');
    gradient.append('stop').attr('offset', '0%').attr('stop-color', '#fffbf0');
    gradient.append('stop').attr('offset', '100%').attr('stop-color', '#f4e4c1');

    centerG.append('circle')
      .attr('cx', 0).attr('cy', 0).attr('r', 0)
      .style('fill', 'url(#center-gradient-om)').style('stroke', '#8B4513')
      .style('stroke-width', 5).style('filter', 'drop-shadow(0px 0px 20px rgba(139, 69, 19, 0.4))')
      .transition().duration(1000).delay(200).attr('r', 80);

    centerG.append('text')
      .attr('x', 0).attr('y', -10)
      .attr('text-anchor', 'middle').attr('dy', '.35em')
      .style('font-size', '60px').style('font-weight', 'bold').style('fill', '#8B4513').style('opacity', 0)
      .text('ॐ')
      .transition().duration(800).delay(1000).style('opacity', 1);

    centerG.append('text')
      .attr('x', 0).attr('y', 35).attr('text-anchor', 'middle')
      .style('font-size', '14px').style('font-weight', '700').style('fill', '#8B4513').style('opacity', 0)
      .text('1028 Hymns')
      .transition().duration(800).delay(1200).style('opacity', 1);

    centerG.append('text')
      .attr('x', 0).attr('y', 50).attr('text-anchor', 'middle')
      .style('font-size', '11px').style('fill', '#A0522D').style('opacity', 0)
      .text('10552 Verses')
      .transition().duration(800).delay(1300).style('opacity', 0.8);

    // Continuous rotation animation with counter-rotation for text
    const rotationSpeed = 0.05; // degrees per frame

    const animate = () => {
      if (isRotatingRef.current) {
        currentRotationRef.current += rotationSpeed;
      }
      
      // Always update transform (even when paused, to maintain position)
      rotatingGroup.attr('transform', `translate(${centerX},${centerY}) rotate(${currentRotationRef.current})`);
      
      // Counter-rotate all text elements to keep them horizontal
      rotatingGroup.selectAll('.text-number')
        .attr('transform', function() {
          const d = d3.select(this.parentNode).datum();
          return `translate(${d.radius * Math.cos(d.angle)}, ${d.radius * Math.sin(d.angle) - 5}) rotate(${-currentRotationRef.current})`;
        });
      
      rotatingGroup.selectAll('.text-suktas')
        .attr('transform', function() {
          const d = d3.select(this.parentNode).datum();
          return `translate(${d.radius * Math.cos(d.angle)}, ${d.radius * Math.sin(d.angle) + 15}) rotate(${-currentRotationRef.current})`;
        });
      
      rotatingGroup.selectAll('.text-name')
        .attr('transform', function() {
          const d = d3.select(this.parentNode).datum();
          return `translate(${d.radius * Math.cos(d.angle)}, ${d.radius * Math.sin(d.angle) + d.circleRadius + 20}) rotate(${-currentRotationRef.current})`;
        });

      requestAnimationFrame(animate);
    };

    // Start animation after initial load
    setTimeout(() => {
      animate();
    }, 1500);

  }, [isLoading]); // REMOVED isRotating dependency!

  const Modal = () => {
    if (!selectedMandala) return null;
    return createPortal(
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.85)', zIndex: 999999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', overflow: 'auto' }} onClick={() => { setSelectedMandala(null); setTimeout(() => { isRotatingRef.current = true; }, 500); }}>
        <div style={{ backgroundColor: 'var(--color-parchment-light)', borderRadius: '1rem', maxWidth: '56rem', width: '100%', maxHeight: '90vh', overflow: 'auto', position: 'relative', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }} onClick={(e) => e.stopPropagation()}>
          <div style={{ padding: '2rem' }}>
            <button onClick={() => { setSelectedMandala(null); setTimeout(() => { isRotatingRef.current = true; }, 500); }} style={{ position: 'absolute', top: '1rem', right: '1rem', width: '2.5rem', height: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: 'var(--color-ink-light)', backgroundColor: 'var(--color-parchment-dark)', border: 'none', borderRadius: '50%', cursor: 'pointer', lineHeight: 1 }} onMouseOver={(e) => e.target.style.color = 'var(--color-ink)'} onMouseOut={(e) => e.target.style.color = 'var(--color-ink-light)'}>×</button>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>📖</div>
              <h2 style={{ fontSize: '2.25rem', fontFamily: 'var(--font-family-header)', color: 'var(--color-ink)', marginBottom: '0.5rem' }}>{selectedMandala.name}</h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-ink-light)', fontStyle: 'italic' }}>{selectedMandala.period}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ backgroundColor: 'var(--color-parchment-dark)', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.875rem', fontFamily: 'var(--font-family-header)', color: 'var(--color-saffron)' }}>{selectedMandala.suktas}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-ink-light)' }}>Hymns (Suktas)</div>
              </div>
              <div style={{ backgroundColor: 'var(--color-parchment-dark)', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.875rem', fontFamily: 'var(--font-family-header)', color: 'var(--color-saffron)' }}>{selectedMandala.verses}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-ink-light)' }}>Verses</div>
              </div>
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-family-header)', color: 'var(--color-ink)', marginBottom: '0.75rem' }}>Description</h3>
              <p style={{ color: 'var(--color-ink-light)', fontFamily: 'var(--font-family-body)', lineHeight: 1.75, fontSize: '1.125rem' }}>{selectedMandala.description}</p>
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-family-header)', color: 'var(--color-ink)', marginBottom: '0.75rem' }}>Character</h3>
              <p style={{ color: 'var(--color-ink-light)', fontFamily: 'var(--font-family-body)', lineHeight: 1.75, fontSize: '1.125rem' }}>{selectedMandala.character}</p>
            </div>
            <button onClick={() => navigate(`/mandalas/${selectedMandala.number}`)} style={{ width: '100%', backgroundColor: 'var(--color-gold)', color: 'white', padding: '1rem', borderRadius: '0.5rem', border: 'none', fontSize: '1.125rem', fontWeight: 'bold', cursor: 'pointer', fontFamily: 'var(--font-family-header)', transition: 'all 0.2s' }} onMouseOver={(e) => e.target.style.backgroundColor = '#b8860b'} onMouseOut={(e) => e.target.style.backgroundColor = 'var(--color-gold)'}>Explore Mandala {selectedMandala.number} →</button>
          </div>
        </div>
      </div>,
      document.body
    );
  };

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-[family:--font-family-header] text-[--color-ink] mb-3">🕉️ Interactive Mandala Wheel</h1>
          <p className="text-lg text-[--color-ink-light] font-[family:--font-family-body]">Visualizing the 10 Mandalas of the Rigveda</p>
        </div>
        <BookLoadingAnimation size="medium" text="Arranging sacred circles..." />
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-[family:--font-family-header] text-[--color-ink] mb-3">🕉️ Interactive Mandala Wheel</h1>
        <p className="text-lg text-[--color-ink-light] font-[family:--font-family-body]">
          Watch the sacred wheel rotate continuously. Hover over any circle to pause and explore!
        </p>
      </div>
      <div className="flex justify-center mb-4 relative">
        <svg ref={svgRef} className="shadow-lg" />
        {tooltip.visible && (
          <div style={{ position: 'absolute', left: tooltip.x + 10, top: tooltip.y + 10, backgroundColor: 'var(--color-ink)', color: 'white', padding: '0.5rem 0.75rem', borderRadius: '0.375rem', fontSize: '0.875rem', pointerEvents: 'none', zIndex: 10, boxShadow: '0 4px 6px rgba(0,0,0,0.3)', whiteSpace: 'nowrap' }}>
            {tooltip.content}
          </div>
        )}
      </div>
      <Modal />
    </div>
  );
};

export default MandalaWheel;
