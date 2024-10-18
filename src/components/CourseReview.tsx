import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_REVIEW } from '../graphql/mutations';
import { Star } from 'lucide-react';
import { addReview } from '../utils/contract';

const CourseReview: React.FC = () => {
  // ... (previous code remains the same)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window.ethereum !== 'undefined') {
      try {
        await addReview(parseInt(courseId!), rating, comment);

        const result = await addReview({
          variables: {
            courseId,
            rating,
            comment,
            studentAddress: await window.ethereum.request({ method: 'eth_accounts' }).then((accounts: string[]) => accounts[0]),
          },
        });

        console.log('Review added:', result);
        alert('Review submitted successfully!');
        setRating(0);
        setComment('');
      } catch (err) {
        console.error('Error submitting review:', err);
        alert('Failed to submit review. Please try again.');
      }
    } else {
      alert('Please install MetaMask to submit a review');
    }
  };

  // ... (rest of the component remains the same)
};

export default CourseReview;