import { useEffect, useState } from "react";
//import styles from "./Button/Button.module.css"; // Asegúrate de que la ruta sea correcta
////import RenderItemList from "./RenderObjArray";
import RenderImages from "./RenderImages";
//import Button from "./UneButton";

const auth =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqdWFuYWxiaXMiLCJleHAiOjE3NTg2NjI1MTV9.vP5ja3C28T0X_uyJ1u7yxHprB8zfAnvz8wj-yv_EHts";

const handle_response = () => {
  alert("Presionaste Click...");
};

type DataProps = {
  alias: object;
  images: object;
  names: object;
  renames: object;
};
const getDataList = async (data: DataProps) => {
  const alias = data.alias;
  const images = data.images;
  const names = data.names;
  const renames = data.renames;
  //console.log(alias);
  return { alias, images, names, renames };
};

function ImageDisplay() {
  //const [imagenBase64, setImagenBase64] = useState("");
  //const [imagesBase64, setImagesBase64] = useState<string[]>([]);
  const [imagesBase64, setImagesBase64] = useState<string[][]>([]);
  const [stateFetch, setStateFetch] = useState<boolean>(false);

  useEffect(() => {
    // Simula la obtención de datos desde el backend
    const fetchImage = async () => {
      try {
        // Reemplaza con la URL real de tu API
        const datas = {
          dbsele: "visitors",
          entity: "entity",
          dnicod: "dnicod",
          n_send: 1,
          images: "images_get",
        };
        //
        const response = await fetch("http://localhost:5055/get_images_react", {
          method: "POST",
          body: JSON.stringify(datas),
          headers: { Authorization: `Bearer ${auth}` }, // JWT
        });
        //
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        //
        const resp = await response.json();
        const dats = await getDataList(resp.msg);
        const imgs = dats.images;
        const arry = Object.entries(imgs);
        //const imag = arry[1][1];
        console.log(arry);
        //
        //setImagenBase64(imag);
        //setImagesBase64(arry);
        //
        setImagesBase64([]);
        arry.forEach((arry) => {
          //setImagesBase64([["name", "description"],[arry[0], arry[1][0]],]);
          //const estado = [["name", "description"],[arry[0], arry[1][0]]];
          setImagesBase64((imagesBase64) => [
            ...imagesBase64,
            ["name", "description"],
            [arry[0], arry[1][0]],
          ]);
          //console.log(arry[0], arry[1][0]);
        });
        //
        setStateFetch(true);
      } catch (error) {
        console.error("Error al cargar la imagen:", error);
      }
    };
    //
    fetchImage();
    //
  }, []);

  return (
    <div>
      <h2>Imagen desde el Backend</h2>
      {imagesBase64 && stateFetch ? (
        <RenderImages items={imagesBase64} />
      ) : (
        <p>Cargando imagen...</p>
      )}
    </div>
  );
}

export default ImageDisplay;

/*
    <div>
      <h2>Imagen desde el Backend</h2>
      {imagesBase64 && stateFetch ? (
        <RenderTable items={imagesBase64} />
      ) : (
        <p>Cargando imagen...</p>
      )}
      <p>Juan Albistur Fernandez</p>
      <Button className={styles.buttonBlue} onClick={handle_response}>
        Rename
      </Button>
    </div>

*/
