import { COFFEE_DATA } from '../data/coffeeData.ts';

const TASTE_METRICS = ['Acidity', 'Body', 'Sweetness'] as const;

export const Origins = () => {
  return (
    <div className="page" id="p-origins">
      <div className="wrap">
        <section>
          <h2>Three origins, traced to the farm</h2>
          <p className="sub">
            Each lot is tasted and scored before it earns a place in the atelier.
          </p>
          <div className="grid3" id="oc">
            {COFFEE_DATA.origins.map((origin, i) => (
              <div
                key={origin.id}
                className={`card rv ${i === 0 ? 'dark' : ''}`}
              >
                <h3>{origin.id}</h3>
                <p>{origin.description}</p>
                <div className="bars">
                  {TASTE_METRICS.map((metric, j) => (
                    <div className="bar" key={metric}>
                      <span>{metric}</span>
                      <i
                        style={
                          {
                            '--w': `${origin.scores[j]}%`,
                          } as React.CSSProperties
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
