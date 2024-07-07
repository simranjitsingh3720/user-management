import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  IconButton,
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
  CardContent,
  Card,
  Box,
} from "@mui/material";
import { createLobData } from "../../../stores/slices/lobSlice";
import LeftArrow from "../../../assets/LeftArrow";
import CustomButton from "../../../components/CustomButton";

function CreateLobForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const createLoading = useSelector((state) => state.lob.createLoading);

  const { handleSubmit, control, setValue, formState } = useForm();
  const { errors } = formState;

  const onSubmit = (data) => {
    data.status === "active" ? (data.status = true) : (data.status = false);
    dispatch(createLobData({ data, navigate }));
  };

  const formField = [
    {
      label: "LOB Name",
      value: "lob",
    },
    {
      label: "LOB Value",
      value: "lob_value",
    },
  ];

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <IconButton aria-label="back" onClick={() => navigate("/lob")}>
                <LeftArrow />
              </IconButton>
              <h2 style={{ marginLeft: "10px" }}>Create New Lob</h2>
            </Grid>

            {formField.map((item) => (
              <Grid item xs={12} sm={6} key={item.value}>
                <label style={{ display: "block", marginBottom: "5px" }} className="required-field">
                  {item.label}
                </label>
                <Controller
                  name={item.value}
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      id={item.value}
                      variant="outlined"
                      placeholder="Enter Name"
                      size="small"
                      fullWidth
                      {...field}
                      onChange={(e) => setValue(item.value, e.target.value)}
                    />
                  )}
                />
                {errors[item?.value] && (
                  <span style={{ color: "red", fontSize: "12px" }}>
                    This field is required
                  </span>
                )}
              </Grid>
            ))}

            <Grid item xs={12}>
              <label style={{ display: "block", marginBottom: "5px" }} className="required-field">
                LOB Status
              </label>
              <Controller
                name="status"
                control={control}
                rules={{ required: "Status is required" }}
                defaultValue="active"
                render={({ field }) => (
                  <RadioGroup row {...field}>
                    <FormControlLabel
                      value="active"
                      control={<Radio />}
                      label="Active"
                    />
                    <FormControlLabel
                      value="inactive"
                      control={<Radio />}
                      label="Inactive"
                    />
                  </RadioGroup>
                )}
              />
              {errors.status && (
                <span style={{ color: "red", fontSize: "12px" }}>
                  {errors.status.message}
                </span>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <div className="flex items-center mt-4">
        <CustomButton type="submit" variant="contained" disabled={createLoading}>
          Submit
        </CustomButton>
      </div>
    </Box>
  );
}

export default CreateLobForm;
