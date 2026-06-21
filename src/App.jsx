import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Navbar from './pages/Navbar';
import Home from './pages/Home';
import TrackProtein from './pages/TrackProtein';
import MuscleMap from './pages/MuscleMap';
import TrackPRs from './pages/TrackPRs';
import CravingsController from './pages/CravingsController';
import Exercises from './pages/Exercises';
import WorkoutPlanner from './pages/WorkoutPlanner';
import ProgressTracker from './pages/ProgressTracker';
import DailyMotivation from './pages/DailyMotivation';
import ChallengeCorner from './pages/ChallengeCorner';
import SupplementGuide from './pages/SupplementGuide';
import NutritionTips from './pages/NutritionTips';
import TransformationStories from './pages/TransformationStories';

function App() {

  return (
   <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trackprotein" element={<TrackProtein />} />
          <Route path="/musclemap" element={<MuscleMap />} />
          <Route path="/trackprs" element={<TrackPRs />} />
          <Route path="/cravings" element={<CravingsController />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/planner" element={<WorkoutPlanner />} />
          <Route path="/progress" element={<ProgressTracker />} />
          <Route path="/motivation" element={<DailyMotivation />} />
          <Route path="/challenges" element={<ChallengeCorner />} />
          <Route path="/supplements" element={<SupplementGuide />} />
          <Route path="/nutrition" element={<NutritionTips />} />
          <Route path="/stories" element={<TransformationStories />} />
        </Routes>
    </Router>
  )
}

export default App
