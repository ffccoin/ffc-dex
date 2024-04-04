import React, { useEffect } from "react";
import { useState } from "react";
import { DataTable } from "@/components/Table/data-table";
import { columns } from "@/components/Table/column";
import { useAccount } from "wagmi";
import axios from "axios";
import tokenList from "@/lists/allToken.json";
import { formatUnits } from "ethers";

export default function LimitOrders({ networkId }) {
  const [tableData, setTableData] = useState([]);
  const { address, isConnected } = useAccount();
  function getLogoURI(address) {
    for (const token of tokenList) {
      if (token.address.toLowerCase() == address.toLowerCase()) {
        return token;
      }
    }
    return tokenList[0]
  }
  async function fetchData() {
    if (isConnected) {
      try {
        const response = await axios.post("/api/getOrders", {
          address: address,
        });
        console.log("RESPONSE", response);
        console.log("RESPONSE", response.data);

        const structuredData = response.data.map((item) => {
          const takerAssetAddress = getLogoURI(item.data.takerAsset);
          const takerAssetAmount = formatUnits(
            item.data.takingAmount,
            takerAssetAddress.decimals
          );
          const makerAssetAddress = getLogoURI(item.data.makerAsset);
          const makerAssetAmount = formatUnits(
            item.data.makingAmount,
            makerAssetAddress.decimals
          );

          const integer = BigInt(Math.floor(parseFloat(item.makerRate)));
          const decimal =takerAssetAddress.decimals-makerAssetAddress.decimals
         console.log(decimal)
          const makerRates =  formatUnits(
            integer,
            decimal
          );
        //   const integer2 = BigInt(Math.floor(parseFloat(item.takerRate)));
        //   const takerRate =  formatUnits(
        //     integer,
        //     takerAssetAddress.decimals
        //   );
        //   console.log( makerRates/takerRate)
        //   console.log( takerRate/makerRates)
          return {
            createdAt: item.createDateTime,
            makerAsset: {
              logoURI: makerAssetAddress.logoURI,
              symbol: makerAssetAddress.symbol,
              amount: makerAssetAmount, // Assuming this is the address of the taker asset
            },
            takerAsset: {
              logoURI: takerAssetAddress.logoURI,
              symbol: takerAssetAddress.symbol,
              amount: takerAssetAmount, // Assuming this is the address of the taker asset
            },
            orderRates:makerRates
          };
        });

        console.log("Structured Data:", structuredData);
        setTableData(structuredData);
      } catch (err) {
        console.log(err);
      }
    }
  }
  useEffect(() => {
    if (tableData.length == 0) {
      fetchData();
    }
  }, [[address, isConnected]]);

  const [selectedOption, setSelectedOption] = useState("ActiveOrders");
  return (
    <div className=" md:p-5 px-4 ">
      <div className="flex justify-between border-b border-[#2b3144] pb-4">
        <div className="text-gray12">Limit orders</div>
        <div className="bg-[#23272f]    sm:max-w-60  rounded-md ">
          <button
            className={`time-option-btn ${
              selectedOption === "ActiveOrders" && "active"
            } px-3 py-2  text-xs rounded-md `}
            onClick={() => setSelectedOption("ActiveOrders")}
            style={{
              backgroundColor:
                selectedOption === "ActiveOrders" ? "#333b47" : "transparent",
            }}
          >
            Active Orders
          </button>
          <button
            className={`time-option-btn ${
              selectedOption === "OrdersHistory" && "active"
            } px-3 py-2  text-xs rounded-md`}
            onClick={() => setSelectedOption("OrdersHistory")}
            style={{
              backgroundColor:
                selectedOption === "OrdersHistory" ? "#333b47" : "transparent",
            }}
          >
            Orders History
          </button>
        </div>
      </div>
      <div>
        <div className="flex h-full min-h-screen overflow-auto w-full flex-col">
          <DataTable columns={columns} data={tableData} />
        </div>

        {/* <table className="w-full my-10 text-left rtl:text-right dark:text-gray-400">
      <thead className="h-[58px] bg-[#1E1E1F] text-white">
        <tr>
          <th scope="col" className="px-6 py-3 font-neue-machina-bold">
            #
          </th>
          <th scope="col" className="px-6 py-3 font-neue-machina-bold">
            Name
          </th>
          <th scope="col" className="px-6 py-3 font-neue-machina-bold">
            Last Price
          </th>
          <th scope="col" className="px-6 py-3 font-neue-machina-bold">
            24th Change
          </th>
          <th scope="col" className="px-6 py-3 font-neue-machina-bold">
            Chart
          </th>
          <th scope="col" className="px-6 py-3 font-neue-machina-bold">
            Market Cap
          </th>
          <th scope="col" className="px-6 py-3 font-neue-machina-bold">
            Trade
          </th>
        </tr>
      </thead>
      <tbody>
      <td>hi</td>
      <td>hi</td>
      <td>hi</td>
      <td>hi</td>
      <td>hi</td>
      <td>hi</td>
      </tbody>
    </table> */}
      </div>
    </div>
  );
}
