//This script withdraws the fund from the localhost contracts

const { getNamedAccounts, ethers } = require("hardhat")

async function main() {
    const { deployer } = await getNamedAccounts()
    const fundMe = await ethers.getContract("FundMe", deployer)
    console.log(`contract deployed at address: ${fundMe.address}`)
    console.log("Withdrawing the funds from the contract...")
    const transactionResponse = await fundMe.withdraw()
    const transactionReceipt = await transactionResponse.wait(1)
    const { gasUsed, effectiveGasPrice } = transactionReceipt
    console.log(
        "Funds withdrawn with gas cost: ",
        gasUsed.mul(effectiveGasPrice).toString()
    )
}
main()
    .then(() => process.exit(0))
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
