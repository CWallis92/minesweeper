import sqlite3 from "sqlite3";

sqlite3.verbose();

const db = new sqlite3.Database(
  `${__dirname}/minesweeper_scores.db`,
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) return console.error(err);
    console.log("Connection successful");
  }
);

db.exec(`
  CREATE TABLE IF NOT EXISTS easy(
    id INTEGER NOT NULL PRIMARY KEY,
    name TEXT,
    time INTEGER
  )
`);

const sql = `
  INSERT INTO easy
    (name, time)
  VALUES
    (?,?)`;

db.run(sql, [`Chris`, 4], (err) => {
  if (err) return console.error(err.message);
  console.log("New row added");
});

db.all("SELECT * FROM easy", [], (err, rows) => {
  if (err) return console.error(err.message);

  rows.forEach((row) => {
    console.log(row);
  });
});

db.close((err) => {
  if (err) return console.error(err.message);
});
