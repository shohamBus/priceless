import "../styles/globals.css";
import Head from "next/head";
import Script from "next/script";

function Layout({ children }) {
  return <div style={{ backgroundColor: "#bbbdc4" }}>{children}</div>;
}

function MyApp({ Component, pageProps }) {
  return (
    // <Layout>
    <Component {...pageProps} />
    // </Layout>
  );
}

export default MyApp;
