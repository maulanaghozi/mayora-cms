import React from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import { CloseIcon } from "../../../assets/icons";
import Styles from "./NewTrouble.module.scss";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export const NewTroubleModal = props => {
  const { visible, onSubmit, onClose, title, machineId } = props;

  return (
    <Modal
      isOpen={visible}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Trouble Baru"
    >
      <div className={Styles.container}>
        <div className={Styles.header}>
          <span>{title}</span>
          <CloseIcon onClick={() => onClose()} />
        </div>
        <span>{`Ada Trouble Baru di Machine Line Creamer ${
          machineId === "00f5eafd-89c5-4871-a982-26a8180774c7" ? "1" : "2"
        }`}</span>
      </div>
    </Modal>
  );
};

NewTroubleModal.defaultProps = {
  visible: false,
  styleContainer: {},
  onClose: () => {},
  title: "Trouble Baru",
  machineId: "",
};

NewTroubleModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  styleContainer: PropTypes.any,
  onClose: PropTypes.func,
  title: PropTypes.string,
  machineId: PropTypes.string,
};
