interface AccountInfo {
  accountNumber: string | undefined;
  balance: number;
}

const Info = ({ accountNumber, balance }: AccountInfo) => {
  return (
    <div className="space-y-4 py-5">
      <p>
        <strong>Account: </strong>
        {accountNumber}
      </p>
      <p>
        <strong>Tokens Owned: </strong>
        {balance}
      </p>
    </div>
  );
};

export default Info;
