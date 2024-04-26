"use client";

import { formatCurrency, formatNumber } from "@/lib/formatter";
import { useGetCoinsQuery } from "@/libs/services/coins";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
const TokensTable = async () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const response = await axios.get("/api/tokens");
  const isLoading = false;

  const data = await response.data;
  console.log("DATA", response);
  function convertToInternationalCurrencySystem(labelValue) {
    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e9
      ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) + "B"
      : // Six Zeroes for Millions
      Math.abs(Number(labelValue)) >= 1.0e6
      ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(2) + "M"
      : // Three Zeroes for Thousands
      Math.abs(Number(labelValue)) >= 1.0e3
      ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(2) + "K"
      : Math.abs(Number(labelValue));
  }
  const handleRowClick = (coin) => {
    // Navigate to the dynamic route with query parameters
    console.log(coin);
    router.push(`/tokens/${coin.symbol}`);
    dispatch(SetCoin(coin));
  };

  return (
    <table className="w-full my-10 text-left rtl:text-right dark:text-gray-400">
      <thead className="h-[58px] bg-[#1E1E1F] text-white">
        <tr>
          <th scope="col" className="px-6 py-3 font-neue-machina-bold">
            #
          </th>
          <th scope="col" className="px-6 py-3 font-neue-machina-bold">
            Token Name
          </th>
          <th scope="col" className="px-6 py-3 font-neue-machina-bold">
            Price
          </th>
          <th scope="col" className="px-6 py-3 font-neue-machina-bold">
            1 hour
          </th>
          <th scope="col" className="px-6 py-3 font-neue-machina-bold">
            1 day
          </th>
          <th scope="col" className="px-6 py-3 font-neue-machina-bold">
            FDV
          </th>
          <th scope="col" className="px-6 py-3 font-neue-machina-bold">
            Chart
          </th>
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          <tr>
            <td>Loading</td>
          </tr>
        ) : (
          data.map((coin, index) => (
            <tr
              className="h-[58px] even:bg-[#1E1E1F] cursor-pointer"
              onClick={() => handleRowClick(coin)}
            >
              <th
                scope="row"
                className="whitespace-nowrap px-6 py-4 font-medium text-neutralLight"
              >
                {index + 1}
              </th>
              <td className="flex items-center gap-x-3.5 px-6 py-4 text-neutralLight">
                <img
                  src={coin.logoUrl}
                  alt={coin.name}
                  width={36}
                  height={36}
                  className="rounded-full"
                />
                <p className="text-white">
                  {coin.name}{" "}
                  <span className="uppercase text-neutralLight">
                    {coin.symbol}
                  </span>
                </p>
              </td>
              <td className="px-6 py-4 text-neutralLight">
                {formatCurrency(coin.quote.USD.price)}
              </td>
              <td className="px-6 text-white">
                <div className="flex items-center gap-x-1">
                  {coin.quote.USD.percent_change_1h > 0 ? arrowUp : arrowDown}
                  <span>{formatNumber(coin.quote.USD.percent_change_1h)}%</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-x-1">
                  {coin.quote.USD.percent_change_24h > 0 ? arrowUp : arrowDown}
                  <span>
                    {formatNumber(coin.quote.USD.percent_change_24h)}%
                  </span>
                </div>
              </td>
              <td className="px-6 py-4">
                {formatCurrency(coin.quote.USD.fully_diluted_market_cap)}
              </td>
              <td className="px-6 py-4">
                <Image
                  src={
                    coin.quote.USD.percent_change_24h > 0
                      ? "/tokens/yellow-chart.svg"
                      : "/tokens/red-chart.svg"
                  }
                  alt={coin.id}
                  width={67}
                  height={20}
                />
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

const arrowDown = (
  <svg
    width="6"
    height="12"
    viewBox="0 0 6 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 12L5.88675 7H0.113249L3 12ZM2.5 0L2.5 7.5H3.5L3.5 0L2.5 0Z"
      fill="#FF4500"
    />
  </svg>
);

const arrowUp = (
  <svg
    width="6"
    height="12"
    viewBox="0 0 6 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 0L0.113249 5H5.88675L3 0ZM3.5 12L3.5 4.5H2.5L2.5 12H3.5Z"
      fill="#CBFB45"
    />
  </svg>
);

export default TokensTable;

// <div className="text-white p-5 flex flex-col gap-5 max-w-full overflow-x-auto">
//   <h1 className="text-2xl">Tokens</h1>
//   <table class="table-fixed">
//     <thead>
//       <tr>
//         <th>#</th>
//         <th>Token Name</th>
//         <th>Price</th>
//         <th>1 hour</th>
//         <th>1 day</th>
//         <th>FDV</th>
//         <th>Volume</th>
//       </tr>
//     </thead>
//     <tbody>
//       <tr>
//         <td>1</td>
//         <td>
//           Ethereum <span className="text-gray17">ETH</span>
//         </td>
//         <td>$3506.12</td>
//         <td>0.00%</td>
//         <td>0.10%</td>
//         <td>$10.7B</td>
//         <td>$48.8M</td>
//         <td>Graph</td>
//       </tr>
//     </tbody>
//   </table>
// </div>
