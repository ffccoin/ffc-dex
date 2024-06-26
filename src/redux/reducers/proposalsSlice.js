import { createSlice } from "@reduxjs/toolkit";

const proposalsSlice = createSlice({
  name: "proposals",
  initialState: {
    list: [
      {
        id: 1,
        title: "Liquidity Mining Program Implementation",
        desc: "Propose the implementation of a liquidity mining program on our DEX platform. This program would incentivize users to provide liquidity to select trading pairs by distributing a portion of trading fees as rewards to liquidity providers. By implementing this program, we aim to enhance liquidity depth and trading volume on our platform, ultimately improving the overall trading experience for users.",
        startDate: "01 January, 2024",
        endDate: "12 April, 2024",
        status: "Pending",
        liquidity: "More stable prices and reduced volatility.",
        exposure: "Broader audience reach.",
        credibility: "Trust from reputable exchanges.",
        accesibility:
          "Easier trading for users. Target Exchanges Xt.com, bitmart.com, bybit.com, gate.io, huobi. Listing Process",
        application: "Submit necessary documentation. Due",
        dilligence: "Review and approval process. Listing",
        fees: "Listing costs for each exchange.",
        marketing:
          "Coordinated promotional campaigns. Technical Integration Wallet support and API integration. Timeline Detailed timeline from application to listing. Budget Estimated costs for application, listing, and marketing. Risk Assessment Identify risks and mitigation strategies. Conclusion Listing on centralized exchanges will boost Creed Coin’s liquidity, exposure, and credibility. Support from stakeholders is essential. Call to Action We seek approval and resources from stakeholders to proceed with the listing initiative.",
      },
      {
        id: 2,
        title: "Introduction of Limit Order Functionality",
        desc: "Propose the introduction of limit order functionality on our DEX platform. This feature would enable users to set buy or sell orders at specific prices, allowing for more advanced trading strategies and greater control over trade execution. By introducing limit orders, we aim to cater to the needs of experienced traders and enhance the versatility of our platform.",
        startDate: "01 January, 2024",
        endDate: "01 April, 2024",
        status: "Executed",
        liquidity: "More stable prices and reduced volatility.",
        exposure: "Broader audience reach.",
        credibility: "Trust from reputable exchanges.",
        accesibility:
          "Easier trading for users. Target Exchanges Xt.com, bitmart.com, bybit.com, gate.io, huobi. Listing Process",
        application: "Submit necessary documentation. Due",
        dilligence: "Review and approval process. Listing",
        fees: "Listing costs for each exchange.",
        marketing:
          "Coordinated promotional campaigns. Technical Integration Wallet support and API integration. Timeline Detailed timeline from application to listing. Budget Estimated costs for application, listing, and marketing. Risk Assessment Identify risks and mitigation strategies. Conclusion Listing on centralized exchanges will boost Creed Coin’s liquidity, exposure, and credibility. Support from stakeholders is essential. Call to Action We seek approval and resources from stakeholders to proceed with the listing initiative.",
      },
      {
        id: 3,
        title: "Governance Token Integration Proposal",
        desc: "Propose the implementation of a liquidity mining program on our DEX platform. This program would incentivize users to provide liquidity to select trading pairs by distributing a portion of trading fees as rewards to liquidity providers. By implementing this program, we aim to enhance liquidity depth and trading volume on our platform, ultimately improving the overall trading experience for users.",
        startDate: "01 January, 2024",
        endDate: "19 January, 2024",
        status: "Pending",
        liquidity: "More stable prices and reduced volatility.",
        exposure: "Broader audience reach.",
        credibility: "Trust from reputable exchanges.",
        accesibility:
          "Easier trading for users. Target Exchanges Xt.com, bitmart.com, bybit.com, gate.io, huobi. Listing Process",
        application: "Submit necessary documentation. Due",
        dilligence: "Review and approval process. Listing",
        fees: "Listing costs for each exchange.",
        marketing:
          "Coordinated promotional campaigns. Technical Integration Wallet support and API integration. Timeline Detailed timeline from application to listing. Budget Estimated costs for application, listing, and marketing. Risk Assessment Identify risks and mitigation strategies. Conclusion Listing on centralized exchanges will boost Creed Coin’s liquidity, exposure, and credibility. Support from stakeholders is essential. Call to Action We seek approval and resources from stakeholders to proceed with the listing initiative.",
      },
      {
        id: 4,
        title: "Cross-Chain Trading Support Initiative",
        desc: "Propose the implementation of cross-chain trading support on our DEX platform. This feature would enable users to trade assets across multiple blockchains seamlessly, expanding the range of tradable assets and providing greater flexibility to traders. By supporting cross-chain trading, we aim to position our platform as a hub for decentralized asset exchange and facilitate interoperability between different blockchain ecosystems.",
        startDate: "01 January, 2024",
        endDate: "21 February, 2024",
        status: "Executed",
        liquidity: "More stable prices and reduced volatility.",
        exposure: "Broader audience reach.",
        credibility: "Trust from reputable exchanges.",
        accesibility:
          "Easier trading for users. Target Exchanges Xt.com, bitmart.com, bybit.com, gate.io, huobi. Listing Process",
        application: "Submit necessary documentation. Due",
        dilligence: "Review and approval process. Listing",
        fees: "Listing costs for each exchange.",
        marketing:
          "Coordinated promotional campaigns. Technical Integration Wallet support and API integration. Timeline Detailed timeline from application to listing. Budget Estimated costs for application, listing, and marketing. Risk Assessment Identify risks and mitigation strategies. Conclusion Listing on centralized exchanges will boost Creed Coin’s liquidity, exposure, and credibility. Support from stakeholders is essential. Call to Action We seek approval and resources from stakeholders to proceed with the listing initiative.",
      },
      {
        id: 5,
        title: "User Interface Enhancement Proposal",
        desc: "Propose enhancements to the user interface of our DEX app to improve usability and user experience. This proposal could include suggestions for streamlining the trading process, optimizing layout and navigation, or introducing new features to enhance accessibility and functionality. By prioritizing user interface enhancements, we aim to create a more intuitive and engaging trading environment for our users, ultimately driving user adoption and retention.",
        startDate: "01 January, 2024",
        endDate: "30 March, 2024",
        status: "Pending",
        liquidity: "More stable prices and reduced volatility.",
        exposure: "Broader audience reach.",
        credibility: "Trust from reputable exchanges.",
        accesibility:
          "Easier trading for users. Target Exchanges Xt.com, bitmart.com, bybit.com, gate.io, huobi. Listing Process",
        application: "Submit necessary documentation. Due",
        dilligence: "Review and approval process. Listing",
        fees: "Listing costs for each exchange.",
        marketing:
          "Coordinated promotional campaigns. Technical Integration Wallet support and API integration. Timeline Detailed timeline from application to listing. Budget Estimated costs for application, listing, and marketing. Risk Assessment Identify risks and mitigation strategies. Conclusion Listing on centralized exchanges will boost Creed Coin’s liquidity, exposure, and credibility. Support from stakeholders is essential. Call to Action We seek approval and resources from stakeholders to proceed with the listing initiative.",
      },
    ],
  },
  reducers: {
    addProposal: (state, action) => {
      state.list.push(action.payload);
    },
  },
});

export const { addProposal } = proposalsSlice.actions;
export default proposalsSlice.reducer;
