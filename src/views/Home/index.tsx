import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import About from './components/About';
import Experience from './components/Experience';
import Header from './components/Header';
import Nav from './components/Nav';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import type { AppDispatch } from '../../config/store';
import { loadHomePayload } from '../../config/store/action';

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(loadHomePayload());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Nav />
      <About />
      <Experience />
      <Portfolio />
      <Contact />
      <Footer />
    </>
  );
};

export default Home;
