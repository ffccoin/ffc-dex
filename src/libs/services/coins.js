// Need to use the React-specific entry point to import createApi
import { tokenList1 } from "@/lists/tokenList1";
import { tokenList56 } from "@/lists/tokenList56";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
const url = new URL("https://api.coingecko.com/api/v3/coins/markets");
const combinedTokens = tokenList1.concat(tokenList56);
const list = combinedTokens
  .map((token) => token.symbol.toLowerCase().split(" ").join("-"))
  .join(",");
console.log("list", list);
const params = {
  ids: "rndr,lit,sand,jasmy,lrc,xyo,stg,pha,root,agrs,hft,trac,ondo,arb,wbeth,uncx,high,vxv,floki,stos,eurc,caps,rbx,exrd,volt,agix,chz,mana,bst,lss,push,cube,zusd,bst,frm,fox,num,walv,axl,antv1,pond,mask_ntwrk,arkm,ant,usdc,link,usdt,gusd,dai,weth,wbtc,matic,uni,crv,mkr,shib,aave,inj,cake,sol,uni,link,usdc,zseed,dai,ava,floki,gmt,wbeth,gold,nftd,num,baby,polc,bake,minu,doge,banana,gold,ftm,nftd,swap,bch,dao,mdx,sushiba,gafi,ftm,usdt,wbnb,busd,eth,btcb,auto,beth,etc",
  vs_currency: "usd", // Specify the currency
};
url.search = new URLSearchParams(params).toString();

export const coinsApi = createApi({
  reducerPath: "coinsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: url.toString(),
  }),
  endpoints: (builder) => ({
    getCoins: builder.query({
      query: () => "",
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCoinsQuery } = coinsApi;
