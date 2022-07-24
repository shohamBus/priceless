import "../styles/globals.css";
import { SessionProvider, useSession } from "next-auth/react";
import CompareContextProvider from "../context/CompareContext";
import Admin from "../components/admin/Admin";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <CompareContextProvider>
        {Component.auth ? (
          <AuthAdmin>
            <Admin />
          </AuthAdmin>
        ) : (
          <Component {...pageProps} />
        )}
      </CompareContextProvider>
    </SessionProvider>
  );
}

export function AuthAdmin({ children }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { data, status } = useSession({ required: true });
  const { NEXT_PUBLIC_ADMIN_EMAIL } = process.env;

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (NEXT_PUBLIC_ADMIN_EMAIL === data?.user?.email) {
    return children;
  } else {
    return <h1> דף זה משמש רק למנהל המערכת</h1>;
  }
}

export default MyApp;
