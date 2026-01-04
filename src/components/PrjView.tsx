import React, { useState, useEffect } from "react";
//import { getPublicContent } from "../services/user.local.service";
import ClientButtView from "./BtnsDynCliView";

interface datoProps {
  enviarDatoToFetch: (dato: string) => void; // Esta es la función callback
}

const PrjView: React.FC = () => {
  const [content, setContent] = useState<string>("");
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    setDisplay((prev) => !prev);
    //const data = getPublicContent();
    //if (data) {
    //  setContent(data);
    //} else {
    const _content = content;
    setContent(_content);
    //}
  }, [content]);
  //
  // <header className="jumbotron"></header>
  return (
    <>
      {display ? (
        <div className="container">
          <ClientButtView />
        </div>
      ) : (
        <div className="container">
          <ClientButtView />
        </div>
      )}
    </>
  );
};

export default PrjView;
