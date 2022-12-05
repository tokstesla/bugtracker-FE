import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";

import Template from "components/template/Template";
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
import service from "services/service";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const token = localStorage.getItem("auth-token");

  const [allUsers, setAllUsers] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [allMembers, setAllMembers] = useState([]);
  const [tickets, setTickets] = useState([]);

  const doSetAllMembers = (values) =>
    setAllMembers([
      ...allMembers,
      ...values.assigned_devs?.map((id) => allUsers[id - 1]),
    ]);

  const doSetAllProjects = (values) => {
    setAllProjects([...allProjects, values]);
    setAllMembers([...values.members.map((id) => allUsers[id - 1])]);
    console.log('value of members', allProjects)
  };

  function doSetTickets(values) {
    setTickets([...tickets, values]);
  }

  function getPayload() {
    if (isAuthenticated && token !== null) {
      const {
        role,
        id: user_id,
        firstName,
        lastName,
        email,
      } = JSON.parse(token);
      return { role, user_id, firstName, lastName, email };
    }
  }

  function setAuthEnv(token) {
    localStorage.setItem("auth-token", JSON.stringify(token));
    setIsAuthenticated(true);
  }

  function doLogout() {
    localStorage.removeItem("auth-token");
    setIsAuthenticated(false);
  }

  function getAllUsers() {
    service.getAllUsers().then((users) => setAllUsers([...users]));
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
    else {
      setIsAuthenticated(true);
      getAllUsers();
    }
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
                  projects={allProjects}
                  setProjects={doSetAllProjects}
                  setAllTickets={doSetTickets}
                />
              }
            />
            <Route
              path="/projects/tickets/:projectid"
              element={
                <ProjectTickets
                  allProjects={allProjects}
                  allMembers={allMembers}
                  allTickets={tickets}
                  allUsers={allUsers}
                  addMembers={doSetAllMembers}
                  payload={getPayload()}
                  hasPrevious={true}
                  setAllTickets={doSetTickets}
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
              path="/projects/tickets/id/:ticketId"
              element={
                <ProjectData allMembers={allMembers} allTickets={tickets} payload={getPayload()} />
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
