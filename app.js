// app.js
const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set the view engine to EJS
app.set("view engine", "ejs");

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Socket.IO connection handling
io.on("connection", (socket) => {

  socket.on("send-location",(data)=>{
    io.emit("receive-location",{
      id:socket.id,
      ...data
    });
  })
  console.log("A user connected");

  socket.on("disconnect", () => {
    io.emit("user-disconnected",socket.id);
  })

});

// Render the index page
app.get("/", (req, res) => {
  res.render("index");
});

// Start the server
server.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
