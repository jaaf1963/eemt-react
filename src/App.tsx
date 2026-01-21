import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
//
import Eem from "./components/EEM";
import Home from "./components/Home";
import PrjView from "./components/PrjView";
import PrjEdit from "./components/PrjEdit";
import PrjFlow from "./components/PrjFlow";
import Login from "./components/Login";
import Register from "./components/Register";
import SetClearStore from "./services/auth.clear.store";
import * as AuthService from "./services/auth.local.service";
//
import AdminSegfin from "./components/AdminSegfin";
import AdminClients from "./components/AdminClients";
import AdminProjects from "./components/AdminProjects";
import BoardModerator from "./components/BoardModerator";
import AdminPanels from "./components/AdminPanels";
import AdminUsers from "./components/AdminUsers";
import BoardProfile from "./components/BoardProfile";
import BoardAdmin from "./components/BoardAdmin";
import EventBus from "./common/EventBus";

const App: React.FC = () => {
  //const [showAdminBoard, setShowAdminBoard] = useState<boolean>(false);
  const [existUserStore, setExistUserStore] = useState<boolean | undefined>(
    undefined,
  );
  const [changeUserRole, setChangeUserRole] = useState<boolean>(false);
  const [adminUserRole, setAdminUserRole] = useState<boolean>(false);
  const [moderUserRole, setModerUserRole] = useState<boolean>(false);
  const [viewUserRole, setViewUserRole] = useState<boolean>(false);
  const [comeUserRole, setComeUserRole] = useState<boolean>(false);
  //
  const [textRoleStore, setTextRoleStore] = useState(() => {
    const roleStore = localStorage.getItem("role");
    if (roleStore) {
      return roleStore;
    }
    //setTextRoleStore("");
    return "";
  });
  //
  const [textUserStore, setTextUserStore] = useState(() => {
    const userStore = localStorage.getItem("username");
    if (userStore) {
      return userStore;
    }
    //setTextUserStore("");
    return "";
  });
  //
  //

  //
  useEffect(() => {
    //
    // Lee usuario desde backend, o registrar
    //
    //console.log("textRoleStore:", textRoleStore);
    if (textRoleStore) {
      const adm: boolean = textRoleStore === "admin";
      const viw: boolean = textRoleStore === "view";
      const mod: boolean = textRoleStore === "edit";
      const com: boolean = textRoleStore === "come";
      //
      //console.log(textRoleStore, "-->", textRoleStore);
      setAdminUserRole(adm);
      setModerUserRole(mod);
      setViewUserRole(viw);
      setComeUserRole(com);
      //console.log("adminRole:", adminUserRole);
      //console.log("moderRole:", moderUserRole);
      //console.log("viewsRole:", viewUserRole);
      //console.log("comesRole:", comeUserRole);
      //setShowAdminBoard(adminUserRole);
      //setAdminUserRole(true);
      //setExistUserStore(viw);
    }
    //
    if (textUserStore) {
      const usr: boolean = textUserStore !== "";
      setExistUserStore(usr);
    }
    //
    EventBus.on("logout", logOut);
    return () => {
      EventBus.remove("logout", logOut);
      console.log("EventBus remove Logout");
    };
  }, [changeUserRole]);

  const logOut = () => {
    AuthService.logout();
    //
    SetClearStore();
    //
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          EEM
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink to={"/home"} className="nav-link">
              Home
            </NavLink>
          </li>
          {(moderUserRole || adminUserRole || comeUserRole) && (
            <li className="nav-item">
              <NavLink to={"/segfin"} className="nav-link">
                Seg-Fin
              </NavLink>
            </li>
          )}
          {(viewUserRole || moderUserRole || adminUserRole) && (
            <li className="nav-item">
              <NavLink to={"/prjview"} className="nav-link">
                Projects View
              </NavLink>
            </li>
          )}
          {(adminUserRole || moderUserRole) && (
            <li className="nav-item">
              <NavLink to={"/prjedit"} className="nav-link">
                Project Edit
              </NavLink>
            </li>
          )}
          {(adminUserRole || moderUserRole) && (
            <li className="nav-item">
              <Link to={"/moder"} className="nav-link">
                Moderator
              </Link>
            </li>
          )}
          {(adminUserRole || moderUserRole) && (
            <li className="nav-item">
              <NavLink to={"/panels"} className="nav-link">
                Panels
              </NavLink>
            </li>
          )}
          {(adminUserRole || moderUserRole) && (
            <li className="nav-item">
              <Link to={"/client"} className="nav-link">
                Clients
              </Link>
            </li>
          )}
          {(adminUserRole || moderUserRole) && (
            <li className="nav-item">
              <NavLink to={"/project"} className="nav-link">
                Projects
              </NavLink>
            </li>
          )}
          {(adminUserRole || moderUserRole) && (
            <li className="nav-item">
              <NavLink to={"/prjflow"} className="nav-link">
                Projects Flow
              </NavLink>
            </li>
          )}
          {(adminUserRole || moderUserRole) && (
            <li className="nav-item">
              <NavLink to={"/users"} className="nav-link">
                Users
              </NavLink>
            </li>
          )}
        </div>

        {existUserStore ? (
          <div className="navbar-nav ml-auto">
            {adminUserRole && (
              <li className="nav-item">
                <NavLink to={"/admin"} className="nav-link">
                  Admin
                </NavLink>
              </li>
            )}
            <li className="nav-item">
              <NavLink to={"/profile"} className="nav-link">
                {textUserStore}
              </NavLink>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink to={"/login"} className="nav-link">
                Login
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to={"/register"} className="nav-link">
                Sign Up
              </NavLink>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Eem />} />
          <Route path="/home" element={<Home />} />
          <Route path="/segfin" element={<AdminSegfin />} />
          <Route path="/prjview" element={<PrjView />} />
          <Route path="/prjedit" element={<PrjEdit />} />
          <Route path="/prjflow" element={<PrjFlow />} />
          <Route path="/moder" element={<BoardModerator />} />
          <Route path="/panels" element={<AdminPanels />} />
          <Route path="/client" element={<AdminClients />} />
          <Route path="/project" element={<AdminProjects />} />
          <Route path="/users" element={<AdminUsers />} />
          {/*<Route path="/users" element={<BoardUser />} />*/}
          <Route path="/admin" element={<BoardAdmin />} />
          <Route
            path="/login"
            element={<Login onRoleChange={setChangeUserRole} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<BoardProfile />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
