import React from 'react'
import ProgressBar from './ProgressBar';

interface Props {
    tokensSold: string;
    maxTokens: string;
}

const Progress = ({ tokensSold, maxTokens }: Props) => {
    const progressPercentage = ((Number(tokensSold) / Number(maxTokens)) * 100);

    return (
        <div className='space-y-4'>
            <ProgressBar progressPercentage={progressPercentage} />
            <p>{tokensSold} / {maxTokens} Tokens Sold</p>
        </div>
    )
}

export default Progress