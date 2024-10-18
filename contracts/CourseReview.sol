// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CourseReview {
    struct Course {
        string name;
        string description;
    }

    struct Review {
        uint256 rating;
        string comment;
        address studentAddress;
    }

    mapping(uint256 => Course) public courses;
    mapping(uint256 => Review[]) public courseReviews;
    uint256 public courseCount;

    event CourseAdded(uint256 indexed courseId, string name, string description);
    event ReviewAdded(uint256 indexed courseId, uint256 rating, string comment, address studentAddress);

    function addCourse(string memory _name, string memory _description) public {
        courseCount++;
        courses[courseCount] = Course(_name, _description);
        emit CourseAdded(courseCount, _name, _description);
    }

    function addReview(uint256 _courseId, uint256 _rating, string memory _comment) public {
        require(_courseId > 0 && _courseId <= courseCount, "Invalid course ID");
        require(_rating >= 1 && _rating <= 5, "Rating must be between 1 and 5");

        Review memory newReview = Review(_rating, _comment, msg.sender);
        courseReviews[_courseId].push(newReview);
        emit ReviewAdded(_courseId, _rating, _comment, msg.sender);
    }

    function getCourse(uint256 _courseId) public view returns (string memory, string memory) {
        require(_courseId > 0 && _courseId <= courseCount, "Invalid course ID");
        Course memory course = courses[_courseId];
        return (course.name, course.description);
    }

    function getCourseReviewsCount(uint256 _courseId) public view returns (uint256) {
        require(_courseId > 0 && _courseId <= courseCount, "Invalid course ID");
        return courseReviews[_courseId].length;
    }

    function getCourseReview(uint256 _courseId, uint256 _reviewIndex) public view returns (uint256, string memory, address) {
        require(_courseId > 0 && _courseId <= courseCount, "Invalid course ID");
        require(_reviewIndex < courseReviews[_courseId].length, "Invalid review index");

        Review memory review = courseReviews[_courseId][_reviewIndex];
        return (review.rating, review.comment, review.studentAddress);
    }
}