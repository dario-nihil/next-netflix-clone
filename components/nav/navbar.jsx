import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { magic } from "../../lib/magic-client";

import styles from "./navbar.module.css";

const NavBar = () => {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  let didToken = useRef();

  useEffect(() => {
    const getUserEmail = async () => {
      try {
        const { email } = await magic.user.getMetadata();
        didToken.current = await magic.user.getIdToken();
        if (email) {
          setUserEmail(email);
        }
      } catch (error) {
        console.log("Error retrieving email", error);
      }
    };

    getUserEmail();
  }, []);

  const handleOnClickHome = () => {
    router.push("/");
  };

  const handleOnClickMyList = () => {
    router.push("/browse/my-list");
  };

  const handleShowDropdown = () => {
    setShowDropdown((prevState) => !prevState);
  };

  const handleSignOut = async () => {
    try {
      await fetch("/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${didToken}`,
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log("Error logging out", error);
      router.push("/login");
    }
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
              <p className={styles.userName}>{userEmail}</p>
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
                  <Link
                    className={styles.linkName}
                    href="/login"
                    onClick={handleSignOut}
                  >
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
