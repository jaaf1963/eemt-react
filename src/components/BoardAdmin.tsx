//import UsersImage from "../services/usersImage";
import BoardUsers from "./BoardUsers";

const BoardAdmin: React.FC = () => {
  return (
    <div className="container">
      <div>
        <BoardUsers />
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
