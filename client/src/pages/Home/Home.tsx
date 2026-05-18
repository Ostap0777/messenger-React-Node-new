import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import { useGetContactsQuery } from "../../features/auth/api/contacts";
import ContactsSideBar from "../../shared/ui/Sidebar/ContactsSideBar";
import {
  clearAccessToken,
  getUserIdFromToken,
} from "../../features/auth/lib/session";

function Home() {
  const navigate = useNavigate();
  const userId = getUserIdFromToken();

  const handleLogout = () => {
    clearAccessToken();
    navigate("/login");
  };

  const { data: contacts = [] } = useGetContactsQuery(userId ?? "", {
    skip: !userId,
  });
  return (
    <div className={styles.homeContainer}>
      <div className={styles.sidebarContent}>
        <ContactsSideBar contacts={contacts} />
      </div>
      <div className={styles.mainContent}>
        <p>Home</p>
        <p className={styles.logOutButton} onClick={handleLogout}>
          Logout
        </p>
      </div>
    </div>
  );
}

export default Home;
