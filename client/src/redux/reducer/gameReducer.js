const gameReducer = (state = {}, action) => {
  switch (action.type) {
    case "FETCH_PLAYER_DATA":
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default gameReducer;
