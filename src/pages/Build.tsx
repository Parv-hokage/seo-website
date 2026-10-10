import { useState } from 'react';
import { COFFEE_DATA } from '../data/coffeeData.ts';

export const Build = () => {
  const [originIndex, setOriginIndex] = useState(1);
  const [roastIndex, setRoastIndex] = useState(1);
  const [grindIndex, setGrindIndex] = useState(0);
  const [sizeIndex, setSizeIndex] = useState(0);
  const [blendName, setBlendName] = useState('The Morning Blend');
  const [orderMessage, setOrderMessage] = useState('');

  const currentOrigin = COFFEE_DATA.origins[originIndex];
  const currentRoast = COFFEE_DATA.roasts[roastIndex];
  const currentGrind = COFFEE_DATA.grinds[grindIndex];
  const currentSize = COFFEE_DATA.sizes[sizeIndex];

  const displayName = blendName.trim() || 'Untitled blend';

  // Tasting notes calculation based on roast level
  const dynamicNotes =
    currentRoast.id === 'Dark'
      ? [currentOrigin.notes[0], 'roasted sugar', currentOrigin.notes[2]]
      : currentRoast.id === 'Light'
      ? [currentOrigin.notes[0], currentOrigin.notes[1], 'citrus']
      : currentOrigin.notes;

  const notesText = `Tastes of ${dynamicNotes.join(', ')}. A ${currentRoast.descriptor} cup.`;
  const detailText = `${currentRoast.id} roast, ${currentSize.id}`;
  const price = currentSize.basePrice + currentOrigin.priceOffset * currentSize.multiplier;

  const handleOrder = () => {
    setOrderMessage(
      `Added. We'll roast ${blendName.trim() || 'your blend'} within 48 hours of checkout.`
    );
  };

  return (
    <div className="page" id="p-build">
      <div className="wrap">
        <section>
          <h1 className="page-h1">Design your own coffee</h1>
          <p className="sub">
            Every choice updates your bag and your tasting notes. Nothing is roasted until you order.
          </p>

          <div className="builder">
            <div>
              {/* Origin */}
              <fieldset>
                <legend>Origin</legend>
                <div className="opts" id="g-origin">
                  {COFFEE_DATA.origins.map((origin, idx) => {
                    const id = `origin${idx}`;
                    return (
                      <span key={origin.id}>
                        <input
                          type="radio"
                          name="origin"
                          id={id}
                          checked={originIndex === idx}
                          onChange={() => {
                            setOriginIndex(idx);
                            setOrderMessage('');
                          }}
                        />
                        <label htmlFor={id}>{origin.id}</label>
                      </span>
                    );
                  })}
                </div>
              </fieldset>

              {/* Roast */}
              <fieldset>
                <legend>Roast</legend>
                <div className="opts" id="g-roast">
                  {COFFEE_DATA.roasts.map((roast, idx) => {
                    const id = `roast${idx}`;
                    return (
                      <span key={roast.id}>
                        <input
                          type="radio"
                          name="roast"
                          id={id}
                          checked={roastIndex === idx}
                          onChange={() => {
                            setRoastIndex(idx);
                            setOrderMessage('');
                          }}
                        />
                        <label htmlFor={id}>{roast.id}</label>
                      </span>
                    );
                  })}
                </div>
              </fieldset>

              {/* Grind */}
              <fieldset>
                <legend>Grind</legend>
                <div className="opts" id="g-grind">
                  {COFFEE_DATA.grinds.map((grind, idx) => {
                    const id = `grind${idx}`;
                    return (
                      <span key={grind}>
                        <input
                          type="radio"
                          name="grind"
                          id={id}
                          checked={grindIndex === idx}
                          onChange={() => {
                            setGrindIndex(idx);
                            setOrderMessage('');
                          }}
                        />
                        <label htmlFor={id}>{grind}</label>
                      </span>
                    );
                  })}
                </div>
              </fieldset>

              {/* Bag Size */}
              <fieldset>
                <legend>Bag size</legend>
                <div className="opts" id="g-size">
                  {COFFEE_DATA.sizes.map((size, idx) => {
                    const id = `size${idx}`;
                    return (
                      <span key={size.id}>
                        <input
                          type="radio"
                          name="size"
                          id={id}
                          checked={sizeIndex === idx}
                          onChange={() => {
                            setSizeIndex(idx);
                            setOrderMessage('');
                          }}
                        />
                        <label htmlFor={id}>{size.id}</label>
                      </span>
                    );
                  })}
                </div>
              </fieldset>

              {/* Name input */}
              <fieldset>
                <legend>
                  <label htmlFor="nm">Name on the bag</label>
                </legend>
                <input
                  type="text"
                  id="nm"
                  maxLength={24}
                  value={blendName}
                  onChange={(e) => {
                    setBlendName(e.target.value);
                    setOrderMessage('');
                  }}
                />
              </fieldset>
            </div>

            <aside>
              <div className="stage" style={{ marginBottom: '34px' }}>
                <div
                  className="bag"
                  id="bag"
                  style={{
                    background: currentRoast.bg,
                    color: currentRoast.ink,
                  }}
                >
                  <div className="brand">Verra Coffee Atelier</div>
                  <div className="bname" id="bagName">
                    {displayName}
                  </div>
                  <div className="meta">
                    <span id="bO">Origin {currentOrigin.id}</span>
                    <span id="bR">Roast {currentRoast.id}</span>
                    <span id="bG">
                      Grind {currentGrind} · {currentSize.id}
                    </span>
                  </div>
                </div>
              </div>

              <div className="summary" aria-live="polite">
                <h3 id="sTitle">{displayName}</h3>
                <p className="notes" id="sNotes">
                  {notesText}
                </p>
                <div className="price">
                  <span id="sDetail">{detailText}</span>
                  <strong id="sPrice">${price}</strong>
                </div>
                <button
                  className="btn"
                  id="order"
                  style={{ width: '100%' }}
                  onClick={handleOrder}
                >
                  Order this blend
                </button>
                <p className="msg" id="msg">
                  {orderMessage}
                </p>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </div>
  );
};
