import React, { useCallback, useEffect } from 'react';
import styles from "./modal.module.scss";
import Main from '@components/Main/Main';

const ModalWindow = React.memo(({ text, isOpen, onClose }) => {
	const handleEscapeKey = useCallback((event) => {
		if (event.key === 'Escape' && isOpen) {
			onClose();
		}
	}, [isOpen, onClose]);

	useEffect(() => {
		document.addEventListener('keydown', handleEscapeKey);
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		}

		return () => {
			document.removeEventListener('keydown', handleEscapeKey);
			document.body.style.overflow = 'unset';
		};
	}, [isOpen, handleEscapeKey]);

	if (!isOpen) return null;

	return (
		<div
			className={styles.modal}
			role="dialog"
			aria-modal="true"
			aria-labelledby="modal-title"
		>
			<div className={styles.modal_overlay} onClick={onClose} />
			<div className={styles.modal_content}>
				<button
					onClick={onClose}
					className={styles.close_button}
					aria-label="Close modal"
				>
					<span></span>
					<span></span>
				</button>
				<h1 id="modal-title" className={styles.modal_text}>{text}</h1>
				<Main />
			</div>
		</div>
	);
});

ModalWindow.displayName = 'ModalWindow';

export default ModalWindow;