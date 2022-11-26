const authRoute = '/api/auth'
const projectRoute = '/api'

const _routes = {
  login: `${authRoute}/signin`,
  register: `${authRoute}/signup`,
  projects: `${projectRoute}/projects`
}

export default _routes;