'use client';

import { Web3Provider } from '@ethersproject/providers';
import { Button, TextField } from '@radix-ui/themes';
import { Contract } from 'ethers'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { parseUnits } from '../utils';
import Spinner from './Spinner';

interface BuyTokensProps {
    provider: Web3Provider | undefined;
    crowdsale: Contract | undefined;
    price: string;
    setLoading: (isLoading: boolean) => void;
}

interface BuyTokensForm {
    amount: number;
}

const BuyTokens = ({ provider, crowdsale, price, setLoading }: BuyTokensProps) => {
    const { register, handleSubmit } = useForm<BuyTokensForm>();

    const [isSubmitting, setSubmitting] = useState<boolean>(false);

    const onSubmit = handleSubmit(async (data) => {
        try {
            setSubmitting(true);

            const signer = provider?.getSigner();

            const value = parseUnits(data.amount * Number(price));
            const formattedAmount = parseUnits(data.amount);

            const transaction = await crowdsale?.connect(signer || '0x0').buyTokens(formattedAmount, { value: value });
            await transaction.wait();

            setLoading(true);
        } catch (error) {
            setSubmitting(false);
            console.log("User rejected or transaction reverted. Error: ", error);
        }
    });

    return (
        <div className='py-8'>
            <form className='flex justify-center items-center space-x-4' onSubmit={onSubmit}>
                <TextField.Root className='w-80'>
                    <TextField.Input type='number' placeholder="Enter amount" {...register('amount')} />
                </TextField.Root>
                {isSubmitting ? <Spinner /> : <Button className='w-40'>Buy Tokens</Button>}
            </form>
        </div>
    )
}

export default BuyTokens