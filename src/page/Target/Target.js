import React, { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import InputSelect from "../../components/Form/InputSelect/InputSelect";
import PageTitle from "../../components/PageTitle/PageTitle";
import InputDate from "../../components/Form/InputDate/InputDate";
import ProductionTarget from "./Screens/ProductionTarget/ProductionTarget";
import TargetOEE from "./Screens/TargetOEE/TargetOEE";
import Styles from "./Target.module.scss";
import { Context } from "../../hooks/context";

export default function Target() {
  const globalState = useContext(Context);
  const { machine, dateSelected, setMachine, setDateSelected } = globalState;

  const renderHeader = () => {
    return (
      <div className={Styles.headerContainer}>
        <div className={Styles.head}>
          <span>Target</span>
          <div className={Styles.filter}>
            <InputSelect
              value={machine.machineId}
              className={Styles.inputSelect}
              placeholder={machine.machineName}
              options={[
                {
                  value: "00f5eafd-89c5-4871-a982-26a8180774c7",
                  label: "Line 1",
                },
                {
                  value: "f59e7c5f-4774-48e9-a19e-00d578a21ee4",
                  label: "Line 2",
                },
              ]}
              onChange={selected =>
                setMachine({
                  machineId: selected.value,
                  machineName: selected.label,
                })
              }
            />
            <InputDate
              value={dateSelected}
              onChange={e => setDateSelected(e)}
            />
          </div>
        </div>
        <PageTitle
          title={["Production Target", "Target OEE"]}
          path={["/target/production-target", "/target/target-oee"]}
        />
      </div>
    );
  };

  const renderMainContent = () => {
    return (
      <Switch>
        <Route
          path={"/target/production-target"}
          component={ProductionTarget}
        />
        <Route path={"/target/target-oee"} component={TargetOEE} />
        <Route
          path={"/target"}
          render={() => <Redirect to={"/target/production-target"} />}
        />
      </Switch>
    );
  };

  return (
    <div>
      {renderHeader()}
      {renderMainContent()}
    </div>
  );
}
