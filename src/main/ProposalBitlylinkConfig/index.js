import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import React, { useState } from "react";
import styles from "./styles.module.scss";
import Channel from "./Channel";
import ProducerCode from "./ProducerCode";

function ProposalBitlyLinkConfig() {
  const [value, setValue] = useState("byChannel");

  console.log("value", value);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <div>
        <RadioGroup
          row
          aria-labelledby="status-row-radio-buttons-group-label"
          name="status"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel
            value="byChannel"
            control={<Radio />}
            label="By Channel"
          />
          <FormControlLabel
            value="byproducerCode"
            control={<Radio />}
            label="By Producer Code"
          />
        </RadioGroup>
      </div>
      {value === "byChannel" ? <Channel /> : <ProducerCode />}
    </div>
  );
}

export default ProposalBitlyLinkConfig;
