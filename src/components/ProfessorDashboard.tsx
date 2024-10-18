import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_COURSE_REVIEWS } from '../graphql/queries';
import { Star } from 'lucide-react';

const ProfessorDashboard: React.FC = () => {
  const { loading, error, data } = useQuery(GET_COURSE_REVIEWS);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>Error loading reviews: {error.message}</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Professor Dashboard</h1>
      <div className="space-y-6">
        {data.courses.map((course: any) => (
          <div key={course.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">{course.name}</h2>
            <div className="space-y-4">
              {course.reviews.map((review: any) => (
                <div key={review.id} className="border-t pt-4">
                  <div className="flex items-center mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={20}
                        className={`${
                          star <= review.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    By: {review.studentAddress.slice(0, 6)}...
                    {review.studentAddress.slice(-4)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfessorDashboard;