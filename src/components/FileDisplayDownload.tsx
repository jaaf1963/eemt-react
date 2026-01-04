import React from "react";

interface FileDisplayProps {
  base64str: string;
  fileName: string;
  numdocum: number;
  onDelete: (fileName: string) => void;
}

const FileDisplayDownload: React.FC<FileDisplayProps> = ({
  base64str,
  fileName,
  numdocum,
  onDelete,
}) => {
  const handleDownload = () => {
    // 1. Convertir la cadena base64 a un Blob
    const byteCharacters = atob(base64str);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray]);
    // 2. Crear una URL de objeto
    const url = URL.createObjectURL(blob);
    // 3. Crear un enlace temporal y simular un clic
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    // 4. Liberar la URL del objeto después de la descarga
    URL.revokeObjectURL(url);
  };
  //
  //
  return (
    <div>
      <button
        className="btn-delete-doc"
        onClick={() => onDelete(fileName)}
        style={{
          width: "70px",
          height: "25px",
          border: "4px",
          color: "tomato",
        }}
      >
        Eliminar
      </button>
      <a href="#" onClick={handleDownload}>
        Descargar: {fileName}
      </a>
    </div>
  );
};

export default FileDisplayDownload;
