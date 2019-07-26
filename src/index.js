import React, { useState } from "react";
import ReactDOM from "react-dom";
import Search from "./img/flame-waiting.png";
import Error from "./img/flame-no-comments.png";

import "./styles.css";

function App() {
  const [artist, SetArtist] = useState("");
  const [song, SetSong] = useState("");
  const [lyrics, SetLyrics] = useState("");
  const [error, SetError] = useState("");

  function formSubmit(e) {
    e.preventDefault();
    callAPI();
  }

  function spaceToUnderScore(x) {
    var tempString = x;
    var stringUnder = tempString.split(" ").join("_");
    return stringUnder;
  }

  function callAPI() {
    var artst = spaceToUnderScore(artist);
    var sng = spaceToUnderScore(song);

    fetch(`https://api.lyrics.ovh/v1/${artst}/${sng}`)
      .then(result => {
        return result.json();
      })
      .then(jsonResult => {
        SetLyrics(jsonResult.lyrics);
        if (jsonResult.error) {
          SetError(jsonResult.error);
        }
      });
  }

  return (
    <div>
      <div className="header">
        <span className="title">LyricFinder</span>
        <form className="customForm" onSubmit={e => formSubmit(e)}>
          <input
            className="inputStylized"
            placeholder="artist"
            type="text"
            value={artist}
            onChange={e => {
              SetArtist(e.target.value);
            }}
          />
          <input
            className="inputStylized"
            placeholder="song"
            type="text"
            value={song}
            onChange={e => {
              SetSong(e.target.value);
            }}
          />
          <button
            disabled={artist && song ? false : true}
            className="customButton"
            type="submit"
          >
            Go
          </button>
        </form>
      </div>
      <div className="lyricsArea">
        {lyrics ? (
          <p className="lyricsText">{lyrics}</p>
        ) : error ? (
          <div className="center">
            <img src={Error} alt="Search Illustrarion" height="240px" />
            <h1>
              Oops..i did it a... i mean, <i>error</i>
            </h1>
          </div>
        ) : (
          <div className="center">
            <img src={Search} alt="Search Illustrarion" height="240px" />
            <h1>Ready When You Are</h1>
          </div>
        )}
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
