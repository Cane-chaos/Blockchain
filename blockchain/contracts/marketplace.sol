// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Marketplace {

    address public owner;

    struct Course {
        uint256 id;
        string title;
        uint256 price; // in wei
        bool exists;
    }

    mapping(uint256 => Course) public courses;
    mapping(address => mapping(uint256 => bool)) public purchased;

    event CourseCreated(uint256 id, string title, uint256 price);
    event CoursePurchased(address indexed buyer, uint256 indexed courseId);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function createCourse(
        uint256 _id,
        string memory _title,
        uint256 _price
    ) external onlyOwner {
        require(!courses[_id].exists, "Course already exists");

        courses[_id] = Course({
            id: _id,
            title: _title,
            price: _price,
            exists: true
        });

        emit CourseCreated(_id, _title, _price);
    }

    function buyCourse(uint256 _id) external payable {
        Course memory c = courses[_id];

        require(c.exists, "Course not found");
        require(!purchased[msg.sender][_id], "Already purchased");
        require(msg.value == c.price, "Incorrect price");

        purchased[msg.sender][_id] = true;

        payable(owner).transfer(msg.value);

        emit CoursePurchased(msg.sender, _id);
    }

    function isPurchased(address _user, uint256 _id)
        external
        view
        returns (bool)
    {
        return purchased[_user][_id];
    }

    function getCourse(uint256 _id)
        external
        view
        returns (uint256, string memory, uint256)
    {
        Course memory c = courses[_id];
        require(c.exists, "Course not found");
        return (c.id, c.title, c.price);
    }
}