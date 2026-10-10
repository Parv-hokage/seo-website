import { TASTING_NOTES } from '../data/coffeeData.ts';

export const Marquee = () => {
  const repeatedNotes = [...TASTING_NOTES, ...TASTING_NOTES];

  return (
    <div className="marq" aria-hidden="true">
      <div>
        {repeatedNotes.map((note, index) => (
          <span key={index}>
            <span>{note}</span>
            <i>●</i>
          </span>
        ))}
      </div>
    </div>
  );
};
