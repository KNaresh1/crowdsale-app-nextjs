'use client';

import { Contract, ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import Info from './components/Info';
import { useEffect, useState } from 'react';

import TOKEN_ABI from './abis/Token.json'
import CROWDSALE_ABI from './abis/Crowdsale.json'

import config from './config.json'
import Spinner from './components/Spinner';
import Progress from './components/Progress';
import BuyTokens from './components/BuyTokens';
import { formatUnits } from './utils';

export default function Home() {

  const [isLoading, setLoading] = useState<boolean>(true);
  const [crowdsale, setCrowdsale] = useState<Contract>();
  const [price, setPrice] = useState<string>('0.0');
  const [maxTokens, setMaxTokens] = useState<string>('0.0');
  const [tokensSold, setTokensSold] = useState<string>('0.0');
  const [accountBalance, setAccountBalance] = useState<string>('0.0');

  const { connector, hooks, provider } = useWeb3React();
  const { useSelectedAccount } = hooks;
  const account = useSelectedAccount(connector);

  useEffect(() => {
    if (isLoading) {
      connectWallet();
    }
  }, [isLoading]);

  const connectWallet = async () => {
    const chainId = process.env.SUPPORT_CHAIN_ID || "31337";
    try {
      await connector.activate(chainId);

      const token = new ethers.Contract(config["31337"].token.address, TOKEN_ABI, provider);

      const crowdsale = new ethers.Contract(config["31337"].crowdsale.address, CROWDSALE_ABI, provider);
      setCrowdsale(crowdsale);

      // const accountBalance = formatUnits(await token.balanceOf(account));
      // setAccountBalance(accountBalance);

      //const price = formatUnits(await crowdsale.price());
      // setPrice(price);

      // const maxTokens = formatUnits(await crowdsale.maxTokens());
      // setMaxTokens(maxTokens);

      // const tokensSold = formatUnits(await crowdsale.tokensSold());
      // setTokensSold(tokensSold);

      setLoading(false);

    } catch (error) {
      setLoading(true);
      console.log("User rejected the request", error);
    }
  }

  return (
    <div>
      <div className='text-center py-5 space-y-4 border-b-2'>
        <p className='text-4xl mb-2'>Introducing DApp Token!</p>
        {isLoading
          ? (<Spinner />)
          : (
            <div >
              <p><strong>Current Price: </strong>{price} ETH</p>
              <BuyTokens provider={provider} crowdsale={crowdsale} price={price} setLoading={setLoading} />
              <Progress tokensSold={tokensSold} maxTokens={maxTokens} />
            </div>
          )
        }
      </div>
      {
        account &&
        <Info accountNumber={account} balance={accountBalance} />
      }
    </div>
  )
}
