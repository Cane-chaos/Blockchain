// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title Marketplace
 * @dev Smart Contract quản lý việc mua bán khóa học trên nền tảng Web3
 * Lưu ý: courseId trong contract phải khớp với field 'id' (Number) trong MongoDB
 */
contract Marketplace {
    // Struct định nghĩa cấu trúc dữ liệu của một khóa học
    struct Course {
        uint256 id;           // ID khóa học (phải khớp với MongoDB)
        string title;         // Tên khóa học
        uint256 price;        // Giá khóa học (đơn vị Wei)
        string image;         // URL ảnh thumbnail
        string videoUrl;      // URL video Youtube embed
        string nftImage;      // URL ảnh chứng chỉ NFT
        address payable owner; // Địa chỉ người tạo khóa học
        bool isActive;        // Trạng thái khóa học (active/inactive)
    }
    
    // Mapping lưu trữ các khóa học theo ID
    mapping(uint256 => Course) public courses;
    
    // Mapping kiểm tra user đã mua khóa học chưa: courseId => userAddress => isPurchased
    mapping(uint256 => mapping(address => bool)) public isPurchased;
    
    // Biến đếm tổng số khóa học
    uint256 public courseCount;
    
    // Address của contract owner (người deploy contract)
    address public contractOwner;
    
    // Events
    event CourseCreated(
        uint256 indexed courseId,
        string title,
        uint256 price,
        address owner
    );
    
    event CoursePurchased(
        uint256 indexed courseId,
        address indexed buyer,
        uint256 price
    );
    
    // Modifier chỉ cho phép contract owner
    modifier onlyContractOwner() {
        require(msg.sender == contractOwner, "Chi contract owner moi duoc thuc hien");
        _;
    }
    
    // Constructor
    constructor() {
        contractOwner = msg.sender;
        courseCount = 0;
    }
    
    /**
     * @dev Tạo khóa học mới
     * @param _id ID khóa học (phải khớp với MongoDB)
     * @param _title Tên khóa học
     * @param _price Giá khóa học (Wei)
     * @param _image URL ảnh thumbnail
     * @param _videoUrl URL video
     * @param _nftImage URL ảnh NFT certificate
     */
    function createCourse(
        uint256 _id,
        string memory _title,
        uint256 _price,
        string memory _image,
        string memory _videoUrl,
        string memory _nftImage
    ) public onlyContractOwner {
        require(_price > 0, "Gia khoa hoc phai lon hon 0");
        require(bytes(_title).length > 0, "Ten khoa hoc khong duoc de trong");
        require(courses[_id].id == 0, "Khoa hoc voi ID nay da ton tai");
        
        courses[_id] = Course({
            id: _id,
            title: _title,
            price: _price,
            image: _image,
            videoUrl: _videoUrl,
            nftImage: _nftImage,
            owner: payable(msg.sender),
            isActive: true
        });
        
        courseCount++;
        
        emit CourseCreated(_id, _title, _price, msg.sender);
    }
    
    /**
     * @dev Mua khóa học
     * @param _courseId ID khóa học cần mua
     */
    function buyCourse(uint256 _courseId) public payable {
        Course storage course = courses[_courseId];
        
        // Kiểm tra khóa học tồn tại
        require(course.id != 0, "Khoa hoc khong ton tai");
        
        // Kiểm tra khóa học đang active
        require(course.isActive, "Khoa hoc khong con hoat dong");
        
        // Kiểm tra user chưa mua khóa học này
        require(!isPurchased[_courseId][msg.sender], "Ban da mua khoa hoc nay roi");
        
        // Kiểm tra số tiền gửi đủ
        require(msg.value >= course.price, "So tien gui khong du");
        
        // Chuyển tiền cho người tạo khóa học
        course.owner.transfer(course.price);
        
        // Đánh dấu đã mua
        isPurchased[_courseId][msg.sender] = true;
        
        // Hoàn lại tiền thừa (nếu có)
        if (msg.value > course.price) {
            payable(msg.sender).transfer(msg.value - course.price);
        }
        
        emit CoursePurchased(_courseId, msg.sender, course.price);
    }
    
    /**
     * @dev Kiểm tra user đã mua khóa học chưa
     * @param _courseId ID khóa học
     * @param _user Địa chỉ user
     * @return bool Trạng thái đã mua hay chưa
     */
    function hasUserPurchased(uint256 _courseId, address _user) public view returns (bool) {
        return isPurchased[_courseId][_user];
    }
    
    /**
     * @dev Lấy thông tin khóa học
     * @param _courseId ID khóa học
     * @return Course Thông tin khóa học
     */
    function getCourse(uint256 _courseId) public view returns (Course memory) {
        require(courses[_courseId].id != 0, "Khoa hoc khong ton tai");
        return courses[_courseId];
    }
    
    /**
     * @dev Cập nhật trạng thái khóa học
     * @param _courseId ID khóa học
     * @param _isActive Trạng thái mới
     */
    function setCourseStatus(uint256 _courseId, bool _isActive) public onlyContractOwner {
        require(courses[_courseId].id != 0, "Khoa hoc khong ton tai");
        courses[_courseId].isActive = _isActive;
    }
}
