'use client';

import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import Spinner from './components/Spinner';
import { Button } from '@radix-ui/themes';
import Crowdsale from './Crowdsale';

export default function Home() {

  const [isLoading, setLoading] = useState(false);
  const { connector, hooks } = useWeb3React();
  const { useSelectedAccount } = hooks;
  const account = useSelectedAccount(connector);

  useEffect(() => {
    if (isLoading) {
      connectWallet();
    }
  }, [isLoading]);

  const connectWallet = async () => {
    const chainId = process.env.SUPPORT_CHAIN_ID;
    try {

      await connector.activate(chainId);
      setLoading(false);

    } catch (error) {
      setLoading(false);
      console.log("Failed to connect to wallet or User rejected", error);
    }
  }

  return (
    <div>
      <div className='text-center py-5 space-y-4'>

        <p className='text-4xl mb-2'>Introducing DApp Token!</p>

        {isLoading && (<Spinner />)}

        {!isLoading && !account && (<Button disabled={!!account} className='space-y-8' onClick={() => setLoading(true)}>Connect To Wallet</Button>)}

      </div>

      {!isLoading && account && (<Crowdsale account={account} setLoading={setLoading} />)}

    </div>
  )
}
