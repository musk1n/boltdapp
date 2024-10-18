import { gql } from '@apollo/client';

export const GET_COURSES = gql`
  query GetCourses {
    courses {
      id
      name
      description
    }
  }
`;

export const GET_COURSE_REVIEWS = gql`
  query GetCourseReviews {
    courses {
      id
      name
      reviews {
        id
        rating
        comment
        studentAddress
      }
    }
  }
`;