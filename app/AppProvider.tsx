'use client';

import { Web3ReactProvider } from '@web3-react/core';
import { connectors } from './connectors';

export default function AppProvider({ children }: {
    children: React.ReactNode
}) {
    return (
        <Web3ReactProvider connectors={connectors}>
            {children}
        </Web3ReactProvider>
    );
}