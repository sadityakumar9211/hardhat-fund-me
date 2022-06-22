//This is a script which interacts with our contract.
//The contract is already deployed.
const { getNamedAccounts, ethers } = require("hardhat")

async function main() {
    const { deployer } = await getNamedAccounts()
    const fundMe = await ethers.getContract("FundMe", deployer) //getting the latest deployed version of the contract.
    console.log("Funding the contract...")
    const transactionResponse = await fundMe.fund({
        value: ethers.utils.parseEther("0.1"),
    })
    await transactionResponse.wait(1)
    // const {effectiveGasPrice, gasUsed} = transactionReceipt
    // console.log(`funded with gas cost ${effectiveGasPrice.mul(gasUsed)}`)
}

main()
    .then(() => process.exit(0))
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
