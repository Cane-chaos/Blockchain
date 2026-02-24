import { ref } from 'vue';
import deploymentInfo from '../deployment-info.json';

// Global reactive state
export const walletAddress = ref(null);
const SESSION_LIMIT_MS = 60 * 60 * 1000; // 1 giờ
const TARGET_CHAIN_ID = `0x${deploymentInfo.chainId.toString(16)}`; // Chuyển chainId sang dạng Hex, VD: 1337 -> 0x539

const checkAndSwitchNetwork = async () => {
    if (typeof window.ethereum === 'undefined') return false;

    try {
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        if (chainId !== TARGET_CHAIN_ID) {
            alert(`Mạng hiện hành không khớp! Vui lòng chuyển sang mạng Local Ganache (Chain ID: ${deploymentInfo.chainId}).`);
            try {
                // Thử yêu cầu MetaMask chuyển mạng
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: TARGET_CHAIN_ID }],
                });
                return true;
            } catch (switchError) {
                console.error("Lỗi chuyển/chọn mạng:", switchError);
                return false;
            }
        }
        return true;
    } catch (error) {
        console.error("Lỗi lấy chainId:", error);
        return false;
    }
};

export const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
        const isCorrectNetwork = await checkAndSwitchNetwork();
        if (!isCorrectNetwork) return;

        try {
            // Yêu cầu MetaMask hiển thị lại bảng chọn tài khoản
            await window.ethereum.request({
                method: 'wallet_requestPermissions',
                params: [{ eth_accounts: {} }]
            });

            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            walletAddress.value = accounts[0];
            localStorage.setItem('walletSession', Date.now().toString());
        } catch (error) {
            console.error("Lỗi khi kết nối ví:", error);
        }
    } else {
        alert("Vui lòng cài đặt MetaMask!");
        window.open("https://metamask.io/download/", "_blank");
    }
};

export const disconnectWallet = () => {
    walletAddress.value = null;
    localStorage.removeItem('walletSession');
};

export const initWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
        try {
            const sessionTime = localStorage.getItem('walletSession');
            const now = Date.now();

            const isCorrectNetwork = await checkAndSwitchNetwork();
            if (!isCorrectNetwork) {
                disconnectWallet();
                return;
            }

            // Chỉ cấp lại/duy trì session nếu session tồn tại và chưa hết hạn 1 tiếng
            if (sessionTime && (now - parseInt(sessionTime) < SESSION_LIMIT_MS)) {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                if (accounts.length > 0) {
                    walletAddress.value = accounts[0];
                    // Gia hạn session thêm 1 tiếng mỗi khi reload thành công
                    localStorage.setItem('walletSession', now.toString());
                } else {
                    disconnectWallet();
                }
            } else {
                // Nếu quá 1 tiếng hoặc chưa lưu session đăng nhập, clear trạng thái
                disconnectWallet();
            }
        } catch (error) {
            console.error("Lỗi lấy thông tin ví:", error);
            disconnectWallet();
        }

        // Lắng nghe sự kiện đổi account
        window.ethereum.on('accountsChanged', (accounts) => {
            if (accounts.length === 0) {
                disconnectWallet();
            } else {
                walletAddress.value = accounts[0];
                localStorage.setItem('walletSession', Date.now().toString());
            }
        });

        // Lắng nghe thay đổi mạng lưới (Network changed)
        window.ethereum.on('chainChanged', (chainId) => {
            if (chainId !== TARGET_CHAIN_ID) {
                alert("Bạn đã chuyển sang mạng khác hợp đồng! Hệ thống sẽ ngắt kết nối.");
                disconnectWallet();
            } else {
                window.location.reload(); // Thường được khuyên reload trang sau khi đổi chain ID thành công
            }
        });
    }
};
