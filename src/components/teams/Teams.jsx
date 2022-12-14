import Button from "components/button/Button";
import { useFormik } from "formik";
import { teamData } from "schema/teamsSchema";
import "./css/Teams.sass";

function Teams({ allMembers, allUsers, addMembers, payload }) {
  async function onSubmit(values) {
    addMembers(values);
    teamsForm.resetForm();
  }

  const teamsForm = useFormik({
    initialValues: teamData,
    onSubmit,
  });

  return (
    <div id="Teams_Main_Container" className="component-container">
      <div className="con-header d-flex align-items-center justify-content-between">
        <div className="title px-lg-4">
          <h2>Team</h2>
        </div>

        {payload.role === "ADMIN" ? (
          <>
            <div className="header-btn">
              <Button
                type="primary"
                text="New Member"
                modal
                modalHeaderTitle="Add New Members"
                modalTarget="new-member-create"
                modalContext={
                  <form className="my-4">
                    <div className="mb-3">
                      <label htmlFor="assigned_devs" className="form-label">
                        Select Team Members
                      </label>

                      <select
                        multiple
                        name="assigned_devs"
                        id="assigned_devs"
                        className="form-control"
                        value={teamsForm.values.assigned_devs}
                        onChange={teamsForm.handleChange}
                      >
                        {allUsers?.map((member, key) => (
                          <option key={key} value={key + 1}>
                            {member.firstName}&nbsp;
                            {member.lastName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </form>
                }
                modalFooterBtn={
                  <>
                    <button
                      data-bs-dismiss="modal"
                      className="secondary-btn"
                      onClick={teamsForm.resetForm}
                    >
                      Close
                    </button>

                    <button
                      type="submit"
                      className="primary-btn"
                      onClick={teamsForm.handleSubmit}
                      data-bs-dismiss={
                        teamsForm.isValid && teamsForm.dirty ? "modal" : null
                      }
                    >
                      Add Selected Devs to Team
                    </button>
                  </>
                }
              />
            </div>
          </>
        ) : null}
      </div>

      <div className="con-context table-container">
        {allMembers ? (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr className="header-row">
                  <th scope="col">#</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                </tr>
              </thead>
              <tbody>
                {allMembers?.length > 0 ? (
                  <>
                    {allMembers.map((elem, key) => (
                      <tr key={key}>
                        <td>{key + 1}</td>
                        <td>{elem.firstName}</td>
                        <td>{elem.lastName}</td>
                        <td>{elem.email}</td>
                        <td>{elem.phoneNumber}</td>
                      </tr>
                    ))}
                  </>
                ) : null}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="">
            <div>No Teams yet.</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Teams;
