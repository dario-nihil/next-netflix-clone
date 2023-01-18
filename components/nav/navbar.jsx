import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./navbar.module.css";

const NavBar = ({ userName }) => {
  const router = useRouter();

  const handleOnClickHome = () => {
    router.push("/");
  };

  const handleOnClickMyList = () => {
    router.push("/browse/my-list");
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link className={styles.logoLink} href="/">
          <div className={styles.logoWrapper}>Netflix</div>
        </Link>

        <ul className={styles.navItems}>
          <li className={styles.navItem} onClick={handleOnClickHome}>
            Home
          </li>
          <li className={styles.navItem2} onClick={handleOnClickMyList}>
            My List
          </li>
        </ul>
        <nav className={styles.navContainer}>
          <div>
            <button className={styles.userNameBtn}>
              <p className={styles.userName}>{userName}</p>
              {/** expand more icon */}
            </button>

            <div className={styles.navDropdown}>
              <div>
                <Link className={styles.linkName} href="/login">
                  Sign out
                </Link>
                <div className={styles.lineWrapper}></div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
