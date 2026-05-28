import { Link } from 'react-router-dom';
import '../css/Navbar.css';

function Navbar() {
  return (
    <div className="navbar">
      <h1 className="logo">TrainWithNish</h1>
      <div className="nav-links">
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/trackprotein">
          <button>Track Protein</button>
        </Link>
        <Link to="/exercises">
          <button>Exercises</button>
        </Link>
        <Link to="/planner">
          <button>Planner</button>
        </Link>

        <Link to="https://snackable-jokes-production.up.railway.app/">
          <button>Laugh Bites</button>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
