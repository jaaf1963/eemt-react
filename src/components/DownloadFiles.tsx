import React from "react";
interface DownloadFilesProps {
  fileName: string; // El nombre que tendrá el archivo al descargarse.
}

const DownloadFiles: React.FC<DownloadFilesProps> = ({ fileName }) => {
  const handleDownload = async () => {
    try {
      const response = await fetch(fileName);
      if (!response.ok) {
        throw new Error(`Error al descargar: ${response.statusText}`);
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName || "archivo-descargado"; // Usa el nombre proporcionado o un valor por defecto.
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a); // Limpia el elemento a del DOM.
      URL.revokeObjectURL(url); // Libera el objeto URL para evitar fugas de memoria.
    } catch (error) {
      console.error("Error en la descarga:", error);
    }
  };
  //
  return (
    <a href="/#" onClick={handleDownload}>
      {fileName || "Descargar archivo"}
    </a>
  );
};

export default DownloadFiles;
