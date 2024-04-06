require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
import "@nomicfoundation/hardhat-ethers";

module.exports = {
    solidity: {
        version: "0.8.24",
        settings: {
            evmVersion: "berlin",
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    },
    networks: {
        hardhat: {
            chainId: 31337,
        },
        xrpl: {
            url: `https://rpc-evm-sidechain.xrpl.org`,
            accounts: [process.env.PRIVATE_KEY],
            chainId: 1440002,
        },
    },

    etherscan: {
        apiKey: {
            xrpl: "MOCK_API_KEY",
        },
        customChains: [
            {
                network: "xrpl",
                chainId: 1440002,
                urls: {
                    apiURL: "https://evm-poa-sidechain.peersyst.tech/api",
                    browserURL: "https://evm-sidechain.xrpl.org/",
                },
            },
        ],
    },
};
