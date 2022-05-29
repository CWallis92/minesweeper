import express from "express";

const app = express();

const PORT = 9090;

app.get("/", (req, res) => res.send("Hi"));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
