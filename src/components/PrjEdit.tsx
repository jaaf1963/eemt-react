import React, { useState, useEffect } from "react";
//import { getPublicContent } from "../services/user.local.service";
import ClientButtEdit from "./BtnsDynCliEdit";

const PrjEdit: React.FC = () => {
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
