import React, { useState } from 'react';
import styles from "./modal.module.scss";
import Main from '@components/Main/Main';

const ModalWindow = ({ text, isOpen, onClose }) => {
	if (isOpen) {
		return (
			<Main />
		)
	};
	return (
		<div className={styles.modal}>
			<div onClick={onClose} className={styles.close_button}><span></span><span></span></div>
			<h1 className={styles.modal_text}>{text}</h1>
		</div>
	)
}
export default ModalWindow;