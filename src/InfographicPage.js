import React from 'react';
import './InfographicPage.css'; // Make sure this import is there

const InfographicPage = () => {
  return (
    <div className="infographic-container">
      <h1>Infographic: The Power of Diversification</h1>
      <p>Explore this interactive infographic on investment strategies.</p>
      <iframe
        id="quant-strategy-mixer"
        src="https://codepen.io/Scientific-Investor/embed/preview/GRJqoML?default-tab=result"
        // Ensure width is 100% and height is sufficient
        width="100%"
        height="800px" // Increased height to prevent scroll and "Run Pen" block
        frameBorder="0"
        allowTransparency="true"
        allowFullScreen="true"
        title="Quant Strategy Mixer: Smarter Investing Infographic"
      >
        See the Pen <a href="https://codepen.io/Scientific-Investor/pen/GRJqoML">Quant Strategy Mixer: Smarter Investing Infographic</a> by Scientific Investor (<a href="https://codepen.io/Scientific-Investor">@Scientific-Investor</a>) on <a href="https://codepen.io">CodePen</a>.
      </iframe>
    </div>
  );
};

export default InfographicPage;