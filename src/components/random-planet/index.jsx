import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import SwapiService from '../../services/api';

import './index.css';

export default class RandomPlanet extends Component {
  static defaultProps = {
    updateInterval: 10000
  };

  static propTypes = {
    updateInterval: PropTypes.number
  };

  swapiService = new SwapiService();

  state = {
    planet: {},
    loading: true
  };

  componentDidMount() {
    const { updateInterval } = this.props;
    this.updatePlanet();
    this.interval = setInterval(this.updatePlanet, updateInterval);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onPlanetLoaded = (planet) => {
    this.setState({
      planet,
      loading: false,
      error: false
    });
  };

  onError = (err) => {
    this.setState({
      error: true,
      loading: false
    });
  };

  updatePlanet = () => {
    const id = Math.floor(Math.random()*17) + 2;
    this.swapiService
      .getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError);
  };

  render() {
    const { planet, loading, error } = this.state;

    const hasData = !(loading || error);

    const errorMessage = error ? <ErrorIndicator/> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <PlanetView planet={planet}/> : null;

    return (
      <div className="jumbotron rounded">
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  }

}

const PlanetView = ({ planet }) => {

  const { id, name, population,
    rotationPeriod, diameter } = planet;

  return (
    <React.Fragment>
      <div className="random-planet card bg-dark text-white">
        <div className="row g-0">
          <h2>Random Planet</h2>

          <div className="col-md-4">
            <img
              className="img-fluid rounded-start"
              src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
              alt="planet"
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h4 className="card-title">{name}</h4>
              <ul className="list-group list-group-flush">
                <li className="list-group-item bg-dark text-white">
                  <span className="term">Population:</span> {population}
                </li>
                <li className="list-group-item bg-dark text-white">
                  <span className="term">Rotation Period:</span> {rotationPeriod}
                </li>
                <li className="list-group-item bg-dark text-white">
                  <span className="term">Diameter:</span> {diameter}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};