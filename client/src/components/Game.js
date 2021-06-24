import React, { useState } from "react";
import { generateUserId } from "../utils/utils";
import Logo from "../assets/img/logo.png";
import { ArrowCircleRightIcon } from "@heroicons/react/outline";
import GameArea from "./GameArea";
import { useDispatch } from "react-redux";
import { handleRequest } from "../redux/actions/actionCreator";

const Game = ({ socket }) => {
  const [user, setUser] = useState(null);
  const [optionValue, setOptionValue] = useState("single");
  const [showNextButton, setShowNextButton] = useState(false);
  const [isSingleUser, setIsSingleUser] = useState(true);
  const [gameData, setGameData] = useState(null);
  const dispatch = useDispatch();
  const player = {
    id: generateUserId(),
    nickname: "",
    score: "",
    isWinner: false,
  };

  const handleChange = (event) => {
    if (event.target.value) {
      player.nickname = event.target.value;
      setUser(player);
      setShowNextButton(true);
    } else {
      setShowNextButton(false);
    }
  };

  const handleOptionChange = (event) => {
    setOptionValue(event.target.value);
    if (optionValue === "single") {
      setIsSingleUser(true);
    } else {
      setIsSingleUser(false);
    }
  };

  const onPlayModeSelected = () => {
    socket.emit("newgame", { user, isSingleUser });
    socket.on("game", (data) => {
      setGameData(data);
      console.log(data);
      dispatch(handleRequest("FETCH_PLAYER_DATA", data));
    });
  };

  return (
    <React.Fragment>
      {!gameData ? (
        <div className="bg-white p-10 rounded-lg shadow-xl">
          <div className="text-center mt-1 mb-3">
            <img
              className="inline object-cover w-16 h-16 mr-2 rounded-full"
              src={Logo}
              alt="Profile image"
            />
          </div>
          <div className="mt-4 mb-4">
            <label
              htmlFor="something"
              className="block text-gray-500 font-medium text-sm mb-2"
            >
              Nickname
            </label>
            <input
              type="text"
              placeholder="Enter your nickname"
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              onChange={handleChange}
            />
          </div>
          <div className="flex">
            <label className="inline-flex items-center mt-3 pr-2">
              <input
                type="radio"
                className="form-radio h-5 w-5 text-gray-600"
                value="single"
                onChange={handleOptionChange}
                checked={optionValue === "single"}
              />
              <span className="ml-2 text-gray-500 font-medium text-sm">
                Single Player
              </span>
            </label>
            <label className="inline-flex items-center mt-3">
              <input
                type="radio"
                className="form-radio h-5 w-5 text-gray-600"
                value="multi"
                onChange={handleOptionChange}
                checked={optionValue === "multi"}
              />
              <span className="ml-2 text-gray-500 font-medium text-sm">
                Multiplayer
              </span>
            </label>
          </div>
          {isSingleUser && showNextButton && (
            <div className="flex justify-end mt-5">
              <ArrowCircleRightIcon
                className="text-center h-8 w-8 text-gray-500 cursor-pointer"
                onClick={onPlayModeSelected}
              />
            </div>
          )}
          {!isSingleUser && gameData?.playerTwo == null && showNextButton && (
            <div className="flex justify-end mt-5">
              <button
                type="button"
                className="inline-flex items-center bg-blue-500 hover:bg-blue-700 focus:outline-none text-white text-center py-2 px-3 rounded-full"
              >
                Join Game
              </button>
            </div>
          )}
        </div>
      ) : (
        <GameArea socket={socket} user={user} />
      )}
    </React.Fragment>
  );
};

export default Game;
