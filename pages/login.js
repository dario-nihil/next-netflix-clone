import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import styles from "../styles/Login.module.css";

const Login = () => {
  return (
    <>
      <Head>
        <title>Netfix SignIn</title>
      </Head>
      <header>
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
    </>
  );
};

export default Login;
