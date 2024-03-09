"use client";

import React, { ReactNode } from "react";
import { wagmiConfig, projectId } from "@/blockchain/config";

import { createWeb3Modal,useWeb3Modal } from "@web3modal/wagmi/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { State, WagmiProvider } from "wagmi";

// Setup queryClient
const queryClient = new QueryClient();

if (!projectId) throw new Error("Project ID is not defined");

// Create modal
export const web3ModalCreate = createWeb3Modal({
  wagmiConfig: wagmiConfig,
  projectId,
  themeVariables: {
    "--w3m-color-mix": "#151517",
    // "--w3m-color-mix-strength": 40,
    "--w3m-accent":"#CBFB45",
  },
});
export function Web3Modal({ children, initialState }) {
  
  return (
    <WagmiProvider config={wagmiConfig} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}
      <div>
        </div></QueryClientProvider>
    </WagmiProvider>
  );
}
