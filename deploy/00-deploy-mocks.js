//This the deploy script for the chains that doesn't have a chainlink priceFeed.

const { network } = require("hardhat")
const {
    developmentChains,
    DECIMALS,
    INITIAL_ANSWER,
} = require("../helper-hardhat-config")

module.exports = async function ({ deployments, getNamedAccounts }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    //we don't want to deploy this mock contract to the testnet or mainnet that has chainlink priceFeed.
    if (developmentChains.includes(network.name)) {
        //then we're going to deploy the contract
        log("Local network detected!", "Deploying mocks...") //this we get from the deployments object --> basically console.log
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true, //spit out useful information in real time.
            args: [DECIMALS, INITIAL_ANSWER], //constructor parameters --> decimal(# decimal places in the price feed) & initial_answer which is the value of the ETH/USD
        })
        log("Mocks deployed!")
        log("####################################################")
    }
}

//Adding tags to this deploy script
module.exports.tags = ["all", "mocks"] //runs at mock tag and all tag. --> two tags
