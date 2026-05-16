import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import { useGetContactsQuery } from "../../features/auth/api/contacts";

export interface ContactUser {
  id: string;
  name: string;
  email: string | null;
  userTag: string | null;
  avatar: string | null;
}

export interface Contact {
  id: string;
  ownerId: string;
  contactUserId: string;
  customName: string | null;
  createdAt: string;
  contactUser: ContactUser;
}

function Home() {
  //   const [contacts, setContacts] = useState<Contact[]>([]);
  const navigate = useNavigate();
  const handleLogout = async () => {
    localStorage.removeItem("accessToken");
    console.log("click");
    navigate("/login");
  };

  const { data: contacts = [] } = useGetContactsQuery();
  return (
    <div className={styles.homeContainer}>
      <p>Home</p>
      <p className={styles.logOutButton} onClick={handleLogout}>
        Logout
      </p>
      <div className={styles.contactsBlock}>
        {contacts.map((c) => (
          <p key={c.id}>{c.contactUser.name}</p>
        ))}
      </div>
    </div>
  );
}

export default Home;
