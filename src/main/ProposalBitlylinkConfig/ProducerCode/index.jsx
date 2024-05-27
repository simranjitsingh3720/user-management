import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Controller, useForm } from "react-hook-form";
import { Autocomplete, Button, TextField } from "@mui/material";
import TableList from "./TableList";
import useGetProducerData from "../../BANCALogin/hooks/useGetProducerData";
import useGetUserData from "../../BANCALogin/hooks/useGetUserData";
import useCreateBitlyLink from "../hooks/useCreateBitlyLink";
import Loader from "./Loader";

function ProducerCode() {
  const { handleSubmit, control, formState } = useForm();
  const { errors } = formState;

  const { userData } = useGetUserData();
  const {
    producerList,
    fetchData,
    loading: producerLoading,
  } = useGetProducerData();

  const { postData, loading: createLoading } = useCreateBitlyLink();

  const [dataList, setDataList] = useState(
    (producerList?.data || []).map((item) => ({
      name: item.product,
      productId: item.id,
      isMandatory: true,
    }))
  );

  useEffect(() => {
    if (producerList && producerList?.data)
      setDataList(
        (producerList?.data || []).map((item) => ({
          name: item.product,
          productId: item.id,
          isMandatory: true,
        }))
      );
  }, [producerList]);

  const onSubmit = (data) => {
    console.log("dataList", dataList);
    const field = (dataList || []).map((item) => ({
      productId: item.productId,
      isMandatory: item.isMandatory,
    }));

    const payload = {
      producerId: data.producer.id,
      fields: field,
    };
    postData(payload);
    console.log("data", data);
  };

  console.log("dataList", dataList);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.createNewUserContainer}>
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
              {errors.channel && <span>{errors.channel.message}</span>}
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
          <div className={styles.buttonContainer}>
            <Button
              type="submit"
              variant="contained"
              className={styles.styledButton}
              disabled={producerLoading || createLoading}
            >
              Submit
            </Button>
            <Button variant="outlined" className={styles.styledButton}>
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProducerCode;
