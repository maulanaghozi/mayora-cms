import React, { useState } from "react";
import { CustomModal } from "../../../../components/Modal/CustomModal/CustomModal";
import { InputWithLabel } from "../../../../components/Form/InputWithLable/InputWithLabel";
import TargetOEETable from "../../Tables/TargetOEE/TargetOEETable";
import Styles from "./TargetOEE.module.scss";

export default function TargetOEE() {
  const [modalVisible, setModalVisible] = useState(false);

  const renderTargetOEE = () => {
    return (
      <div className={Styles.cardTarget}>
        <div className={Styles.titleContainer}>
          <span className={Styles.title}>OEE Target</span>
        </div>
        <div className={Styles.targetValueContainer}>
          <span className={Styles.targetValue}>90%</span>
          <span onClick={() => setModalVisible(true)} className={Styles.edit}>
            Edit
          </span>
        </div>
      </div>
    );
  };

  const renderTable = () => {
    return <TargetOEETable />;
  };

  const renderModalEditOEETarget = () => {
    return (
      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={"Set New OEE Target"}
      >
        <InputWithLabel label={"Target"} value={3000} setValue={() => {}} />
        <div className={Styles.buttonContainer}>
          <button
            onClick={() => setModalVisible(false)}
            className={Styles.cancel}
          >
            Cancel
          </button>
          <button onClick={() => {}} className={Styles.save}>
            Save
          </button>
        </div>
      </CustomModal>
    );
  };
  return (
    <div className={Styles.container}>
      {renderTargetOEE()}
      {renderTable()}
      {renderModalEditOEETarget()}
    </div>
  );
}
