import { useState } from 'react';
import { SUBSCRIPTION_FREQUENCIES } from '../data/coffeeData.ts';

export const Subscribe = () => {
  const [selectedFreq, setSelectedFreq] = useState('f2');
  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubscribe = () => {
    if (/\S+@\S+\.\S+/.test(email)) {
      setStatusMessage("You're in. We'll email you to confirm your first roast.");
    } else {
      setStatusMessage('Enter a valid email address to continue.');
    }
  };

  return (
    <div className="page" id="p-subscribe">
      <div className="wrap">
        <section>
          <h2>Never run out</h2>
          <p className="sub">Choose how often we roast and ship your saved blend.</p>
          <div className="freq">
            {SUBSCRIPTION_FREQUENCIES.map((freq) => (
              <div key={freq.id}>
                <input
                  type="radio"
                  name="f"
                  id={freq.id}
                  checked={selectedFreq === freq.id}
                  onChange={() => setSelectedFreq(freq.id)}
                />
                <label htmlFor={freq.id}>
                  <h3>{freq.title}</h3>
                  <div className="p">{freq.discount}</div>
                  <p>{freq.desc}</p>
                </label>
              </div>
            ))}
          </div>
          <div className="row">
            <input
              type="email"
              id="em"
              placeholder="Your email"
              aria-label="Your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setStatusMessage('');
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSubscribe();
                }
              }}
            />
            <button className="btn" id="sub" onClick={handleSubscribe}>
              Start my subscription
            </button>
          </div>
          <p className="msg" id="smsg">
            {statusMessage}
          </p>
        </section>
      </div>
    </div>
  );
};
