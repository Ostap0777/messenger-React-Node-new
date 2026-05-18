import React, { useState } from "react";
import { createPortal } from "react-dom";
import styles from "./styles.module.scss";
import { useCreateContactMutation } from "../../../features/auth/api/contacts";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function Modal({ isOpen, onClose }: ModalProps) {
  const [customName, setCustomName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [createContact] = useCreateContactMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createContact({
        email,
        phone,
        customName: customName || undefined,
      }).unwrap();
      setCustomName("");
      setEmail("");
      setPhone("");
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
              type="text"
              className={styles.input}
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
            />
            <input
              placeholder="Email"
              type="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Phone"
              type="tel"
              className={styles.input}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button className={styles.button}>Create</button>
          </form>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default Modal;
