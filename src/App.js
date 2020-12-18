import React, { Component } from "react";
import axios from "axios"; // import axios for handling HTTP requests
import "bootstrap/dist/css/bootstrap.min.css"; // import BootStrap
import backgroundImage from "./bg.png"; // import background image
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: false,
      name: null,
      info: {},
      teaminfo: {},
      stats: {},
    };

    this.TYPE_COLORS = {
      GSW: "#a8a878",
      LAL: "#c03028",
      flying: "#a890f0",
      poison: "#a040a0",
      ground: "#e0c069",
      rock: "#b8a039",
      bug: "#a8b920",
      ghost: "#705899",
      steel: "#b8b8d0",
      fire: "#f08031",
      water: "#6890f0",
      grass: "#78c850",
      electric: "#f8d030",
      psychic: "#f95888",
      ice: "#98d8d8",
      dragon: "#7138f8",
      dark: "#715849",
      fairy: "#ee99ad",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.getPlayerId();
  };

  handleChange = (event) => {
    const query = event.target.value.split(" ").join("_");
    if (query.length > 0) {
      this.setState({ name: query });
    }
  };

  getPlayerId = () => {
    axios
      .get(
        `https://www.balldontlie.io/api/v1/players?search=${this.state.name}`
      )
      .then(async (response) => {
        if (response.data.data.length === 1) {
          await this.getInfo(response.data.data[0].id);
          // await this.getStats(res.data.data[0].id)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getInfo = (playerId) => {
    axios
      .get(`https://www.balldontlie.io/api/v1/players/${playerId}`)
      .then(async (response) => {
        this.setState({ completed: true });
        this.setState({ info: response.data });
        this.setState({ teaminfo: response.data.team });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getStats = (playerId) => {
    axios
      .get(
        `https://www.balldontlie.io/api/v1/season_averages?season=2006&player_ids[]=${playerId}`
      )
      .then(async (response) => {
        this.setState({ stats: response.data.data[0] });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const infoResults = (
      <div>
        <div className="card">
          <div
            className="name"
            style={{
              borderColor: `${
                this.TYPE_COLORS[this.state.teaminfo.abbreviation]
              }`,
            }}
          >
            {this.state.info.first_name} {this.state.info.last_name}
          </div>
        </div>
        <br />
        Position: {this.state.info["position"]}
        <br />
        Team: {this.state.teaminfo["full_name"]}
      </div>
    );
    return (
      <div className="App" style={{ background: `url(${backgroundImage})` }}>
        <div className="header">
          <img className="logo" src="https://i.ibb.co/Vq98tN8/logo.png" />
          <form className="searchbar" onSubmit={this.handleSubmit}>
            <label>
              <input
                className="form-control"
                type="text"
                onChange={this.handleChange}
                placeholder="Search Player"
              />
            </label>
          </form>
        </div>
        {this.state.completed ? infoResults : null}
        <div className="card">
          {" "}
          <div className="credits">
            <div className="col-sm">Developed by Hanson Kang </div>
            <div className="col-sm">
              Powered by{" "}
              <a href="https://reactjs.org/" target="_blank">
                React
              </a>{" "}
              and{" "}
              <a href="https://www.balldontlie.io/" target="_blank">
                balldontlie API
              </a>
            </div>
            <div className="col-sm">
              <a href="https://github.com/mayoyoyo/nbastats" target="_blank">
                Source code
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
