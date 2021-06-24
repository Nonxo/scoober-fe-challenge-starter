import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Attempt from "./Attempt";
import Overlay from "./overlay/Overlay";

const GameArea = ({ socket, user }) => {
  const gameSelector = useSelector((state) => state.Game);
  const [gameData, setGameData] = useState(null);

  useEffect(() => {
    setGameData(gameSelector.data);
    console.log(gameSelector.data);
  }, [gameSelector]);

  const handleAttempt = (number) => {
    const playerAttempt = { gameId: gameData.id, number, user };
    socket.emit("turn", playerAttempt);
    socket.on("game", (data) => {
      setGameData(data);
    });
  };

  return (
    <React.Fragment>
      {gameData && !gameData.winner && gameData.turn === user.id && (
        <div className="font-bold text-gray-700 dark:text-gray-100 text-xl mb-4">
          Hey {user.nickname}, its your turn to pick a random number
        </div>
      )}
      <div className="relative flex flex-col mx-auto rounded-lg bg-gray-100 shadow-md h-3/4 text-gray-800 w-80">
        <nav className="bg-blue-300 w-full flex mb-4 p-3 rounded-sm shadow-md sm:items-baseline w-full sticky top-0">
          <div className="relative inline-block">
            {gameData && gameData.playerOne.id === user.id ? (
              <img
                className="inline-block object-cover w-12 h-12 rounded-full"
                src="https://avataaars.io/?avatarStyle=Circle&topType=Hat&accessoriesType=Blank&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
                alt=""
              />
            ) : (
              <img
                className="inline-block object-cover w-12 h-12 rounded-full"
                src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
                alt=""
              />
            )}
            <span className="absolute bottom-0 right-0 inline-block w-3 h-3 bg-green-600 border-2 border-white rounded-full" />
          </div>
          <div className="flex-grow pl-3">
            <h6 className="font-mono font-bold text-gray-700 text-xl">
              Welcome!{gameData && gameData ? user.nickname : ""}
            </h6>
            <p className="font-mono text-xs text-gray-500">
              Win the game or win the job
            </p>
          </div>
        </nav>
        {gameData && gameData.winner && (
          <Overlay data={gameData} user={user} socket={socket} />
        )}
        <div className="flex-grow w-full mb-4 px-4 overflow-y-auto">
          <div className="flex justify-start">
            {gameData && gameData.playerOne && (
              <img
                className="inline-block object-cover w-12 h-12 rounded-full"
                src="https://avataaars.io/?avatarStyle=Circle&topType=Hat&accessoriesType=Blank&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
                alt="player_one"
              />
            )}
            {gameData && gameData.playerOne && (
              <div className="flex-col pl-3">
                <div className="bg-blue-400 shadow-lg w-12 h-12 rounded-full inline-flex justify-center py-1 px-2 items-center font-bold text-xl text-gray-50 mb-2">
                  {gameData && gameData.startingNumber}
                </div>
              </div>
            )}
          </div>
          {gameData && gameData.attemps.length > 0 && (
            <Attempt gameData={gameData} />
          )}
        </div>
        <div className="text-center space-x-6 mb-3">
          <div
            className="bg-blue-400 shadow-lg w-12 h-12 rounded-full inline-flex justify-center py-1 px-2 items-center font-bold text-xl cursor-pointer text-gray-50"
            onClick={() => handleAttempt(-1)}
          >
            -1
          </div>
          <div
            className="bg-blue-400 shadow-lg w-12 h-12 rounded-full inline-flex justify-center py-1 px-2 items-center font-bold text-xl cursor-pointer text-gray-50"
            onClick={() => handleAttempt(0)}
          >
            0
          </div>
          <div
            className="bg-blue-400 shadow-lg w-12 h-12 rounded-full inline-flex justify-center py-1 px-2 items-center font-bold text-xl cursor-pointer text-gray-50"
            onClick={() => handleAttempt(1)}
          >
            +1
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default GameArea;
