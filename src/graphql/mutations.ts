import { gql } from '@apollo/client';

export const ADD_REVIEW = gql`
  mutation AddReview($courseId: ID!, $rating: Int!, $comment: String!, $studentAddress: String!) {
    addReview(courseId: $courseId, rating: $rating, comment: $comment, studentAddress: $studentAddress) {
      id
      rating
      comment
      studentAddress
    }
  }
`;