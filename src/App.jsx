import { useEffect, useState } from "react";
import "./App.css";
import PixelGrid from "./PixelGrid";
import Toolbar from "./Toolbar";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000"
    : null;

function App() {
  const [grid, setGrid] = useState([]);
  const [selectedColor, setSelectedColor] = useState("black");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  // Cas GitHub Pages : pas de back-end
  if (!API_URL) {
    const emptyGrid = [];
    for (let y = 0; y < 20; y++) {
      for (let x = 0; x < 20; x++) {
        emptyGrid.push({ x, y, color: "#FFFFFF" });
      }
    }
    setGrid(emptyGrid);
    setLoading(false);
    return;
  }

  // Cas développement local avec back-end
  fetch(`${API_URL}/grid`)
    .then((response) => response.json())
    .then((data) => {
      setGrid(data.grid);
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching grid:", error);
      setLoading(false);
    });
}, []);



 const updateColor = async (x, y) => {
  try {
    const response = await fetch(`${API_URL}/setGridColor`, {
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
    console.error("Error updating color:", error);
  }
};


  if (loading) {
    return <p>Chargement de la grille…</p>;
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
