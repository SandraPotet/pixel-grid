import { useEffect, useState } from "react";
import "./App.css";
import PixelGrid from "./PixelGrid";
import Toolbar from "./Toolbar";

function App() {
  const [grid, setGrid] = useState([]);
  const [selectedColor, setSelectedColor] = useState("black");
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  // 🔹 MODE DÉVELOPPEMENT : back-end actif
  if (import.meta.env.MODE === "development") {
    fetch("http://localhost:3000/grid")
      .then((response) => response.json())
      .then((data) => {
        setGrid(data.grid);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching grid:", error);
        setLoading(false);
      });
    return;
  }

  // 🔹 MODE PRODUCTION : démo GitHub Pages
  const demoGrid = [];
  for (let y = 0; y < 20; y++) {
    for (let x = 0; x < 20; x++) {
      demoGrid.push({ x, y, color: "#FFFFFF" });
    }
  }
  setGrid(demoGrid);
  setLoading(false);
}, []);


  const updateColor = async (x, y) => {
  // 🔹 MODE DÉVELOPPEMENT : sauvegarde en DB
  if (import.meta.env.MODE === "development") {
    try {
      const response = await fetch("http://localhost:3000/setGridColor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          x,
          y,
          color: selectedColor,
        }),
      });

      const data = await response.json();
      setGrid(data.grid);
    } catch (error) {
      console.error("Error updating grid color:", error);
    }
    return;
  }

  // 🔹 MODE PRODUCTION : démo locale
  setGrid((prevGrid) =>
    prevGrid.map((cell) =>
      cell.x === x && cell.y === y
        ? { ...cell, color: selectedColor }
        : cell
    )
  );
};


  if (loading) {
    return <p>Chargement de la grille...</p>;
  }

  return (
    <div className="content-wrapper">
      <h1>Pixel Grid</h1>
      <Toolbar
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />
      <PixelGrid grid={grid} updateColor={updateColor} />
    </div>
  );
}

export default App;
