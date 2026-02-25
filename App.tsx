import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layout
import Layout from './components/Layout';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CourseListPage from './pages/CourseListPage';
import CourseDetailPage from './pages/CourseDetailPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import CheckoutPage from './pages/CheckoutPage';
import ApplyPage from './pages/ApplyPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="courses" element={<CourseListPage />} />
          <Route path="courses/:slug" element={<CourseDetailPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="apply" element={<ApplyPage />} />

          {/* Catch-all route to fallback to home if a route is not found */}
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
