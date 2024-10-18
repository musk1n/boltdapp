import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from './graphql/client';
import Header from './components/Header';
import Home from './components/Home';
import CourseReview from './components/CourseReview';
import ProfessorDashboard from './components/ProfessorDashboard';

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/review/:courseId" element={<CourseReview />} />
              <Route path="/professor-dashboard" element={<ProfessorDashboard />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;