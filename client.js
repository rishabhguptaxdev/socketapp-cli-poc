import { io } from "socket.io-client";
import readline from "readline";

const socket = io("http://localhost:8080");

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

socket.on("connect", () => {
	console.log(`I am connected to server with socketId ${socket.id}`);

	rl.on("line", (input) => {
		if (input.trim()) {
			socket.emit("chat message", { msg: input, socketId: socket.id });
		}
	});
});

socket.on("chat message", (msg) => {
	if (socket.id !== msg.socketId) {
		console.log(`Received from ${msg.socketId}: ${msg.msg}`);
	}
});

socket.on("disconnect", () => {
	console.log("Disconnected from server");
	rl.close();
});
