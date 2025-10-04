import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from './components/NotFound';
import ErrorBoundary from './components/ErrorBoundary';

// Simple test component
const TestHome = () => (
  <div style={{ padding: '2rem' }}>
    <h1>Home Page Works!</h1>
    <a href="/wrong-page">Test 404 Page</a>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<TestHome />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
