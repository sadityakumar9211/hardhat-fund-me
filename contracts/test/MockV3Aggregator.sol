//This is the file where we create our own priceFeed contract for the chains that doesn't have chainLink contracts--> AggregatorV3Interface watching over it.

//But how can we create such kind of contract. --> Take help from the chainlink github repo.

//SPDX-License-Identifier: MIT

pragma solidity ^0.6.6;

//Importing the MockV3Aggregator.sol contract from the chainlink repo  --> we have also installed it locally using yarn
import "@chainlink/contracts/src/v0.6/tests/MockV3Aggregator.sol";
