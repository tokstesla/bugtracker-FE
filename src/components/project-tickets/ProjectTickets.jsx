import Previous from "components/previous/Previous";
import Teams from "components/teams/Teams";
import Tickets from "components/tickets/Tickets";
import "./css/ProjectTickets.sass";

function ProjectTickets({
  allMembers,
  allTickets,
  allUsers,
  addMembers,
  payload,
  hasPrevious,
}) {
  return (
    <div id="ProjectTickets_Main_Container">
      {hasPrevious && (
        <div className="component-container">
          <Previous />
        </div>
      )}

      <div className="con-context">
        <div className="mb-5">
          <Tickets
            allMembers={allMembers}
            allTickets={allTickets}
            payload={payload}
          />
        </div>

        <div>
          <Teams
            allUsers={allUsers}
            allMembers={allMembers}
            addMembers={addMembers}
            payload={payload}
          />
        </div>
      </div>
    </div>
  );
}

export default ProjectTickets;
