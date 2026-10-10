interface HeaderProps {
  currentRoute: string;
}

export const Header = ({ currentRoute }: HeaderProps) => {
  return (
    <header>
      <a className="logo" href="#/">
        Verra
      </a>
      <nav id="nav">
        <a
          href="#/build"
          className={currentRoute === '/build' ? 'on' : ''}
        >
          Build a blend
        </a>
        <a
          href="#/origins"
          className={currentRoute === '/origins' ? 'on' : ''}
        >
          Origins
        </a>
        <a
          href="#/story"
          className={currentRoute === '/story' ? 'on' : ''}
        >
          Our roast
        </a>
        <a
          href="#/subscribe"
          className={currentRoute === '/subscribe' ? 'on' : ''}
        >
          Subscribe
        </a>
      </nav>
    </header>
  );
};
