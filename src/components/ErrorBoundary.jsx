import React from 'react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-amber-50 flex items-center justify-center p-8">
          <div className="max-w-2xl w-full">
            <div className="bg-white rounded-2xl shadow-2xl border-4 border-red-400/30 p-12 text-center">
              <div className="text-8xl mb-6">⚠️</div>
              <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
                Something Went Wrong
              </h1>
              <p className="text-lg text-gray-700 font-serif mb-8">
                The ancient texts have encountered an unexpected disturbance.
              </p>
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left">
                  <p className="text-sm font-mono text-red-800 mb-2">
                    <strong>Error:</strong> {this.state.error.toString()}
                  </p>
                </div>
              )}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <button
                  onClick={() => window.location.reload()}
                  className="px-8 py-4 bg-amber-600 text-white font-serif text-lg rounded-lg hover:bg-amber-700 transition-all shadow-lg"
                >
                  🔄 Refresh Page
                </button>
                <Link
                  to="/"
                  className="px-8 py-4 bg-gray-200 text-gray-800 font-serif text-lg rounded-lg hover:bg-gray-300 transition-all shadow-lg"
                >
                  🏠 Go Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
