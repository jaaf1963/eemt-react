import React, { useState, ChangeEvent } from "react";
import dayjs from "dayjs"; // Importa dayjs

// Tipo para el objeto de cada archivo
interface FileInfo {
  name: string;
  selected: boolean;
  file: File; // Se guarda el objeto File para la carga
}

//const auth =
//  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqdWFuYWxiaXMiLCJleHAiOjE3NTg2NjI1MTV9.vP5ja3C28T0X_uyJ1u7yxHprB8zfAnvz8wj-yv_EHts";

interface btnSelProps {
  btnSelEdit: string;
  codSelEdit: string;
  prjSelEdit: string;
  cliSelEdit: string;
  typedocums: string;
  authordocs: string;
  observdocs: string;
  taskssdocs: string;
  advancdocs: string;
  dateindocs: Date | null;
  datenddocs: Date | null;
  existsdocs: string;
}

const emptyFile = new File([""], "empty.txt", { type: "text/plain" });
// Esto crea un objeto File con contenido vacío, nombre 'empty.txt', y tipo 'text/plain'.

const UploadFilesEdit: React.FC<btnSelProps> = ({
  btnSelEdit,
  codSelEdit,
  prjSelEdit,
  cliSelEdit,
  typedocums,
  authordocs,
  observdocs,
  taskssdocs,
  advancdocs,
  dateindocs,
  datenddocs,
  existsdocs,
}) => {
  //
  // Estado del Boton de Envio
  //const [buttonSelEdit, setButtonSelEdit] = useState<string>("");
  // Estado para almacenar la lista de archivos y su estado de selección
  const [files, setFiles] = useState<FileInfo[]>([]);
  //
  const [textRoleStore, setTextRoleStore] = useState(() => {
    const roleStore = localStorage.getItem("role");
    if (roleStore) {
      return roleStore;
    }
    setTextRoleStore("");
    return "";
  });
  //
  const [textUserStore, setTextUserStore] = useState(() => {
    const userStore = localStorage.getItem("username");
    if (userStore) {
      return userStore;
    }
    setTextUserStore("");
    return "";
  });
  //
  const [entyUserStore, setEntyUserStore] = useState(() => {
    const entyStore = localStorage.getItem("entity");
    if (entyStore) {
      return entyStore;
    }
    setEntyUserStore("");
    return "";
  });
  //
  const [authUserStore, setAuthUserStore] = useState(() => {
    const authStore = localStorage.getItem("token");
    if (authStore) {
      return authStore;
    }
    setAuthUserStore("");
    return "";
  });
  //
  // Función para manejar el cambio del input de tipo file
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Limpia lista de Documentos
    setFiles([]);
    // Creamos un nuevo array a partir de los archivos seleccionados
    const newFiles: FileInfo[] = Array.from(event.target.files || []).map(
      (file) => ({
        name: file.name.replaceAll(" ", "-"),
        selected: false,
        file: file,
      })
    );
    setFiles(newFiles);
  };
  //
  // Función para manejar el cambio del checkbox
  const handleCheckboxChange = (fileName: string) => {
    setFiles((prevFiles) =>
      prevFiles.map((f) =>
        f.name === fileName ? { ...f, selected: !f.selected } : f
      )
    );
  };
  //
  // Funcion para ejecutar 'fileInput' indirectamente
  const triggerFileInput = () => {
    // Simula un clic en el input de archivo oculto
    document.getElementById("fileInput")?.click();
  };
  //
  /*
  // Genera Base64 desde File
  const getBlobFromFile = (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        // El resultado de la lectura es un ArrayBuffer. Lo convertimos en Blob.
        const blob = new Blob([reader.result as ArrayBuffer]);
        resolve(blob);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsArrayBuffer(file);
    });
  };
  */
  //
  // Función para enviar los archivos seleccionados al BACKEND
  //
  const handleSendBackend = async () => {
    //
    // Se crea la instancia de un documento nuevo vacio
    // cuando se trabaja con documentos existentes. (solo estudio)
    if (existsdocs.length < 3) {
      existsdocs = "empty.txt";
    }
    if (existsdocs !== null && existsdocs.length > 3 && files.length < 1) {
      //alert("Archivo existente -> " + existsdocs);
      files.push({ file: emptyFile, selected: true, name: existsdocs });
    }
    //
    if (
      textRoleStore !== null &&
      entyUserStore !== null &&
      textUserStore !== null &&
      authUserStore !== null &&
      //buttonSelEdit !== null &&
      files.length > 0
    ) {
      if (textRoleStore === "admin" || textRoleStore === "edit") {
        // Filtramos solo los archivos seleccionados
        const selectedFiles = files.filter((f) => f.selected);
        //
        // Creamos un FormData para enviar los archivos
        const formData = new FormData();
        selectedFiles.forEach((f) => {
          formData.append("files", f.file);
          //const base64 = getBlobFromFile(f.file);
          //formData.append("files", base64);
        });
        //
        let fecIniDocs: string = "";
        if (dateindocs !== null) {
          fecIniDocs = dateindocs?.toString();
        }
        //
        let fecEndDocs: string = "";
        if (datenddocs !== null) {
          fecEndDocs = datenddocs?.toString();
        }
        //
        if (typedocums !== "") {
          if (selectedFiles.length > 0) {
            if (advancdocs.length === 0) {
              advancdocs = "0";
            }
            console.log("entity: ", entyUserStore);
            console.log("codprj: ", codSelEdit);
            console.log("projct: ", prjSelEdit);
            console.log("cliSel: ", cliSelEdit);
            console.log("btnSel: ", btnSelEdit);
            console.log("typdoc:", typedocums);
            console.log("files: ", selectedFiles);
            console.log("exidoc:", existsdocs);
            //
            if (typedocums === "reemplazo") {
              authordocs = "aut";
              observdocs = "obs";
              taskssdocs = "tsk";
              advancdocs = "adv";
            }
            //
            formData.append("entity", entyUserStore);
            formData.append("codprj", codSelEdit);
            formData.append("projct", prjSelEdit);
            formData.append("cliprj", cliSelEdit);
            formData.append("button", btnSelEdit);
            formData.append("typdoc", typedocums);
            formData.append("autdoc", authordocs);
            formData.append("obsdoc", observdocs);
            formData.append("tardoc", taskssdocs);
            formData.append("advdoc", advancdocs);
            formData.append("inidoc", dayjs(fecIniDocs).format("YYYY/MM/DD"));
            formData.append("enddoc", dayjs(fecEndDocs).format("YYYY/MM/DD"));
            formData.append("userna", textUserStore);
            formData.append("docums", existsdocs);
            //
            // Send data to Backend
            try {
              const response = await fetch(
                "http://localhost:5055/insert_documents_react",
                {
                  method: "POST",
                  body: formData,
                  headers: { Authorization: `Bearer ${authUserStore}` }, // JWT
                }
              );
              //
              if (response.ok) {
                //
                alert("Documentos almacenados exitosamente.");
                //const result = await response.json();
                //console.log("Archivos enviados correctamente:", result);
                // Aqui puedes manejar la respuesta del backend
              } else {
                console.error("Error al enviar los archivos.");
                alert(
                  "Server envió un error al procesar la petición . . . revisar."
                );
              }
            } catch (error) {
              console.error("Error en la conexión:", error);
              alert("Se detectó un Error en la conexión . . . revisar.");
            }
          } else {
            alert("Debe seleccionar archivos de la lista cargada.");
          }
        } else {
          alert("Debe seleccionar tipo de documento a subir.");
        }
      } else {
        alert("No tiene privilegios para modificar la informacion.");
      }
    } else {
      alert("Debe seleccionar un Botón y archivos a subir...");
    }
  };
  //
  return (
    <div>
      {/* Input para seleccionar archivos */}
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        style={{ display: "none" }} // Oculta el input nativo
        id="fileInput"
      />
      {/* El botón o label estilizado que el usuario ve */}
      <button onClick={triggerFileInput} className="button-upload-docs">
        {files
          ? `${files.length} archivo(s) seleccionado(s)`
          : "Elegir archivos"}
      </button>

      {/* Renderizado de la lista de archivos con checkboxes */}
      <ul>
        {files.map((f) => (
          <li key={f.name}>
            <label>
              <input
                type="checkbox"
                checked={f.selected}
                onChange={() => handleCheckboxChange(f.name)}
              />
              {f.name}
            </label>
          </li>
        ))}
      </ul>

      {/* Botón para enviar los archivos seleccionados */}
      <button className="button-upload-docs" onClick={handleSendBackend}>
        Enviar archivos seleccionados
      </button>
    </div>
  );
};

export default UploadFilesEdit;
