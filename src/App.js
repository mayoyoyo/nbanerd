import React, { Component } from "react";
import axios from "axios"; // import axios for handling HTTP requests
import "bootstrap/dist/css/bootstrap.min.css"; // import BootStrap
import backgroundImage from "./bg.png"; // import background image
import "./App.css"; // import custom CSS

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerFound: false, // boolean noting whether player is found
      yearFound: false, // boolean noting whether stat year is found
      id: null, // player ID in API
      name: null, // player name
      year: null, // stat year
      info: {}, // player information
      teaminfo: {}, // player team information
      stats: {}, // player year stats
    };

    // NBA team primary colors
    this.TEAM_COLORS = {
      ATL: "#E03A3E",
      BOS: "#BA9653",
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
      LAC: "#C8102E",
      LAL: "#552583",
      MEM: "#12173F",
      MIA: "#000000",
      MIL: "#00471B",
      MIN: "#0C2340",
      NOP: "#0C2340",
      NYK: "#006BB6",
      OKC: "#EF3B24",
      ORL: "#C4CED4",
      PHI: "#ED174C",
      PHX: "#1D1160",
      POR: "#000000",
      SAC: "#63727A",
      SAS: "#000000",
      TOR: "#CE1141",
      UTA: "#002B5C",
      WAS: "#002B5C",
    };
    // NBA team secondary colors
    this.TEAM_COLORS2 = {
      ATL: "#C1D32F",
      BOS: "#007A33",
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
      LAC: "#1D428A",
      LAL: "#FDB927",
      MEM: "#5D76A9",
      MIA: "#98002E",
      MIL: "#EEE1C6",
      MIN: "#236192",
      NOP: "#C8102E",
      NYK: "#F58426",
      OKC: "#007AC1",
      ORL: "#0077C0",
      PHI: "#006BB6",
      PHX: "#E56020",
      POR: "#E03A3E",
      SAC: "#5A2D81",
      SAS: "#C4CED4",
      TOR: "#000000",
      UTA: "#F9A01B",
      WAS: "#E31837",
    };
  }

  // function obtaining the search results of current query
  handleSubmit = (event) => {
    event.preventDefault();
    this.getPlayerId(); // search for player ID
  };

  // function updating the value of player search query
  handleChange = (event) => {
    // API needs spaces to be replaced with underscores
    const query = event.target.value.split(" ").join("_");
    if (query.length > 0) {
      this.setState({ name: query });
    }
  };

  // function obtaining player ID from name search
  getPlayerId = () => {
    // make HTTP request to API
    axios
      .get(
        `https://www.balldontlie.io/api/v1/players?search=${this.state.name}`
      )
      .then(async (response) => {
        // if search is successful
        if (response.data.data.length > 0) {
          // call getInfo function with player ID
          await this.getInfo(response.data.data[0].id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // function for obtaining random player
  getRandom = () => {
    // make HTTP request to API for all players
    axios
      .get(`https://www.balldontlie.io/api/v1/players`)
      .then(async (response) => {
        if (response.data.data.length > 0) {
          const totalPages = response.data.meta.total_pages; // number of pages of players
          // generate random page index from 1 to totalPages
          const index = Math.floor(Math.random() * totalPages) + 1;
          // call getRandomID function with random page index
          await this.getRandomId(index);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // helper function to getRandom that finds random player ID in page
  getRandomId = (index) => {
    // make HTTP request to API for all players in page index
    axios
      .get(`https://www.balldontlie.io/api/v1/players?page=${index}`)
      .then(async (response) => {
        if (response.data.data.length > 0) {
          const numEntries = response.data.data.length; // number of players in page
          // generate random player index
          const playerIndex = Math.floor(Math.random() * numEntries);
          // call getInfo function with player ID
          await this.getInfo(response.data.data[playerIndex].id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // function for obtaining player information
  getInfo = (playerId) => {
    // make HTTP request to API for player with input ID
    axios
      .get(`https://www.balldontlie.io/api/v1/players/${playerId}`)
      .then(async (response) => {
        this.setState({ id: playerId }); // populate id field
        this.setState({ playerFound: true }); // mark as player found
        this.setState({ yearFound: false }); // mark as year not yet found
        this.setState({ info: response.data }); // populate info field
        this.setState({ teaminfo: response.data.team }); // populate teaminfo field
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // function obtaining the year stats of current query
  handleSubmitYear = (event) => {
    event.preventDefault();
    this.getStats(); // search for year in the player's stats
  };

  // function updating the value of year query
  handleChangeYear = (event) => {
    const query = event.target.value;
    if (query.length > 0) {
      this.setState({ year: query });
    }
  };

  // function obtaining player's year stats
  getStats = () => {
    // make HTTP request to API with year and player ID (already populated)
    axios
      .get(
        `https://www.balldontlie.io/api/v1/season_averages?season=${this.state.year}&player_ids[]=${this.state.id}`
      )
      .then(async (response) => {
        if (response.data.data.length > 0) {
          this.setState({ stats: response.data.data[0] }); // populate stats field
          this.setState({ yearFound: true }); // mark year as found
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // render loop
  render() {
    // welcome blurb and user guide
    const welcome = (
      <div>
        <div className="credits">
          <div className="col-sm">
            Welcome to NBA Nerd! Search for your favorite NBA players in history
            or discover random players you never knew existed. Find that
            player's advanced stats from any valid season from 1979. 2020-21
            season stats will be updated every 10 minutes once games begin.
            <br /> <br />
            Note that some players may not have positions and/or measurements
            listed.
          </div>
        </div>
      </div>
    );

    // player info card
    const infoResults = (
      <div>
        <div className="card">
          <div
            className="name"
            style={{
              // set border color to team primary color
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
                // fill card color to team secondary color
                this.TEAM_COLORS2[this.state.teaminfo.abbreviation]
              }`,
            }}
          >
            <div className="row">
              <div className="col-sm">
                <div className="roundedBox">
                  TEAM
                  <br />
                  {this.state.teaminfo["full_name"]}
                </div>
              </div>
              <div className="col-sm">
                <div className="roundedBox">
                  POSITION
                  <br />
                  {this.state.info["position"]}
                </div>
              </div>
              <div className="col-sm">
                <div className="roundedBox">
                  HEIGHT: {this.state.info["height_feet"]}'{" "}
                  {this.state.info["height_inches"]}"
                  <br />
                  WEIGHT: {this.state.info["weight_pounds"]}lb
                </div>
              </div>
            </div>
          </div>
          <form className="year" onSubmit={this.handleSubmitYear}>
            <label>
              <input
                className="form-control"
                type="text"
                onChange={this.handleChangeYear}
                placeholder="Search Stats Year"
              />
            </label>
          </form>
        </div>
      </div>
    );
    // stats card
    const yearResults = (
      <div>
        <div className="card">
          <div
            className="name"
            style={{
              borderColor: `${
                // set border color to team primary color
                this.TEAM_COLORS[this.state.teaminfo.abbreviation]
              }`,
            }}
          >
            {this.state.stats["season"]}-
            {parseInt(this.state.stats["season"]) + 1} Statistics
          </div>
          <div
            className="container"
            style={{
              backgroundColor: `${
                // fill card color to team secondary color
                this.TEAM_COLORS2[this.state.teaminfo.abbreviation]
              }`,
            }}
          >
            <div className="row">
              <div className="col-sm">
                <div className="roundedBox">
                  BASIC STATS
                  <br />
                  <br />
                  PPG: {this.state.stats["pts"]} points
                  <br />
                  APG: {this.state.stats["ast"]} assists
                  <br />
                  RPG: {this.state.stats["reb"]} rebounds
                  <br />
                  STL: {this.state.stats["stl"]} steals
                  <br />
                  BLK: {this.state.stats["blk"]} blocks
                  <br />
                  TO: {this.state.stats["turnover"]} turnovers
                </div>
              </div>
              <div className="col-sm">
                <div className="roundedBox">
                  SHOOTING SPLITS
                  <br />
                  <br />
                  FG%:{" "}
                  {(parseFloat(this.state.stats["fg_pct"]) * 100).toFixed(1)}%
                  <br />
                  3PT%:{" "}
                  {(parseFloat(this.state.stats["fg3_pct"]) * 100).toFixed(1)}%
                  <br />
                  FT%:{" "}
                  {(parseFloat(this.state.stats["ft_pct"]) * 100).toFixed(1)}%
                  <br />
                  FG (m/a): {this.state.stats["fgm"]} /{" "}
                  {this.state.stats["fga"]}
                  <br />
                  3PT (m/a): {this.state.stats["fg3m"]} /{" "}
                  {this.state.stats["fg3a"]}
                  <br />
                  FT (m/a): {this.state.stats["ftm"]} /{" "}
                  {this.state.stats["fta"]}
                </div>
              </div>
              <div className="col-sm">
                <div className="roundedBox">
                  ADVANCED STATS
                  <br />
                  <br />
                  GP: {this.state.stats["games_played"]} games
                  <br />
                  MPG: {this.state.stats["min"]} mins
                  <br />
                  PF: {this.state.stats["pf"]} fouls
                  <br />
                  DReb: {this.state.stats["dreb"]} def reb
                  <br />
                  OReb: {this.state.stats["oreb"]} off reb
                  <br />
                  eFG%:{" "}
                  {
                    // calculate effective field goal percentage
                    (
                      ((parseFloat(this.state.stats["fgm"]) +
                        0.5 * parseFloat(this.state.stats["fg3m"])) /
                        parseFloat(this.state.stats["fga"])) *
                      100
                    ).toFixed(1)
                  }
                  %
                </div>
              </div>
            </div>
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
          <img
            className="logo"
            src="https://i.ibb.co/Kys5Fjw/logo.png"
            // logo redirects to homepage when clicked
            onClick={() => window.location.reload()}
          />
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
        {
          // if player is found, display infoResults instead of welcome
          this.state.playerFound ? infoResults : welcome
        }
        {
          // if stats are found, display yearResults (displaynothing if not)
          this.state.yearFound ? yearResults : null
        }

        <div className="card">
          {
            // credits box
            " "
          }
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
