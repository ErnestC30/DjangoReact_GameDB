import styles from "./Alerts.module.css";

import { useState, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { removeAlert } from "../redux/alertSlice";

//insert into apps under navbar?

export default function Alerts() {
  const alerts = useSelector((state) => state.alert.alerts);
  const dispatch = useDispatch();

  //Display any existing alerts before removing.
  useEffect(() => {
    if (alerts.length > 0) {
      setTimeout(() => {
        dispatch(removeAlert());
      }, 3000);
    }
  }, [alerts]);

  //Display different colored alert for success/error type and its message
  return (
    <>
      <div className="container-fluid">
        <div className={styles.alertsContainer}>
          {alerts.map((alert, index) =>
            alert.type == "success" ? (
              <p className="alert alert-success" key={index}>
                {alert.message}
              </p>
            ) : (
              <p className="alert alert-warning" key={index}>
                {alert.message}
              </p>
            )
          )}
        </div>
      </div>
    </>
  );
}
