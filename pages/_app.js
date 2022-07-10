import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import CompareContextProvider from "../context/CompareContext";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <CompareContextProvider>
        <Component {...pageProps} />
      </CompareContextProvider>
    </SessionProvider>
  );
}

export default MyApp;
