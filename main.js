// Modules to control application life and create native browser window
const { app, BrowserWindow } = require("electron");
const path = require("path");
const https = require("https");

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  });

  // and load the index.html of the app.
  mainWindow.loadFile("index.html");
}


/*
1) Run self-signed https server: go run server.go
2) Run electron app

You will see that "certificate-error" listener is not called.
I am using electron 8.0.1 because I could see that some changes were made recently.

*/


app.on("ready", () => {
  createWindow();

  app.on(
    "certificate-error",
    (event, webContents, url, error, certificate, callback) => {
      console.log("certificate-error");
      event.preventDefault();
      callback(true);
    }
  );

  https
    .get("https:localhost:8080", resp => {
      let data = "";

      // A chunk of data has been recieved.
      resp.on("data", chunk => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on("end", () => {
        console.log(JSON.parse(data).explanation);
      });
    })
    .on("error", err => {
      console.log("Error: " + err.message);
    });
});
