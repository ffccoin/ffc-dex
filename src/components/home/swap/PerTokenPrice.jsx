import { useEffect, useState } from "react";
import qs from "qs";
const PerTokenPrice = ({ tokenOne, tokenTwo, slippage, apiUrl }) => {
  const [tokenOnePerTokenTwo, setTokenOnePerTokenTwo] = useState(null);

  async function getTokenOnePerTokenTwo() {
    if (tokenOne && tokenTwo) {
      console.log("HERE");
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
  console.log("TokenOnePerTokenTwo", tokenOnePerTokenTwo);

  useEffect(() => {
    if (tokenOne && tokenTwo) {
      getTokenOnePerTokenTwo();
    }
  }, [tokenOne, tokenTwo]);

  return (
    tokenOne &&
    tokenTwo &&
    tokenOnePerTokenTwo && (
      <div className="flex items-center w-full justify-between p-3 text-sm">
        <span>Price</span>
        <span>
          {tokenOnePerTokenTwo} {tokenOne.symbol} per {tokenTwo.symbol}
        </span>
      </div>
    )
  );
};

export default PerTokenPrice;
