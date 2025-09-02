import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { GlobalStyles } from './styles/GlobalStyles';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Academy from './components/Academy';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';

const AppContainer = styled.div`
  min-height: 100vh;
  overflow-x: hidden;
`;

function App() {
  return (
    <ThemeProvider>
      <Router>
        <GlobalStyles />
        <AppContainer>
          <Header />
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <Services />
                <About />
                <Academy />
                <Portfolio />
                <Contact />
              </>
            } />
          </Routes>
          <Footer />
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
}

export default App;
