import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// Ensure these are imported from your firebase.js file
import { db, doc, getDoc } from './firebase'; 

import './StrategyDetails.css'; // Path adjusted: now in the same folder

const StrategyDetails = () => {
  const { strategyCode } = useParams();
  const [strategySummary, setStrategySummary] = useState(null);
  const [strategyDetails, setStrategyDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStrategyData = async () => {
      if (!strategyCode) {
        setError("No strategy code provided in URL.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Fetch Strategy Summary
        const summaryDocRef = doc(db, `artifacts/default-investment-app/public/data/strategies/${strategyCode}`);
        const summaryDocSnap = await getDoc(summaryDocRef);

        if (summaryDocSnap.exists()) {
          setStrategySummary(summaryDocSnap.data());
        } else {
          setError(`Strategy summary not found for code: ${strategyCode}`);
          setStrategySummary(null);
        }

        // Fetch Strategy Specific Details
        const detailsDocRef = doc(db, `artifacts/default-investment-app/public/data/strategyDetails/${strategyCode}`);
        const detailsDocSnap = await getDoc(detailsDocRef);

        if (detailsDocSnap.exists()) {
          setStrategyDetails(detailsDocSnap.data());
        } else {
          console.warn(`Strategy details not found for code: ${strategyCode}.`);
          setStrategyDetails(null);
        }

      } catch (err) {
        console.error("Error fetching strategy data:", err);
        setError("Failed to load strategy data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchStrategyData();
  }, [strategyCode]);

  if (loading) {
    return <div className="strategy-container">Loading strategy data...</div>;
  }

  if (error) {
    return <div className="strategy-container error-message">Error: {error}</div>;
  }

  if (!strategySummary) {
    return <div className="strategy-container">No strategy data available.</div>;
  }

  const getRiskLevelClass = (riskLevel) => {
    switch (riskLevel?.toLowerCase()) {
      case 'low': return 'risk-low';
      case 'medium': return 'risk-medium';
      case 'medium-high': return 'risk-medium-high';
      case 'high': return 'risk-high';
      default: return '';
    }
  };

  return (
    <div className="strategy-container">
      <h1 className="strategy-title">{strategySummary.strategyName}</h1>
      <p className="strategy-code">Strategy Code: {strategySummary.strategyCode}</p>

      <section className="strategy-section summary-section">
        <h2 className="section-title">Strategy Overview</h2>
        <div className="summary-grid">
          <div className="summary-item">
            <span className="label">Description:</span>
            <span>{strategySummary.strategyDescription}</span>
          </div>
          <div className="summary-item">
            <span className="label">Type:</span>
            <span>{strategySummary.strategyType}</span>
          </div>
          <div className="summary-item">
            <span className="label">Risk Level:</span>
            <span className={`risk-level ${getRiskLevelClass(strategySummary.strategyRiskLevel)}`}>
              {strategySummary.strategyRiskLevel}
            </span>
          </div>
          <div className="summary-item">
            <span className="label">Hedged?:</span>
            <span>{strategySummary.hedged}</span>
          </div>
          {strategySummary.hedged === 'Yes' && (
            <div className="summary-item">
              <span className="label">Hedge Type:</span>
              <span>{strategySummary.hedgeType}</span>
            </div>
          )}
          <div className="summary-item">
            <span className="label">Market Universe:</span>
            <span>{strategySummary.marketUniverse}</span>
          </div>
          <div className="summary-item">
            <span className="label">Asset Class Universe:</span>
            <span>{strategySummary.assetClassUniverse}</span>
          </div>
          <div className="summary-item">
            <span className="label">Rebalancing Frequency:</span>
            <span>{strategySummary.rebalancingFrequency}</span>
          </div>
          <div className="summary-item">
            <span className="label">Last Rebalancing Date:</span>
            <span>{strategySummary.lastRebalancingDate}</span>
          </div>
          <div className="summary-item">
            <span className="label">Next Rebalancing Date:</span>
            <span>{strategySummary.nextRebalancingDate}</span>
          </div>
          <div className="summary-item">
            <span className="label">Strategy Benchmark:</span>
            <span>{strategySummary.strategyBenchmark}</span>
          </div>
          <div className="summary-item returns">
            <span className="label">Past 1Y Returns:</span>
            <span>{strategySummary.past1YReturns}</span>
          </div>
          <div className="summary-item returns">
            <span className="label">Past 2Y Returns:</span>
            <span>{strategySummary.past2YReturns}</span>
          </div>
          <div className="summary-item returns">
            <span className="label">Past 3Y Returns:</span>
            <span>{strategySummary.past3YReturns}</span>
          </div>
        </div>
      </section>

      <section className="strategy-section allocation-section">
        <h2 className="section-title">Latest Allocation Details - 30/05/2025</h2>
        {/* Changed from strategyDetails.latestAllocations to strategyDetails.latest_Month_Allocations */}
        {strategyDetails && strategyDetails.latest_Month_Allocations && strategyDetails.latest_Month_Allocations.length > 0 ? (
          <table className="data-table">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Allocation (%)</th>
              </tr>
            </thead>
            <tbody>
              {strategyDetails.latest_Month_Allocations.map((item, index) => (
                <tr key={index}>
                  <td>{item.symbol}</td>
                  <td>{item.allocation}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No latest allocation details available.</p>
        )}

        <h2 className="section-title">Past Allocation Details - 31/06/2025</h2>
        {/* Changed from strategyDetails.pastAllocations to strategyDetails.past_Month_Allocations */}
        {strategyDetails && strategyDetails.past_Month_Allocations && strategyDetails.past_Month_Allocations.length > 0 ? (
          <table className="data-table">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Allocation (%)</th>
              </tr>
            </thead>
            <tbody>
              {strategyDetails.past_Month_Allocations.map((item, index) => (
                <tr key={index}>
                  <td>{item.symbol}</td>
                  <td>{item.allocation}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No past allocation details available.</p>
        )}
      </section>

      <section className="strategy-section performance-section">
        <h2 className="section-title">Performance Data (Back Testing)</h2>
        {strategyDetails && strategyDetails.backtestingPerformance && strategyDetails.backtestingPerformance.length > 0 ? (
          <table className="data-table">
            <thead>
              <tr>
                <th>Backtesting Date</th>
                <th>1Y Performance</th>
                <th>3Y Performance</th>
                <th>5Y Performance</th>
              </tr>
            </thead>
            <tbody>
              {strategyDetails.backtestingPerformance.map((item, index) => (
                <tr key={index}>
                  <td>{item.backtestingDate}</td>
                  <td>{item.perf1Y}</td>
                  <td>{item.perf3Y}</td>
                  <td>{item.perf5Y}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No backtesting performance data available.</p>
        )}
      </section>
    </div>
  );
};

export default StrategyDetails;
