const routes = [
  {
    path: "/dashboard",
    context: "Dashboard",
    role: 'all'
  },
  {
    path: "/explore",
    context: "Explore",
    role: 'USER'
  },
  {
    path: "/requests",
    context: "Requests",
    role: 'USER'
  },
  {
    path: "/administration",
    context: "Administration",
    role: 'ADMIN'
  }
];

export default routes;