import { createSlice } from "@reduxjs/toolkit";

const proposalsSlice = createSlice({
  name: "proposals",
  initialState: {
    list: [
      {
        title: "Liquidity Mining Program Implementation",
        desc: "Propose the implementation of a liquidity mining program on our DEX platform. This program would incentivize users to provide liquidity to select trading pairs by distributing a portion of trading fees as rewards to liquidity providers. By implementing this program, we aim to enhance liquidity depth and trading volume on our platform, ultimately improving the overall trading experience for users.",
        endDate: "12 April, 2024",
        status: "Pending",
      },
      {
        title: "Introduction of Limit Order Functionality",
        desc: "Propose the introduction of limit order functionality on our DEX platform. This feature would enable users to set buy or sell orders at specific prices, allowing for more advanced trading strategies and greater control over trade execution. By introducing limit orders, we aim to cater to the needs of experienced traders and enhance the versatility of our platform.",
        endDate: "01 April, 2024",
        status: "Executed",
      },
      {
        title: "Governance Token Integration Proposal",
        desc: "Propose the implementation of a liquidity mining program on our DEX platform. This program would incentivize users to provide liquidity to select trading pairs by distributing a portion of trading fees as rewards to liquidity providers. By implementing this program, we aim to enhance liquidity depth and trading volume on our platform, ultimately improving the overall trading experience for users.",
        endDate: "19 January, 2024",
        status: "Pending",
      },
      {
        title: "Cross-Chain Trading Support Initiative",
        desc: "Propose the implementation of cross-chain trading support on our DEX platform. This feature would enable users to trade assets across multiple blockchains seamlessly, expanding the range of tradable assets and providing greater flexibility to traders. By supporting cross-chain trading, we aim to position our platform as a hub for decentralized asset exchange and facilitate interoperability between different blockchain ecosystems.",
        endDate: "21 February, 2024",
        status: "Executed",
      },
      {
        title: "User Interface Enhancement Proposal",
        desc: "Propose enhancements to the user interface of our DEX app to improve usability and user experience. This proposal could include suggestions for streamlining the trading process, optimizing layout and navigation, or introducing new features to enhance accessibility and functionality. By prioritizing user interface enhancements, we aim to create a more intuitive and engaging trading environment for our users, ultimately driving user adoption and retention.",
        endDate: "30 March, 2024",
        status: "Pending",
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
