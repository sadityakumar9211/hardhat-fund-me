require("dotenv").config()

require("@nomiclabs/hardhat-etherscan")
require("@nomiclabs/hardhat-waffle")
require("hardhat-gas-reporter")
require("solidity-coverage")
require("hardhat-deploy")

const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY

module.exports = {
    // solidity: "0.8.8",
    solidity: {
        //we can add multiple solidity compilers in the configuration file.
        //This can help us compile and work with the solidity contracts which are way older than latest versions.
        compilers: [{ version: "0.8.8" }, { version: "0.6.6" }], // array of compiler version objects
    },
    defaultNetwork: "hardhat",
    networks: {
        //each object inside of this is a network.
        rinkeby: {
            url: RINKEBY_RPC_URL,
            chainId: 4,
            accounts: [PRIVATE_KEY],
            blockConfirmations: 6,
        },
    },
    gasReporter: {
        enabled: process.env.REPORT_GAS !== undefined,
        currency: "USD",
        outputFile: "gasReporterOutput.json",
        noColors: true,
        coinmarketcap: process.env.COINMARKETCAP_API_KEY || "KEY",
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY,
    },
    namedAccounts: {
        deployer: {
            default: 0, //by default the 0 th account will be deployer.
        },
        user: {
            default: 0, //1st account is the default user
        },
    },
}
