export default function AdminDashboard() {
  const { ADMIN_EMAIL } = process.env;
  // session is always non-null inside this page, all the way down the React tree.
  return;
}

AdminDashboard.auth = true;

// AdminDashboard.auth = {
//     role: "admin",
//     loading: <AdminLoadingSkeleton />,
//     unauthorized: "/login-with-different-user", // redirect to this url
//   }
