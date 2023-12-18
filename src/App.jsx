import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home.jsx';
import Contacts from './components/Contacts.jsx';
import Skills from './components/Skills.jsx';
import Publications from './components/Publications.jsx';
import OpenSource from './components/OpenSource.jsx';
import InteractiveCV from './components/InteractiveCV.jsx';

const App = () => {
  return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/opensource" element={<OpenSource />} />
          <Route path="/interactivecv" element={<InteractiveCV />} />
        </Routes>
      </Router>
  );
};

export default App;