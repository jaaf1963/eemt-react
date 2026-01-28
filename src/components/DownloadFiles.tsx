import React from "react";
interface DownloadFilesProps {
  fileName: string;
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
      a.download = fileName || "archivo-descargado";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
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
