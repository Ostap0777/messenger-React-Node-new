import { useState } from "react";
import styles from "./style.module.scss";
import Modal from "../Modal";
import type { Contact } from "../../../features/auth/api/contacts";
import { getContactDisplayName } from "../../../features/auth/lib/getContactDisplayName";

interface ContactsSideBarProps {
  contacts: Contact[];
}

function ContactsSideBar({ contacts }: ContactsSideBarProps) {
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const handleModalOpen = () => {
    setModalOpened(true);
  };
  return (
    <div>
      <div className={styles.topContent}>
        <p>Contacts</p>
        <button onClick={handleModalOpen}>Add Contact</button>
      </div>
      <div className={styles.mainContent}>
        {contacts.length === 0 ? (
          <p className={styles.empty}>No contacts yet</p>
        ) : (
          <ul className={styles.contactList}>
            {contacts.map((contact) => (
              <li key={contact.id} className={styles.contactItem}>
                {getContactDisplayName(contact)}
              </li>
            ))}
          </ul>
        )}
      </div>
      <Modal
        isOpen={modalOpened}
        onClose={() => setModalOpened(false)}
      />
    </div>
  );
}

export default ContactsSideBar;
