import Button from "components/button/Button";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { ticketData, ticketValidationSchema } from "schema/ticketSchema";
import service from "services/service";
import "./css/Ticket.sass";

function Tickets({ allMembers, allTickets, payload, setAllTickets }) {
  service.setPageTitle("Tickets");

  async function onSubmit(values) {
    values.author = service.getPayload().email;
    values.ticketId = service.getRandomId();
    setAllTickets(values);
    // ticketForm.resetForm();
  }

  const ticketForm = useFormik({
    initialValues: ticketData,
    validationSchema: ticketValidationSchema,
    onSubmit,
  });

  return (
    <>
      <div id="Tickets_Main_Container" className="component-container">
        <div className="con-header d-flex align-items-center justify-content-between">
          <div className="title px-lg-4">
            <h2>Tickets</h2>
          </div>

          <>
            <div className="header-btn">
              <Button
                type="primary"
                text="New Ticket"
                modal={true}
                modalHeaderTitle="Create New Ticket"
                modalTarget="new-ticket-create"
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

                    {payload.role === "ADMIN" ? (
                      <>
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
                                {member.firstName}&nbsp;
                                {member.lastName}
                              </option>
                            ))}
                          </select>
                        </div>
                      </>
                    ) : null}

                    {payload.role === "ADMIN" ? (
                      <>
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
                      </>
                    ) : null}

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
                        <option value="ISSUE">Issue</option>
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
                        {ticketForm.errors.priority &&
                        ticketForm.touched.priority
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
                      Raise Ticket
                    </button>
                  </>
                }
              />
            </div>
          </>
        </div>

        <div className="con-context table-container">
          {allTickets?.length > 0 ? (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr className="header-row">
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                    <th scope="col">Author</th>
                  </tr>
                </thead>
                <tbody>
                  {allTickets?.length > 0 ? (
                    <>
                      {allTickets?.map((elem, key) => (
                        <tr key={key}>
                          <td>
                            <Link to={`/projects/tickets/id/${elem.ticketId}`}>{key + 1}</Link>
                          </td>
                          <td>
                            <Link to={`/projects/tickets/id/${elem.ticketId}`}>{elem.title}</Link>
                          </td>
                          <td>
                            <Link to={`/projects/tickets/id/${elem.ticketId}`}>
                              {elem.description}
                            </Link>
                          </td>
                          <td>
                            <Link to={`/projects/tickets/id/${elem.ticketId}`}>{elem.author}</Link>
                          </td>
                        </tr>
                      ))}
                    </>
                  ) : null}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="">
              <div>
                No tickets to show. &nbsp;&nbsp;
                <span
                  data-bs-toggle="modal"
                  data-bs-target="#new-ticket-create"
                  className="highlight"
                >
                  Create New Ticket
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Tickets;
