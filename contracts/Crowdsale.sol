// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import "./Token.sol";

/**
 * Contract that accept ether from user and sends/selss tokes (ICO)
 */
contract Crowdsale {
    address public owner;
    Token public token;
    uint256 public price;
    uint256 public maxTokens;
    uint256 public tokensSold;

    event Buy(uint256 amount, address buyger);
    event Finalize(uint256 tokensSold, uint256 ethRaised);

    constructor(Token _token, uint256 _price, uint256 _maxTokens) {
        owner = msg.sender;
        token = _token;
        price = _price;
        maxTokens = _maxTokens;
    }

    /** This method will return tokens when user sends ether  directly to the contract */
    receive() external payable {
        uint256 amount = msg.value / price;
        buyTokens(amount * 1e18);
    }

    function buyTokens(uint256 _amount) public payable {
        require(msg.value == (_amount / 1e18) * price);
        require(token.balanceOf(address(this)) >= _amount);
        require(token.transfer(msg.sender, _amount));

        tokensSold += _amount;

        emit Buy(_amount, msg.sender);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner.");
        _;
    }

    function setPrice(uint256 _price) public onlyOwner {
        price = _price;
    }

    /* Finalize sale */
    function finalize() public onlyOwner {
        // Send remaining tokens to crowdsale creator
        require(token.transfer(owner, token.balanceOf(address(this))));

        // Send ehter received on token sale to crowdsale creator
        uint256 value = address(this).balance;
        (bool success, ) = owner.call{value: value}("");

        require(success);

        emit Finalize(tokensSold, value);
    }
}
