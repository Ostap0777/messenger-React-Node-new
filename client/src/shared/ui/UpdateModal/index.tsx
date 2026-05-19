import React, { useState } from "react";
import { createPortal } from "react-dom";
import styles from "./styles.module.scss";
import {
  useUpdateContactMutation,
  type Contact,
} from "../../../features/auth/api/contacts";

interface UpdateModalContentProps {
  contact: Contact | null;
  isOpen: boolean;
  onClose: () => void;
}

function UpdateModal({ isOpen, onClose, contact }: UpdateModalContentProps) {
  const [customName, setCustomName] = useState("");

  console.log("UpdateModal render", isOpen);
  const [updateContact] = useUpdateContactMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateContact({
        id: contact?.id,
        customName: customName || undefined,
      }).unwrap;
      onClose();
    } catch (err) {
      console.error(err);
    }
  };
  if (!isOpen) return null;
  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>
          ✕
        </button>
        <div className={styles.modalContent}>
          <form className={styles.modalForm} onSubmit={handleSubmit}>
            <input
              placeholder="Name"
              type="Text"
              value={customName}
              className={styles.input}
              onChange={(e) => setCustomName(e.target.value)}
            />
            <button className={styles.button}>U</button>
          </form>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default UpdateModal;
