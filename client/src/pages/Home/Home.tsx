import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    localStorage.removeItem("accessToken");
    console.log("click");
    navigate("/login");
  };
  return (
    <div className={styles.homeContainer}>
      <p>Home</p>
      <p className={styles.logOutButton} onClick={handleLogout}>
        Logout
      </p>
    </div>
  );
}

export default Home;
