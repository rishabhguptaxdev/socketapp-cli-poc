import express from "express";
import { configDotenv } from "dotenv";
import morgan from "morgan";
import http from "http";
import { Server } from "socket.io";

configDotenv();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 8000;

const io = new Server(server);

app.use(morgan("tiny"));

io.on("connection", (socket) => {
	console.log(" user connected with id: ", socket.id);

	socket.on("chat message", (msg) => {
		io.emit("chat message", msg);
	});

	socket.on("disconnect", () => {
		console.log("user disconnected");
	});
});

app.get("/", (req, res) => {
	res.status(200).json({ message: "Everything is running" });
});

server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
