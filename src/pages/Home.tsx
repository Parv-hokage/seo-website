import { useEffect, useRef, useState } from 'react';
import { HERO_WORDS } from '../data/coffeeData.ts';
import { Steam } from '../components/Steam.tsx';
import { Marquee } from '../components/Marquee.tsx';

export const Home = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [isRotatingOut, setIsRotatingOut] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const tiltBagRef = useRef<HTMLDivElement>(null);

  const stat1Ref = useRef<HTMLElement>(null);
  const stat2Ref = useRef<HTMLElement>(null);
  const stat3Ref = useRef<HTMLElement>(null);

  // Rotating word effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIsRotatingOut(true);
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % HERO_WORDS.length);
        setIsRotatingOut(false);
      }, 400);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  // 3D Tilt effect
  useEffect(() => {
    const stage = stageRef.current;
    const tiltBag = tiltBagRef.current;
    if (!stage || !tiltBag) return;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      tiltBag.style.transform = `rotateY(${x * 18}deg) rotateX(${-y * 18}deg)`;
    };

    const handlePointerLeave = () => {
      tiltBag.style.transform = '';
    };

    stage.addEventListener('pointermove', handlePointerMove);
    stage.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      stage.removeEventListener('pointermove', handlePointerMove);
      stage.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  // Number counting animation
  useEffect(() => {
    const stats = [
      { ref: stat1Ref, target: 48 },
      { ref: stat2Ref, target: 3 },
      { ref: stat3Ref, target: 96 },
    ];

    const startTime = performance.now();
    let animId: number;

    const animate = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / 1400, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      stats.forEach(({ ref, target }) => {
        if (ref.current) {
          ref.current.textContent = String(Math.round(target * easeProgress));
        }
      });

      if (progress < 1) {
        animId = requestAnimationFrame(animate);
      }
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="page" id="p-home">
      <div className="wrap hero">
        <div>
          <h1>
            Your{' '}
            <span id="rot" className={isRotatingOut ? 'out' : ''}>
              {HERO_WORDS[wordIndex]}
            </span>{' '}
            coffee, blended by you.
          </h1>
          <p className="lede">
            Choose the origin, the roast and the grind. We roast to order in small batches and ship within 48 hours, in a bag with your name on it.
          </p>
          <a className="btn" href="/build">
            Build your blend
          </a>
          <a className="btn ghost" href="/story">
            See how we roast
          </a>
        </div>
        <div className="stage" id="stage" ref={stageRef}>
          <Steam />
          <div className="bag" id="tilt" ref={tiltBagRef}>
            <div className="brand">Verra Coffee Atelier</div>
            <div className="bname">The Morning Blend</div>
            <div className="meta">
              <span>Origin Huila, Colombia</span>
              <span>Roast Medium</span>
              <span>Roasted to order</span>
            </div>
          </div>
        </div>
      </div>

      <Marquee />

      <section>
        <div className="wrap">
          <h2 className="rv">Small batches, made for one person at a time</h2>
          <div className="stats rv">
            <div>
              <b ref={stat1Ref} data-n="48">
                0
              </b>
              <span>hours from roast to your door</span>
            </div>
            <div>
              <b ref={stat2Ref} data-n="3">
                0
              </b>
              <span>single origins, each traced to its farm</span>
            </div>
            <div>
              <b ref={stat3Ref} data-n="96">
                0
              </b>
              <span>possible blends before you name yours</span>
            </div>
          </div>
          <div className="grid3">
            <div className="card rv">
              <h3>Pick</h3>
              <p>Three origins, three roast levels and four grinds, matched to how you brew.</p>
            </div>
            <div className="card dark rv">
              <h3>Name</h3>
              <p>Your blend gets your name on the label. Gift it, or keep it for the shelf.</p>
            </div>
            <div className="card rv">
              <h3>Repeat</h3>
              <p>Save it and we'll roast it again on your schedule. Skip or pause any time.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
