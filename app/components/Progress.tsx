import ProgressBar from './ProgressBar';

interface Props {
    tokensSold: number;
    maxTokens: number;
}

const Progress = ({ tokensSold, maxTokens }: Props) => {
    const progressPercentage = ((tokensSold / maxTokens) * 100);

    return (
        <div className='space-y-4 py-5 border-b-2'>
            <ProgressBar progressPercentage={progressPercentage} />
            <p className='text-center'>{tokensSold} / {maxTokens} Tokens Sold</p>
        </div>
    )
}

export default Progress