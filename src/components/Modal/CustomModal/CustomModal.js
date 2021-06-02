import React from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import { CloseIcon } from "../../../assets/icons";
import Styles from "./CustomModal.module.scss";

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

export const CustomModal = props => {
  const { visible, onClose, title } = props;

  return (
    <Modal
      isOpen={visible}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className={Styles.container}>
        <div className={Styles.header}>
          <span>{title}</span>
          <CloseIcon onClick={() => onClose()} />
        </div>
        {props.children}
      </div>
    </Modal>
  );
};

CustomModal.defaultProps = {
  visible: false,
  styleContainer: {},
  onClose: () => {},
  title: "Title",
};

CustomModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  styleContainer: PropTypes.any,
  onClose: PropTypes.func,
  title: PropTypes.string,
};
