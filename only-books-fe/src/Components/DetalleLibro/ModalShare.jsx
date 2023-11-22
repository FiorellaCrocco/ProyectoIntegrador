import React, { useState } from "react";
import styles from "./ModalShare.module.css"; // Ajusta la ruta según la ubicación real de tus estilos

function ModalShare({ onClose, children }) {
    return (
        <div className={styles.modal}>
            <div className={styles.overlay} onClick={onClose}></div>
            <div className={styles.modalcontent}>
                {children}
                <button className={styles.closemodal} onClick={onClose}>
                    Cerrar
                </button>
            </div>
        </div>
    );
}

export default ModalShare;
