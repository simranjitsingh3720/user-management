/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { IconButton } from "@mui/material";
import { useForm } from "react-hook-form";
import LeftArrow from "../../../../assets/LeftArrow";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import usePostUser from "../hooks/usePostUser";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getLobs } from "../../../../Redux/getLob";
import { getProducts } from "../../../../Redux/getProduct";
import { getLocations } from "../../../../Redux/getLocation";
import { getRoles } from "../../../../Redux/getRole";
import InputField from "../../../../components/CustomTextfield";
import DateField from "../../../../components/CustomDateInput";
import SelectField from "../../../../components/CustomSelect";
import AutocompleteMultipleField from "../../../../components/CustomAutocomplete";
import AutocompleteFieldAll from "../../../../components/CustomAutocompleteAll";
import { getPaymentTypes } from "../../../../Redux/getPaymentType";
import { getProducerCodes } from "../../../../Redux/getProducerCode";
import CustomButton from "../../../../components/CustomButton";
import { getParentCode } from "../../../../Redux/getParentCode";
import useGetLoginType from "../hooks/useGetLoginType";
import { getChannels } from "../../../../Redux/getChannel";
import { getHouseBanks } from "../../../../Redux/getHouseBank";
import useGetUserType from "../hooks/useGetUserType";
import useGetRoleHierarchy from "../hooks/useRoleHierarchy";

function CreateUserCreationForm() {
  const dispatch = useDispatch();
  const lobs = useSelector((state) => state.lobUserCreation.lob);
  const products = useSelector((state) => state.productUserCreation.product);
  const locations = useSelector((state) => state.location.location);
  const role = useSelector((state) => state.role.role);
  const paymentType = useSelector((state) => state.paymentType.paymentType);
  const producerCode = useSelector((state) => state.producerCode.producerCode);
  const neftDefaultBank = useSelector((state) => state.houseBank.houseBank);
  const parentCode = useSelector((state) => state.parentCode.parentCode);
  const channelType = useSelector((state) => state.channelType.channelType);
  const [apiDataMap, setApiDataMap] = useState({
    lob: lobs,
    product: products,
    location: locations,
    paymentType: paymentType,
    producerCode: producerCode,
    parentCode: parentCode,
    channelType: channelType,
    neftDefaultBank: neftDefaultBank,
  });
  const navigate = useNavigate();
  const { loading, postData } = usePostUser();
  const [roleConfig, setRoleConfig] = useState([]);
  const [resetClicked, setResetClicked] = useState(false);
  const [jsonData, setJsonData] = useState([]);
  const [roleChanged, setRoleChanged] = useState(false);
  const {
    handleSubmit,
    setValue,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      active: "yes",
      // gcStatus: "no",
      // producerStatus: "Active",
      // neftDefaultBank: "yes",
      // paymentType: [],
      roleSelect: "",
    },
  });

  const roleValue = watch("roleSelect")?.roleName;
  const paymentsType = watch("paymentType");
  const { loginType } = useGetLoginType();

  useEffect(() => {
    dispatch(getLobs());
    dispatch(getChannels());
    dispatch(getLocations());
    dispatch(getRoles());
    dispatch(getPaymentTypes());
    dispatch(getHouseBanks());
  }, []);

  useEffect(() => {
    const updatedApiDataMap = { ...apiDataMap };
    if (lobs) {
      updatedApiDataMap.lob = lobs;
    }
    if (products) {
      updatedApiDataMap.product = products;
    }
    if (locations) {
      updatedApiDataMap.location = locations;
    }
    if (paymentType) {
      updatedApiDataMap.paymentType = paymentType;
    }
    if (producerCode) {
      updatedApiDataMap.producerCode = producerCode;
    }
    if (parentCode) {
      updatedApiDataMap.parentCode = parentCode;
    }
    if (channelType) {
      updatedApiDataMap.channelType = channelType;
    }
    if (neftDefaultBank) {
      updatedApiDataMap.neftDefaultBank = neftDefaultBank;
    }
    setApiDataMap(updatedApiDataMap);
  }, [
    lobs,
    products,
    locations,
    paymentType,
    producerCode,
    parentCode,
    loginType,
    channelType,
    neftDefaultBank,
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `/userCreationData.json`;
        const response = await axios.get(url);
        setJsonData(response?.data?.roles);
        setRoleConfig(response?.data?.roles[0]);
      } catch (error) {
        console.error("Error fetching mock data:", error);
      }
    };
    fetchData();
  }, []);

  const onSubmit = (data) => {
    userTypeFetch(rolesWatch?.id);
    const payload = {
      mobileNo: data?.mobileNumber,
      email: data?.email,
      startDate: data?.startDate,
      endDate: data?.endDate,
      status: data?.active === "yes" ? true : false,
      roleId: data?.roleSelect?.id,
      roleName: data?.roleSelect?.roleName,
      firstName: data?.firstName,
      lastName: data?.lastName,
      groupIds: data?.groupIds,
      parentId: data?.parentCode,
      childIds:
        typeof data?.producerCode !== "string"
          ? data?.producerCode?.map((code) => code.id)
          : "",
      password: "123456",
      userType: userType && userType.length > 0 ? userType[0]?.userType : "",
      userTypeId: userType && userType.length > 0 ? userType[0]?.id : "",
      loginTypeIds: data?.loginType?.map((type) => type?.id),
      roleHierarchyId:
        roleHierarchy &&
        (data?.parentCode ||
          (typeof producerCode !== "string" &&
            data?.producerCode?.map((code) => code.id)))
          ? roleHierarchy?.id
          : "",
      employeeId: data?.employeeId,
      locationIds: data?.location?.map((location) => location?.id),
      ntId: data?.ntloginId,
      productIds: data?.product?.map((product) => product?.id),
      vertical: data?.vertical,
      subVertical: data?.subVertical,
      solId: data?.solId,
      gcStatus: data?.gcStatus,
      producerCode:
        typeof data?.producerCode === "string" ? data?.producerCode : "",
      producerType: data?.typeOfProducer,
      channelId: data?.channelType,
      bankingLimit: data?.bankingLimit,
      sendEmail: data?.sendEmail,
      domain: data?.domain,
      paymentType: data?.paymentType?.map((payment) => payment?.name),
      houseBankId: data?.neftDefaultBank?.id,
      ocrChequeScanning: data?.chequeOCRScanning,
      ckyc: data?.cKyc,
      partnerName: data?.partnerName,
      masterPolicyIds: data?.masterPolicy?.map((code) => code.id),
      brokerType: data?.brokerType,
      brokerRoleName: data?.brokerRoleName,
      branchCode: data?.branchCode,
      dataEntryUserName: data?.dataEntryUserName,
      employeeCode: data?.employeeCodeUserLoginId,
      pospAadhar: data?.pospAadhar,
      pospPAN: data?.pospPAN,
      transactionType: data?.transactionType,
      producerStatus: data?.producerStatus,
      revalidation: data?.revalidation,
      roleAssigned: data?.roleAssignment,
      externalPosp: data?.externalPosp,
      planIds: data?.plan,
      zoneIds: data?.zone,
    };

    const filteredData = Object.fromEntries(
      Object.entries(payload).filter(
        ([key, value]) =>
          value !== "" && !(Array.isArray(value) && value.length === 0)
      )
    );
    postData(filteredData);
  };

  useEffect(() => {
    if (jsonData) {
      setValue("roleSelect", "");
    }
  }, []);

  useEffect(() => {
    if (roleValue) {
      let resetValues = {
        roleSelect: watch("roleSelect"),
        active: "yes",
        //gcStatus: "no",
        //producerStatus: "Active",
        // neftDefaultBank: "yes",
      };

      roleConfig.forEach((item) => {
        if (item?.type === "autocomplete" && item?.multiple === true) {
          resetValues[item?.id] = [];
        }
        if (item?.type === "autocomplete") {
          resetValues[item?.id] = [];
        } else if (item?.type !== "dropdown") {
          resetValues[item?.id] = "";
        }
      });
      setRoleChanged(!roleChanged);
      reset(resetValues);
    }
  }, [roleValue]);

  useEffect(() => {
    if (jsonData) {
      let keyFound = false;
      for (let key in jsonData) {
        if (key === roleValue) {
          setRoleConfig(jsonData[roleValue]);
          keyFound = true;
          break;
        }
      }
      if (!keyFound) {
        setRoleConfig(jsonData?.others);
      }
    }
  }, [roleValue, jsonData]);

  const handleReset = () => {
    let originalArray = roleConfig;
    let resultObject = originalArray.reduce((resetValues, item) => {
      if (item?.type === "autocomplete" && item?.multiple === true) {
        resetValues[item?.id] = [];
      }
      if (item?.type === "autocomplete") {
        resetValues[item?.id] = null;
      } else if (item?.type !== "dropdown") {
        resetValues[item?.id] = "";
      }
      return resetValues;
    }, {});
    resultObject.roleSelect = "";
    setResetClicked(!resetClicked);
    console.log("reset", resultObject);
    reset(resultObject);
  };

  const lobsWatch = watch("lob");
  const rolesWatch = watch("roleSelect");
  const { userType, userTypeFetch } = useGetUserType();
  const { roleHierarchy, roleHierarchyFetch } = useGetRoleHierarchy();

  useEffect(() => {
    if (lobsWatch && lobsWatch?.length > 0) {
      dispatch(getProducts(lobsWatch));
    }
  }, [lobsWatch]);

  useEffect(() => {
    if (rolesWatch) {
      dispatch(getProducerCodes(rolesWatch));
      dispatch(getParentCode(rolesWatch));
      roleHierarchyFetch(rolesWatch?.id);
      userTypeFetch(rolesWatch?.id);
    }
  }, [rolesWatch]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.formMainContainer}
    >
      <div className={styles.createNewUserContainer}>
        <div className={styles.formHeaderStyle}>
          <div className={styles.subHeader}>
            <IconButton
              aria-label="back"
              onClick={() => {
                navigate("/user-management");
              }}
            >
              <LeftArrow />
            </IconButton>
            <span className={styles.headerTextStyle}>Create User</span>
          </div>
        </div>
        <div className="grid grid-cols-1">
          <AutocompleteMultipleField
            key="roleSelect"
            control={control}
            name="roleSelect"
            label="Role"
            required
            disabled={false}
            options={role || []}
            validation={{ required: "Role is required" }}
            errors={errors}
            multiple={false}
            resetClicked={resetClicked}
            roleChanged={roleChanged}
            classes="w-full sm:w-3/4 md:w-3/4 xl:w-7/12"
          />
          <AutocompleteMultipleField
            key="loginType"
            control={control}
            name="loginType"
            label="Login Type"
            required
            disabled={false}
            options={loginType || []}
            validation={{ required: "It is a required field" }}
            errors={errors}
            multiple={true}
            roleChanged={roleChanged}
            resetClicked={resetClicked}
            classes="w-full sm:w-3/4 md:w-3/4 xl:w-7/12"
          />

          {roleConfig?.map((item) =>
            item?.type === "input" ? (
              <InputField
                key={item?.id}
                id={item?.id}
                required={item?.required}
                label={item?.label}
                validation={item?.validation}
                control={control}
                errors={errors}
                disabled={item?.disabled}
                classes="w-full sm:w-3/4 md:w-3/4 xl:w-7/12"
              />
            ) : item?.type === "date" ? (
              <DateField
                key={item?.id}
                control={control}
                watch={watch}
                setValue={setValue}
                name={item?.id}
                labelVisible={true}
                label={item?.label}
                required={item?.required}
                errors={errors}
                classes="w-full sm:w-3/4 md:w-3/4 xl:w-7/12"
              />
            ) : item?.type === "autocomplete" && item?.multiple === true ? (
              <AutocompleteMultipleField
                key={item?.id}
                control={control}
                roleChanged={roleChanged}
                name={item?.id}
                label={item?.label}
                required={item?.required}
                disabled={item?.disabled}
                options={apiDataMap[item?.id]}
                validation={item?.validation}
                errors={errors}
                multiple={item?.multiple}
                resetClicked={resetClicked}
                classes="w-full sm:w-3/4 md:w-3/4 xl:w-7/12"
              />
            ) : item?.type === "autocomplete" && item?.all === true ? (
              <div key={item?.id}>
                <AutocompleteFieldAll
                  control={control}
                  name={item?.id}
                  label={item?.label}
                  required={item?.required}
                  roleChanged={roleChanged}
                  disabled={item?.disabled}
                  options={apiDataMap[item?.id]}
                  resetClicked={resetClicked}
                  validation={item?.validation}
                  errors={errors}
                  apiDataMap={apiDataMap}
                  classes="w-full sm:w-3/4 md:w-3/4 xl:w-7/12"
                />
                {item?.subFields !== undefined &&
                item?.subFields["neft"] &&
                roleValue !== "partner" &&
                paymentsType &&
                paymentsType?.some(
                  (item) => item?.value === "neft" || item?.value === "all"
                ) ? (
                  <div key={item?.subFields["neft"][0]?.id}>
                    <SelectField
                      key={item?.subFields["neft"][0]?.id}
                      control={control}
                      name={item?.subFields["neft"][0]?.id}
                      label={item?.subFields["neft"][0]?.label}
                      required={item?.subFields["neft"][0]?.required}
                      disabled={item?.subFields["neft"][0]?.disabled}
                      menuItem={
                        item?.subFields["neft"][0]?.menuItem ||
                        apiDataMap["neftDefaultBank"]
                      }
                      placeholder="Select"
                      errors={errors}
                      setValue={setValue}
                      classes="w-full sm:w-3/4 md:w-3/4 xl:w-7/12"
                    />
                    <InputField
                      id={item?.subFields["accountNumber"][0]?.id}
                      required={item?.subFields["accountNumber"][0]?.required}
                      label={item?.subFields["accountNumber"][0]?.label}
                      validation={
                        item?.subFields["accountNumber"][0]?.validation
                      }
                      control={control}
                      errors={errors}
                      disabled={item?.subFields["accountNumber"][0]?.disabled}
                      classes="w-full sm:w-3/4 md:w-3/4 xl:w-7/12"
                    />
                  </div>
                ) : (
                  <div></div>
                )}
                {item?.subFields &&
                  paymentsType &&
                  paymentsType?.some(
                    (item) => item?.value === "cheque" || item?.value === "all"
                  ) && (
                    <div>
                      <SelectField
                        key={item?.subFields["cheque"][0]?.id}
                        control={control}
                        name={item?.subFields["cheque"][0]?.id}
                        label={item?.subFields["cheque"][0]?.label}
                        required={item?.subFields["cheque"][0]?.required}
                        disabled={item?.subFields["cheque"][0]?.disabled}
                        menuItem={item?.subFields["cheque"][0]?.menuItem}
                        placeholder="Select"
                        errors={errors}
                        classes="w-full sm:w-3/4 md:w-3/4 xl:w-7/12"
                      />
                    </div>
                  )}
              </div>
            ) : item?.type === "autocomplete" ? (
              <AutocompleteMultipleField
                key={item?.id}
                control={control}
                name={item?.id}
                label={item?.label}
                required={item?.required}
                roleChanged={roleChanged}
                disabled={item?.disabled}
                options={apiDataMap[item?.id]}
                validation={item?.validation}
                errors={errors}
                multiple={false}
                resetClicked={resetClicked}
                classes="w-full sm:w-3/4 md:w-3/4 xl:w-7/12"
              />
            ) : (
              <SelectField
                key={item?.id}
                control={control}
                name={item?.id}
                label={item?.label}
                required={item?.required}
                disabled={item?.disabled}
                menuItem={item?.menuItem || apiDataMap[item?.id]}
                placeholder={item?.label}
                errors={errors}
                setValue={setValue}
                classes="w-full sm:w-3/4 md:w-3/4 xl:w-7/12"
              />
            )
          )}
        </div>
      </div>
      <div className={styles.btnContainer}>
        <CustomButton color="error" onClick={handleReset}>
          Reset
        </CustomButton>
        <div className="ml-2">
          <CustomButton type="submit">Submit</CustomButton>
        </div>
      </div>
    </form>
  );
}

export default CreateUserCreationForm;
