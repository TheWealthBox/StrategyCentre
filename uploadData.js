// This script is for populating your Firestore database with sample data.
// It is intended to be run in a Node.js environment, not directly in the browser.

// To run this script:
// 1. Make sure you have Node.js installed.
// 2. Install Firebase Admin SDK: npm install firebase-admin
// 3. Create a service account key JSON file from your Firebase project settings:
//    Go to Firebase Console -> Project settings (gear icon) -> Service accounts -> Generate new private key.
//    Save this JSON file (e.g., 'serviceAccountKey.json') in the same directory as this script.
// 4. Replace 'path/to/your/serviceAccountKey.json' with the actual path to your file.
// 5. Replace 'your-app-id-here' with the actual appId you are using in your React app.
//    (If you are using 'default-investment-app', you can leave it as is).
// 6. Run the script: node uploadData.js

const admin = require('firebase-admin');

// IMPORTANT: Replace with the path to your Firebase service account key JSON file
const serviceAccount = require('./serviceAccountKey.json');

// IMPORTANT: Replace with your actual app ID used in the React app
const appId = 'default-investment-app'; // Or the value of __app_id if you customized it to match your projectId

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const uploadData = async () => {
  try {
    // --- Strategy Summary Data (simulating 'Strategy Summary Sheet') ---
    const strategiesRef = db.collection(`artifacts/${appId}/public/data/strategies`);
    console.log("Uploading Strategy Summary Data...");

    const strategy1 = {
      strategyName: "Quant Strategy Mixer",
      strategyCode: "QUANT1",
      strategyDescription: "Comines Top 3 Quant Stratgies into a single diversified portfolio.",
      strategyType: "Growth",
      strategyRiskLevel: "High",
      hedged: "Yes",
      hedgeType: "Dynamic",
      marketUniverse: "Global",
      assetClassUniverse: "MultiAsset",
      rebalancingFrequency: "Monthly",
      lastRebalancingDate: "2025-05-30",
      nextRebalancingDate: "2025-06-31",
      strategyBenchmark: "All World Index",
      past1YReturns: "25.5%",
      past2YReturns: "40.1%",
      past3YReturns: "60.3%"
    };

    // const strategy2 = {
    //   strategyName: "Sustainable Energy Leaders",
    //   strategyCode: "SEL002",
    //   strategyDescription: "Invests in companies at the forefront of renewable energy and sustainable technologies.",
    //   strategyType: "ESG Growth",
    //   strategyRiskLevel: "Medium",
    //   hedged: "Yes",
    //   hedgeType: "Currency Hedge",
    //   marketUniverse: "Global Equities",
    //   assetClassUniverse: "Renewable Energy, Utilities",
    //   rebalancingFrequency: "Semi-Annually",
    //   lastRebalancingDate: "2024-11-15",
    //   nextRebalancingDate: "2025-05-15",
    //   strategyBenchmark: "S&P Global Clean Energy Index",
    //   past1YReturns: "18.2%",
    //   past2YReturns: "32.5%",
    //   past3YReturns: "50.0%"
    // };

    // const strategy3 = {
    //   strategyName: "Emerging Markets Dividend",
    //   strategyCode: "EMD003",
    //   strategyDescription: "Targets high-dividend paying companies in promising emerging markets.",
    //   strategyType: "Income",
    //   strategyRiskLevel: "Medium-High",
    //   hedged: "No",
    //   hedgeType: "N/A",
    //   marketUniverse: "Emerging Market Equities",
    //   assetClassUniverse: "Diversified Equities",
    //   rebalancingFrequency: "Annually",
    //   lastRebalancingDate: "2024-07-01",
    //   nextRebalancingDate: "2025-07-01",
    //   strategyBenchmark: "MSCI Emerging Markets Index",
    //   past1YReturns: "10.1%",
    //   past2YReturns: "15.8%",
    //   past3YReturns: "22.4%"
    // };

    // Use setDoc with a specific ID (e.g., strategyCode) for easier linking to details
    await strategiesRef.doc(strategy1.strategyCode).set(strategy1);
    // await strategiesRef.doc(strategy2.strategyCode).set(strategy2);
    // await strategiesRef.doc(strategy3.strategyCode).set(strategy3);
    console.log("Strategy Summary Data uploaded successfully!");

    // --- Strategy Specific Details Data (simulating dedicated Google Sheets per strategy) ---
    const strategyDetailsRef = db.collection(`artifacts/${appId}/public/data/strategyDetails`);
    console.log("Uploading Strategy Details Data...");

    // Details for QUANT1
    await strategyDetailsRef.doc(strategy1.strategyCode).set({
      latest_Month_Allocations: [
        { symbol: "GLD", allocation: 54.61 },
        { symbol: "VTIP", allocation: 31.97 },
        { symbol: "EWO", allocation: 9.32 },
        { symbol: "GREK", allocation: 2.66 },
        { symbol: "CXG", allocation: 1.33 },
      ],
      past_Month_Allocations: [
        { symbol: "GLD", allocation: 54.61 },
        { symbol: "VTIP", allocation: 31.97 },
        { symbol: "EWP", allocation: 9.32 },
        { symbol: "UAE", allocation: 2.66 },
        { symbol: "EWW", allocation: 1.33 },
      ],
      backtestingPerformance: [
        { backtestingDate: "2025-05-30", perf1Y: "17.7%", perf3Y: "37.9%", perf5Y: "158.2%" },
        // { backtestingDate: "2023-12-31", perf1Y: "18.5%", perf2Y: "28.0%", perf3Y: "48.1%" }
      ],
      // Live performance data would be dynamic and calculated by the frontend
      // or a backend service, not stored statically here.
    });

    // Details for SEL002
    // await strategyDetailsRef.doc(strategy2.strategyCode).set({
    //   latest_Month_Allocations: [
    //     { symbol: "ENPH", allocation: 25 },
    //     { symbol: "NEE", allocation: 20 },
    //     { symbol: "TSLA", allocation: 15 }, // Tesla for energy storage/EVs
    //     { symbol: "ORSTED.CO", allocation: 10 }, // Orsted A/S (Danish energy company)
    //     { symbol: "PLUG", allocation: 10 },
    //     { symbol: "BEP", allocation: 10 },
    //     { symbol: "SPWR", allocation: 10 }
    //   ],
    //   past_Month_Allocations: [
    //     { symbol: "ENPH", allocation: 20 },
    //     { symbol: "NEE", allocation: 18 },
    //     { symbol: "TSLA", allocation: 12 },
    //     { symbol: "ORSTED.CO", allocation: 8 },
    //     { symbol: "PLUG", allocation: 8 },
    //     { symbol: "BEP", allocation: 8 },
    //     { symbol: "SPWR", allocation: 8 },
    //     { symbol: "FSLR", allocation: 18 }
    //   ],
    //   backtestingPerformance: [
    //     { backtestingDate: "2024-12-31", perf1Y: "15.0%", perf3Y: "28.0%", perf5Y: "45.0%" },
    //   ],
    // });

    // // Details for EMD003
    // await strategyDetailsRef.doc(strategy3.strategyCode).set({
    //   latest_Month_Allocations: [
    //     { symbol: "BABA", allocation: 15 },
    //     { symbol: "TCEHY", allocation: 15 },
    //     { symbol: "JD", allocation: 10 },
    //     { symbol: "RELIANCE.NS", allocation: 10 }, // Reliance Industries (India)
    //     { symbol: "SBER.ME", allocation: 10 }, // Sberbank (Russia) - Example, consider market access
    //     { symbol: "PBR", allocation: 10 }, // Petrobras (Brazil)
    //     { symbol: "BIDU", allocation: 10 },
    //     { symbol: "INFY.NS", allocation: 10 }, // Infosys (India)
    //     { symbol: "VALE", allocation: 10 }
    //   ],
    //   past_Month_Allocations: [
    //     { symbol: "BABA", allocation: 12 },
    //     { symbol: "TCEHY", allocation: 12 },
    //     { symbol: "JD", allocation: 8 },
    //     { symbol: "RELIANCE.NS", allocation: 8 },
    //     { symbol: "SBER.ME", allocation: 8 },
    //     { symbol: "PBR", allocation: 8 },
    //     { symbol: "BIDU", allocation: 8 },
    //     { symbol: "INFY.NS", allocation: 8 },
    //     { symbol: "VALE", allocation: 8 },
    //     { symbol: "MTL.TO", allocation: 18 }
    //   ],
    //   backtestingPerformance: [
    //     { backtestingDate: "2024-12-31", perf1Y: "8.5%", perf3Y: "14.0%", perf5Y: "20.0%" },
    //   ],
    // });

    console.log("Strategy Details Data uploaded successfully!");
    console.log("Data upload complete!");
  } catch (error) {
    console.error("Error uploading data:", error);
  }
};

uploadData();