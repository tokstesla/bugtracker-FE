import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";

import Template from "components/template/Template";
import Overview from "components/overview/Overview";
import Project from "components/project/Project-dashboard";
import Profile from "components/profile/Profile";
import Homepage from "components/homepage/Homepage";
import Explore from "components/explore/Explore";
import ProjectDetail from "components/project-details/Project-detail";

import s from "./utils/scss/App.module.sass";
import Login from "components/login/Login";
import Register from "components/register/Register";
import ProjectData from "components/project-data/Project-data";
import Requests from "components/requests/Requests";
import Tickets from "components/tickets/Tickets";
import Admin from "components/Admin/Admin";
import ProjectTickets from "components/project-tickets/ProjectTickets";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const token = localStorage.getItem("auth-token");

  const [allUsers, setAllUsers] = useState([
    {
      name: "Ife Jeremiah",
      email: "0006@gmail.com",
      phoneNumber: "1234567890",
    },
    {
      name: "Sack Smith",
      email: "0002@gmail.com",
      phoneNumber: "1234567890",
    },
    {
      name: "Eli Jones",
      email: "0005@gmail.com",
      phoneNumber: "1234567890",
    },
  ]);

  const [allMembers, setAllMembers] = useState([
    {
      name: "John Doe",
      email: "0001@gmail.com",
      phoneNumber: "1234567890",
    },
    {
      name: "Ali Halman",
      email: "0003@gmail.com",
      phoneNumber: "1234567890",
    },
    {
      name: "Smith Abraham",
      email: "0004@gmail.com",
      phoneNumber: "1234567890",
    },
  ]);

  function doSetAllMembers(values) {
    console.log(
      "value of value",

      values.assigned_devs.forEach((elem) =>
        console.log("heewsdfdjslk", allUsers[Number(elem)])
      )
    );

    setAllMembers([
      ...allMembers,
      values.assigned_devs.map((elem) => allUsers[Number(elem)]),
    ]);
    console.log("new members", allMembers);
  }

  function doSetAllUsers(values) {
    console.log("value of values", values);
  }

  const [tickets, setTickets] = useState([
    {
      title: "ticket 1",
      description: "First ticket created",
      author: "John Doe",
    },
    {
      title: "ticket 2",
      description: "Second ticket created",
      author: "John Smith",
    },
    {
      title: "ticket 1",
      description: "First ticket created",
      author: "Banky Mono",
    },
  ]);

  function getPayload() {
    if (isAuthenticated && token !== null) {
      const { role, user_id } = JSON.parse(atob(token.split(".")[1]));
      return { role, user_id };
    }
  }

  function setAuthEnv(token) {
    localStorage.setItem("auth-token", token);
    setIsAuthenticated(true);
  }

  function doLogout() {
    localStorage.removeItem("auth-token");
    setIsAuthenticated(false);
  }

  useEffect(() => {
    if (token === null) setIsAuthenticated(false);
    // TO HANDLE JWT EXPIRE
    // ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // else if (token !== null) {
    //   const isExpired =
    //     JSON.parse(atob(token.split(".")[1])).exp > Date.now() / 1000;
    //   if (isExpired) {
    //     setIsAuthenticated(false);
    //   } else {
    //     setIsAuthenticated(true);
    //   }
    // }
    else setIsAuthenticated(true);
  }, [token]);

  return (
    <Router>
      <div className={`${s.main_container}`}>
        <Routes>
          <Route path="/" element={<Homepage />} />

          {/* Template Children Routes */}
          <Route
            element={
              !!token && isAuthenticated ? (
                <Template logout={doLogout} payload={getPayload()} />
              ) : (
                <Navigate to="/login" />
              )
            }
          >
            <Route
              path="/dashboard"
              element={
                <Project
                  allMembers={allMembers}
                  payload={getPayload()}
                  allTickets={tickets}
                  allUsers={allUsers}
                  addMembers={doSetAllMembers}
                />
              }
            />
            <Route
              path="/projects/tickets"
              element={
                <ProjectTickets
                  allMembers={allMembers}
                  allTickets={tickets}
                  allUsers={allUsers}
                  addMembers={doSetAllMembers}
                  payload={getPayload()}
                  hasPrevious={true}
                />
              }
            />
            <Route
              path="/tickets"
              element={<Tickets allMembers={allMembers} allTickets={tickets} />}
            />
            <Route
              path="/administration"
              element={<Admin allUsers={allUsers} />}
            />
            <Route
              path="/projects/tickets/id"
              element={
                <ProjectData allMembers={allMembers} payload={getPayload()} />
              }
            />
            <Route
              path="/my-profile"
              element={<Profile payload={getPayload()} />}
            />
            <Route
              path="/requests"
              element={<Requests payload={getPayload()} />}
            />
            <Route path="/explore" element={<Explore />} />
            <Route path="/explore/id" element={<ProjectDetail />} />
          </Route>

          {/* Primary Routes */}
          <Route path="/login" element={<Login authStatus={setAuthEnv} />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
