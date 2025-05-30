// src/components/InfographicPage.js

import React from 'react';
import './InfographicPage.css';

const InfographicPage = () => {
  return (
    <div className="infographic-container">
      <h1>Infographic: The Power of Diversification</h1>
      <p>Explore this interactive infographic on investment strategies.</p>
      <iframe
        id="quant-strategy-mixer"
        // --- THIS MUST BE THE FULL PAGE VIEW URL ---
        src="https://codepen.io/Scintific-Investor/full/GgJoqRL" // ENSURE THIS IS THE URL
        width="100%" // This ensures it takes 100% of its parent's width.
        height="1500px" // Keep this height for now.
        frameBorder="0" // Set frameborder to 0 for a cleaner look
        allowTransparency="true"
        allowFullScreen="true"
        title="Quant Strategy Mixer: Smarter Investing Infographic"
      >
        See the Pen <a href="https://codepen.io/Scintific-Investor/pen/GgJoqRL">Quant Strategy Mixer: Smarter Investing Infographic</a> by Scintific Investor (<a href="https://codepen.io/Scintific-Investor">@Scintific-Investor</a>) on <a href="https://codepen.io">CodePen</a>.
      </iframe>
    </div>
  );
};

export default InfographicPage;