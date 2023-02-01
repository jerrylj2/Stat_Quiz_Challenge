import './StatApp.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Welcome from './pages/Welcome';
import Selection from './pages/Selection'
import Quiz from './pages/Quiz';

const StatApp = () => {
  return (
    <Router>
      <Routes>
          <Route path='/' element={<Welcome />} />
          <Route path='/selection' element={<Selection />} />
          <Route path='/quiz' element={<Quiz/>} />
      </Routes>
    </Router>
  );
};

export default StatApp;