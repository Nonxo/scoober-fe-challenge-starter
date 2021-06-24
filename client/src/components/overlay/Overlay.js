import React from "react";
import "./Overlay.css";
import Balloons from "../../assets/img/balloons.png";

const Overlay = ({ gameData, user }) => {
  return (
    <React.Fragment>
      <div id="overlay">
        <div id="text">
          <img className="flex mb-2" src={Balloons} alt="Profile image" />
          <span className="block font-bold text-4xl text-white text-center mb-3">
            {gameData.winner === user.id ? "You won!" : "You lost!"}
          </span>
          <button
            className="bg-white text-blue-300 active:bg-white font-bold uppercase text-base px-8 py-3 rounded-full shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
          >
            New Game
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Overlay;
