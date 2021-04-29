import React, { useState } from "react";
import moment from "moment";
import ProductionTargetTable from "../../Tables/ProductionTarget/ProductionTargetTable";
import { CustomModal } from "../../../../components/Modal/CustomModal/CustomModal";
import { InputWithLabel } from "../../../../components/Form/InputWithLable/InputWithLabel";
import Styles from "./ProductionTarget.module.scss";

export default function ProductionTarget() {
  const [modalDefaultVisible, setModalDefaultVisible] = useState(false);
  const [modalCurrentVisible, setModalCurrentVisible] = useState(false);
  const renderDefaultTarget = () => {
    return (
      <div className={Styles.cardTarget}>
        <div className={Styles.titleContainer}>
          <span className={Styles.title}>Default Target</span>
        </div>
        <div className={Styles.targetValueContainer}>
          <span className={Styles.targetValue}>3000</span>
          <span
            onClick={() => setModalDefaultVisible(true)}
            className={Styles.edit}
          >
            Edit
          </span>
        </div>
        <p className={Styles.desc}>
          Default target akan berlaku seterusnya sebagai nilai awal apabila
          tidak ada pergantian nilai target
        </p>
      </div>
    );
  };

  const renderCurrentTarget = () => {
    return (
      <div className={Styles.cardTarget}>
        <div className={Styles.titleContainer}>
          <span className={Styles.title}>Current Target</span>
          <span className={Styles.dateCard}>
            {moment().format("DD MMM YYYY")}
          </span>
        </div>
        <div className={Styles.targetValueContainer}>
          <span className={Styles.targetValue}>3000</span>
          <span
            onClick={() => setModalCurrentVisible(true)}
            className={Styles.edit}
          >
            Edit
          </span>
        </div>
        <p className={Styles.desc}>
          Current target akan berlaku hanya untuk hari ini. Waktu mulai aktif
          dapat diatur sesuai keinginan.
        </p>
      </div>
    );
  };
  const renderTable = () => {
    return <ProductionTargetTable />;
  };

  const renderModalEditDefaultTarget = () => {
    return (
      <CustomModal
        visible={modalDefaultVisible}
        onClose={() => setModalDefaultVisible(false)}
        title={"Set New Default Target"}
      >
        <InputWithLabel label={"Target"} value={3000} setValue={() => {}} />
        <div className={Styles.buttonContainer}>
          <button
            onClick={() => setModalDefaultVisible(false)}
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
  const renderModalEditCurrentTarget = () => {
    return (
      <CustomModal
        visible={modalCurrentVisible}
        onClose={() => setModalCurrentVisible(false)}
        title={"Set New Production Target"}
      >
        <InputWithLabel label={"Target"} value={3000} setValue={() => {}} />
        <InputWithLabel
          label={"Active Target"}
          value={"18:00"}
          setValue={() => {}}
        />
        <div className={Styles.buttonContainer}>
          <button
            onClick={() => setModalCurrentVisible(false)}
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
      <div className={Styles.cardTargetContainer}>
        {renderDefaultTarget()}
        {renderCurrentTarget()}
      </div>
      {renderTable()}
      {renderModalEditDefaultTarget()}
      {renderModalEditCurrentTarget()}
    </div>
  );
}
