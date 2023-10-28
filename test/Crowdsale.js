const { ethers } = require("hardhat");
const { expect } = require("chai");

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), 'ether');
}

const ether = tokens;

describe("Crowdsale", () => {
    const TOTAL_SUPPLY = 1000000;

    let crowdsale, token, deployer, user1;

    beforeEach(async () => {
        // Load Contracts
        const Crowdsale = await ethers.getContractFactory("Crowdsale");
        const Token = await ethers.getContractFactory("Token");

        // Deploy token
        token = await Token.deploy("Dapp Token", "DAPP", TOTAL_SUPPLY);

        // Configure accounts
        [deployer, user1] = await ethers.getSigners();

        // Deploy crowdsale
        crowdsale = await Crowdsale.deploy(token.address, ether(1), TOTAL_SUPPLY);

        // For crowdsale to send tokes to user, it should have tokens.
        const transaction = await token.connect(deployer).transfer(crowdsale.address, tokens(TOTAL_SUPPLY));
        await transaction.wait();
    });

    describe("Deployment", () => {

        it("sends tokens to the Crowdsale contract", async () => {
            expect(await token.balanceOf(crowdsale.address)).to.equal(tokens(TOTAL_SUPPLY));
        });

        it("returns the price", async () => {
            expect(await crowdsale.price()).to.equal(ether(1));
        });

        it("returns token address", async () => {
            expect(await crowdsale.token()).to.equal(token.address);
        });

        it("returns max tokens", async () => {
            expect(await crowdsale.maxTokens()).to.equal(TOTAL_SUPPLY);
        });
    });

    describe("Buying Tokens", () => {
        let amount = tokens(10);

        describe("Success", () => {
            let transactio, result;

            beforeEach(async () => {
                transaction = await crowdsale.connect(user1).buyTokens(amount, { value: ether(10) });
                result = await transaction.wait();
            });

            it("transfers tokens", async () => {
                expect(await token.balanceOf(crowdsale.address)).to.equal(tokens(999990));
                expect(await token.balanceOf(user1.address)).to.equal(amount);
            });

            it("updates contracts ether balance", async () => {
                expect(await ethers.provider.getBalance(crowdsale.address)).to.equal(ether(10));
            });

            it("updates tokens sold", async () => {
                expect(await crowdsale.tokensSold()).to.equal(amount);
            });

            it("emits a Buy event", async () => {
                await expect(transaction).to.emit(crowdsale, "Buy").withArgs(amount, user1.address);
            });
        });

        describe("Failure", () => {

            it("rejects insufficient ETH", async () => {
                await expect(crowdsale.connect(user1).buyTokens(amount, { value: 0 })).to.be.reverted;
            });
        });
    });

    describe("Sending ETH", () => {
        let amount = ether(10);

        describe("Success", () => {
            let transactio, result;

            beforeEach(async () => {
                transaction = await user1.sendTransaction({ to: crowdsale.address, value: amount });
                result = await transaction.wait();
            });

            it("updates contracts ether balance", async () => {
                expect(await ethers.provider.getBalance(crowdsale.address)).to.equal(amount);
            });

            it("updates user token balance", async () => {
                expect(await token.balanceOf(user1.address)).to.equal(amount);
            });
        });
    })

    describe("Finalizing Sale", () => {
        let transactio, result;
        const price = ether(2);

        describe("Success", () => {

            beforeEach(async () => {
                transaction = await crowdsale.connect(deployer).setPrice(price);
                result = await transaction.wait();
            });

            it("updates the price", async () => {
                expect(await crowdsale.price()).to.equal(price);
            });
        });

        describe("Failure", () => {

            it("reject non-owner to set the price", async () => {
                await expect(crowdsale.connect(user1).setPrice(price)).to.be.reverted;
            });
        });
    });

    describe("Finalizing Sale", () => {
        let transactio, result;
        const amount = tokens(10);
        const value = ether(10);

        describe("Success", () => {

            beforeEach(async () => {
                transaction = await crowdsale.connect(user1).buyTokens(amount, { value: value });
                result = await transaction.wait();

                transaction = await crowdsale.connect(deployer).finalize();
                result = await transaction.wait();
            });

            it("transers remaining tokens to owner", async () => {
                expect(await token.balanceOf(crowdsale.address)).to.equal(0);
                expect(await token.balanceOf(deployer.address)).to.equal(tokens(999990));
            });

            it("transers ETH balance to owner", async () => {
                expect(await ethers.provider.getBalance(crowdsale.address)).to.equal(0);
            });

            it("emits Finalize event", async () => {
                expect(transaction).to.emit(crowdsale, "Finalize").withArgs(amount, value);
            })
        });

        describe("Failure", () => {

            it("rejects non-owner from finalizing the sale", async () => {
                await expect(crowdsale.connect(user1).finalize()).to.be.reverted;
            });
        });

    });
});