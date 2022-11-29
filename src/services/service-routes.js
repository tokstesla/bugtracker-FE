let mid = 0
let pid = 0
let tid = 0

const baseUrl = '/api'
const authRoute = `${baseUrl}/auth`
const membersRoute = `${baseUrl}/members`
const projectsRoute = `${membersRoute}/${mid}/projects`
const ticketsRoute = `${projectsRoute}/${pid}/tickets`

const _routes = {
  login: `${authRoute}/signin`,
  register: `${authRoute}/signup`,
  members: `${membersRoute}`,
  member: `${membersRoute}/${mid}`,
  projects: `${projectsRoute}`,
  project: `${projectsRoute}/${pid}`,
  tickets: `${ticketsRoute}`,
  ticket:`${ticketsRoute}/${tid}`,
  membersForProject: `${projectsRoute}/${pid}/members`,
  memberForProject: `${projectsRoute}/${pid}/members/${mid}`,
  membersForTicket:`${ticketsRoute}/${tid}/tickets`,
  memberForTicket:`${ticketsRoute}/${tid}/tickets/${tid}`, 
}

export default _routes;