import React, { useState } from "react";
import "./Overlay.css";
import Balloons from "../../assets/img/balloons.png";
import { handleRequest } from "../../redux/actions/actionCreator";
import { useDispatch } from "react-redux";

const Overlay = ({ socket, data, user }) => {
  const dispatch = useDispatch();
  const [gameData, setGameData] = useState(data);

  const newGame = () => {
    const isSingleUser = user.isSingleUser;
    socket.emit("newgame", { user, isSingleUser });
    socket.on("game", (data) => {
      setGameData(data);
      dispatch(handleRequest("FETCH_PLAYER_DATA", data));
    });
  };
  const leaveGame = () => {
    socket.emit("left");
    socket.on("game", (data) => {
      console.log(data);
    });
  };

  return (
    <React.Fragment>
      <div id="overlay">
        <div id="text">
          <img className="flex mb-2" src={Balloons} alt="balloons" />
          <span className="block font-bold text-4xl text-white text-center mb-3">
            {gameData && gameData.winner === user.id ? "You won!" : "You lost!"}
          </span>
          <button
            className="bg-white text-blue-300 active:bg-white font-bold uppercase text-base px-7 py-3 rounded-full shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-2 ease-linear transition-all duration-150"
            type="button"
            onClick={newGame}
          >
            New Game
          </button>
          <button
            className="bg-blue-300 text-white active:bg-blue-300 font-bold uppercase text-base px-6 py-3 rounded-full shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={leaveGame}
          >
            Leave Game
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Overlay;
