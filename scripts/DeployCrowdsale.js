const hre = require("hardhat");

async function main() {
    const TOKEN_NAME = "Dapp Token";
    const TOKEN_SYMBOL = "DAPP";
    const MAX_SUPPLY = "1000000";
    const PRICE = hre.ethers.utils.parseUnits('0.25', 'ether');

    // Load & Deploy Token contract
    const Token = await hre.ethers.getContractFactory("Token");
    let token = await Token.deploy(TOKEN_NAME, TOKEN_SYMBOL, MAX_SUPPLY);
    await token.deployed();

    console.log(`Token deployed at: ${token.address}\n`);

    const Crowdsale = await hre.ethers.getContractFactory("Crowdsale");
    let crowdsale = await Crowdsale.deploy(token.address, PRICE, hre.ethers.utils.parseUnits(MAX_SUPPLY, 'ether'));
    await crowdsale.deployed();

    console.log(`Crowdsale deployed at: ${crowdsale.address}\n`);

    // For crowdsale to send tokes to user, it should have tokens.
    const transaction = await token.transfer(crowdsale.address, hre.ethers.utils.parseUnits(MAX_SUPPLY, 'ether'));
    let result = await transaction.wait();

    console.log(`Tokens transferred to Crowdsale\n`);
}

main().catch(error => {
    console.error(error);
    process.exitCode = 1;
})