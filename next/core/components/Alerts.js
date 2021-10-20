import styles from "./Alerts.module.css";

import { useState, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { removeAlert } from "../redux/alertSlice";

//insert into apps under navbar?

export default function Alerts() {
  const [show, setShow] = useState(false);
  const alerts = useSelector((state) => state.alert.alerts);
  const dispatch = useDispatch();

  //Display any existing alerts before removing.
  useEffect(() => {
    if (alerts.length > 0) {
      setShow(true);
      setTimeout(() => {
        dispatch(removeAlert());
      }, 10000);
    } else {
      setShow(false);
    }
  }, [alerts]);

  //Display different color alert for success/error type
  return show ? (
    <>
      <div className="container-fluid">
        <div className={styles.alertsContainer}>
          {alerts.map((alert) => (
            <p key={alert.message}>{alert.message}</p>
          ))}
        </div>
      </div>
    </>
  ) : null;
}
