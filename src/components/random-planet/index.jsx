import { Component } from 'react';
import SwapiService from '../../services/api';

import './index.css';
export default class RandomPlanet extends Component {
  swapiService = new SwapiService();

  state = {
    planet: {}
  };

  constructor() {
    super();
    this.updatePlanet();
  }

  onPlanetLoaded = (planet) => {
    this.setState({ planet });
  };

  updatePlanet() {
    const id = Math.floor(Math.random() * 25);

    this.swapiService
      .getPlanet(id)
      .then(this.onPlanetLoaded);
  }

  render() {
    const { planet } = this.state;

    return (
      <div className="random-planet jumbotron rounded">
        <img 
          className="planet-image"
          src={`https://starwars-visualguide.com/assets/img/planets/${planet.id}.jpg`} 
        />

        <div>
          <h4>{planet.name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Population</span>
              <span>{planet.population}</span>
            </li>

            <li className="list-group-item">
              <span className="term">Rotation Period</span>
              <span>{planet.rotationPeriod}</span>
            </li>

            <li className="list-group-item">
              <span className="term">Diameter</span>
              <span>{planet.diameter}</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
