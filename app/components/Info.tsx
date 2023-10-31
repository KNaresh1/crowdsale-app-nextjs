import React from 'react'

interface AccountInfo {
    accountNumber: string | undefined;
    balance: string | undefined;
}

const Info = ({ accountNumber, balance }: AccountInfo) => {
    return (
        <div className="space-y-4 py-5">
            <p><strong>Account: </strong>{accountNumber}</p>
            <p><strong>Tokens Owned: </strong>{balance}</p>
        </div>
    )
}

export default Info