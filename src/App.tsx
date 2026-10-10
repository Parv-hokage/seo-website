import { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import { Glow } from './components/Glow.tsx';
import { SEO } from './components/SEO.tsx';
import { Home } from './pages/Home.tsx';
import { Build } from './pages/Build.tsx';
import { Origins } from './pages/Origins.tsx';
import { Story } from './pages/Story.tsx';
import { Subscribe } from './pages/Subscribe.tsx';

function getInitialPath(): string {
  // Support legacy hash links if user enters via #/build
  if (typeof window !== 'undefined') {
    if (window.location.hash.startsWith('#/')) {
      const hashPath = window.location.hash.slice(1);
      window.history.replaceState({}, '', hashPath);
      return hashPath;
    }
    const path = window.location.pathname;
    if (path && path !== '') {
      return path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path;
    }
  }
  return '/';
}

export function App({ initialPath }: { initialPath?: string }) {
  const [currentPath, setCurrentPath] = useState<string>(() => initialPath || getInitialPath());

  const navigateTo = useCallback((path: string) => {
    const cleanPath = path === '' ? '/' : path;
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', cleanPath);
      setCurrentPath(cleanPath);
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const cleanPath = path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path;
      setCurrentPath(cleanPath || '/');
      window.scrollTo(0, 0);
    };

    // Global internal link interceptor for SPA fast-navigation
    const handleLinkClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      // Intercept only local root-relative links without modifiers
      if (
        href &&
        href.startsWith('/') &&
        !href.startsWith('//') &&
        !target.hasAttribute('download') &&
        target.target !== '_blank' &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.shiftKey &&
        !e.altKey
      ) {
        e.preventDefault();
        navigateTo(href);
      }
    };

    window.addEventListener('popstate', handlePopState);
    document.addEventListener('click', handleLinkClick);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('click', handleLinkClick);
    };
  }, [navigateTo]);

  // IntersectionObserver for elements with the .rv class (fade / slide reveals)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const timer = setTimeout(() => {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('vis');
            }
          });
        },
        { threshold: 0.2 }
      );

      const targets = document.querySelectorAll('.rv');
      targets.forEach((target) => io.observe(target));

      return () => {
        io.disconnect();
      };
    }, 60);

    return () => clearTimeout(timer);
  }, [currentPath]);

  const renderPage = () => {
    switch (currentPath) {
      case '/build':
        return <Build />;
      case '/origins':
        return <Origins />;
      case '/story':
        return <Story />;
      case '/subscribe':
        return <Subscribe />;
      case '/':
      default:
        return <Home />;
    }
  };

  return (
    <>
      <SEO pathname={currentPath} />
      <Glow />
      <Header currentRoute={currentPath} />
      <main id="main-content">{renderPage()}</main>
      <Footer />
    </>
  );
}

export default App;
