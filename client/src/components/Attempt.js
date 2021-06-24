import React from "react";

const Attempt = ({ gameData }) => {
  return gameData.attemps.map((attempt, index) =>
    attempt.user.id === gameData.playerOne.id ? (
      <React.Fragment key={index}>
        <div className="flex justify-start">
          <img
            className="inline-block object-cover mr-3 w-12 h-12 rounded-full"
            src="https://avataaars.io/?avatarStyle=Circle&topType=Hat&accessoriesType=Blank&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
            alt=""
          />
          <div className="bg-blue-400 shadow-lg w-12 h-12 rounded-full inline-flex justify-center py-1 px-2 items-center font-bold text-xl text-gray-50 mb-2">
            {gameData && attempt.number}
          </div>
        </div>
        <div className="flex-col mx-11 pl-3">
          <div className="flex bg-white shadow-lg min-w-70 h-8 items-center text-black text-xs px-3 py-1 mb-3 rounded-sm">
            {attempt.text}
          </div>
          <div className="flex bg-white shadow-lg min-w-70 h-8 items-center text-black text-xs px-3 py-1 mb-3 rounded-sm">
            {attempt.newValue}
          </div>
        </div>
      </React.Fragment>
    ) : (
      <React.Fragment key={index}>
        <div className="flex justify-end mb-3">
          <div className="bg-blue-400 shadow-lg w-12 mr-3 h-12 rounded-full inline-flex justify-center py-1 px-2 items-center font-bold text-xl text-gray-50">
            {attempt.number}
          </div>
          <img
            className="inline-block float-right object-cover w-12 h-12 rounded-full"
            src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
            alt=""
          />
        </div>
        <div className="flex-col justify-start items-center mx-11 pl-3">
          <div className="flex bg-white shadow-lg min-w-60 h-8 items-center justify-end text-black text-xs px-3 py-1 mb-3 rounded-sm">
            {attempt.text}
          </div>
          <div className="flex bg-white shadow-lg min-w-60 h-8 items-center justify-end text-black text-xs px-3 py-1 mb-3 rounded-sm">
            {attempt.newValue}
          </div>
        </div>
      </React.Fragment>
    )
  );
};

export default Attempt;
