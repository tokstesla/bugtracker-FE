import "./css/Admin.sass";

function Admin({allUsers}) {
  return (
    <div id="Admin_Main_Container" className="component-container">
      <div className="con-section">
        <div className="con-header">
          <h3>All Users</h3>
        </div>
        <div className="con-context table-container">
          {allUsers ? (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr className="header-row">
                    <th scope="col">#</th>
                    <th scope="col">First name</th>
                    <th scope="col">Last name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers?.length > 0 ? (
                    <>
                      {allUsers.map((elem, key) => (
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
              <div>No Users yet.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;
