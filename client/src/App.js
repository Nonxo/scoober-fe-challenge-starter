import React, { useState } from "react";
import Game from "./components/Game";
import socketIOClient from "socket.io-client";
const SERVER = "http://127.0.0.1:5000";

function App() {
  const [loading, setLoading] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const socket = socketIOClient(SERVER);

  const handleClickEvent = () => {
    setLoading(true);

    setTimeout(() => {
      setStartGame(true);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="container flex flex-col justify-center items-center h-screen m-auto">
      {!startGame ? (
        <>
          <div className="text-4xl font-extrabold text-center dark:text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
              Scoober Team Game!
            </span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="animate-bounce h-6 w-6 text-center my-4 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
            />
          </svg>
          <div className="space-y-4">
            <button
              type="button"
              className="inline-flex items-center bg-blue-500 hover:bg-blue-700 focus:outline-none text-white text-center my-4 py-2 px-3 rounded-full"
              onClick={handleClickEvent}
            >
              {loading && (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
              {loading ? "loading..." : "Start New Game"}
            </button>
          </div>
        </>
      ) : (
        <Game socket={socket} />
      )}
    </div>
  );
}

export default App;
