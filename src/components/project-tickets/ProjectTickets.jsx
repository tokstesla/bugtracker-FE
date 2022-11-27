import Previous from "components/previous/Previous";
import Teams from "components/teams/Teams";
import Tickets from "components/tickets/Tickets";
import React from "react";

function ProjectTickets({ allMembers, allTickets, allUsers, addMembers }) {
  return (
    <div id="ProjectTickets_Main_Container" className="component-container">
      <Previous />
      <div className="con-context d-lg-flex align-items-start justify-content-start mt-5">
        <div className="me-lg-4 mb-5 mb-lg-0">
          <Teams
            allUsers={allUsers}
            allMembers={allMembers}
            addMembers={addMembers}
          />
        </div>
        <div className="ms-lg-4">
          <Tickets allMembers={allMembers} allTickets={allTickets} />
        </div>
      </div>
    </div>
  );
}

export default ProjectTickets;
