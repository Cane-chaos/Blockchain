import { Web3 } from 'web3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
    console.log('🧪 Testing Marketplace Contract...\n');

    // Kết nối với Ganache
    const web3 = new Web3('http://127.0.0.1:7545');

    // Đọc thông tin deployment
    const deploymentInfoPath = path.join(__dirname, '../deployment-info.json');
    const deploymentInfo = JSON.parse(fs.readFileSync(deploymentInfoPath, 'utf8'));

    const contractAddress = deploymentInfo.contractAddress;
    const contractABI = deploymentInfo.contractABI;
    const deployer = deploymentInfo.deployer; // Contract owner

    // Khởi tạo contract instance
    const marketplace = new web3.eth.Contract(contractABI, contractAddress);

    // Địa chỉ buyer
    const buyer = '0xb9EB5DfC525Fd29106c1ccd94CED416C0D71b65E'; // Người mua khóa họ
    console.log('📋 Thông tin:');
    console.log('Contract Address:', contractAddress);
    console.log('Contract Owner (Creator):', deployer);
    console.log('Buyer Account:', buyer);
    console.log('');

    // Kiểm tra contract owner
    const contractOwner = await marketplace.methods.contractOwner().call();
    console.log('✅ Xác nhận Contract Owner:', contractOwner);
    console.log('');

    try {
        // ============================================
        // BƯỚC 1: Kiểm tra và tạo khóa học (bằng contract owner)
        // ============================================
        console.log('📝 BƯỚC 1: Kiểm tra và tạo khóa học...');

        const courseId = 2;
        const courseName = 'Web3 Blockchain Development';
        const coursePrice = web3.utils.toWei('0.1', 'ether'); // 0.1 ETH
        const courseImage = 'https://example.com/images/web3-course.jpg';
        const videoUrl = 'https://www.youtube.com/embed/gyMwXuJrbJQ';
        const nftImage = 'https://example.com/images/web3-certificate.jpg';

        console.log('  - Tên khóa học:', courseName);
        console.log('  - Giá:', web3.utils.fromWei(coursePrice, 'ether'), 'ETH');

        // Kiểm tra khóa học đã tồn tại chưa
        let courseExists = false;
        try {
            const existingCourse = await marketplace.methods.getCourse(courseId).call();
            if (existingCourse.id !== '0') {
                courseExists = true;
                console.log('  ℹ️  Khóa học đã tồn tại, bỏ qua bước tạo');
                console.log('  - Tên hiện tại:', existingCourse.title);
            }
        } catch (e) {
            // Khóa học chưa tồn tại
            courseExists = false;
        }

        if (!courseExists) {
            console.log('  - Đang tạo khóa học mới...');
            const createTx = await marketplace.methods.createCourse(
                courseId,
                courseName,
                coursePrice,
                courseImage,
                videoUrl,
                nftImage
            ).send({
                from: deployer, // Sử dụng deployer (contract owner)
                gas: 3000000
            });

            console.log('  ✅ Đã tạo khóa học thành công!');
            console.log('  📝 Transaction hash:', createTx.transactionHash);
        }
        console.log('');

        // ============================================
        // BƯỚC 2: Kiểm tra thông tin khóa học
        // ============================================
        console.log('🔍 BƯỚC 2: Kiểm tra thông tin khóa học...');

        const course = await marketplace.methods.getCourse(courseId).call();
        console.log('  - ID:', course.id);
        console.log('  - Tên:', course.title);
        console.log('  - Giá:', web3.utils.fromWei(course.price, 'ether'), 'ETH');
        console.log('  - Owner:', course.owner);
        console.log('  - Active:', course.isActive);
        console.log('');

        // ============================================
        // BƯỚC 3: Kiểm tra trạng thái mua trước khi mua
        // ============================================
        console.log('🔍 BƯỚC 3: Kiểm tra trạng thái trước khi mua...');

        const hasPurchasedBefore = await marketplace.methods.hasUserPurchased(courseId, buyer).call();
        console.log('  - Buyer đã mua khóa học:', hasPurchasedBefore);

        const buyerBalanceBefore = await web3.eth.getBalance(buyer);
        const creatorBalanceBefore = await web3.eth.getBalance(deployer);
        console.log('  - Balance của buyer (trước):', web3.utils.fromWei(buyerBalanceBefore, 'ether'), 'ETH');
        console.log('  - Balance của creator (trước):', web3.utils.fromWei(creatorBalanceBefore, 'ether'), 'ETH');
        console.log('');

        // ============================================
        // BƯỚC 4: Mua khóa học
        // ============================================
        console.log('💰 BƯỚC 4: Buyer mua khóa học...');
        console.log('  - Buyer:', buyer);
        console.log('  - Đang thanh toán', web3.utils.fromWei(coursePrice, 'ether'), 'ETH...');

        const buyTx = await marketplace.methods.buyCourse(courseId).send({
            from: buyer,
            value: coursePrice,
            gas: 3000000
        });

        console.log('  ✅ Mua khóa học thành công!');
        console.log('  📝 Transaction hash:', buyTx.transactionHash);
        console.log('');

        // ============================================
        // BƯỚC 5: Kiểm tra trạng thái sau khi mua
        // ============================================
        console.log('🔍 BƯỚC 5: Kiểm tra trạng thái sau khi mua...');

        const hasPurchasedAfter = await marketplace.methods.hasUserPurchased(courseId, buyer).call();
        console.log('  - Buyer đã mua khóa học:', hasPurchasedAfter);

        const buyerBalanceAfter = await web3.eth.getBalance(buyer);
        const creatorBalanceAfter = await web3.eth.getBalance(deployer);
        console.log('  - Balance của buyer (sau):', web3.utils.fromWei(buyerBalanceAfter, 'ether'), 'ETH');
        console.log('  - Balance của creator (sau):', web3.utils.fromWei(creatorBalanceAfter, 'ether'), 'ETH');

        // Tính toán chênh lệch
        const buyerDiff = parseFloat(web3.utils.fromWei(buyerBalanceBefore, 'ether')) -
            parseFloat(web3.utils.fromWei(buyerBalanceAfter, 'ether'));
        const creatorDiff = parseFloat(web3.utils.fromWei(creatorBalanceAfter, 'ether')) -
            parseFloat(web3.utils.fromWei(creatorBalanceBefore, 'ether'));

        console.log('  - Buyer đã trả:', buyerDiff.toFixed(4), 'ETH (bao gồm gas fee)');
        console.log('  - Creator nhận được:', creatorDiff.toFixed(4), 'ETH');
        console.log('');

        // ============================================
        // KẾT QUẢ
        // ============================================
        console.log('========================================');
        console.log('✅ TEST HOÀN TẤT THÀNH CÔNG!');
        console.log('========================================');
        console.log('📊 Tóm tắt:');
        console.log('  - Khóa học ID:', courseId);
        console.log('  - Tên:', courseName);
        console.log('  - Giá:', web3.utils.fromWei(coursePrice, 'ether'), 'ETH');
        console.log('  - Creator:', deployer);
        console.log('  - Buyer:', buyer);
        console.log('  - Trạng thái mua:', hasPurchasedAfter ? '✅ Đã mua' : '❌ Chưa mua');
        console.log('========================================\n');
    } catch (error) {
        console.error('\n❌ Lỗi khi thực hiện test:');
        console.error(error.message);

        // Hiển thị chi tiết lỗi nếu có



        process.exit(1);
    }
}

main();
