import { user_route } from "./routes/user.route.js";
import { connectMongoDB } from "./utils/connectMongoDB.js";
import { server, app, io } from "./utils/socket.js";
import "./utils/passport.js";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errHandlerMiddleware } from "./middlewares/errhandlerMiddleware.js";
import { auth_router } from "./routes/auth.route.js";
import { tournament_route } from "./routes/tournament.route.js";
import { team_route } from "./routes/team.route.js";
import { player_router } from "./routes/player.route.js";

const PORT = process.env.PORT; // local host port

//? middlewares

//* implemented cors policy in app
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
//* default route
app.get("/", (_, res) => {
  res.send("Server working");
});

//* routes
app.use("/api/v1/user", user_route);
app.use("/api/v1/auth", auth_router);
app.use("/api/v1/tournament", tournament_route);
app.use("/api/v1/team", team_route);
app.use("/api/v1/player", player_router);
connectMongoDB();
server.listen(PORT, () => console.log(`Server running on port : ${PORT}`));

app.use(errHandlerMiddleware); // error handler function
