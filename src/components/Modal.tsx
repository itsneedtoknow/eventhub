import { Button } from "./Button";
import styles from "./Modal.module.css";
interface IModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onCloseModal: () => void;
}
export function Modal({ children, onCloseModal }: IModalProps) {
  return (
    <div className={styles.modalWindow}>
      <Button
        className={`${styles.modalCloseBtn} btn btn--tertiary`}
        onClick={onCloseModal}
        children={"x"}
        type="button"
      />
      <div className={styles.modalWrapper}>{children}</div>
    </div>
  );
}
