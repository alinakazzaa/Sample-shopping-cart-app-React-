import React from 'react'
import Modal from 'react-modal'

Modal.setAppElement('#root')

export const DialogModal = ({ title, isOpen, onOpen, onClose, children }) => {

    return (
        <div>
            <Modal
                isOpen={isOpen}
                onAfterOpen={onOpen || null}
                onRequestClose={onClose}
                style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}
                contentLabel={title}>
                <button style={{ display: 'flex', alignSelf: 'flex-end' }} onClick={onClose}>close</button>
                {children}
            </Modal>
        </div>
    );
}