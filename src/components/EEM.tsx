import React, { useState, useEffect } from "react";
import { getEemContent } from "../services/user.local.service";
import EemImage from "../services/eemtImage";

const EEM: React.FC = () => {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    const data = getEemContent();
    if (data) {
      setContent(data);
    } else {
      const _content = "";
      setContent(_content);
    }
  }, []);
  //
  return (
    <div className="container">
      <header className="jumbotron">
        <h4>{content}</h4>
        <EemImage />
      </header>
    </div>
  );
};

export default EEM;
