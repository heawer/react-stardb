export default class SwapiService {
  _apiBase = "https://swapi.py4e.com/api/";

  // base
  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch URL ${url}, received status ${res.status}`);
    }

    return await res.json();
  }

  // people
  async getAllPeople() {
    const res = await this.getResource(`/people/`);
    return res.results;
  }

  async getPerson(id) {
    return await this.getResource(`/people/${id}/`);
  }

  // planets
  async getAllPlanets() {
    const res = await this.getResource(`/planets/`);
    return res.results;
  }

  async getPlanet(id) {
    return await this.getResource(`/planets/${id}/`);
  }

  // starships
  async getAllStarships() {
    const res = await this.getResource(`/starships/`);
    return res.results;
  }

  async getStarship(id) {
    return await this.getResource(`/starships/${id}/`);
  }
}
