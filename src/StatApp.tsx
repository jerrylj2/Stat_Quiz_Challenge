import './StatApp.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Welcome from './pages/Welcome';
import Selection from './pages/Selection'
import Quiz from './pages/Quiz';
import Leaderboard from './pages/Leaderboard';

const StatApp = () => {
  return (
    <Router>
      <Routes>
          <Route path='/' element={<Welcome />} />
          <Route path='/selection' element={<Selection />} />
          <Route path='/quiz' element={<Quiz />} />
          <Route path='/leaderboard' element={<Leaderboard />} />
      </Routes>
    </Router>
  );
};

export default StatApp;