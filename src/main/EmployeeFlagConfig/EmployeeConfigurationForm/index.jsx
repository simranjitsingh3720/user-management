import {
  Autocomplete,
  Button,
  IconButton,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import LeftArrow from "../../../assets/LeftArrow";
import styles from "./styles.module.css";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

// import useUpdatePaymentConfig from "../hooks/useUpdateHealthConfig";
// import { BitlyLinkMandatory } from "../constants";
import useGetUserData from "../../BANCALogin/hooks/useGetUserData";
import useGetProducerData from "../../BANCALogin/hooks/useGetProducerData";
import Loader from "./Loader";
import TableList from "./TableList";
import useCreateEmployeeConfig from "../hooks/useCreateEmployeeConfig";
import useGetEmployeeByProducer from "../hooks/useGetEmployeeById";
import useUpdateEmployeeConfig from "../hooks/useUpdateEmployeeConfig";
// import useCreateHealthConfig from "../hooks/useCreateHealthConfig";
// import useGetHealthConfigByID from "../hooks/useGetHealthConfigById";

function EmployeeConfigurationForm() {
  const { id } = useParams();

  const {
    producerList,
    fetchData,
    loading: producerLoading,
  } = useGetProducerData();

  const [dataList, setDataList] = useState(
    (producerList?.data || []).map((item) => ({
      name: item.product,
      productId: item.id,
      isEmployee: false,
    }))
  );

  const { data: EmployeeProducerData, fetchData: fetchDataByProducer } =
    useGetEmployeeByProducer();

  console.log("data", EmployeeProducerData);

  useEffect(() => {
    if (EmployeeProducerData && EmployeeProducerData?.data) {
      setDataList(
        (EmployeeProducerData?.data[0].products || []).map((item) => ({
          name: item.product,
          productId: item.productId,
          isEmployee: item.isEmployee,
        }))
      );
    }
  }, [EmployeeProducerData]);

  useEffect(() => {
    if (producerList && producerList?.data)
      setDataList(
        (producerList?.data || []).map((item) => ({
          name: item.product,
          productId: item.id,
          isEmployee: false,
        }))
      );
  }, [producerList]);

  const { handleSubmit, control, setValue, formState } = useForm({
    defaultValues: {
      producer: null,
    },
  });

  // const { data: healthConfigData, fetchData: fetchHealthConfigByID } =
  //   useGetHealthConfigByID();

  const { userData } = useGetUserData();

  // useEffect(() => {
  //   if (id) fetchHealthConfigByID(id);
  // }, [id]);

  const navigate = useNavigate();

  // const { postData, loading: createPaymentLoading } = useCreateHealthConfig();

  // const { UpdateDataFun, updateLoading } = useUpdatePaymentConfig();

  const { errors } = formState;

  // useEffect(() => {
  //   if (healthConfigData && healthConfigData?.data) {
  //     setValue("producerCode", healthConfigData?.data?.producer || null);
  //     setValue(
  //       "medicare",
  //       healthConfigData?.data?.isExistingCustomer ? "yes" : "no" || null
  //     );
  //   }
  // }, [healthConfigData]);

  const { postData, loading } = useCreateEmployeeConfig();

  const { UpdateDataFun, loading: updateLoading } = useUpdateEmployeeConfig();

  const onSubmit = (data) => {
    if (EmployeeProducerData && EmployeeProducerData?.data) {
      console.log("update");
      const field = dataList.map((item) => ({
        productId: item.productId,
        isEmployee: item.isEmployee,
      }));
      const payload = {
        id: EmployeeProducerData.data[0].id,
        properties: {
          fields: field,
          status: EmployeeProducerData.data[0].status,
        },
      };
      UpdateDataFun(payload);
    } else {
      console.log("data", data);
      const field = dataList.map((item) => ({
        productId: item.productId,
        isEmployee: item.isEmployee,
      }));
      const payload = {
        producerId: data.producer.id,
        fields: field,
      };
      postData(payload);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.createNewUserContainer}>
          <div className={styles.formHeaderStyle}>
            <div className={styles.subHeader}>
              <span className={styles.headerTextStyle}>
                <div className={styles.setOTPHeaderOTP}>
                  Create Employee Flag Configuration
                </div>
                <div className={styles.headerTextOTP}>
                  Please select the producer and add it to the given list of
                  employee flag configurations.
                </div>
              </span>
            </div>
          </div>{" "}
          <div className={styles.containerStyle}>
            <div className={styles.fieldContainerStyle}>
              <text className={styles.labelText}>
                Select Producer <span className={styles.styledRequired}>*</span>
              </text>
              <Controller
                name="producer" // Name of the field in the form data
                control={control}
                rules={{ required: "Producer is required" }}
                render={({ field }) => (
                  <Autocomplete
                    id="producer"
                    options={userData || []}
                    getOptionLabel={(option) => {
                      return `${option?.firstName?.toUpperCase()} ${option?.lastName?.toUpperCase()}`;
                    }}
                    className={styles.customizeSelect}
                    size="small"
                    renderInput={(params) => (
                      <TextField {...params} placeholder="Select" />
                    )}
                    onChange={(event, newValue) => {
                      field.onChange(newValue);
                      fetchDataByProducer(newValue?.id);
                      fetchData(newValue?.id);
                    }}
                    ListboxProps={{
                      style: {
                        maxHeight: "200px",
                      },
                    }}
                  />
                )}
              />
              <div className={styles.styledError}>
                {errors.producer && <span>{errors.producer.message}</span>}
              </div>
            </div>

            {producerLoading ? (
              <div>
                <Loader />
              </div>
            ) : (
              producerList && (
                <div className={styles.tableStyle}>
                  <TableList dataList={dataList} setDataList={setDataList} />
                </div>
              )
            )}
          </div>
        </div>
        <Button
          type="submit"
          variant="contained"
          className={styles.styledButton}
          disabled={loading || updateLoading}
        >
          {EmployeeProducerData?.data ? "Update" : "Submit"}
        </Button>
      </form>
    </div>
  );
}

export default EmployeeConfigurationForm;
