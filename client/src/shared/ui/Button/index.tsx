import styles from "./style.module.scss";

interface ButtonProps {
  text: string;
  onClick?: () => void;
}

function Button({ text, onClick }: ButtonProps) {
  return (
    <div className={styles.buttonContainer}>
      <button onClick={onClick}>{text}</button>
    </div>
  );
}

export default Button;
