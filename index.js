const express = require("express");
const request = require("request");
const app = express();
const fs = require("fs");
const config = require("./config.js");
const path = require('path')

app.use(express.static(path.join(__dirname, 'public')))

app.get("/date=:date", (req, res) => {
  const date = req.params.date;
  const url =
    `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${config.API_KEY}`;
  console.log(url);
  console.log(date);

  // res.send(date);
  request.get({
    url: url,
    json: true,
  }, (err, response, data) => {
    if (err) {
      console.log("Error:", err);
    } else if (response.statusCode !== 200) {
      console.log("Status:", response.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);

      fs.writeFile(`${date}.json`, JSON.stringify(data), (err) => {
        if (err) return res.status(500).send("Error saving json as string");
        res.send("Json saved Juan");
      });
    }
  });
});

app.get('/view', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get("/data=:date", (req, res) => {
  const filePath = `${__dirname}/${req.params.date}.json`;
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) return res.status(404).send({ error: "Data not found Juan" });
    res.json(JSON.parse(data));
  });
});

const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
