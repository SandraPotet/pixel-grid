import "./PixelGrid.css";

function PixelGrid({ grid, updateColor }) {
  return (
    <div className="grid">
      {grid.map((cell) => (
        <div
          key={`${cell.x}-${cell.y}`}
          className="grid-item"
          style={{
            backgroundColor: cell.color,
            gridColumnStart: cell.x + 1,
            gridRowStart: cell.y + 1,
          }}
          onClick={() => updateColor(cell.x, cell.y)}
        ></div>
      ))}
    </div>
  );
}

export default PixelGrid;
