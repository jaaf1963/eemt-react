import React, { useState } from "react";

interface DropdownItem {
  id: number;
  name: string;
}

interface Props {
  items: DropdownItem[];
}

const ItemsDropdown: React.FC<Props> = ({ items }) => {
  const [hoveredItemId, setHoveredItemId] = useState<number | null>(null);

  return (
    <ul>
      {items.map((item) => (
        <li
          key={item.id}
          onMouseOver={() => setHoveredItemId(item.id)}
          onMouseLeave={() => setHoveredItemId(null)}
          style={{
            backgroundColor: hoveredItemId === item.id ? "yellow" : "white", // Cambia el color al hacer hover
            cursor: "pointer",
          }}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
};

export default ItemsDropdown;
