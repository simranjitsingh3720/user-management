import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

// import useUpdatePaymentConfig from "../hooks/useUpdateHealthConfig";
// import { BitlyLinkMandatory } from "../constants";
import useGetUserData from "../../BANCALogin/hooks/useGetUserData";
import useGetProducerData from "../../BANCALogin/hooks/useGetProducerData";
import Loader from "./Loader";
import TableList from "./TableList";
import useCreateEmployeeConfig from "../hooks/useCreateEmployeeConfig";
import useGetEmployeeByProducer from "../hooks/useGetEmployeeById";
import useUpdateEmployeeConfig from "../hooks/useUpdateEmployeeConfig";
import CustomButton from "../../../components/CustomButton";
// import useCreateHealthConfig from "../hooks/useCreateHealthConfig";
// import useGetHealthConfigByID from "../hooks/useGetHealthConfigById";

function EmployeeConfigurationForm({ fetchData: listFetchFun }) {
  const {
    producerList,
    fetchData,
    loading: producerLoading,
  } = useGetProducerData();

  const [dataList, setDataList] = useState([]);
  const { data: EmployeeProducerData, fetchData: fetchDataByProducer } =
    useGetEmployeeByProducer();

  useEffect(() => {
    if (EmployeeProducerData && EmployeeProducerData?.data) {
      setDataList(
        (EmployeeProducerData?.data[0]?.products || []).map((item) => ({
          name: item.product,
          productId: item.productId,
          isEmployee: item.isEmployee,
        }))
      );
    }
  }, [EmployeeProducerData]);

  useEffect(() => {
    if (
      producerList &&
      producerList?.data &&
      !EmployeeProducerData?.data.length
    )
      setDataList(
        (producerList?.data || []).map((item) => ({
          name: item.product,
          productId: item.id,
          isEmployee: false,
        }))
      );
  }, [producerList, EmployeeProducerData]);

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

  const { postData, loading } = useCreateEmployeeConfig(listFetchFun);

  const { UpdateDataFun, loading: updateLoading } =
    useUpdateEmployeeConfig(listFetchFun);

  const onSubmit = (data) => {
    if (EmployeeProducerData && EmployeeProducerData?.data.length) {
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

  const handleResetButton = () => {
    setDataList([]);
    setValue("producer", null);
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
            <div>
              <CustomButton
                variant="outlined"
                startIcon={<RestartAltIcon />}
                sx={{ textTransform: "none" }}
                onClick={() => handleResetButton()}
              >
                Reset
              </CustomButton>
            </div>
          </div>{" "}
          <div className={styles.containerStyle}>
            <div className={styles.fieldContainerStyle}>
              <span className={styles.labelText}>
                Select Producer <span className={styles.styledRequired}>*</span>
              </span>
              <Controller
                name="producer"
                id="producer"
                control={control}
                rules={{ required: "Producer is required" }}
                render={({ field }) => (
                  <Autocomplete
                    id="producer"
                    options={userData || []}
                    getOptionLabel={(option) => {
                      return `${option?.firstName?.toUpperCase()} ${option?.lastName?.toUpperCase()}`;
                    }}
                    value={field.value}
                    className={styles.customizeSelect}
                    size="small"
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    renderInput={(params) => (
                      <TextField {...params} placeholder="Select" />
                    )}
                    onChange={(event, newValue) => {
                      field.onChange(newValue);
                      fetchDataByProducer(newValue?.id);
                      fetchData(newValue?.id);
                    }}
                    renderOption={(props, option) => (
                      <li {...props} key={option.id}>
                        {option?.firstName?.toUpperCase()}{" "}
                        {option?.lastName?.toUpperCase()}
                      </li>
                    )}
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
              producerList?.data?.length && (
                <div className={styles.tableStyle}>
                  <TableList dataList={dataList} setDataList={setDataList} />
                </div>
              )
            )}
          </div>
        </div>
        <CustomButton
          type="submit"
          variant="contained"
          disabled={loading || updateLoading}
        >
          Save
        </CustomButton>
      </form>
    </div>
  );
}

export default EmployeeConfigurationForm;
