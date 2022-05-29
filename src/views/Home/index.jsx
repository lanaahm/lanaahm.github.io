import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import About from './components/About';
import Experience from './components/Experience';
import Header from './components/Header';
import Nav from './components/Nav';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { getDataFromAPI } from '../../config/store/action';
import { form } from '../../config/constants';
import { ActionType } from '../../config/store/action/globalActionType';

const Home = ({ getDataFromAPIs }) => {
  useEffect(() => {
    const fetchDataEmployee = async () => {
      await getDataFromAPIs(
        form.employeeHistory.collection,
        ActionType.SET_EMPLOYEEHISTORY
      ).catch((err) => err);
    };
    fetchDataEmployee();

    const fetchDataCertification = async () => {
      await getDataFromAPIs(
        form.certification.collection,
        ActionType.SET_CERTIFICATION
      ).catch((err) => err);
    };
    fetchDataCertification();
    const fetchDataExperience = async () => {
      await getDataFromAPIs(
        form.experience.collection,
        ActionType.SET_EXPERIENCE
      ).catch((err) => err);
    };
    fetchDataExperience();
    const fetchDataPortfolio = async () => {
      await getDataFromAPIs(
        form.portfolio.collection,
        ActionType.SET_PORTFOLIO
      ).catch((err) => err);
    };
    fetchDataPortfolio();
    const fetchDataSettings = async () => {
      await getDataFromAPIs(
        form.settings.collection,
        ActionType.SET_SETTINGS
      ).catch((err) => err);
    };
    fetchDataSettings();
  }, [getDataFromAPI]);

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

const mapDispatchToProps = (dispatch) => ({
  getDataFromAPIs: (data, type) => dispatch(getDataFromAPI(data, type))
});

export default connect(null, mapDispatchToProps)(Home);
