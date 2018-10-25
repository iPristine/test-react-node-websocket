var http = require("http");
const WebS = require("ws");

const server = http.createServer();
const wss = new WebS.Server({ server });

const messages = [];

wss.on("connection", ws => {
  console.log("We have new visitor");
  ws.send(
    JSON.stringify({
      type: "messages",
      messages: messages
    })
  );

  ws.on("message", msg => {
    let newMessage = { key: messages.length, ...JSON.parse(msg) };
    messages.push(newMessage);
    wss.clients.forEach(el =>
      el.send(JSON.stringify({ type: "message", message: newMessage }))
    );
    console.log(newMessage);
  });

  ws.on("close", () => {
    console.log("Some one disconnect");
  });
});

server.listen(8000, "127.0.0.1", function() {
  console.log("Сервер начал прослушивание запросов на порту 3000");
});
