const express = require("express");
const app = express();
const http = require("http");
const socketIo = require("socket.io");

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

const server = http.createServer(app);

const io = socketIo(server);

let interval;

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
  console.log("a user connected");

  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });

  socket.on("newgame", ({ user, isSingleUser }) => {
    socket.userId = user.id;

    if (isSingleUser) {
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

const getApiAndEmit = (socket) => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};

server.listen(port, () => console.log(`Listening on port ${port}`));
