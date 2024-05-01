import { formatCurrency, formatNumber } from "@/lib/formatter";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import TableSearch from "./TableSearch";

const getData = async () => {
  const apiKey = process.env.NEXT_PUBLIC_COIN_MARKET_CAP_API_KEY;
  const baseUrl = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=100`;
  const headers = {
    "X-CMC_PRO_API_KEY": apiKey,
  };
  try {
    const response = await axios.get(baseUrl, { headers });
    const data = response.data.data;
    const detailedTokenData = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/info",
      {
        params: {
          id: data.map((token) => token.id).join(","), // Comma-separated list of token IDs
        },
        headers,
      }
    );

    const detailedDataMap = detailedTokenData.data.data;

    // Append logo URLs to existing data
    const updatedData = data.map((token) => ({
      ...token,
      logoUrl: detailedDataMap[token.id]?.logo,
    }));
    return updatedData;
  } catch (err) {
    return [];
  }
};

const TokensTable = async ({ query }) => {
  const data = await getData();
  console.log("DATA", data);
  const fetchFilteredData = () => {
    if (query) {
      return data.filter((coin) =>
        coin.name.toLowerCase().includes(query.toLowerCase())
      );
    }
    return data;
  };
  const filteredData = fetchFilteredData();
  return (
    <div className="flex flex-col px-10 my-5 gap-y-5">
      <div className="flex justify-between">
        <span className="text-2xl font-medium">Tokens</span>
        <div className="flex gap-x-3 items-center">
          <TableSearch />
          <w3m-network-button />
        </div>
      </div>
      <div className="max-w-screen overflow-auto h-screen">
        <table className="w-full max-w-full overflow-auto my-10 text-left rtl:text-right dark:text-gray-400">
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
            {filteredData?.map((coin, index) => (
              <tr className="h-[58px] even:bg-[#1E1E1F] cursor-pointer">
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-neutralLight"
                >
                  {index + 1}
                </th>
                <td>
                  <Link
                    className="flex items-center gap-x-3.5 px-6 py-4 text-neutralLight"
                    href={`/tokens/${coin.id}`}
                  >
                    <img
                      src={coin.logoUrl}
                      alt={coin.name}
                      width={36}
                      height={36}
                      className="rounded-full"
                    />
                    <p className="text-white">
                      {coin.name}
                      <span className="ml-1 uppercase text-neutralLight">
                        {coin.symbol}
                      </span>
                    </p>
                  </Link>
                </td>
                <td className="px-6 py-4 text-neutralLight">
                  {formatCurrency(coin.quote.USD.price)}
                </td>
                <td className="px-6 text-white">
                  <div className="flex items-center gap-x-1">
                    {coin.quote.USD.percent_change_1h > 0 ? arrowUp : arrowDown}
                    <span>
                      {formatNumber(coin.quote.USD.percent_change_1h)}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-x-1">
                    {coin.quote.USD.percent_change_24h > 0
                      ? arrowUp
                      : arrowDown}
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
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
