import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

import styles from "../styles/Login.module.css";

const Login = () => {
  const [userMsg, setUserMsg] = useState();
  const [email, setEmail] = useState();
  const router = useRouter();

  const handleOnChangeEmail = (e) => {
    setUserMsg("");
    setEmail(e.target.value);
  };

  const handleLoginWithEmail = (e) => {
    e.preventDefault();

    if (email) {
      if (email === "dario.nihil@gmail.com") {
        router.replace("/");
      } else {
        setUserMsg("Something went wrong logging in");
      }
    } else {
      setUserMsg("Enter a valid email address");
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Netfix SignIn</title>
      </Head>
      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <Link className={styles.logoLink} href="/">
            <div className={styles.logoWrapper}>
              <Image
                src="../static/netflix.svg"
                alt="Netflix logo"
                width={128}
                height={34}
              />
            </div>
          </Link>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signinHeader}>Sign In</h1>
          <input
            type="text"
            placeholder="Email address"
            className={styles.Input}
            onChange={handleOnChangeEmail}
          />
          <p className={styles.userMsg}>{userMsg}</p>
          <button onClick={handleLoginWithEmail} className={styles.loginBtn}>
            Sign In
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
