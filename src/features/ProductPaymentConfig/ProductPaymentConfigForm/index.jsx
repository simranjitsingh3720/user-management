import { Autocomplete,  IconButton, TextField } from "@mui/material";
import React, { useEffect } from "react";
import LeftArrow from "../../../assets/LeftArrow";
import styles from "./styles.module.scss";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import useGetLobListData from "../../ProductModule/hooks/useGetLobListData";
import useGetProductList from "../hooks/useGetProductList";
import useGetPayment from "../hooks/useGetPayment";
import useCreatePaymentConfig from "../hooks/useCreatePaymentConfig";
import useGetPaymentConfigByID from "../hooks/useGetPaymentConfigByID";
import useUpdatePaymentConfig from "../hooks/useUpdatePaymentConfig";
import CustomButton from "../../../components/CustomButton";

function ProductPaymentConfigForm() {
  const { id } = useParams();

  const { handleSubmit, control, setValue, formState, getValues } = useForm({
    defaultValues: {
      lob: null,
      product: null,
      payment: [],
    },
  });

  const { data: paymentDataByID, fetchData: fetchPaymentDataByID } =
    useGetPaymentConfigByID();

  useEffect(() => {
    if (id) fetchPaymentDataByID(id);
  }, [id]);

  const navigate = useNavigate();

  const { data: lobListData } = useGetLobListData();

  const { data, fetchData } = useGetProductList();

  const { data: paymentData } = useGetPayment();

  const { postData, loading: createPaymentLoading } = useCreatePaymentConfig();

  const { UpdateDataFun, updateLoading } = useUpdatePaymentConfig();

  const { errors } = formState;

  useEffect(() => {
    if (paymentDataByID && paymentDataByID?.data) {
      setValue("lob", paymentDataByID?.data.lob || null);
      setValue("product", paymentDataByID?.data.product || null);
      setValue("payment", paymentDataByID?.data.paymentTypes || []);
      fetchData(paymentDataByID?.data.lob?.id);
    }
  }, [paymentDataByID]);

  const onSubmit = (data) => {
    if (id) {
      const payload = {
        id: id,
        properties: {
          status: true,
          productId: data?.product?.id,
          paymentTypeIds: data?.payment.map((item) => item.id),
        },
      };
      UpdateDataFun(payload);
    } else {
      const payload = {
        lobId: data?.lob?.id,
        productId: data?.product?.id,
        paymentTypeIds: data?.payment.map((item) => item.id),
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
              <IconButton
                aria-label="back"
                onClick={() => {
                  navigate("/product-payment-config");
                }}
              >
                <LeftArrow />
              </IconButton>
              <span className={styles.headerTextStyle}>
                <div className={styles.setOTPHeaderOTP}>
                  {id
                    ? "Update Payment Configuration"
                    : "Create New Payment Configuration"}
                </div>
              </span>
            </div>
          </div>{" "}
          <div className={styles.containerStyle}>
            <div className={styles.fieldContainerStyle}>
              <span className={styles.labelText}>
                LOB <span className={styles.styledRequired}>*</span>
              </span>
              <Controller
                name="lob" // Name of the field in the form data
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Autocomplete
                    id="lob"
                    options={lobListData?.data || []}
                    disabled={id}
                    // value={getValues("lob")}
                    value={field.value}
                    getOptionLabel={(option) => {
                      return option?.lob?.toUpperCase() || "";
                    }}
                    className={styles.customizeSelect}
                    size="small"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Select by LOB Name..."
                      />
                    )}
                    onChange={(event, newValue) => {
                      fetchData(newValue?.id);
                      field.onChange(newValue);
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
                {errors.lob && <span>This field is required</span>}{" "}
              </div>
            </div>
            <div className={styles.fieldContainerStyle}>
              <span className={styles.labelText}>
                Product <span className={styles.styledRequired}>*</span>
              </span>
              <Controller
                name="product" // Name of the field in the form data
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Autocomplete
                    id="product"
                    options={data?.data || []}
                    value={field.value}
                    getOptionLabel={(option) =>
                      option?.product?.toUpperCase() || ""
                    }
                    className={styles.customizeSelect}
                    size="small"
                    renderInput={(params) => (
                      <TextField {...params} placeholder="Select" />
                    )}
                    onChange={(event, newValue) => {
                      field.onChange(newValue);
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
                {errors.product && <span>This field is required</span>}{" "}
              </div>
            </div>
            <div className={styles.fieldContainerStyle}>
              <span className={styles.labelText}>
                Payment Type <span className={styles.styledRequired}>*</span>
              </span>
              <Controller
                name="payment" // Name of the field in the form data
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Autocomplete
                    id="payment"
                    value={getValues("payment")}
                    options={[
                      { name: "Select All" },
                      ...(paymentData?.data || []),
                    ]}
                    getOptionLabel={(option) => {
                      return option?.name?.toUpperCase();
                    }}
                    disableCloseOnSelect
                    multiple
                    className={styles.customizeSelect}
                    size="small"
                    renderInput={(params) => (
                      <TextField {...params} placeholder="Select" />
                    )}
                    // onChange={(event, newValue) => {
                    //   field.onChange(newValue);
                    // }}
                    onChange={(event, newValue) => {
                      if (
                        newValue.some((option) => option.name === "Select All")
                      ) {
                        const isSelectAllSelected = newValue.find(
                          (option) => option.name === "Select All"
                        );
                        if (isSelectAllSelected) {
                          const allOptionsSelected = paymentData?.data || [];
                          field.onChange(allOptionsSelected);
                        } else {
                          field.onChange([]);
                        }
                      } else {
                        field.onChange(newValue);
                      }
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
                {errors.payment && <span>This field is required</span>}{" "}
              </div>
            </div>
          </div>
        </div>
        <CustomButton
          type="submit"
          variant="contained"
          
          disabled={updateLoading || createPaymentLoading}
        >
          {id ? "Update" : "Submit"}
        </CustomButton>
      </form>
    </div>
  );
}

export default ProductPaymentConfigForm;
