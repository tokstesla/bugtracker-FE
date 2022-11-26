import { useFormik } from "formik";

import Button from "components/button/Button";
import { projectSchema, projectData } from "schema/projectValidate";
import "./css/Project.sass";

import { useState } from "react";
import service from "services/service";
import { Link } from "react-router-dom";

function Project() {
  service.setPageTitle("Projects");

  const [projects, setProject] = useState([
    {
      title: "The Art of the Deal",
      duration: "1 month",
      start_date: "2022-11-05",
      end_date: "2022-11-13",
      status: "closed",
      budget: 212,
      workers: [
        "inspector",
        "flooringInstaller",
        "surveyor",
        "brickMason",
        "ironWorker",
        "craneOperator",
        "safetyManager",
        "costEstimator",
        "manager",
      ],
    },
    {
      title: "The Art of the Deal",
      duration: "1 month",
      start_date: "2022-11-05",
      end_date: "2022-11-13",
      status: "open",
      budget: 212,
      workers: [
        "inspector",
        "flooringInstaller",
        "surveyor",
        "brickMason",
        "ironWorker",
        "craneOperator",
        "safetyManager",
        "costEstimator",
        "manager",
      ],
    },
    {
      title: "The Art of the Deal",
      duration: "1 month",
      start_date: "2022-11-05",
      end_date: "2022-11-13",
      status: "open",
      budget: 212,
      workers: [
        "inspector",
        "flooringInstaller",
        "surveyor",
        "brickMason",
        "ironWorker",
        "craneOperator",
        "safetyManager",
        "costEstimator",
        "manager",
      ],
    },
    {
      title: "The Art of the Deal",
      duration: "1 month",
      start_date: "2022-11-05",
      end_date: "2022-11-13",
      status: "closed",
      budget: 212,
      workers: [
        "inspector",
        "flooringInstaller",
        "surveyor",
        "brickMason",
        "ironWorker",
        "craneOperator",
        "safetyManager",
        "costEstimator",
        "manager",
      ],
    },
    {
      title: "The Art of the Deal",
      duration: "1 month",
      start_date: "2022-11-05",
      end_date: "2022-11-13",
      status: "open",
      budget: 212,
      workers: [
        "inspector",
        "flooringInstaller",
        "surveyor",
        "brickMason",
        "ironWorker",
        "craneOperator",
        "safetyManager",
        "costEstimator",
        "manager",
      ],
    },
    {
      title: "The Art of the Deal",
      duration: "1 month",
      start_date: "2022-11-05",
      end_date: "2022-11-13",
      status: "closed",
      budget: 212,
      workers: [
        "inspector",
        "flooringInstaller",
        "surveyor",
        "brickMason",
        "ironWorker",
        "craneOperator",
        "safetyManager",
        "costEstimator",
        "manager",
      ],
    },
  ]);

  async function onSubmit(values) {
    const jobs = [];
    for (let key in values.jobs) {
      if (values.jobs[key]) jobs.push(key.toUpperCase());
    }
    values.jobs = jobs;
    values.status = "open";
    await service.createProject(values);
    setProject([values, ...projects]);
    formik.resetForm();
  }

  const formik = useFormik({
    initialValues: projectData,
    validationSchema: projectSchema,
    onSubmit,
  });

  return (
    <div className="main-container" id="Project-dashboard_Main_Container">
      <div className="con-header d-flex align-items-center justify-content-between">
        <div className="title">
          <h2>Projects</h2>
        </div>

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
                    Title
                  </label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    className="form-control"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                  />

                  <p className="invalid-data">
                    {formik.errors.title && formik.touched.title
                      ? formik.errors.title
                      : null}
                  </p>
                </div>

                <div className="mb-3">
                  <label htmlFor="duration" className="form-label">
                    Duration
                  </label>
                  <select
                    className="form-select"
                    name="duration"
                    id="duration"
                    onChange={formik.handleChange}
                    value={formik.values.duration}
                  >
                    <option defaultValue="">Select project duration</option>
                    <option>2 Weeks</option>
                    <option value="1 month">1 Month</option>
                    <option value="2 months">2 Months</option>
                    <option value="3 months">3 Months </option>
                    <option value="6 months">6 Months </option>
                  </select>
                  <p className="invalid-data">
                    {formik.errors.duration && formik.touched.duration
                      ? formik.errors.duration
                      : null}
                  </p>
                </div>

                <div className="mb-3">
                  <label htmlFor="budget" className="form-label">
                    Budget
                  </label>
                  <input
                    className="form-control"
                    id="budget"
                    name="budget"
                    type="number"
                    onChange={formik.handleChange}
                    value={formik.values.budget}
                  />
                  <p className="invalid-data">
                    {formik.errors.budget && formik.touched.budget
                      ? formik.errors.budget
                      : null}
                  </p>
                </div>

                <div className="mb-3">
                  <label htmlFor="startDate" className="form-label">
                    Start Date
                  </label>
                  <input
                    className="form-control"
                    id="startDate"
                    name="startDate"
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    onChange={formik.handleChange}
                    value={formik.values.startDate}
                  />
                  <p className="invalid-data">
                    {formik.errors.startDate && formik.touched.startDate
                      ? formik.errors.startDate
                      : null}
                  </p>
                </div>

                <h5 className="my-4">Select workers you need</h5>

                <div className="mb-3">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="inspector"
                      name="jobs.inspector"
                      onChange={formik.handleChange}
                      checked={formik.values.jobs.inspector}
                    />
                    <label className="form-check-label" htmlFor="inspector">
                      Inspector
                    </label>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="flooringInstaller"
                      name="jobs.flooringInstaller"
                      onChange={formik.handleChange}
                      checked={formik.values.jobs.flooringInstaller}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flooringInstaller"
                    >
                      Flooring Installer
                    </label>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="surveyor"
                      name="jobs.surveyor"
                      onChange={formik.handleChange}
                      checked={formik.values.jobs.surveyor}
                    />
                    <label className="form-check-label" htmlFor="surveyor">
                      Surveyor
                    </label>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="brickMason"
                      name="jobs.brickMason"
                      onChange={formik.handleChange}
                      checked={formik.values.jobs.brickMason}
                    />
                    <label className="form-check-label" htmlFor="brickMason">
                      Brick Mason
                    </label>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="ironWorker"
                      name="jobs.ironWorker"
                      onChange={formik.handleChange}
                      checked={formik.values.jobs.ironWorker}
                    />
                    <label className="form-check-label" htmlFor="ironWorker">
                      Iron Worker
                    </label>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="craneOperator"
                      name="jobs.craneOperator"
                      onChange={formik.handleChange}
                      checked={formik.values.jobs.craneOperator}
                    />
                    <label className="form-check-label" htmlFor="craneOperator">
                      Crane Operator
                    </label>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="safetyManager"
                      name="jobs.safetyManager"
                      onChange={formik.handleChange}
                      checked={formik.values.jobs.safetyManager}
                    />
                    <label className="form-check-label" htmlFor="safetyManager">
                      Safety Manager
                    </label>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="costEstimator"
                      name="jobs.costEstimator"
                      onChange={formik.handleChange}
                      checked={formik.values.jobs.costEstimator}
                    />
                    <label className="form-check-label" htmlFor="costEstimator">
                      Cost Estimator
                    </label>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="manager"
                      name="jobs.manager"
                      onChange={formik.handleChange}
                      checked={formik.values.jobs.manager}
                    />
                    <label className="form-check-label" htmlFor="manager">
                      Manager
                    </label>
                  </div>
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
                  Next
                </button>
              </>
            }
          />
        </div>
      </div>

      <div className="con-context">
        {projects.length > 0 ? (
          <div className=" table-responsive">
            <table className="table">
              <thead>
                <tr className="header-row">
                  <th scope="col">#</th>
                  <th scope="col">Title</th>
                  <th scope="col">Budget (&#8358;)</th>
                  <th scope="col">Duration</th>
                  <th scope="col">No. of Applicants</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project, key) => (
                  <tr key={key}>
                    <td>
                      <Link to="/projects/id">{key + 1}</Link>
                    </td>
                    <td>
                      <Link to="/projects/id">{project.title}</Link>
                    </td>
                    <td>
                      <Link to="/projects/id">{project.budget}</Link>
                    </td>
                    <td>
                      <Link to="/projects/id">{project.duration}</Link>
                    </td>
                    <td>{23}</td>
                    <td>
                      <Link to="/projects/id">
                        <div
                          className={`status ${
                            project.status === "open" ? "active" : ""
                          }`}
                        >
                          {project.status}
                        </div>
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
              No Projects to show. &nbsp;
              <span
                data-bs-toggle="modal"
                data-bs-target="#new-project-create"
                className=""
              >
                Create New Project
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Project;
