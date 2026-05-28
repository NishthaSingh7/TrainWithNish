import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Navbar from './pages/Navbar';
import Hero from './pages/Hero';
import FeatureCard from './pages/FeatureCard';
import TrackProtein from './pages/TrackProtein';
import MuscleMap from './pages/MuscleMap';

function App() {

  return (
   <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<><Hero /><FeatureCard /></>} /> 
          <Route path="/trackprotein" element={<TrackProtein />} />
          <Route path="/musclemap" element={<MuscleMap />} />
          {/* <Route path="/exercises" element={<Exercises />} /> */}
          {/* <Route path="/planner" element={<Planner />} /> */}
        </Routes>
    </Router>
  )
}

export default App
