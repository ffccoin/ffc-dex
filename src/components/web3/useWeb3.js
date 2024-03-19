"use client"
import { useMemo } from 'react';
import { useClient, useConnectorClient } from 'wagmi';
import {Web3} from 'web3'

export function clientToWeb3js(client) {
    if (!client) {
        return new Web3();
    }

    const { transport } = client;

    if (transport.type === 'fallback') {
        return new Web3(transport.transports[0].value.url);
    }
    return new Web3(transport);
}

/** Action to convert a viem Client to a web3.js Instance. */
export function useWeb3js({ chainId }) {
    const client = useClient({ chainId });
    return useMemo(() => clientToWeb3js(client), [client]);
}

/** Action to convert a viem ConnectorClient to a web3.js Instance. */
export function useWeb3jsSigner({ chainId }) {
    const { data } = useConnectorClient({ chainId });
    return  clientToWeb3js(data);
}
