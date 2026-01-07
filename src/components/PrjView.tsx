import React, { useState, useEffect } from "react";
import ClientButtView from "./BtnsDynCliView";

const PrjView: React.FC = () => {
  const [content, setContent] = useState<string>("");
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    //
    setDisplay((prev) => !prev);
    const _content = content;
    setContent(_content);
    //
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
