## Crowdsale blockchain app (IC0)
- Smart Contracts - Token.sol and Crowdsale.sol using Solidity
-  FrontEnd - NextJS


### Tool, Technologies & Plugins
1. nodejs
2. VS Code - Extensions: ES7+React/Redux/React-Native snippets, Javascript & Typescript Nightly
3. NextJS - Javascript, Typescript, Tailwind CSS, wewb3-react/core, ethersJS
   1. web3-react: Help blockchain developers make modern Ethereum dApps using React hooks
   2. install wewb3-react/core (To connect to Ethereum network using Web3), @web3-react/metamask (provides a connector to MetaMask wallet)
4. Blockchain: Solidity, hardhat, javascript, ethers util


### Steps:
1. npx create-next-app@13.4.19
2. 



### Hardhat
1. npm init
2. npm install --save-dev hardhat 
3. npx hardhat and select Create a Javascript project
4. npx hardhat compile
5. npx hardhat test
6. npx hardhat run ./scripts/DeployToken.js --network localhost (or use npm i -D hardhat-deploy)
7. npx hardhat verify --network sepolia <api-key> <constructor-args>

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```

