import { useEffect, useState } from "react";
import "./App.css";
import PixelGrid from "./PixelGrid";
import Toolbar from "./Toolbar";

function App() {
  const [grid, setGrid] = useState([]);
  const [selectedColor, setSelectedColor] = useState("black");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Grille de démonstration (GitHub Pages)
    const demoGrid = [];
    for (let y = 0; y < 20; y++) {
      for (let x = 0; x < 20; x++) {
        demoGrid.push({ x, y, color: "#FFFFFF" });
      }
    }
    setGrid(demoGrid);
    setLoading(false);
  }, []);

  const updateColor = (x, y) => {
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
