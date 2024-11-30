import { Link } from 'react-router-dom';

import './index.css';

const Header = ({ onServiceChange }) => {
  return (
<div className="header navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <h3 className="navbar-brand">
      <Link to="/">StarDB</Link>
    </h3>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/people">People</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/planets">Planets</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/starships">Starships</Link>
        </li>
      </ul>
      <button onClick={onServiceChange} className="btn btn-dark ms-auto">
        Change Service
      </button>
    </div>
  </div>
</div>

  );
};

export default Header;
