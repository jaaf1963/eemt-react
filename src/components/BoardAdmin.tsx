import React, { useState, useEffect } from "react";
import UsersImage from "../services/usersImage";
import BoardUser from "./BoardUser";

const BoardAdmin: React.FC = () => {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    //
    setContent("Board admin");
    //
  }, []);

  return (
    <div className="container">
      <div>
        <BoardUser />
      </div>
      <div>
        <BoardUser />
      </div>
      <div>
        <BoardUser />
      </div>
    </div>
  );
};

export default BoardAdmin;

/*
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
        <UsersImage />
      </header>
    </div>
*/
