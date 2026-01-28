import React from "react";
import Papa from "papaparse";

interface ExportCSVProps {
  data: any[]; // Datos provenientes del padre
  filename: string;
}

const ExportCsvTable: React.FC<ExportCSVProps> = ({ data, filename }) => {
  const handleExport = () => {
    // 1. Convertir JSON a CSV
    const csv = Papa.unparse(data, { delimiter: ";" });

    // 2. Crear un Blob con los datos
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

    // 3. Crear enlace y forzar descarga
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `${filename}.csv`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <button
      onClick={handleExport}
      className="btn-modifi-user"
      style={{
        width: "100px",
        height: "25px",
        border: "4px",
        color: "blue",
        marginLeft: "10px",
      }}
    >
      Exportar csv
    </button>
  );
};

export default ExportCsvTable;
