import styles from "./Alerts.module.css";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeAlert } from "../redux/alertSlice";

export default function Alerts() {
  /* Alert component to view alerts dispatched from store. */
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

  //Creates the alert message and use a different color depending if alert type is success or error.
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
