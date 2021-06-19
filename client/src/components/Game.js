import React, { useEffect, useState } from "react";
import { generateUserId } from "../utils/utils";
import socketIOClient from "socket.io-client";
import Logo from "../assets/img/logo.png";
import { ArrowCircleRightIcon } from "@heroicons/react/outline";
const SERVER = "http://127.0.0.1:5000";

const Game = ({ isSinglePLayer }) => {
  const [user, setUser] = useState({});
  const player = {
    id: generateUserId(),
    nickname: "",
    score: "",
    isWinner: false,
  };

  const handleChange = (event) => {
    player.nickname = event.target.value;
  };

  const onPlayModeSelected = () => {
    setUser(player);
  };

  useEffect(() => {
    const socket = socketIOClient(SERVER);
    console.log(socket);
    socket.emit("newgame", { user, isSinglePLayer });

    socket.on("game", (data) => {
      console.log(data);
    });
  }, [user]);

  return (
    <div className="bg-white p-10 rounded-lg shadow-md">
      <div className="text-center mt-1 mb-3">
        <img
          className="inline object-cover w-16 h-16 mr-2 rounded-full"
          src={Logo}
          alt="Profile image"
        />
      </div>
      <div className="mt-4 mb-10">
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
      {player.nickname && (
        <div className="flex justify-center">
          <ArrowCircleRightIcon className="text-center h-8 w-8 text-gray-500" />
        </div>
      )}
    </div>
  );
};

export default Game;
