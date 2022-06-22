//This is the last step in our development journey
//This test is performed on testnet to make sure that everything is almost working as expected.
//We are assuming that the contract is already deployed on the testnet
//So no need to deploy it again and no need of the mock contract.

const { ethers, getNamedAccounts, network } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")

developmentChains.includes(network.name)
    ? describe.skip
    : describe("FundMe", async function () {
          let fundMe
          let deployer
          const sendValue = ethers.utils.parseEther("1") //providing the 1ETH value this way
          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer
              //assuming that the contract is already deployed.
              fundMe = await ethers.getContract("FundMe", deployer)
          })
          it("allows people to fund and withdraw", async function () {
              await fundMe.fund({ value: sendValue })
              await fundMe.withdraw()
              const endingBalance = await fundMe.provider.getBalance(
                  fundMe.address
              )
              assert.equal(endingBalance.toString(), "0")
          })
      })
