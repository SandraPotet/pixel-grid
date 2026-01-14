const path = require("path");
const Database = require("better-sqlite3");

console.log("👉 database.js chargé");

const dbPath = path.join(__dirname, "grid.db");
console.log("👉 DB path:", dbPath);

const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS grid (
    x INTEGER,
    y INTEGER,
    color TEXT
  )
`);

const rowCount = db
  .prepare("SELECT COUNT(*) AS count FROM grid")
  .get().count;

console.log("👉 rowCount =", rowCount);

if (rowCount === 0) {
  console.log("👉 Initialisation de la grille");

  const insert = db.prepare(
    "INSERT INTO grid (x, y, color) VALUES (?, ?, ?)"
  );

  const insertMany = db.transaction(() => {
    for (let y = 0; y < 20; y++) {
      for (let x = 0; x < 20; x++) {
        insert.run(x, y, "#FFFFFF");
      }
    }
  });

  insertMany();
} else {
  console.log("👉 Grille déjà initialisée");
}

module.exports = db;
