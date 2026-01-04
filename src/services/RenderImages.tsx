import React from "react";
import styles from "./Images/Images.module.css";

interface Props {
  items: string[][];
}

const RenderImages: React.FC<Props> = ({ items }) => {
  return (
    <table>
      <tbody>
        {items.map((row, rowIndex) => (
          // Se utiliza el índice como key para la fila, asumiendo que no hay duplicados
          <tr key={rowIndex}>
            {row.map((cellIndex) => (
              // Se utiliza el índice de la celda como key para la celda
              <td key={cellIndex}>
                <img className={styles.imagesFace} src={row[1]} alt=" " />
                <p>{row[0]}</p>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RenderImages;
