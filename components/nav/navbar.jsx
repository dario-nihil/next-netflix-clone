import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import styles from "./navbar.module.css";

const NavBar = ({ userName }) => {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleOnClickHome = () => {
    router.push("/");
  };

  const handleOnClickMyList = () => {
    router.push("/browse/my-list");
  };

  const handleShowDropdown = () => {
    setShowDropdown((prevState) => !prevState);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link className={styles.logoLink} href="/">
          <div className={styles.logoWrapper}>
            <Image
              src="/static/netflix.svg"
              alt="Netflix logo"
              width={128}
              height={34}
            />
          </div>
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
            <button className={styles.userNameBtn} onClick={handleShowDropdown}>
              <p className={styles.userName}>{userName}</p>
              {/** expand more icon */}
              <Image
                src="/static/expand_more.svg"
                alt="Expand dropdown"
                width={24}
                height={24}
              />
            </button>

            {showDropdown && (
              <div className={styles.navDropdown}>
                <div>
                  <Link className={styles.linkName} href="/login">
                    Sign out
                  </Link>
                  <div className={styles.lineWrapper}></div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
