import styles from "./navbar.module.css";

const NavBar = ({ userName }) => {
  return (
    <div>
      The NavBar Component<p>{userName}</p>
      <ul>
        <li>Home</li>
        <li>My List</li>
      </ul>
      <nav>
        <div>
          <button>
            <p>{userName}</p>
          </button>
          <div>
            <a>Sign out</a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
