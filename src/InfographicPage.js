// src/InfographicPage.js
import React from 'react';
import './InfographicPage.css'; // Make sure you also create this CSS file

const InfographicPage = () => {
  return (
    <div className="infographic-container">
      <h2>Infographic: The Power of Diversification</h2>
      <p>Explore this interactive infographic on investment strategies.</p>
      <iframe
        height="2000"  // <-- SIGNIFICANTLY INCREASED HEIGHT
        style={{ width: '100%' }} // Use JavaScript object for inline styles
        scrolling="no" // 'no' means no scrollbars for the iframe itself
        frameBorder="no" // Changed from 'frameborder' to 'frameBorder' for JSX
        loading="lazy"
        allowTransparency="true" // Changed from 'allowtransparency' to 'allowTransparency' for JSX
        allowFullScreen={true} // Changed from 'allowfullscreen' to 'allowFullScreen' for JSX. Value is a boolean.
        src="https://codepen.io/Scintific-Investor/embed/preview/GgJoqRL?default-tab=result" // This is the embed URL from Codepen
        title="Infographic Article: The Power of Diversification"
      >
        {/* The fallback content for browsers that don't support iframes */}
        See the Pen <a href="https://codepen.io/Scintific-Investor/pen/GgJoqRL">Infographic Article: The Power of Diversification</a> by Scintific-Investor (<a href="https://codepen.io/Scintific-Investor">@Scintific-Investor</a>)
        on <a href="https://codepen.io">CodePen</a>.
      </iframe>
    </div>
  );
};

export default InfographicPage;
