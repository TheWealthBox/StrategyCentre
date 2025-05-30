// src/InfographicPage.js
import React from 'react';
import './InfographicPage.css';

const InfographicPage = () => {
  return (
    <div className="infographic-container">
      <h2>Infographic: The Power of Diversification</h2>
      <p>Explore this interactive infographic on investment strategies.</p>
      <iframe
        height="1200"  // <-- INCREASE THIS HEIGHT VALUE SIGNIFICANTLY
        style={{ width: '100%' }}
        scrolling="no"
        frameBorder="no"
        loading="lazy"
        allowTransparency="true"
        allowFullScreen={true}
        src="https://codepen.io/Scintific-Investor/embed/preview/GgJoqRL?default-tab=result" // Ensure this SRC is correct from Codepen's embed option
        title="Infographic Article: The Power of Diversification"
      >
        See the Pen <a href="https://codepen.io/Scintific-Investor/pen/GgJoqRL">Infographic Article: The Power of Diversification</a> by Scintific-Investor (<a href="https://codepen.io/Scintific-Investor">@Scintific-Investor</a>)
        on <a href="https://codepen.io">CodePen</a>.
      </iframe>
    </div>
  );
};

export default InfographicPage;