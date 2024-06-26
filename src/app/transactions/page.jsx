"use client";

import LinkedParticlesAnimation from "@/components/animations/LinkedParticlesAnimation";
import Link from "next/link";
import { useState } from "react";

const TransactionsPage = () => {
  const dummyTransactions = [
    {
      id: 1,
      token: "$FFC",
      amount: 0.0001,
      account: "0x1234567890",
      status: "Completed",
      type: "Mint",
    },
    {
      id: 2,
      token: "$FFC",
      amount: 0.0001,
      account: "0x1234567890",
      status: "Pending",
      type: "Burn",
    },
  ];

  const [transactionFilterDropdown, setTransactionFilterDropdown] =
    useState(false);
  const [transactionFilter, setTransactionFilter] =
    useState("All Transactions");
  const transactionFilterOptions = ["All Transactions", "Completed", "Pending"];
  const handleSelectTransactionFilter = (filter) => {
    setTransactionFilter(filter);
    setTransactionFilterDropdown(false);
  };

  const [dateFilterDropdown, setDateFilterDropdown] = useState(false);
  const [dateFilter, setDateFilter] = useState("All Dates");
  const dateFilterOptions = [
    "All Dates",
    "Last 24 hours",
    "Last 7 days",
    "Last 30 days",
  ];
  const handleSelectDateFilter = (filter) => {
    setDateFilter(filter);
    setDateFilterDropdown(false);
  };

  const [sortTransactionsDropdown, setSortTransactionsDropdown] =
    useState(false);
  const [sortTransactions, setSortTransactions] = useState("Low to High");
  const sortTransactionsOptions = ["Low to High", "High to Low"];
  const handleSelectSortTransactions = (sort) => {
    setSortTransactions(sort);
    setSortTransactionsDropdown(false);
  };
  return (
    <div className="flex flex-col gap-2 h-screen w-full max-w-7xl">
      <div className="rounded-xl bg-gray20/50 px-5 py-6 flex flex-col gap-3">
        <h1 className="text-3xl font-bold">Transaction History</h1>
        <span className="text-lg text-gray10">
          Transaction History only shows transactions from Native and
          Socketbridge.
        </span>
      </div>
      <div className="rounded-xl bg-gray20/50 px-5 py-6 flex flex-col gap-5">
        <h1 className="text-xl font-bold border-b-2 border-primary1 w-fit pb-2">
          All Transactions
        </h1>
        {/* FILTERS */}
        <div className="flex flex-col gap-5 md:flex-row md:items-center justify-between">
          <input
            type="search"
            name="searchTransactions"
            id="searchTransactions"
            className="bg-gray20/75 border-gray15 rounded-xl w-full md:w-[280px] py-2 px-3 focus:border-primary1 focus:outline-none focus:ring-transparent border"
            placeholder="Search Transaction ..."
          />
          <div className="flex flex-wrap justify-end gap-2">
            <div className="relative">
              <button
                className="bg-primary1/90 text-black text-sm hover:bg-primary1 pl-4 pr-3 py-2 rounded-full flex items-center"
                onClick={() =>
                  setTransactionFilterDropdown(!transactionFilterDropdown)
                }
              >
                {transactionFilter} <span>{chevronDown}</span>
              </button>
              {transactionFilterDropdown && (
                <div className="absolute top-12 py-3 px-1 bg-gray23 w-40 right-0 rounded-2xl flex flex-col z-50">
                  {transactionFilterOptions.map((filter, index) => (
                    <button
                      key={index}
                      onClick={() => handleSelectTransactionFilter(filter)}
                      className="flex items-center gap-2 text-sm py-2 hover:bg-gray24 rounded-xl px-2"
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="relative">
              <button
                className="bg-primary1/90 text-black text-sm hover:bg-primary1 pl-4 pr-3 py-2 rounded-full flex items-center"
                onClick={() => setDateFilterDropdown(!dateFilterDropdown)}
              >
                {dateFilter} <span>{chevronDown}</span>
              </button>
              {dateFilterDropdown && (
                <div className="absolute top-12 py-3 px-1 bg-gray23 w-40 right-0 rounded-2xl flex flex-col z-50">
                  {dateFilterOptions.map((filter, index) => (
                    <button
                      key={index}
                      onClick={() => handleSelectDateFilter(filter)}
                      className="flex items-center gap-2 text-sm py-2 hover:bg-gray24 rounded-xl px-2"
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="relative">
              <button
                className="bg-primary1/90 text-black text-sm hover:bg-primary1 pl-4 pr-3 py-2 rounded-full flex items-center"
                onClick={() =>
                  setSortTransactionsDropdown(!sortTransactionsDropdown)
                }
              >
                {sortTransactions} <span>{chevronDown}</span>
              </button>
              {sortTransactionsDropdown && (
                <div className="absolute top-12 py-3 px-1 bg-gray23 w-40 right-0 rounded-2xl flex flex-col z-50">
                  {sortTransactionsOptions.map((filter, index) => (
                    <button
                      key={index}
                      onClick={() => handleSelectSortTransactions(filter)}
                      className="flex items-center gap-2 text-sm py-2 hover:bg-gray24 rounded-xl px-2"
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Transactions */}
        <div className="flex items-center justify-center">
          {dummyTransactions.length > 0 ? (
            <>
              <div class="relative overflow-x-auto w-full">
                <table class="w-full text-sm text-left rtl:text-right">
                  <thead class="text-xs text-gray10 uppercase bg-gray24/75">
                    <tr>
                      <th scope="col" class="px-6 py-3">
                        Token
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Amount
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Account
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Status
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Type
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {dummyTransactions.map((transaction) => (
                      <tr class="bg-gray22 border-b border-gray18">
                        <th
                          scope="row"
                          class="px-6 py-4 font-medium whitespace-nowrap"
                        >
                          {transaction.token}
                        </th>
                        <td class="px-6 py-4">
                          {transaction.amount.toFixed(4)}
                        </td>
                        <td class="px-6 py-4">
                          {transaction.account.slice(0, 6)}...
                          {transaction.account.slice(-4)}
                        </td>
                        <td class="px-6 py-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-bold ${
                              transaction.status === "Completed"
                                ? "bg-green-500/75"
                                : "bg-red-600/75"
                            }`}
                          >
                            {transaction.status}
                          </span>
                        </td>
                        <td class="px-6 py-4">{transaction.type}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="max-w-sm bg-gray20/75 w-full flex flex-col items-center gap-3 px-5 py-6 rounded-2xl">
              <div className="w-full">
                There are no pending transactions. Make a transaction in 1
                click.
              </div>
              <Link
                href="/bridge"
                className="text-sm rounded-full font-bold bg-primary1 px-3 py-2 text-black"
              >
                Bridge Token in 1 Click
              </Link>
            </div>
          )}
        </div>
        <div className="flex items-center justify-center text-sm mt-5">
          If you don't see any success pending or failed transaction, please
          &nbsp;
          <span className="text-primary1 hover:underline">contact support</span>
          .
        </div>
      </div>
    </div>
  );
};

const chevronDown = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 9.99997L12 14L16 9.99997"
      stroke="black"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default TransactionsPage;
