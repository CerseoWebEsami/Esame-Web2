import { Route, Routes } from 'react-router';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import Archive from './pages/Archive.jsx';
import Focus from './pages/Focus.jsx';
import Home from './pages/Home.jsx';
import Profile from './pages/Profile.jsx';
import Radar from './pages/Radar.jsx';

/**
 * Componente principale dell'applicazione Signal Atlas.
 * @returns {React.JSX.Element} - Componente App.
 */
function App() {
  return (
    <>
      <Header />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/radar" element={<Radar />} />
          <Route path="/focus" element={<Focus />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/archive" element={<Archive />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
