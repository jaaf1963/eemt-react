import React, { useState, useEffect } from "react";
//import ModeratorImage from "../services/moderatorImage";
import BoardButtNames from "./BoardButtName";

//import { getModeratorBoard } from "../services/user.service";
//import EventBus from "../common/EventBus";

const BoardModerator: React.FC = () => {
  const [content, setContent] = useState<string>("");
  useEffect(() => {
    //
    setContent("Board Moderator");
    //
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <div className="container">
        <BoardButtNames />
      </div>
      <div className="container">
        <BoardButtNames />
      </div>
      <div className="container">
        <BoardButtNames />
      </div>
    </div>
  );
};

export default BoardModerator;
