const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    method: ["GET", "POST"],
  },
});

const port = process.env.PORT || 5000;

const index = require("./route");
const {
  PLAYER,
  createNewGame,
  joinGame,
  findGame,
  turn,
  leaveGame,
} = require("./utils");

app.use(index);

//Fake DB
let gamesState = [];

const onLeave = (state, id) => {
  const [newState, updatedGame] = leaveGame(state, id);
  gamesState = newState;
  if (updatedGame) {
    io.to(updatedGame.id).emit("game", updatedGame);
  }
};

io.on("connection", (socket) => {
  console.log(socket.id, "a user connected");

  socket.on("newgame", ({ user, isSingleUser }) => {
    socket.userId = user.id;

    if (isSingleUser) {
      console.log(isSingleUser);
      const game = createNewGame({ user, isSingleUser });
      gamesState.push(game);

      socket.join(game.id);

      io.to(game.id).emit("game", game);
    } else {
      const startedGame = gamesState.find(
        (game) => game.playerTwo === null && game.winner === null
      );

      if (!startedGame) {
        const game = createNewGame({ user });

        gamesState.push(game);
        socket.join(game.id);
        io.to(game.id).emit("game", game);
      } else {
        gamesState = joinGame(gamesState, startedGame.id, user);

        socket.join(startedGame.id);

        io.to(startedGame.id).emit(
          "game",
          findGame(gamesState, startedGame.id)
        );
      }
    }
  });

  socket.on("turn", (attempt) => {
    gamesState = turn(gamesState, attempt);
    console.log(gamesState);
    console.log(attempt.gameId);

    const game = findGame(gamesState, attempt.gameId);

    io.to(attempt.gameId).emit("game", game);

    if (game.playerTwo && game.playerTwo.id === PLAYER.id) {
      setTimeout(() => {
        const fakeAttempt = {
          gameId: attempt.gameId,
          user: PLAYER,
          number: [-1, 0, 1][Math.floor(Math.random() * 3)],
        };

        gamesState = turn(gamesState, fakeAttempt);

        io.to(attempt.gameId).emit(
          "game",
          findGame(gamesState, attempt.gameId)
        );
      }, 600);
    }
  });

  socket.on("left", () => onLeave(gamesState, socket.userId));

  socket.on("disconnect", () => onLeave(gamesState, socket.userId));
});

http.listen(port, () => console.log(`Listening on port ${port}`));
