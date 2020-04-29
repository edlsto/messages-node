const http = require("http");
const url = require("url");
const server = http.createServer();

server.listen(3000, () => {
  console.log("The server is listening on Port 3000");
});

let messages = [
  { id: 1, user: "ed stoner", message: "hi!!!!" },
  { id: 2, user: "george smith", message: "what's up?" },
  { id: 3, user: "mary jones", message: "not much!" },
];

const getAllMessages = (response) => {
  response.writeHead(200, { "Content-Type": "text/html" });
  response.write(JSON.stringify(messages));
  response.end();
};

const addMessage = (newMessage, response) => {
  messages.push(newMessage);
  response.writeHead(201, { "Content-Type": "text/html" });
  response.write(JSON.stringify(newMessage));
  response.end();
};

server.on("request", (request, response) => {
  if (request.method === "GET") {
    getAllMessages(response);
  } else if (request.method === "POST") {
    let newMessage = { id: new Date() };
    request.on("data", (data) => {
      newMessage = Object.assign(newMessage, JSON.parse(data));
    });
    request.on("end", () => {
      addMessage(newMessage, response);
    });
  }
});
