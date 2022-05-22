import React from "react";
import About from "../components/about/About";
import Experience from "../components/experience/Experience";
import Header from "../components/header/Header";
import Nav from "../components/nav/Nav";
import Services from "../components/services/Services";
import Portfolio from "../components/portfolio/Portfolio";
import Testimonial from "../components/testimonial/Testimonial";
import Contact from "../components/contact/Contact";
import Footer from "../components/footer/Footer";

function Index() {
  return (
    <React.Fragment>
      <Header />
      <Nav />
      <About />
      <Experience />
      <Services />
      <Portfolio />
      <Testimonial />
      <Contact />
      <Footer />
    </React.Fragment>
  );
}

export default Index;
