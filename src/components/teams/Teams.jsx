import Button from "components/button/Button";
import { useFormik } from "formik";
import React from "react";
import { teamData } from "schema/teamsSchema";

function Teams({ allMembers, allUsers, addMembers, payload }) {
  async function onSubmit(values) {
    // console.log(JSON.stringify(values, null, 2));
    // await service.createProject(values);
    addMembers(values);
    teamsForm.resetForm();
  }

  const teamsForm = useFormik({
    initialValues: teamData,
    onSubmit,
  });

  return (
    <div id="Teams_Main_Container">
      <div className="con-header d-flex align-items-center justify-content-between">
        <div className="title">
          <h2>Team</h2>
        </div>

        {payload.role === "ADMIN" ? (
          <>
            <div className="header-btn">
              <Button
                type="primary"
                text="New Member"
                modal
                modalHeaderTitle="Create New Ticket"
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
                        {allUsers.map((member, key) => (
                          <option key={key} value={key + 1}>
                            {member.name}
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
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                </tr>
              </thead>
              <tbody>
                {allMembers.map((elem, key) => (
                  <tr key={key}>
                    <td>{key + 1}</td>
                    <td>{elem.name}</td>
                    <td>{elem.email}</td>
                    <td>{elem.phoneNumber}</td>
                  </tr>
                ))}
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
