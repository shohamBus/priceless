import Head from "next/head";
import styles from "../styles/Home.module.css";
import Header from "../components/user/Header";
import { SupersCheckbox } from "../components/user/SupersCheckbox";
import { Compare } from "../components/user/Compare";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Priceless</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Header />
      <SupersCheckbox />
      <Compare />
    </div>
  );
}
