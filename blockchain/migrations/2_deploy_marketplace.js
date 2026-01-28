const Marketplace = artifacts.require("Marketplace");

module.exports = function (deployer) {
    // Deploy Marketplace contract
    deployer.deploy(Marketplace);
};
