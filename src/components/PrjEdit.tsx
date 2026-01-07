import React, { useState, useEffect } from "react";
import ClientButtEdit from "./BtnsDynCliEdit";

const PrjEdit: React.FC = () => {
  const [content, setContent] = useState<string>("");
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    const data = "hola";
    if (data) {
      setContent(data);
      //setDisplay((prev) => !prev);
      setDisplay(true);
    } else {
      const _content = "";
      setContent(_content);
    }
    //
  }, [content]);
  //
  // <header className="jumbotron"></header>
  return (
    <>
      {display ? (
        <div className="container">
          <ClientButtEdit />
        </div>
      ) : (
        <div className="container">
          <ClientButtEdit />
        </div>
      )}
    </>
  );
};

export default PrjEdit;
