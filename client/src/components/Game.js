import React, { useEffect, useState } from "react";
import { generateUserId } from "../utils/utils";
import Logo from "../assets/img/logo.png";
import { ArrowCircleRightIcon } from "@heroicons/react/outline";
import GameArea from "./GameArea";

const Game = ({ socket }) => {
  const [user, setUser] = useState(null);
  const [optionValue, setOptionValue] = useState("single");
  const [showNextButton, setShowNextButton] = useState(false);
  const [isSinglePlayer, setIsSinglePlayer] = useState(true);
  const [gameData, setGameData] = useState(null);
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
      setIsSinglePlayer(true);
    } else {
      setIsSinglePlayer(false);
    }
  };

  const onPlayModeSelected = () => {
    socket.emit("newgame", { user, isSinglePlayer });
    socket.on("game", (data) => {
      setGameData(data);
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
          {showNextButton && (
            <div className="flex justify-end mt-5">
              <ArrowCircleRightIcon
                className="text-center h-8 w-8 text-gray-500 cursor-pointer"
                onClick={onPlayModeSelected}
              />
            </div>
          )}
        </div>
      ) : (
        <GameArea />
      )}
    </React.Fragment>
  );
};

export default Game;
