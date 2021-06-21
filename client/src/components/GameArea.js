import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const GameArea = ({ socket, user }) => {
  const gameSelector = useSelector((state) => state.Game);
  const [gameData, setGameData] = useState(null);
  const [startNumber, setStartNumber] = useState(null);

  useEffect(() => {
    setGameData(gameSelector.data);
    console.log(gameSelector.data);
    // setStartNumber(gameSelector.data.startNumber)
  }, [gameSelector]);

  // useEffect(() => {
  //   socket.emit;
  // });

  return (
    <React.Fragment>
      <div className="mx-auto rounded-lg bg-gray-100 shadow-md text-gray-800 w-80">
        <nav className="bg-blue-300 w-full flex mb-4 p-3 rounded-sm shadow-md sm:items-baseline w-full">
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
                src="https://uifaces.co/our-content/donated/1H_7AxP0.jpg"
                alt=""
              />
            )}
            <span className="absolute bottom-0 right-0 inline-block w-3 h-3 bg-green-600 border-2 border-white rounded-full" />
          </div>
          <div className="flex-grow pl-3">
            <h6 className="font-bold text-gray-700 text-xl">
              Welcome, {gameData && gameData ? user.nickname : ""}
            </h6>
            <p className="text-xs text-gray-500">Win the game or win the job</p>
          </div>
        </nav>
        <div className="w-full mb-4 px-4">
          <div className="relative inline-flex">
            {gameData && gameData.playerOne && (
              <img
                className="inline-block object-cover w-12 h-12 rounded-full"
                src="https://avataaars.io/?avatarStyle=Circle&topType=Hat&accessoriesType=Blank&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
                alt=""
              />
            )}
            <div className="flex-grow pl-3">
              <div className="bg-blue-400 shadow-lg w-12 h-12 rounded-full inline-flex justify-center pt-2 px-2 item-center font-bold text-xl text-gray-50">
                {gameData && gameData.startingNumber}
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="pl-3">
              <div className="bg-blue-400 shadow-lg w-12 mr-3 h-12 rounded-full inline-flex justify-center pt-2 px-2 item-center font-bold text-xl text-gray-50">
                {gameData && gameData.startingNumber}
              </div>
            </div>
            {gameData && gameData.playerOne && (
              <img
                className="inline-block float-right object-cover w-12 h-12 rounded-full"
                src="https://avataaars.io/?avatarStyle=Circle&topType=Hat&accessoriesType=Blank&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
                alt=""
              />
            )}
          </div>
        </div>
        <div className="flex space-x-6 mb-3 justify-center">
          <div className="bg-blue-400 shadow-lg w-12 h-12 rounded-full inline-flex justify-center pt-2 px-2 item-center font-bold text-xl text-gray-50">
            -1
          </div>
          <div className="bg-blue-400 shadow-lg w-12 h-12 rounded-full inline-flex justify-center pt-2 px-2 item-center font-bold text-xl text-gray-50">
            0
          </div>
          <div className="bg-blue-400 shadow-lg w-12 h-12 rounded-full inline-flex justify-center pt-2 px-2 item-center font-bold text-xl text-gray-50">
            +1
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default GameArea;
