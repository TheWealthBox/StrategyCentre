import React from 'react';
import './InfographicPage.css';

const InfographicPage = () => {
  return (
    <div className="infographic-container">
      <h1>Infographic: The Power of Diversification</h1>
      <p>Explore this interactive infographic on investment strategies.</p>
      <iframe
        id="quant-strategy-mixer"
        src="https://codepen.io/Scintific-Investor/embed/GgJoqRL?default-tab=result" // Corrected Codepen Embed URL
        width="100%"
        height="800px" // Increased height to prevent scroll and "Run Pen" block
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