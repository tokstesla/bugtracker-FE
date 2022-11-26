import Teams from "components/teams/Teams";
import Tickets from "components/tickets/Tickets";
import React from "react";

function ProjectTickets({ allMembers, allTickets, allUsers }) {
  return (
    <div id="ProjectTickets_Main_Container" className="component-container">
      <div className="con-context d-lg-flex align-items-start justify-content-start">
        <div className="me-4">
          <Teams allMembers={allMembers} allUsers={allUsers} />
        </div>
        <div className="ms-4">
          <Tickets allMembers={allMembers} allTickets={allTickets} />
        </div>
      </div>
    </div>
  );
}

export default ProjectTickets;
