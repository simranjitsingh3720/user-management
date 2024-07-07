/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { IconButton } from "@mui/material";
import { useForm } from "react-hook-form";
import LeftArrow from "../../../../assets/LeftArrow";
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
import {
  AUTOCOMPLETE,
  DROPDOWN,
  LOB,
  LOGIN_TYPE,
  PAYMENT_TYPE,
  REQUIRED_MSG,
  ROLE_SELECT,
  YES,
} from "../utils/constants";
import apiUrls from "../../../../utils/apiUrls";

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
      roleSelect: "",
    },
  });

  const roleValue = watch(ROLE_SELECT)?.roleName;
  const paymentsType = watch(PAYMENT_TYPE);
  const { loginType } = useGetLoginType();
  const lobsWatch = watch(LOB);
  const rolesWatch = watch(ROLE_SELECT);
  const { userType, userTypeFetch } = useGetUserType();
  const { roleHierarchy, roleHierarchyFetch } = useGetRoleHierarchy();

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
        const url = apiUrls.fetchUserCreationJSON;
        const response = await axios.get(url);
        if (response) {
          setJsonData(response?.data?.roles);
          setRoleConfig(response?.data?.roles[0]);
        }
      } catch (error) {
        console.error("Error fetching mock data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (jsonData) {
      setValue(ROLE_SELECT, "");
    }
  }, []);

  useEffect(() => {
    if (roleValue) {
      let resetValues = {
        roleSelect: watch(ROLE_SELECT),
      };

      roleConfig.forEach((item) => {
        if (item?.type === AUTOCOMPLETE && item?.multiple === true) {
          resetValues[item?.id] = [];
        }
        if (item?.type === AUTOCOMPLETE) {
          resetValues[item?.id] = [];
        } else if (item?.type !== DROPDOWN) {
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
      if (item?.type === AUTOCOMPLETE && item?.multiple === true) {
        resetValues[item?.id] = [];
      }
      if (item?.type === AUTOCOMPLETE) {
        resetValues[item?.id] = null;
      } else if (item?.type !== DROPDOWN) {
        resetValues[item?.id] = "";
      }
      return resetValues;
    }, {});
    resultObject.roleSelect = "";
    setResetClicked(!resetClicked);
    console.log("reset", resultObject);
    reset(resultObject);
  };

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

  const onSubmit = (data) => {
    userTypeFetch(rolesWatch?.id);
    const {
      mobileNumber,
      email,
      startDate,
      endDate,
      active,
      roleSelect = {},
      firstName,
      lastName,
      groupIds,
      parentCode,
      producerCode,
      loginType = [],
      employeeId,
      location = [],
      ntloginId,
      product = [],
      vertical,
      subVertical,
      solId,
      gcStatus,
      typeOfProducer,
      channelType,
      bankingLimit,
      sendEmail,
      domain,
      paymentType = [],
      neftDefaultBank = {},
      chequeOCRScanning,
      cKyc,
      partnerName,
      masterPolicy = [],
      brokerType,
      brokerRoleName,
      branchCode,
      dataEntryUserName,
      employeeCodeUserLoginId,
      pospAadhar,
      pospPAN,
      transactionType,
      producerStatus,
      revalidation,
      roleAssignment,
      externalPosp,
      plan,
      zone
    } = data;
    
    const { id: roleId, roleName } = roleSelect;
    const { id: houseBankId } = neftDefaultBank;
    
    const [userTypeObj = {}] = userType || [];
    const { userType: userTypeStr, id: userTypeId } = userTypeObj;
    
    const childIds = Array.isArray(producerCode)
      ? producerCode.map(code => code.id)
      : [];
    
    const loginTypeIds = loginType.map(type => type.id);
    const locationIds = location.map(loc => loc.id);
    const productIds = product.map(prod => prod.id);
    const paymentTypeNames = paymentType.map(payment => payment.name);
    const masterPolicyIds = masterPolicy.map(policy => policy.id);
    
    const roleHierarchyId = roleHierarchy && (parentCode || childIds.length)
      ? roleHierarchy.id
      : '';
    
    const payload = {
      mobileNo: mobileNumber,
      email,
      startDate,
      endDate,
      status: active === "yes",
      roleId,
      roleName,
      firstName,
      lastName,
      groupIds,
      parentId: parentCode,
      childIds,
      password: "123456",
      userType: userTypeStr || '',
      userTypeId: userTypeId || '',
      loginTypeIds,
      roleHierarchyId,
      employeeId,
      locationIds,
      ntId: ntloginId,
      productIds,
      vertical,
      subVertical,
      solId,
      gcStatus,
      producerCode: typeof producerCode === "string" ? producerCode : '',
      producerType: typeOfProducer,
      channelId: channelType,
      bankingLimit,
      sendEmail,
      domain,
      paymentType: paymentTypeNames,
      houseBankId,
      ocrChequeScanning : chequeOCRScanning,
      ckyc: cKyc,
      partnerName,
      masterPolicyIds,
      brokerType,
      brokerRoleName,
      branchCode,
      dataEntryUserName,
      employeeCode: employeeCodeUserLoginId,
      pospAadhar,
      pospPAN,
      transactionType,
      producerStatus,
      revalidation,
      roleAssigned: roleAssignment,
      externalPosp,
      planIds: plan,
      zoneIds: zone
    };
    
    const filteredData = Object.fromEntries(
      Object.entries(payload).filter(
        ([key, value]) =>
          value !== "" && !(Array.isArray(value) && value.length === 0)
      )
    );
    postData(filteredData);
  };

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
        <div className="grid grid-cols-1 px-8">
          <AutocompleteMultipleField
            key={ROLE_SELECT}
            control={control}
            name={ROLE_SELECT}
            label="Role"
            required
            disabled={false}
            options={role || []}
            validation={{ required: REQUIRED_MSG }}
            errors={errors}
            multiple={false}
            resetClicked={resetClicked}
            roleChanged={roleChanged}
            classes="w-full sm:w-3/4 md:w-3/4 xl:w-7/12"
          />
          <AutocompleteMultipleField
            key={LOGIN_TYPE}
            control={control}
            name={LOGIN_TYPE}
            label="Login Type"
            required
            disabled={false}
            options={loginType || []}
            validation={{ required: REQUIRED_MSG }}
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
