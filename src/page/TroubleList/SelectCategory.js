import React, { useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";
import IdlingMinorStoppages from "./Screen/MinorStoppages/MinorStoppage";
import EarlyStop from "./Screen/EarlyStop/EarlyStop";
import TechnicalBreakDown from "./Screen/TechnicalBreakDown/TechnicalBreakDown";
import Styles from "./SelectCategory.module.scss";
import { ChevronLeft } from "../../assets/icons";

export default function SelectCategory(props) {
  const history = useHistory();

  useEffect(() => {
    console.log(props);
  }, []);

  const renderHeader = () => {
    return (
      <div className={Styles.headerContainer}>
        <div className={Styles.titleHeader}>
          <ChevronLeft onClick={() => history.goBack()} />
          <span>Select Category</span>
        </div>
        <PageTitle
          title={[
            "Idling & Minor Stoppages",
            "Late Start/Early Stop",
            "Technical Break Down",
          ]}
          path={[
            "/trouble-list/select-category/minor-stoppages",
            "/trouble-list/select-category/early-stop",
            "/trouble-list/select-category/technical-break-down",
          ]}
        />
      </div>
    );
  };

  const renderMainContent = () => {
    return (
      <Switch>
        <Route
          path={"/trouble-list/select-category/minor-stoppages"}
          component={IdlingMinorStoppages}
        />
        <Route
          path={"/trouble-list/select-category/early-stop"}
          component={EarlyStop}
        />
        <Route
          path={"/trouble-list/select-category/technical-break-down"}
          render={props => <TechnicalBreakDown {...props} />}
        />
        <Route
          path={"/trouble-list/select-category"}
          render={() => (
            <Redirect
              to={"/trouble-list/select-category/technical-break-down"}
            />
          )}
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
