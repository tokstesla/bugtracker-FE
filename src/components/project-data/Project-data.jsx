import Button from "components/button/Button";
import Previous from "components/previous/Previous";
import { useFormik } from "formik";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import service from "services/service";
import "./css/Project-data.sass";

function ProjectData({ allMembers }) {
  const [tickets, setTickets] = useState({
    title: "Ticket 1",
    description: "first ticket",
    status: "IN_PROGRESS",
    date: "24",
    priority: "IMMEDIATE",
    type: "ERROR",
    assigned_devs: [],
  });

  service.setPageTitle(tickets.title);

  function onSubmit(values) {
    console.log(JSON.stringify(values, null, 2));
    setTickets(() => ({ ...values }));
  }

  const ticketForm = useFormik({
    initialValues: tickets,
    onSubmit,
  });

  return (
    <div className="component-container" id="Project-data_Main_Container">
      <div className="section-a d-flex align-items-center justify-content-between mb-5">
        <div className="con-previous">
          <Previous />
        </div>
        <div className="con-edit">
          <Button
            type="primary"
            text="New Ticket"
            modal
            modalHeaderTitle="Edit Ticket"
            modalTarget="ticket-edit"
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
                    onChange={ticketForm.handleChange}
                    value={ticketForm.values.title}
                  />

                  <p className="invalid-data">
                    {ticketForm.errors.title && ticketForm.touched.title
                      ? ticketForm.errors.title
                      : null}
                  </p>
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    type="text"
                    className="form-control"
                    onChange={ticketForm.handleChange}
                    value={ticketForm.values.description}
                  />

                  <p className="invalid-data">
                    {ticketForm.errors.description &&
                    ticketForm.touched.description
                      ? ticketForm.errors.description
                      : null}
                  </p>
                </div>

                <div className="mb-3">
                  <label htmlFor="assigned_devs" className="form-label">
                    Add Team Members
                  </label>

                  <select
                    multiple
                    name="assigned_devs"
                    id="assigned_devs"
                    className="form-control"
                    value={ticketForm.values.assigned_devs}
                    onChange={ticketForm.handleChange}
                  >
                    {allMembers.map((member, key) => (
                      <option key={key} value={key + 1}>
                        {member.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="date" className="form-label">
                    Time Estimate (Hours)
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="number"
                    className="form-control"
                    onChange={ticketForm.handleChange}
                    value={ticketForm.values.date}
                  />

                  <p className="invalid-data">
                    {ticketForm.errors.date && ticketForm.touched.date
                      ? ticketForm.errors.date
                      : null}
                  </p>
                </div>

                <div className="mb-3">
                  <label htmlFor="type" className="form-label">
                    Type
                  </label>

                  <select
                    name="type"
                    id="type"
                    className="form-control"
                    value={ticketForm.values.type}
                    onChange={ticketForm.handleChange}
                  >
                    <option defaultValue="">Select type</option>
                    <option value="IMMEDIATE">Issue</option>
                    <option value="BUG">Bug</option>
                    <option value="ERROR">Error</option>
                    <option value="FEATURE_REQUEST">Feature request</option>
                    <option value="OTHER">Other</option>
                  </select>

                  <p className="invalid-data">
                    {ticketForm.errors.type && ticketForm.touched.type
                      ? ticketForm.errors.type
                      : null}
                  </p>
                </div>

                <div className="mb-3">
                  <label htmlFor="priority" className="form-label">
                    Priority
                  </label>

                  <select
                    name="priority"
                    id="priority"
                    className="form-control"
                    value={ticketForm.values.priority}
                    onChange={ticketForm.handleChange}
                  >
                    <option defaultValue="">Select priority</option>
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                    <option value="IMMEDIATE">Immediate</option>
                  </select>

                  <p className="invalid-data">
                    {ticketForm.errors.priority && ticketForm.touched.priority
                      ? ticketForm.errors.priority
                      : null}
                  </p>
                </div>

                <div className="mb-3">
                  <label htmlFor="status" className="form-label">
                    Status
                  </label>

                  <select
                    name="status"
                    id="status"
                    className="form-control"
                    value={ticketForm.values.status}
                    onChange={ticketForm.handleChange}
                  >
                    <option defaultValue="">Select status</option>
                    <option value="NEW">New</option>
                    <option value="OPEN">Open</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="RESOLVED">Resolved</option>
                  </select>

                  <p className="invalid-data">
                    {ticketForm.errors.status && ticketForm.touched.status
                      ? ticketForm.errors.status
                      : null}
                  </p>
                </div>
              </form>
            }
            modalFooterBtn={
              <>
                <button
                  data-bs-dismiss="modal"
                  className="secondary-btn"
                  onClick={ticketForm.resetForm}
                >
                  Close
                </button>

                <button
                  type="submit"
                  className="primary-btn"
                  onClick={ticketForm.handleSubmit}
                  data-bs-dismiss={
                    ticketForm.isValid && ticketForm.dirty ? "modal" : null
                  }
                >
                  Next
                </button>
              </>
            }
          />
        </div>
      </div>

      <div className="section-b">
        <div className="mb-5">
          <div>
            <div className="details-card">
              <div className="header d-flex align-items-center justify-content-between mb-3">
                <h3 className="title">{tickets.title}</h3>
                <div className={`status ${tickets.priority}`}>{tickets.priority}</div>
              </div>

              <div className="con-budget flex">
                <h3>Budget:</h3>
                <p>{tickets.budget}</p>
              </div>

              <div className="con-date flex">
                <h3>Start Date:</h3>
                <p>{tickets.start_date}</p>
              </div>

              <div className="con-duration flex">
                <h3>Duration:</h3>
                <p>{tickets.duration}</p>
              </div>

              <div className="con-apply flex">
                <h3>No. of Applicants:</h3>
                <p>{tickets.applicants}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex align-items-center gap-4">
        <div>
          <Button
            type="primary"
            text="View all applicants"
            modal={true}
            modalHeaderTitle="All Project Applicants"
            modalTarget="view-all-applicants"
            modalContext={
              <div className="con-applicant">
                <Link
                  to="/my-profile?search=view?select=check"
                  data-bs-dismiss="modal"
                >
                  <div className="applicant-card d-flex align-items-center justify-content-between">
                    <div className="con-left">
                      <div className="con-img">
                        <img
                          src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                          alt=""
                        />
                      </div>
                      <div className="con-text">
                        <h3 className="name">John Doe</h3>
                        <p className="title">Manager</p>
                      </div>
                    </div>

                    <div className="con-right">
                      <p>View Profile</p>
                    </div>
                  </div>
                </Link>

                <Link to="/my-profile?select=check" data-bs-dismiss="modal">
                  <div className="applicant-card d-flex align-items-center justify-content-between">
                    <div className="con-left">
                      <div className="con-img">
                        <img
                          src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                          alt=""
                        />
                      </div>
                      <div className="con-text">
                        <h3 className="name">John Doe</h3>
                        <p className="title">Manager</p>
                      </div>
                    </div>

                    <div className="con-right">
                      <p>View Profile</p>
                    </div>
                  </div>
                </Link>

                <Link to="/my-profile?select=check" data-bs-dismiss="modal">
                  <div className="applicant-card d-flex align-items-center justify-content-between">
                    <div className="con-left">
                      <div className="con-img">
                        <img
                          src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                          alt=""
                        />
                      </div>
                      <div className="con-text">
                        <h3 className="name">John Doe</h3>
                        <p className="title">Manager</p>
                      </div>
                    </div>

                    <div className="con-right">
                      <p>View Profile</p>
                    </div>
                  </div>
                </Link>
                <Link to="/my-profile?select=check" data-bs-dismiss="modal">
                  <div className="applicant-card d-flex align-items-center justify-content-between">
                    <div className="con-left">
                      <div className="con-img">
                        <img
                          src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                          alt=""
                        />
                      </div>
                      <div className="con-text">
                        <h3 className="name">John Doe</h3>
                        <p className="title">Manager</p>
                      </div>
                    </div>

                    <div className="con-right">
                      <p>View Profile</p>
                    </div>
                  </div>
                </Link>
                <Link to="/my-profile?select=check" data-bs-dismiss="modal">
                  <div className="applicant-card d-flex align-items-center justify-content-between">
                    <div className="con-left">
                      <div className="con-img">
                        <img
                          src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                          alt=""
                        />
                      </div>
                      <div className="con-text">
                        <h3 className="name">John Doe</h3>
                        <p className="title">Manager</p>
                      </div>
                    </div>

                    <div className="con-right">
                      <p>View Profile</p>
                    </div>
                  </div>
                </Link>
                <Link to="/my-profile?select=check" data-bs-dismiss="modal">
                  <div className="applicant-card d-flex align-items-center justify-content-between">
                    <div className="con-left">
                      <div className="con-img">
                        <img
                          src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                          alt=""
                        />
                      </div>
                      <div className="con-text">
                        <h3 className="name">John Doe</h3>
                        <p className="title">Manager</p>
                      </div>
                    </div>

                    <div className="con-right">
                      <p>View Profile</p>
                    </div>
                  </div>
                </Link>
                <Link to="/my-profile?select=check" data-bs-dismiss="modal">
                  <div className="applicant-card d-flex align-items-center justify-content-between">
                    <div className="con-left">
                      <div className="con-img">
                        <img
                          src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                          alt=""
                        />
                      </div>
                      <div className="con-text">
                        <h3 className="name">John Doe</h3>
                        <p className="title">Manager</p>
                      </div>
                    </div>

                    <div className="con-right">
                      <p>View Profile</p>
                    </div>
                  </div>
                </Link>
                <Link to="/my-profile?select=check" data-bs-dismiss="modal">
                  <div className="applicant-card d-flex align-items-center justify-content-between">
                    <div className="con-left">
                      <div className="con-img">
                        <img
                          src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                          alt=""
                        />
                      </div>
                      <div className="con-text">
                        <h3 className="name">John Doe</h3>
                        <p className="title">Manager</p>
                      </div>
                    </div>

                    <div className="con-right">
                      <p>View Profile</p>
                    </div>
                  </div>
                </Link>
                <Link to="/my-profile?select=check" data-bs-dismiss="modal">
                  <div className="applicant-card d-flex align-items-center justify-content-between">
                    <div className="con-left">
                      <div className="con-img">
                        <img
                          src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                          alt=""
                        />
                      </div>
                      <div className="con-text">
                        <h3 className="name">John Doe</h3>
                        <p className="title">Manager</p>
                      </div>
                    </div>

                    <div className="con-right">
                      <p>View Profile</p>
                    </div>
                  </div>
                </Link>
                <Link to="/my-profile?select=check" data-bs-dismiss="modal">
                  <div className="applicant-card d-flex align-items-center justify-content-between">
                    <div className="con-left">
                      <div className="con-img">
                        <img
                          src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                          alt=""
                        />
                      </div>
                      <div className="con-text">
                        <h3 className="name">John Doe</h3>
                        <p className="title">Manager</p>
                      </div>
                    </div>

                    <div className="con-right">
                      <p>View Profile</p>
                    </div>
                  </div>
                </Link>
                <Link to="/my-profile?select=check" data-bs-dismiss="modal">
                  <div className="applicant-card d-flex align-items-center justify-content-between">
                    <div className="con-left">
                      <div className="con-img">
                        <img
                          src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                          alt=""
                        />
                      </div>
                      <div className="con-text">
                        <h3 className="name">John Doe</h3>
                        <p className="title">Manager</p>
                      </div>
                    </div>

                    <div className="con-right">
                      <p>View Profile</p>
                    </div>
                  </div>
                </Link>
                <Link to="/my-profile?select=check" data-bs-dismiss="modal">
                  <div className="applicant-card d-flex align-items-center justify-content-between">
                    <div className="con-left">
                      <div className="con-img">
                        <img
                          src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                          alt=""
                        />
                      </div>
                      <div className="con-text">
                        <h3 className="name">John Doe</h3>
                        <p className="title">Manager</p>
                      </div>
                    </div>

                    <div className="con-right">
                      <p>View Profile</p>
                    </div>
                  </div>
                </Link>
                <Link to="/my-profile?select=check" data-bs-dismiss="modal">
                  <div className="applicant-card d-flex align-items-center justify-content-between">
                    <div className="con-left">
                      <div className="con-img">
                        <img
                          src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                          alt=""
                        />
                      </div>
                      <div className="con-text">
                        <h3 className="name">John Doe</h3>
                        <p className="title">Manager</p>
                      </div>
                    </div>

                    <div className="con-right">
                      <p>View Profile</p>
                    </div>
                  </div>
                </Link>
                <Link to="/my-profile?select=check" data-bs-dismiss="modal">
                  <div className="applicant-card d-flex align-items-center justify-content-between">
                    <div className="con-left">
                      <div className="con-img">
                        <img
                          src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                          alt=""
                        />
                      </div>
                      <div className="con-text">
                        <h3 className="name">John Doe</h3>
                        <p className="title">Manager</p>
                      </div>
                    </div>

                    <div className="con-right">
                      <p>View Profile</p>
                    </div>
                  </div>
                </Link>
                <Link to="/my-profile?select=check" data-bs-dismiss="modal">
                  <div className="applicant-card d-flex align-items-center justify-content-between">
                    <div className="con-left">
                      <div className="con-img">
                        <img
                          src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                          alt=""
                        />
                      </div>
                      <div className="con-text">
                        <h3 className="name">John Doe</h3>
                        <p className="title">Manager</p>
                      </div>
                    </div>

                    <div className="con-right">
                      <p>View Profile</p>
                    </div>
                  </div>
                </Link>
                <Link to="/my-profile?select=check" data-bs-dismiss="modal">
                  <div className="applicant-card d-flex align-items-center justify-content-between">
                    <div className="con-left">
                      <div className="con-img">
                        <img
                          src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                          alt=""
                        />
                      </div>
                      <div className="con-text">
                        <h3 className="name">John Doe</h3>
                        <p className="title">Manager</p>
                      </div>
                    </div>

                    <div className="con-right">
                      <p>View Profile</p>
                    </div>
                  </div>
                </Link>
                <Link to="/my-profile?select=check" data-bs-dismiss="modal">
                  <div className="applicant-card d-flex align-items-center justify-content-between">
                    <div className="con-left">
                      <div className="con-img">
                        <img
                          src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                          alt=""
                        />
                      </div>
                      <div className="con-text">
                        <h3 className="name">John Doe</h3>
                        <p className="title">Manager</p>
                      </div>
                    </div>

                    <div className="con-right">
                      <p>View Profile</p>
                    </div>
                  </div>
                </Link>
              </div>
            }
            modalFooterBtn={
              <>
                <button data-bs-dismiss="modal" className="primary-btn">
                  Done
                </button>
              </>
            }
          />
        </div>

        <div>
          <Button
            type="primary"
            text="View all workers"
            modal
            modalHeaderTitle="All Active Workers on Project"
            modalTarget="view-all-workers"
            modalContext={
              <div className="con-applicant">
                <Link to="/my-profile?search=view" data-bs-dismiss="modal">
                  <div className="applicant-card d-flex align-items-center gap-3">
                    <div className="con-img">
                      <img
                        src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                        alt=""
                      />
                    </div>
                    <div className="con-text">
                      <h3 className="name">John Doe</h3>
                      <p className="title">Manager</p>
                    </div>
                  </div>
                </Link>

                <Link to="/my-profile?search=view" data-bs-dismiss="modal">
                  <div className="applicant-card d-flex align-items-center gap-3">
                    <div className="con-img">
                      <img
                        src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                        alt=""
                      />
                    </div>
                    <div className="con-text">
                      <h3 className="name">John Doe</h3>
                      <p className="title">Manager</p>
                    </div>
                  </div>
                </Link>
              </div>
            }
            modalFooterBtn={
              <>
                <button data-bs-dismiss="modal" className="primary-btn">
                  Done
                </button>
              </>
            }
          />
        </div>
      </div>
    </div>
  );
}

export default ProjectData;
