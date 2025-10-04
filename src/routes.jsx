import { createBrowserRouter } from 'react-router-dom';
import BookLayout from './components/Layout/BookLayout';
import PageTransition from './components/Layout/PageTransition';
import SurpriseMeComponent from './components/SurpriseMe';
import DeityNetworkComponent from './components/DeityNetwork';
import TopicGridComponent from './components/TopicGrid';
import TopicDetailComponent from './components/TopicDetail';
import AboutComponent from './components/About';
import HymnBrowserComponent from './components/HymnBrowser';
import EnhancedHomeComponent from './components/EnhancedHome';
import AskTheRishiComponent from './components/AskTheRishi';
import TenMandalasComponent from './components/TenMandalas';
import MandalaWheelComponent from './components/MandalaWheel';
import NotFound from './components/NotFound';
import ErrorBoundary from './components/ErrorBoundary';
import TimelineComponent from './components/Timeline';

// Component wrappers
const Home = () => (
  <PageTransition>
    <BookLayout pageNumber="1">
      <EnhancedHomeComponent />
    </BookLayout>
  </PageTransition>
);

const Timeline = () => (
  <PageTransition>
    <BookLayout pageNumber="10">
      <TimelineComponent />
    </BookLayout>
  </PageTransition>
);

const DeityNetwork = () => (
  <PageTransition>
    <BookLayout pageNumber="2">
      <DeityNetworkComponent />
    </BookLayout>
  </PageTransition>
);

const RigVedaOn = () => (
  <PageTransition>
    <BookLayout pageNumber="3">
      <TopicGridComponent />
    </BookLayout>
  </PageTransition>
);

const TopicDetail = () => (
  <PageTransition>
    <BookLayout pageNumber="3">
      <TopicDetailComponent />
    </BookLayout>
  </PageTransition>
);

const SurpriseMe = () => (
  <PageTransition>
    <BookLayout pageNumber="4">
      <SurpriseMeComponent />
    </BookLayout>
  </PageTransition>
);

const AskRishi = () => (
  <PageTransition>
    <BookLayout pageNumber="5">
      <AskTheRishiComponent />
    </BookLayout>
  </PageTransition>
);

const Mandalas = () => (
  <PageTransition>
    <BookLayout pageNumber="6">
      <TenMandalasComponent />
    </BookLayout>
  </PageTransition>
);

const MandalaWheel = () => (
  <PageTransition>
    <BookLayout pageNumber="9">
      <MandalaWheelComponent />
    </BookLayout>
  </PageTransition>
);

const About = () => (
  <PageTransition>
    <BookLayout pageNumber="7">
      <AboutComponent />
    </BookLayout>
  </PageTransition>
);

const HymnBrowser = () => (
  <PageTransition>
    <BookLayout pageNumber="8">
      <HymnBrowserComponent />
    </BookLayout>
  </PageTransition>
);

// 404 Route (NO PageTransition or BookLayout)
const NotFoundPage = () => <NotFound />;

// Router configuration
export const router = createBrowserRouter([
  { 
    path: '/', 
    element: <Home />,
    errorElement: <ErrorBoundary />
  },
  { 
    path: '/deity-network', 
    element: <DeityNetwork />,
    errorElement: <ErrorBoundary />
  },
  { 
    path: '/rigveda-on', 
    element: <RigVedaOn />,
    errorElement: <ErrorBoundary />
  },
  { 
    path: '/rigveda-on/:topic', 
    element: <TopicDetail />,
    errorElement: <ErrorBoundary />
  },
  { 
    path: '/surprise-me', 
    element: <SurpriseMe />,
    errorElement: <ErrorBoundary />
  },
  { 
    path: '/ask-rishi', 
    element: <AskRishi />,
    errorElement: <ErrorBoundary />
  },
  { 
    path: '/mandalas', 
    element: <Mandalas />,
    errorElement: <ErrorBoundary />
  },
  { 
    path: '/mandalas/:number', 
    element: <Mandalas />,
    errorElement: <ErrorBoundary />
  },
  { 
    path: '/mandala-wheel', 
    element: <MandalaWheel />,
    errorElement: <ErrorBoundary />
  },
  { 
    path: '/hymns', 
    element: <HymnBrowser />,
    errorElement: <ErrorBoundary />
  },
  { 
    path: '/timeline',      // ← NEW ROUTE ADDED
    element: <Timeline />,
    errorElement: <ErrorBoundary />
  },
  { 
    path: '/about', 
    element: <About />,
    errorElement: <ErrorBoundary />
  },
  // 404 Catch-all (MUST BE LAST!)
  { 
    path: '*', 
    element: <NotFoundPage />,
    errorElement: <ErrorBoundary />
  }
]);
