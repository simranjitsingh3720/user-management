import React from "react";
import styles from "./styles.module.css";
import { FieldDataList } from "../constants";

function ListBanca() {
  const rowsArray = Object.values(FieldDataList);

  console.log("rowsArray", rowsArray);

  return <div className={styles.listBancaConatiner}>{FieldDataList}</div>;
}

export default ListBanca;
