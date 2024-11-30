import { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';
import SwapiService from '../../services/api';
import DummySwapiService from '../../services/dummy-api';

import { PeoplePage, PlanetsPage, StarshipsPage } from '../pages';
import { SwapiServiceProvider } from '../swapi-service-context';

import './index.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StarshipDetails from "../sw-components/starship-details";

export default class App extends Component {

  state = {
    swapiService: new SwapiService()
  };

  onServiceChange = () => {
    this.setState(({ swapiService }) => {
      const Service = swapiService instanceof SwapiService ?
                        DummySwapiService : SwapiService;
      return {
        swapiService: new Service()
      };
    });
  };

  render() {
    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService} >
          <Router>
            <div className="p-3">
              <Header onServiceChange={this.onServiceChange} />

              <div className="container py-4">
                <RandomPlanet />

                <Routes>
                  <Route path="/people/" element={<PeoplePage />} />
                  <Route path="/planets" element={<PlanetsPage />} />
                  <Route path="/starships" exact element={<StarshipsPage />} />
                  <Route path="/starships/:id"
                        render={({ match }) => {
                          const { id } = match.params;
                          return <StarshipDetails itemId={id} />
                        }}/>
                </Routes>
              </div>
            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
