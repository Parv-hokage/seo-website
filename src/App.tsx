import { useState, useEffect } from 'react';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import { Glow } from './components/Glow.tsx';
import { Home } from './pages/Home.tsx';
import { Build } from './pages/Build.tsx';
import { Origins } from './pages/Origins.tsx';
import { Story } from './pages/Story.tsx';
import { Subscribe } from './pages/Subscribe.tsx';

function normalizeHash(hash: string): string {
  const path = hash.replace(/^#/, '');
  if (!path || path === '/' || path === '') return '/';
  if (!path.startsWith('/')) return `/${path}`;
  return path;
}

export function App() {
  const [currentPath, setCurrentPath] = useState<string>(() =>
    normalizeHash(window.location.hash)
  );

  useEffect(() => {
    const handleHashChange = () => {
      const newPath = normalizeHash(window.location.hash);
      setCurrentPath(newPath);
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // IntersectionObserver for elements with the .rv class (reveals)
  useEffect(() => {
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
      <Glow />
      <Header currentRoute={currentPath} />
      <main id="main-content">{renderPage()}</main>
      <Footer />
    </>
  );
}

export default App;
