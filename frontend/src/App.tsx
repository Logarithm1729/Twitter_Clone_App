import React, { useEffect } from "react";
import styles from "./App.module.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { Core } from "./features/core/Core";
import { endLogin, startLogin } from "./features/auth/authSlice";


function App() {
  const dispatch = useDispatch();

  return (
    <div className={styles.app}>
      <Core />
    </div>
  );
}

export default App;
