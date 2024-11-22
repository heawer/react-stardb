import React, { Component } from 'react';

import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import SwapiService from '../../services/api';

import './index.css';

export default class RandomPlanet extends Component {
  swapiService = new SwapiService();

  state = {
    planet: {},
    loading: true
  };

  constructor() {
    super();
    this.updatePlanet();
    this.interval = setInterval(this.updatePlanet, 2500);
  }

  onPlanetLoaded = (planet) => {
    this.setState({
      planet,
      loading: false,
      error: false
    });
  };

  // eslint-disable-next-line no-unused-vars
  onError = (_unused) => {
    this.setState({
      error: true,
      loading: false
    });
  };

  updatePlanet() {
    const id = Math.floor(Math.random() * 25);
    this.swapiService
      .getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError);
  }

  render() {
    const { planet, loading, error } = this.state;

    const hasData = !(loading || error);

    const errorMessage = error ? <ErrorIndicator/> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <Planet planet={planet}/> : null;

    return (
      <div className="random-planet jumbotron rounded">
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  }
}

const Planet = ({ planet }) => {
  const planetImage = `https://starwars-visualguide.com/assets/img/planets/${planet.id}.jpg`;
  
  return (
    <React.Fragment>
      <img className="planet-image" src={planetImage} />
      
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
    </React.Fragment>
  );
};
