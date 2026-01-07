import BoardButtNames from "./BoardButtName";

const BoardModerator: React.FC = () => {
  //
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
