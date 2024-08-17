import React ,{useState} from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import About from './components/About';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

const App =()=> {
 const [progress, setProgress] = useState(0);

    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            color='#f11946'
            progress={progress}
          />
          <Routes>
            <Route 
              path='/about' 
              element={<About />} 
            />
            <Route 
              path='/' 
              element={<News setProgress={setProgress} />} // Passing setProgress to News
            />
          </Routes>
        </Router>
      </div>
    )
}

export default App;
