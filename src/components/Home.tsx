import React, { useState, useEffect } from "react";
import { getPublicContent } from "../services/user.local.service";
import HomeImage from "../services/homeImage";

const Home: React.FC = () => {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    const data = getPublicContent();
    if (data) {
      setContent(data);
    } else {
      const _content = "";
      setContent(_content);
    }
  }, [content]);
  //
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
        <HomeImage />
      </header>
    </div>
  );
};

export default Home;
