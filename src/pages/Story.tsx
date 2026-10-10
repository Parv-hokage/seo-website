import { useEffect, useRef } from 'react';
import { TIMELINE_STEPS } from '../data/coffeeData.ts';

export const Story = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const tl = timelineRef.current;
      if (!tl) return;
      const rect = tl.getBoundingClientRect();
      const progress = Math.max(
        0,
        Math.min(1, (window.innerHeight * 0.6 - rect.top) / rect.height)
      );
      tl.style.setProperty('--p', `${progress * 100}%`);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount to initialize progress based on initial scroll position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="page" id="p-story">
      <div className="wrap">
        <section>
          <h1 className="page-h1">How your bag gets made</h1>
          <p className="sub">Scroll through a roast day.</p>
          <div className="tl" id="tl" ref={timelineRef}>
            <div className="fill" />
            {TIMELINE_STEPS.map((step, idx) => (
              <div className="s" key={idx}>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
