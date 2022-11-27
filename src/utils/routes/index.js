const routes = [
  {
    path: "/dashboard",
    context: "Dashboard",
    role: 'all'
  },
  {
    path: "/administration",
    context: "Administration",
    role: 'ADMIN'
  }
];

export default routes;