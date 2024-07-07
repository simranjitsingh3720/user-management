import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  IconButton,
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
import InputField from "../../../components/CustomTextfield";

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
      id: "lob",
      label: "LOB Name",
      value: "lob",
      required: true,
      validation: {
        required: "LOB Name is required",
      },
    },
    {
      id: "lob_value",
      label: "LOB Value",
      value: "lob_value",
      required: true,
      validation: {
        required: "LOB Value is required",
      },
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
              className="flex items-center"
            >
              <IconButton aria-label="back" onClick={() => navigate("/lob")}>
                <LeftArrow />
              </IconButton>
              <h2 className="ml-3">Create New Lob</h2>
            </Grid>

            {formField.map((item) => (
              <Grid item xs={12} sm={6} key={item.value}>
                 <InputField
                    key={item?.id}
                    id={item?.id}
                    required={item?.required}
                    label={item?.label}
                    validation={item?.validation}
                    control={control}
                    errors={errors}
                    disabled={item?.disabled}
                    classes="w-full"
                  />
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
