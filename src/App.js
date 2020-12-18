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

    // NBA team primary colors
    this.TEAM_COLORS = {
      ATL: "#E03A3E",
      BOS: "#007A33",
      BKN: "#000000",
      CHA: "#1D1160",
      CHI: "#000000",
      CLE: "#860038",
      DAL: "#00538C",
      DEN: "#1D428A",
      DET: "#C8102E",
      GSW: "#1D428A",
      HOU: "#CE1141",
      IND: "#002D62",
      LAC: "",
      LAL: "",
      MEM: "",
      MIA: "",
      MIL: "",
      MIN: "",
      NOP: "",
      NYK: "",
      OKC: "",
      ORL: "",
      PHI: "",
      PHX: "",
      POR: "",
      SAC: "",
      SAS: "",
      TOR: "",
      UTA: "",
      WAS: "",
    };
    // NBA team secondary colors
    this.TEAM_COLORS2 = {
      ATL: "#C1D32F",
      BOS: "#BA9653",
      BKN: "#C6CFD4",
      CHA: "#00788C",
      CHI: "#CE1141",
      CLE: "#FDBB30",
      DAL: "#B8C4CA",
      DEN: "#FEC524",
      DET: "#1D42BA",
      GSW: "#FFC72C",
      HOU: "#C4CED4",
      IND: "#FDBB30",
      LAC: "",
      LAL: "",
      MEM: "",
      MIA: "",
      MIL: "",
      MIN: "",
      NOP: "",
      NYK: "",
      OKC: "",
      ORL: "",
      PHI: "",
      PHX: "",
      POR: "",
      SAC: "",
      SAS: "",
      TOR: "",
      UTA: "",
      WAS: "",
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

  getRandom = () => {
    axios
      .get(`https://www.balldontlie.io/api/v1/players`)
      .then(async (response) => {
        if (response.data.data.length > 0) {
          const totalPages = response.data.meta.total_pages;
          // generate random page index
          const index = Math.floor(Math.random() * totalPages) + 1;
          await this.getRandomId(index);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  getRandomId = (index) => {
    axios
      .get(`https://www.balldontlie.io/api/v1/players?page=${index}`)
      .then(async (response) => {
        if (response.data.data.length > 0) {
          const numEntries = response.data.data.length;
          // generate random player
          const playerIndex = Math.floor(Math.random() * numEntries);
          await this.getInfo(response.data.data[playerIndex].id);
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
                this.TEAM_COLORS[this.state.teaminfo.abbreviation]
              }`,
            }}
          >
            {this.state.info.first_name} {this.state.info.last_name}
          </div>
          <div
            className="container"
            style={{
              backgroundColor: `${
                this.TEAM_COLORS2[this.state.teaminfo.abbreviation]
              }`,
            }}
          >
            <div className="row">
              <div className="col-sm">
                <div className="roundedBox">
                  Team: {this.state.teaminfo["full_name"]}
                </div>
              </div>
              <div className="col-sm">
                <div className="roundedBox">
                  Position: {this.state.info["position"]}
                </div>
              </div>
              <div className="col-sm">
                <div className="roundedBox">height</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    const welcome = (
      <div>
        <div className="credits">
          <div className="col-sm">
            Welcome to NBA stats! Search for your favorite NBA players in
            history from the 1979 season to the current season, or discover
            random players you never knew existed.
          </div>
        </div>
      </div>
    );
    return (
      <div className="App" style={{ background: `url(${backgroundImage})` }}>
        <div className="header">
          <button
            type="button"
            className="btn-primary"
            onClick={this.getRandom}
          >
            Random Player
          </button>
          <img className="logo" src="https://i.ibb.co/fnpxV1n/logo.jpg" />
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
        {this.state.completed ? infoResults : welcome}
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
