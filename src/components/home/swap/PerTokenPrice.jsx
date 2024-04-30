import { useEffect, useState } from "react";
import qs from "qs";
const PerTokenPrice = ({ tokenOne, tokenTwo, slippage, apiUrl }) => {
  const [tokenOnePerTokenTwo, setTokenOnePerTokenTwo] = useState(null);

  async function getTokenOnePerTokenTwo() {
    if (tokenOne && tokenTwo) {
      const amount = parseFloat(1 * Math.pow(10, tokenOne.decimals));
      const params = {
        sellToken: tokenOne.address,
        buyToken: tokenTwo.address,
        sellAmount: amount,
        slippagePercentage: slippage,
      };

      const headers = {
        "0x-api-key": process.env.NEXT_PUBLIC_0X_API_KEY,
      };

      try {
        const response = await fetch(`${apiUrl}?${qs.stringify(params)}`, {
          headers,
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch price: ${response.status}`);
        }
        const swapPriceJSON = await response.json();
        setTokenOnePerTokenTwo(
          swapPriceJSON.buyAmount / 10 ** tokenTwo.decimals
        );
      } catch (error) {
        console.error("Error fetching price:", error);
      }
    }
  }

  useEffect(() => {
    if (tokenOne && tokenTwo) {
      getTokenOnePerTokenTwo();
    }
  }, [tokenOne, tokenTwo]);

  return (
    tokenOnePerTokenTwo && (
      <div className="flex items-center w-full justify-between pb-1 px-2 text-sm">
        <span>Price</span>
        <span>
          {tokenOnePerTokenTwo.toFixed(6)} {tokenOne.symbol} per{" "}
          {tokenTwo.symbol}
        </span>
      </div>
    )
  );
};

export default PerTokenPrice;
