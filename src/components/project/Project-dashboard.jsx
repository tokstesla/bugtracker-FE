import { useFormik } from "formik";

import Button from "components/button/Button";
import { projectSchema, projectData } from "schema/projectValidate";
import "./css/Project.sass";

import service from "services/service";
import { Link } from "react-router-dom";
import ProjectTickets from "components/project-tickets/ProjectTickets";

function Project({
  allMembers,
  payload,
  allTickets,
  allUsers,
  addMembers,
  projects,
  setProjects,
  setAllTickets,
}) {
  service.setPageTitle("Projects");

  async function onSubmit(values) {
    values.projectId = service.getRandomId();
    console.log("create project values", JSON.stringify(values, null, 2));
    service.createProject(values).then(
      () => {
        setProjects(values);
        // formik.resetForm();
      },
      (err) => console.log("Error creating project", err)
    );
  }

  const formik = useFormik({
    initialValues: projectData,
    validationSchema: projectSchema,
    onSubmit,
  });

  return (
    <div id="Project-dashboard_Main_Container">
      {payload.role === "ADMIN" ? (
        <div className="component-container">
          <div>
            <div className="con-header d-flex align-items-center justify-content-between">
              <div className="title">
                <h2>Projects</h2>
              </div>

              {payload.role === "ADMIN" ? (
                <>
                  <div className="header-btn">
                    <Button
                      type="primary"
                      text="New Project"
                      modal={true}
                      modalHeaderTitle="Create New Project"
                      modalTarget="new-project-create"
                      modalContext={
                        <form className="my-4">
                          <div className="mb-3">
                            <label htmlFor="title" className="form-label">
                              Project Name
                            </label>
                            <input
                              id="title"
                              name="name"
                              type="text"
                              className="form-control"
                              onChange={formik.handleChange}
                              value={formik.values.name}
                            />

                            <p className="invalid-data">
                              {formik.errors.name && formik.touched.name
                                ? formik.errors.name
                                : null}
                            </p>
                          </div>

                          <div className="mb-3">
                            <label htmlFor="title" className="form-label">
                              Project Description
                            </label>
                            <textarea
                              id="title"
                              name="description"
                              type="text"
                              className="form-control"
                              onChange={formik.handleChange}
                              value={formik.values.description}
                            />

                            <p className="invalid-data">
                              {formik.errors.description &&
                              formik.touched.description
                                ? formik.errors.description
                                : null}
                            </p>
                          </div>

                          <div className="mb-3">
                            <label htmlFor="members" className="form-label">
                              Add Available Users
                            </label>

                            <select
                              multiple
                              name="members"
                              id="members"
                              className="form-control"
                              value={formik.values.members}
                              onChange={formik.handleChange}
                            >
                              {allUsers.map((user, key) => (
                                <option key={key} value={user.id}>
                                  {user.firstName}&nbsp;
                                  {user.lastName}
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
                            onClick={formik.resetForm}
                          >
                            Close
                          </button>

                          <button
                            type="submit"
                            className="primary-btn"
                            onClick={formik.handleSubmit}
                            data-bs-dismiss={
                              formik.isValid && formik.dirty ? "modal" : null
                            }
                          >
                            Create
                          </button>
                        </>
                      }
                    />
                  </div>
                </>
              ) : null}
            </div>

            <div className="con-context">
              {projects?.length > 0 ? (
                <div className=" table-responsive">
                  <table className="table">
                    <thead>
                      <tr className="header-row">
                        <th scope="col">#</th>
                        <th scope="col">Project</th>
                        <th scope="col">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects?.map((project, key) => (
                        <tr key={key}>
                          <td>
                            <Link to={`/projects/tickets/${project.projectId}`}>
                              {key + 1}
                            </Link>
                          </td>
                          <td>
                            <Link to={`/projects/tickets/${project.projectId}`}>
                              {project.name}
                            </Link>
                          </td>
                          <td>
                            <Link to={`/projects/tickets/${project.projectId}`}>
                              {project.description}
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="">
                  <div>
                    No Projects to show. &nbsp;&nbsp;
                    {payload.role === "ADMIN" ? (
                      <>
                        <span
                          data-bs-toggle="modal"
                          data-bs-target="#new-project-create"
                          className="highlight"
                        >
                          Create New Project
                        </span>
                      </>
                    ) : null}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="component-container">
          <ProjectTickets
            allUsers={allUsers}
            allMembers={allMembers}
            addMembers={addMembers}
            payload={payload}
            allTickets={allTickets}
            setAllTickets={setAllTickets}
          />
        </div>
      )}
    </div>
  );
}

export default Project;
