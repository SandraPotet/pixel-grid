import "./Toolbar.css";

const Toolbar = ({ selectedColor, setSelectedColor }) => {
  const colors = [
    "black",
    "red",
    "green",
    "blue",
    "yellow",
    "purple",
    "orange",
    "pink",
  ];

  return (
    <div className="toolbar">
      {colors.map((color) => (
        <button
          key={color}
          className={
            selectedColor === color ? "color-btn active" : "color-btn"
          }
          style={{ backgroundColor: color }}
          onClick={() => setSelectedColor(color)}
          aria-label={`Select ${color}`}
        />
      ))}
    </div>
  );
};

export default Toolbar;
