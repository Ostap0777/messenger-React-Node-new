import { useState } from "react";
import styles from "./style.module.scss";
import Modal from "../Modal";
import {
  useDeleteContactMutation,
  type Contact,
} from "../../../features/auth/api/contacts";
import { getContactDisplayName } from "../../../features/auth/lib/getContactDisplayName";
import UpdateModal from "../UpdateModal";

interface ContactsSideBarProps {
  contacts: Contact[];
}

function ContactsSideBar({ contacts }: ContactsSideBarProps) {
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [updateModalOpened, setUpdateModalOpened] = useState<boolean>(false);
  const [contactToEdit, setContactToEdit] = useState<Contact | null>(null);
  const [deleteContact] = useDeleteContactMutation();
  const handleCreateModalOpen = () => {
    setModalOpened(true);
  };

  const handleUpdateModalOpen = (contact: Contact) => {
    setContactToEdit(contact);
    console.log("click");
    setUpdateModalOpened(true);
  };

  const handleDeleteContact = async (id: string) => {
    console.log(id);
    try {
      await deleteContact(id).unwrap();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <div className={styles.topContent}>
        <p>Contacts</p>
        <button onClick={handleCreateModalOpen}>Add Contact</button>
      </div>
      <div className={styles.mainContent}>
        {contacts.length === 0 ? (
          <p className={styles.empty}>No contacts yet</p>
        ) : (
          <ul className={styles.contactList}>
            {contacts.map((contact) => (
              <li key={contact.id} className={styles.contactItem}>
                {getContactDisplayName(contact)}
                <button onClick={() => handleDeleteContact(contact.id)}>
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdateModalOpen(contact)}
                >
                  Update
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Modal isOpen={modalOpened} onClose={() => setModalOpened(false)} />
      <UpdateModal
        contact={contactToEdit}
        isOpen={updateModalOpened}
        onClose={() => setUpdateModalOpened(false)}
      />
    </div>
  );
}

export default ContactsSideBar;
