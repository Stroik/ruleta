import { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";

type ColorPickerProps = {
  initialColor: string;
  onColorChange: (color: string) => void;
};

export const ColorPicker = ({
  initialColor,
  onColorChange,
}: ColorPickerProps) => {
  const [color, setColor] = useState(initialColor);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    setColor(initialColor);
  }, [initialColor]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{ backgroundColor: color }}
        className="w-full text-center"
      >
        {isOpen ? "❌" : "🎨"}
      </button>
      {isOpen && (
        <div className="absolute top-10 right-0 z-50">
          <HexColorPicker color={color} onChange={onColorChange} />
          <div className="flex">
            <input
              type="text"
              value={color}
              className="w-full"
              onChange={(e) => onColorChange(e.target?.value)}
            />
            <button onClick={() => setIsOpen(false)}>Guardar</button>
          </div>
        </div>
      )}
    </div>
  );
};
