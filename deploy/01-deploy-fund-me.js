//import

//async main

//calling of main function

const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { network } = require("hardhat")
const { verify } = require("../utils/verify")

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments //pulling these two function out of deployments
    const { deployer } = await getNamedAccounts() //named account in the configuration file.
    const chainId = network.config.chainId

    // well what happens when we want to switch chains?
    // when going for localhost or hardhat network we want to use a mock

    // let ethUsdPriceFeedAddress =
    let ethUsdPriceFeedAddress
    if (developmentChains.includes(network.name)) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator") //latest deployed version of this contract on this development chain
        ethUsdPriceFeedAddress = ethUsdAggregator.address //this is the priceFeed contract address.
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }
    log("Fund Me Contract Deployed!")
    log("#########################################")

    // if the contract doesn't exist, we deploy a minimal version of
    // for our local testing

    const args = [ethUsdPriceFeedAddress]
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: args, //put price feed address
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    log("###########################################")

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        verify(fundMe.address, args)
    }
}

module.exports.tags = ["all", "fundme"]
