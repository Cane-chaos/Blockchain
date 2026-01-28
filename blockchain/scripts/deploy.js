import { Web3 } from 'web3';
import solc from 'solc';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
    console.log('🚀 Đang deploy Marketplace contract lên Ganache...\n');

    // Kết nối với Ganache
    const web3 = new Web3('http://127.0.0.1:7545');

    try {
        // Kiểm tra kết nối
        const isListening = await web3.eth.net.isListening();
        if (!isListening) {
            throw new Error('❌ Không thể kết nối với Ganache tại http://127.0.0.1:7545');
        }
        console.log('✅ Đã kết nối với Ganache');

        // Đọc source code của Marketplace.sol
        const marketplacePath = path.join(__dirname, '../contracts/Marketplace.sol');
        const marketplaceSource = fs.readFileSync(marketplacePath, 'utf8');

        // Input cho compiler
        const input = {
            language: 'Solidity',
            sources: {
                'Marketplace.sol': {
                    content: marketplaceSource
                }
            },
            settings: {
                outputSelection: {
                    '*': {
                        '*': ['abi', 'evm.bytecode']
                    }
                }
            }
        };

        console.log('⚙️  Đang compile contract...');
        const output = JSON.parse(solc.compile(JSON.stringify(input)));

        // Kiểm tra lỗi compile
        if (output.errors) {
            const errors = output.errors.filter(e => e.severity === 'error');
            if (errors.length > 0) {
                console.error('❌ Lỗi compile:');
                errors.forEach(error => console.error(error.formattedMessage));
                process.exit(1);
            }
        }

        const contract = output.contracts['Marketplace.sol']['Marketplace'];
        const abi = contract.abi;
        const bytecode = contract.evm.bytecode.object;

        console.log('✅ Compile thành công!\n');

        // Lấy accounts từ Ganache
        const accounts = await web3.eth.getAccounts();
        const deployer = accounts[0];

        console.log('📍 Deploying với account:', deployer);

        const balance = await web3.eth.getBalance(deployer);
        console.log('💰 Account balance:', web3.utils.fromWei(balance, 'ether'), 'ETH\n');

        // Deploy contract
        console.log('📤 Đang deploy contract...');
        const MarketplaceContract = new web3.eth.Contract(abi);

        const deployTx = MarketplaceContract.deploy({
            data: '0x' + bytecode
        });

        const gas = await deployTx.estimateGas({ from: deployer });

        const marketplaceContract = await deployTx.send({
            from: deployer,
            gas: gas.toString(),
            gasPrice: await web3.eth.getGasPrice()
        });

        const contractAddress = marketplaceContract.options.address;

        console.log('\n✅ Marketplace contract đã được deploy thành công!');
        console.log('\n========================================');
        console.log('📋 THÔNG TIN CHO FRONTEND:');
        console.log('========================================');
        console.log('Contract Address:', contractAddress);
        console.log('Network: Ganache (localhost:7545)');
        console.log('========================================\n');

        // Lưu thông tin deployment
        const deploymentInfo = {
            contractAddress: contractAddress,
            contractABI: abi,
            network: 'ganache',
            networkUrl: 'http://127.0.0.1:7545',
            chainId: parseInt(await web3.eth.getChainId()),
            deployedAt: new Date().toISOString(),
            deployer: deployer
        };

        fs.writeFileSync(
            path.join(__dirname, '../deployment-info.json'),
            JSON.stringify(deploymentInfo, null, 2)
        );

        console.log('✅ Đã lưu thông tin deployment vào deployment-info.json');
        console.log('💡 File này chứa Contract Address và ABI để sử dụng trong Frontend!\n');

    } catch (error) {
        console.error('\n❌ Lỗi khi deploy:');
        console.error(error.message);

        if (error.message.includes('connect')) {
            console.error('\n💡 Hãy đảm bảo Ganache đang chạy tại http://127.0.0.1:7545');
        }

        process.exit(1);
    }
}

main();
