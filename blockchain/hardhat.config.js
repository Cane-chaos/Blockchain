import "@nomicfoundation/hardhat-toolbox";

/** @type import('hardhat/config').HardhatUserConfig */
export default {
    solidity: "0.8.0",
    networks: {
        ganache: {
            url: "http://127.0.0.1:7545",
            chainId: 1337,
            accounts: {
                mnemonic: "myth like bonus scare over problem client lizard pioneer submit female collect",
                path: "m/44'/60'/0'/0",
                initialIndex: 0,
                count: 10
            }
        }
    }
};
