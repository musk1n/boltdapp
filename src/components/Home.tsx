import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_COURSES } from '../graphql/queries';
import { ethers } from 'ethers';

const Home: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const { loading, error, data } = useQuery(GET_COURSES);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_accounts' });
        setIsConnected(true);
      } catch (err) {
        console.error('Failed to connect to MetaMask', err);
      }
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        setIsConnected(true);
      } catch (err) {
        console.error('Failed to connect to MetaMask', err);
      }
    } else {
      alert('Please install MetaMask to use this feature');
    }
  };

  if (loading) return <p>Loading courses...</p>;
  if (error) return <p>Error loading courses: {error.message}</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Available Courses</h1>
      {!isConnected && (
        <button
          onClick={connectWallet}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600"
        >
          Connect with MetaMask
        </button>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.courses.map((course: any) => (
          <div key={course.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{course.name}</h2>
            <p className="text-gray-600 mb-4">{course.description}</p>
            <Link
              to={`/review/${course.id}`}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Review Course
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;