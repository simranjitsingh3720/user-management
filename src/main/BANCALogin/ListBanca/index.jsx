import React, { useState } from "react";
import styles from "./styles.module.css";
import { FieldDataList } from "../constants";
import { Button, Switch } from "@mui/material";

function ListBanca() {
  const rowsArray = Object.keys(FieldDataList);
  const [fieldData, setFieldData] = useState(
    Object.values(FieldDataList).flat()
  );

  console.log("fieldData", fieldData);

  console.log("rowsArray", rowsArray);

  const handleEnableChange = (value) => {
    setFieldData(() => {
      const newFieldData = [...fieldData];
      newFieldData.forEach((item) => {
        if (item.value === value) {
          item.Enable = !item.Enable;
          item.Mandatory = false;
        }
      });
      return newFieldData;
    });
  };

  const handleMandatoryChange = (value) => {
    setFieldData(() => {
      const newFieldData = [...fieldData];
      newFieldData.forEach((item) => {
        if (item.value === value) {
          item.Mandatory = !item.Mandatory;
        }
      });
      return newFieldData;
    });
  };

  return (
    <div>
      <div className={styles.listBancaConatiner}>
        {rowsArray.map((item) => (
          <div className={styles.fieldStyle}>
            {FieldDataList[item].map((obj) => (
              <div className={styles.fieldDiv}>
                <div className={styles.lableStyle}>{obj.label}</div>
                <div className={styles.switchContainer}>
                  {" "}
                  <div>
                    <Switch
                      checked={obj.Enable}
                      onChange={() => handleEnableChange(obj.value)}
                      inputProps={{ "aria-label": "toggle button" }}
                    />
                    <text className={styles.enableStyle}>
                      {obj.Enable ? "Enabled" : "Non Enabled"}
                    </text>
                  </div>
                  <div>
                    <Switch
                      checked={obj.Mandatory}
                      onChange={() => handleMandatoryChange(obj.value)}
                      inputProps={{ "aria-label": "toggle button" }}
                      disabled={!obj.Enable}
                    />
                    <text className={styles.enableStyle}>
                      {obj.Mandatory ? "Mandatory" : "Non Mandatory"}
                    </text>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
        <div className={styles.uploadContainer}>
          <div className={styles.lableStyle}>Partner Employee Code Master</div>
          <div>upload</div>
        </div>
      </div>
      <div>
        <Button
          type="submit"
          variant="contained"
          className={styles.styledButton}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default ListBanca;
