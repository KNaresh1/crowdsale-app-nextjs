import { useWeb3React } from '@web3-react/core';
import { Contract } from 'ethers';
import { useEffect, useState } from 'react';
import CROWDSALE_ABI from './abis/Crowdsale.json';
import TOKEN_ABI from './abis/Token.json';
import BuyTokens from './components/BuyTokens';
import Info from './components/Info';
import Progress from './components/Progress';
import config from './config.json';
import { formatUnits } from './utils';

interface CrowdsaleProps {
  account: string | undefined;
  setLoading: (isLoading: boolean) => void;
}

const Crowdsale = ({ account, setLoading }: CrowdsaleProps) => {

  const [crowdsale, setCrowdsale] = useState<Contract>();
  const [price, setPrice] = useState<number>(0);
  const [maxTokens, setMaxTokens] = useState<number>(0);
  const [tokensSold, setTokensSold] = useState<number>(0);
  const [accountBalance, setAccountBalance] = useState<number>(0);

  const { provider } = useWeb3React();

  useEffect(() => {
    loadContract();
  }, [account]);

  const loadContract = async () => {
    const chainId = process.env.SUPPORT_CHAIN_ID;

    try {

      const token = new Contract(config["31337"].token.address, TOKEN_ABI, provider);

      const crowdsale = new Contract(config["31337"].crowdsale.address, CROWDSALE_ABI, provider);
      setCrowdsale(crowdsale);

      const accountBalance = formatUnits(await token.balanceOf(account));
      setAccountBalance(Number(accountBalance));

      const price = formatUnits(await crowdsale.price());
      setPrice(Number(price));

      const maxTokens = formatUnits(await crowdsale.maxTokens());
      setMaxTokens(Number(maxTokens));

      const tokensSold = formatUnits(await crowdsale.tokensSold());
      setTokensSold(Number(tokensSold));

    } catch (error) {
      console.log('Error while loading crowdsale, Error: ', error)
    }
  }

  const setLoadingStatus = (isLoading: boolean) => {
    setLoading(isLoading)
  }

  return (
    <div>
      {crowdsale && (
        <div>
          <p className='text-center'><strong>Current Price: </strong>{price} ETH</p>

          <BuyTokens provider={provider} crowdsale={crowdsale} price={price} setLoadingStatus={setLoadingStatus} />

          <Progress tokensSold={tokensSold} maxTokens={maxTokens} />

          <Info accountNumber={account} balance={accountBalance} />
        </div>
      )}
    </div>
  )
}

export default Crowdsale