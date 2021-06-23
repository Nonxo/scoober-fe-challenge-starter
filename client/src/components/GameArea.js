import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const GameArea = ({ socket, user }) => {
  const gameSelector = useSelector((state) => state.Game);
  const [gameData, setGameData] = useState(null);
  const [attempt, setAttempt] = useState({});
  const [selectedNumber, setSelectedNumber] = useState(null);

  useEffect(() => {
    setGameData(gameSelector.data);
    console.log(gameSelector.data);
    startingNumber();
  }, [gameSelector]);

  const startingNumber = () => {
    const randNumber = Math.floor(Math.random() * 10);
    setSelectedNumber(randNumber);
  };

  const calculateValue = () => {
    if (gameData.startingNumber)
      return (selectedNumber + gameData.startingNumber) / 3;
  };

  const handleAttempt = (number) => {
    const playerAttempt = { gameId: gameData.id, number, user };
    selectedNumber(number);
    socket.emit("turn", { playerAttempt });
    socket.on("game", (data) => {
      console.log(data);
    });
  };

  return (
    <React.Fragment>
      {gameData && gameData.turn === user.id && (
        <div className="font-bold text-gray-700 text-xl mb-2">
          Hey {user.nickname}, its your turn to pick a random number
        </div>
      )}
      <div className="mx-auto rounded-lg bg-gray-100 shadow-md text-gray-800 w-80">
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
        <div className="w-full mb-4 px-4 overscroll-auto">
          <div className="relative inline-flex">
            {gameData && gameData.playerOne && (
              <img
                className="inline-block object-cover w-12 h-12 rounded-full"
                src="https://avataaars.io/?avatarStyle=Circle&topType=Hat&accessoriesType=Blank&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
                alt=""
              />
            )}
            {gameData && gameData.playerOne && (
              <div className="flex-col pl-3">
                <div className="bg-blue-400 shadow-lg w-12 h-12 rounded-full inline-flex justify-center py-1 px-2 items-center font-bold text-xl text-gray-50 mb-2">
                  {gameData && gameData.startingNumber}
                </div>
                {/*<div className="flex bg-white shadow-lg min-w-60 h-8 items-center text-black text-xs px-3 py-1 mb-3 rounded-sm">*/}
                {/*  3*/}
                {/*</div>*/}
                {/*<div className="flex bg-white shadow-lg min-w-60 h-8 items-center text-black text-xs px-3 py-1 mb-3 rounded-sm">*/}
                {/*  3*/}
                {/*</div>*/}
              </div>
            )}
          </div>
          <div className="flex justify-end">
            <div className="pl-3">
              <div className="bg-blue-400 shadow-lg w-12 mr-3 h-12 rounded-full inline-flex justify-center py-1 px-2 items-center font-bold text-xl text-gray-50">
                {gameData && gameData.startingNumber}
              </div>
            </div>
            {gameData && gameData?.playerTwo && (
              <img
                className="inline-block float-right object-cover w-12 h-12 rounded-full"
                src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
                alt=""
              />
            )}
          </div>
        </div>
        {gameData && gameData.turn === user.id && (
          <div className="flex space-x-6 mb-3 justify-center">
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
        )}
      </div>
    </React.Fragment>
  );
};

export default GameArea;
