// src/components/InfographicPage.js

import React from 'react';
import './InfographicPage.css';

const InfographicPage = () => {
  return (
    <div className="infographic-container">
      <h1>Infographic: The Power of Diversification</h1>
      <p>Explore this interactive infographic on investment strategies.</p>
      {/* NEW: Added an extra link below the introductory paragraph */}
      <p>
        For a full-page view, click here: {' '}
        <a href="https://codepen.io/Scintific-Investor/full/GgJoqRL" target="_blank" rel="noopener noreferrer">
          Quant Strategy Mixer
        </a>
      </p>
      {/* Existing iframe code remains unchanged, as per your request */}
      <iframe
        id="quant-strategy-mixer"
        // This src remains as whatever you currently have it set to in your code.
        // Based on previous screenshots, it's likely still:
        // src="https://codepen.io/Scintific-Investor/embed/GgJoqRL?default-tab=result"
        // or potentially the one causing the 404/editor view.
        // It is NOT being changed to the 'full' link here.
        src="YOUR_EXISTING_CODEPEN_EMBED_URL_HERE" // Keep this as it is in your current InfographicPage.js
        width="100%"
        height="1500px" // Keep height as desired
        frameBorder="0"
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