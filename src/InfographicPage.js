// src/components/InfographicPage.js

import React from 'react';
import './InfographicPage.css';

const InfographicPage = () => {
  return (
    <div className="infographic-container">
      <h1>Infographic: The Power of Diversification</h1>
      <p>Explore this interactive infographic on investment strategies.</p>
      {/* NEW: Added an extra link for full-page view, as per your request */}
      <p>
        For a full-page view, click here: {' '}
        <a href="https://codepen.io/Scintific-Investor/full/GgJoqRL" target="_blank" rel="noopener noreferrer">
          Quant Strategy Mixer
        </a>
      </p>

      {/* CODEPEN'S RECOMMENDED EMBED STRUCTURE FOR FULL CONTROL */}
      <div
        className="codepen"
        data-height="1500" // Set a generous height here
        data-theme-id="light" // Use "dark" if your site is dark, or "light"
        data-default-tab="result" // Only show the result tab
        data-user="Scintific-Investor" // Your Codepen username
        data-slug-hash="GgJoqRL" // The part of the URL after /pen/
        data-editable="false" // Crucial: Prevents the "Edit on Codepen" and "Run Pen" buttons
        data-prefill="false" // Prevents showing prefill options if any
        data-embed-version="2" // Standard embed version
        style={{ width: '100%' }} // Apply 100% width via inline style for robustness
      >
        <span>
          See the Pen <a href="https://codepen.io/Scintific-Investor/pen/GgJoqRL">Quant Strategy Mixer</a> by Scintific Investor (<a href="https://codepen.io/Scintific-Investor">@Scintific-Investor</a>) on <a href="https://codepen.io">CodePen</a>.
        </span>
      </div>
      {/* End of Codepen embed structure */}

    </div>
  );
};

export default InfographicPage;