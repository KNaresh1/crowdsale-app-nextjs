import React from 'react'

const ProgressBar = ({ progressPercentage }: { progressPercentage: number }) => {
    return (
        <div className="w-full h-4 bg-gray-300 rounded-lg">
            <div
                className="rounded-lg text-center text-xs font-bold text-white bg-blue-500"
                style={{ width: `${progressPercentage}%` }}>
                {progressPercentage > 0 ? `${progressPercentage}%` : ''}
            </div>
        </div>
    );
}

export default ProgressBar