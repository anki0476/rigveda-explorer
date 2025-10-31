import { lazy, Suspense } from 'react';

import { createBrowserRouter } from 'react-router-dom';
import BookLayout from './components/Layout/BookLayout';
import PageTransition from './components/Layout/PageTransition';
import Lottie from 'lottie-react';
import bookLoadingAnimation from './assets/animations/BookLoadingAnimation.json';

// ✅ All your existing lazy imports...
const SurpriseMeComponent = lazy(() => import('./components/SurpriseMe'));
const DeityNetworkComponent = lazy(() => import('./components/DeityNetwork'));
const TopicGridComponent = lazy(() => import('./components/TopicGrid'));
const TopicDetailComponent = lazy(() => import('./components/TopicDetail'));
const AboutComponent = lazy(() => import('./components/About'));
const HymnBrowserComponent = lazy(() => import('./components/HymnBrowser'));
const EnhancedHomeComponent = lazy(() => import('./components/EnhancedHome'));
const AskTheRishiComponent = lazy(() => import('./components/AskTheRishi'));
const TenMandalasComponent = lazy(() => import('./components/TenMandalas'));
const MandalaWheelComponent = lazy(() => import('./components/MandalaWheel'));
const VedicStarMapComponent = lazy(() => import('./components/VedicStarMap'));
const TimelineComponent = lazy(() => import('./components/Timeline'));

import NotFound from './components/NotFound';
import ErrorBoundary from './components/ErrorBoundary';

// GAME IMPORTS
const GamesHub = lazy(() => import('./pages/GamesHub'));
const StoryMode = lazy(() => import('./components/StoryMode/StoryMode'));
const DeityCollector = lazy(() => import('./components/DeityCollector/DeityCollector'));
const AchievementPanel = lazy(() => import('./components/Achievements/AchievementPanel'));

const VedicIdentityQuiz = lazy(() => import('./components/VedicIdentityQuiz'));

import ScrollToTop from './components/ScrollToTop';

// ✅ LOADING FALLBACK COMPONENT (for hymns only)
const HymnLoadingFallback = () => (
  <div className="min-h-screen bg-[--color-parchment] flex flex-col items-center justify-center gap-8">
    <div className="w-32 h-32">
      <Lottie
        animationData={bookLoadingAnimation}
        loop={true}
        autoplay={true}
      />
    </div>
    <div className="text-center">
      <p className="text-xl font-[family:--font-family-header] text-[--color-ink] mb-2">
        📜 Loading Sacred Hymns...
      </p>
      <p className="text-sm text-[--color-ink-light] font-[family:--font-family-body]">
        Preparing the Hymn Browser
      </p>
    </div>
  </div>
);

// ... all your existing route components ...

const Home = () => (
  <>
    <ScrollToTop />
    <PageTransition>
      <EnhancedHomeComponent />
    </PageTransition>
  </>
);

const Timeline = () => (
  <BookLayout>
    <ScrollToTop />
    <PageTransition>
      <TimelineComponent />
    </PageTransition>
  </BookLayout>
);

const DeityNetwork = () => (
  <BookLayout>
    <ScrollToTop />
    <PageTransition>
      <DeityNetworkComponent />
    </PageTransition>
  </BookLayout>
);

const RigVedaOn = () => (
  <BookLayout>
    <ScrollToTop />
    <PageTransition>
      <TopicGridComponent />
    </PageTransition>
  </BookLayout>
);

const TopicDetail = () => (
  <BookLayout>
    <ScrollToTop />
    <PageTransition>
      <TopicDetailComponent />
    </PageTransition>
  </BookLayout>
);

const SurpriseMe = () => (
  <BookLayout>
    <ScrollToTop />
    <PageTransition>
      <SurpriseMeComponent />
    </PageTransition>
  </BookLayout>
);

const AskRishi = () => (
  <BookLayout>
    <ScrollToTop />
    <PageTransition>
      <AskTheRishiComponent />
    </PageTransition>
  </BookLayout>
);

const Mandalas = () => (
  <BookLayout>
    <ScrollToTop />
    <PageTransition>
      <TenMandalasComponent />
    </PageTransition>
  </BookLayout>
);

const MandalaWheel = () => (
  <BookLayout>
    <ScrollToTop />
    <PageTransition>
      <MandalaWheelComponent />
    </PageTransition>
  </BookLayout>
);

const About = () => (
  <BookLayout>
    <ScrollToTop />
    <PageTransition>
      <AboutComponent />
    </PageTransition>
  </BookLayout>
);

// ✅ UPDATED: HymnBrowser with Suspense + Loading animation
const HymnBrowser = () => (
  <Suspense fallback={<HymnLoadingFallback />}>
    <BookLayout>
      <ScrollToTop />
      <PageTransition>
        <HymnBrowserComponent />
      </PageTransition>
    </BookLayout>
  </Suspense>
);

const VedicStarMap = () => (
  <BookLayout>
    <ScrollToTop />
    <PageTransition>
      <VedicStarMapComponent />
    </PageTransition>
  </BookLayout>
);

// GAME ROUTES (unchanged)
const Games = () => (
  <BookLayout>
    <>
      <ScrollToTop />
      <PageTransition>
        <GamesHub />
      </PageTransition>
    </>
  </BookLayout>
);

const Story = () => (
  <BookLayout>
    <>
      <ScrollToTop />
      <PageTransition>
        <StoryMode />
      </PageTransition>
    </>
  </BookLayout>
);

const Collection = () => (
  <BookLayout>
    <>
      <ScrollToTop />
      <PageTransition>
        <DeityCollector />
      </PageTransition>
    </>
  </BookLayout>
);

const Achievements = () => (
  <BookLayout>
    <>
      <ScrollToTop />
      <PageTransition>
        <AchievementPanel />
      </PageTransition>
    </>
  </BookLayout>
);

const VedicIdentity = () => (
  <BookLayout>
    <>
      <ScrollToTop />
      <PageTransition>
        <VedicIdentityQuiz />
      </PageTransition>
    </>
  </BookLayout>
);

const NotFoundPage = () => <NotFound />;

// Router configuration (unchanged except for HymnBrowser route)
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
    path: '/timeline',
    element: <Timeline />,
    errorElement: <ErrorBoundary />
  },
  {
    path: '/star-map',
    element: <VedicStarMap />,
    errorElement: <ErrorBoundary />
  },
  {
    path: '/about',
    element: <About />,
    errorElement: <ErrorBoundary />
  },
  // GAME ROUTES
  {
    path: '/games',
    element: <Games />,
    errorElement: <ErrorBoundary />
  },
  {
    path: '/games/story',
    element: <Story />,
    errorElement: <ErrorBoundary />
  },
  {
    path: '/games/collection',
    element: <Collection />,
    errorElement: <ErrorBoundary />
  },
  {
    path: '/games/achievements',
    element: <Achievements />,
    errorElement: <ErrorBoundary />
  },
  {
    path: '/vedic-identity',
    element: <VedicIdentity />,
    errorElement: <ErrorBoundary />
  },
  {
    path: '*',
    element: <NotFoundPage />,
    errorElement: <ErrorBoundary />
  }
]);
