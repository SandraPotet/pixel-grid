const express = require("express");
const cors = require("cors");
const db = require("./db/database");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Route GET /grid
app.get("/grid", (req, res) => {
  const rows = db.prepare("SELECT * FROM grid").all();
  res.json({ grid: rows });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.post("/setGridColor", (req, res) => {
  const { x, y, color } = req.body;

  // Mise à jour du pixel
  const update = db.prepare(`
    UPDATE grid
    SET color = ?
    WHERE x = ? AND y = ?
  `);

  update.run(color, x, y);

  // Renvoyer la grille mise à jour
  const rows = db.prepare("SELECT * FROM grid").all();
  res.json({ grid: rows });
});
