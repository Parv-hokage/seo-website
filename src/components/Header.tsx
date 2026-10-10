interface HeaderProps {
  currentRoute: string;
}

export const Header = ({ currentRoute }: HeaderProps) => {
  return (
    <header>
      <a className="logo" href="/" aria-label="Verra Coffee Atelier Home">
        Verra
      </a>
      <nav id="nav" aria-label="Main navigation">
        <a
          href="/build"
          className={currentRoute === '/build' ? 'on' : ''}
        >
          Build a blend
        </a>
        <a
          href="/origins"
          className={currentRoute === '/origins' ? 'on' : ''}
        >
          Origins
        </a>
        <a
          href="/story"
          className={currentRoute === '/story' ? 'on' : ''}
        >
          Our roast
        </a>
        <a
          href="/subscribe"
          className={currentRoute === '/subscribe' ? 'on' : ''}
        >
          Subscribe
        </a>
      </nav>
    </header>
  );
};
