/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { IconButton } from '@mui/material';
import { useForm } from 'react-hook-form';
import LeftArrow from '../../../../assets/LeftArrow';
import { useNavigate, useParams } from 'react-router-dom';
import usePostUser from '../hooks/usePostUser';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getLobs } from '../../../../Redux/getLob';
import { getProducts } from '../../../../Redux/getProduct';
import { getLocations } from '../../../../Redux/getLocation';
import { getRoles } from '../../../../Redux/getRole';
import InputField from '../../../../components/CustomTextfield';
import DateField from '../../../../components/CustomDateInput';
import SelectField from '../../../../components/CustomSelect';
import AutocompleteMultipleField from '../../../../components/CustomAutocomplete';
import AutocompleteFieldAll from '../../../../components/CustomAutocompleteAll';
import { getPaymentTypes } from '../../../../Redux/getPaymentType';
import { getProducerCodes } from '../../../../Redux/getProducerCode';
import CustomButton from '../../../../components/CustomButton';
import { getParentCode } from '../../../../Redux/getParentCode';
import { getChannels } from '../../../../Redux/getChannel';
import { getHouseBanks } from '../../../../Redux/getHouseBank';
import useGetUserType from '../hooks/useGetUserType';
import useGetRoleHierarchy from '../hooks/useRoleHierarchy';
import {
  AUTOCOMPLETE,
  DROPDOWN,
  FORM_LABEL,
  FORM_VALUE,
  LOB,
  LOGIN_TYPE,
  PAYMENT_CALL,
  PAYMENT_TYPE,
  PRODUCER_ARR,
  PRODUCER_CODE_CALL,
  REQUIRED_MSG,
  ROLE_SELECT,
} from '../utils/constants';
import apiUrls from '../../../../utils/apiUrls';
import useSubmit from '../hooks/useSubmit';
import { getLoginType } from '../../../../Redux/getLoginType';

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
  const loginType = useSelector((state) => state.loginType.loginType);
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
      roleSelect: null,
      loginType: [],
    },
  });

  const roleValue = watch(ROLE_SELECT)?.roleName;
  const paymentsType = watch(PAYMENT_TYPE);
  const lobsWatch = watch(LOB);
  const rolesWatch = watch(ROLE_SELECT);
  const { userType, userTypeFetch } = useGetUserType();
  const { roleHierarchy, roleHierarchyFetch } = useGetRoleHierarchy();
  const params = useParams();
  const { getUserById } = useSubmit();
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    dispatch(getRoles());
    dispatch(getLoginType());
    dispatch(getLobs());
    dispatch(getLocations());
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
  }, [lobs, products, locations, paymentType, producerCode, parentCode, loginType, channelType, neftDefaultBank]);

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
        console.error('Error fetching mock data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (jsonData) {
      setValue(ROLE_SELECT, '');
    }
  }, []);

  useEffect(() => {
    if (roleValue && !isEdit) {
      let resetValues = {
        roleSelect: watch(ROLE_SELECT),
      };
      roleConfig?.forEach((item) => {
        if (item?.type === AUTOCOMPLETE && item?.multiple === true) {
          resetValues[item?.id] = [];
        }
        if (item?.type === AUTOCOMPLETE) {
          resetValues[item?.id] = [];
        } else if (item?.type !== DROPDOWN) {
          resetValues[item?.id] = '';
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
        resetValues[item?.id] = '';
      }
      return resetValues;
    }, {});
    resultObject.roleSelect = '';
    setResetClicked(!resetClicked);
    console.log('reset', resultObject);
    reset(resultObject);
    if(isEdit){
      if (params?.id) {
        setIsEdit(true);
        getUserDetails(params?.id);
      }

    }
  };

  useEffect(() => {
    if (lobsWatch && lobsWatch?.length > 0) {
      dispatch(getProducts(lobsWatch));
    }
  }, [lobsWatch]);

  useEffect(() => {
    if (rolesWatch) {
      roleHierarchyFetch(rolesWatch?.id);
      userTypeFetch(rolesWatch?.id);

      if (PRODUCER_CODE_CALL.some((role) => rolesWatch?.roleName?.includes(role))) {
        dispatch(getProducerCodes(rolesWatch));
      }
      if (PRODUCER_ARR.some((role) => rolesWatch?.roleName?.includes(role))) {
        dispatch(getParentCode(rolesWatch));
        dispatch(getChannels());
        dispatch(getHouseBanks());
      }
      if (PAYMENT_CALL.some((role) => rolesWatch?.roleName?.includes(role))) {
        dispatch(getPaymentTypes());
      }
    }
  }, [rolesWatch]);

  const onSubmit = (data) => {
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
      zone,
    } = data;

    const { id: roleId, roleName } = roleSelect;
    const { id: houseBankId } = neftDefaultBank;
    const [userTypeObj = {}] = userType || [];
    const { userType: userTypeStr, id: userTypeId } = userTypeObj;
    const childIds = Array.isArray(producerCode) ? producerCode.map((code) => code.id) : [];
    const loginTypeIds = loginType.map((type) => type.id);
    const locationIds = location.map((loc) => loc.id);
    const productIds = product.map((prod) => prod.id);
    const paymentTypeNames = paymentType.map((payment) => payment.name);
    const masterPolicyIds = masterPolicy.map((policy) => policy.id);
    const roleHierarchyId = roleHierarchy && (parentCode || childIds.length) ? roleHierarchy.id : '';

    const payload = {
      mobileNo: mobileNumber,
      email,
      startDate,
      endDate,
      status: active === FORM_VALUE.YES,
      roleId,
      roleName,
      firstName,
      lastName,
      groupIds,
      parentId: parentCode,
      childIds,
      password: '123456',
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
      producerCode: typeof producerCode === 'string' ? producerCode : '',
      producerType: typeOfProducer,
      channelId: channelType,
      bankingLimit,
      sendEmail,
      domain,
      paymentType: paymentTypeNames,
      houseBankId,
      ocrChequeScanning: chequeOCRScanning,
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
      zoneIds: zone,
    };

    const filteredData = Object.fromEntries(
      Object.entries(payload).filter(([key, value]) => value !== '' && !(Array.isArray(value) && value.length === 0))
    );
    postData(filteredData);
  };

  useEffect(() => {
    if (params?.id && role) {
      setIsEdit(true);
      getUserDetails(params?.id);
    }
  }, [params?.id, role]);

  const formatDate = (dateString) => {
    if (dateString.includes('/')) {
      const [day, month, year] = dateString.split('/');
      return `${month}/${day}/${year}`;
    }
    if (dateString.includes('-')) {
      const [year, month, day] = dateString.split('-');
      return `${month}/${day}/${year}`;
    }
  };

  const processKey = (key, value) => {
    switch (key) {
      case FORM_LABEL.START_DATE:
      case FORM_LABEL.END_DATE:
        setValue(key, formatDate(value));
        break;

      case FORM_LABEL.LOGIN_TYPE:
        setValue(
          FORM_VALUE.LOGIN_TYPE,
          loginType.filter((item) => item.value === value)
        );
        break;

      case FORM_LABEL.LOB:
        setValue(
          FORM_VALUE.LOB,
          lobs.filter((item) => item.value === value)
        );
        break;

      case FORM_LABEL.NT_ID:
        setValue(FORM_VALUE.NT_LOGIN_ID, value);
        break;

      case FORM_LABEL.MOBILE_NO:
        setValue(FORM_VALUE.MOBILE_NUMBER, value);
        break;

      case FORM_LABEL.STATUS:
        setValue(FORM_VALUE.ACTIVE, value ? FORM_VALUE.YES : FORM_VALUE.NO);
        break;

      case FORM_LABEL.ROLE_NAME:
        setValue(FORM_VALUE.ROLE_SELECT, role.find((item) => item.roleName === value) || null);
        break;

      case FORM_LABEL.LOCATION:
        setValue(
          FORM_VALUE.LOCATION,
          locations.filter((item) => item.value === value)
        );
        break;

      case FORM_LABEL.PRODUCT:
        setValue(
          FORM_VALUE.PRODUCT,
          products.filter((item) => item.value === value)
        );
        break;

      default:
        setValue(key, value);
        break;
    }
  };

  const getUserDetails = async (id) => {
    const data = await getUserById(id);
    if (data) {
      Object.entries(data).forEach(([key, value]) => processKey(key, value));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formMainContainer}>
      <div className={styles.createNewUserContainer}>
        <div className={styles.formHeaderStyle}>
          <div className={styles.subHeader}>
            <IconButton
              aria-label="back"
              onClick={() => {
                navigate('/user-management');
              }}
            >
              <LeftArrow />
            </IconButton>
            <span className={styles.headerTextStyle}>Create New User</span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-8 gap-5 py-5">
          <AutocompleteMultipleField
            key={ROLE_SELECT}
            control={control}
            name={ROLE_SELECT}
            label="Role"
            required
            disabled={isEdit}
            options={role || []}
            validation={{ required: REQUIRED_MSG }}
            errors={errors}
            multiple={false}
            resetClicked={resetClicked}
            roleChanged={roleChanged}
            classes="w-full"
            isEdit={isEdit}
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
            classes="w-full"
            isEdit={isEdit}
          />

          {roleConfig?.map((item) =>
            item?.type === 'input' ? (
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
            ) : item?.type === 'date' ? (
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
                classes="w-full"
                isEdit={isEdit}
              />
            ) : item?.type === 'autocomplete' && item?.multiple === true ? (
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
                classes="w-full"
                isEdit={isEdit}
              />
            ) : item?.type === 'autocomplete' && item?.all === true ? (
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
                  classes="w-full"
                  isEdit={isEdit}
                />
                {item?.subFields !== undefined &&
                item?.subFields['neft'] &&
                roleValue !== 'partner' &&
                paymentsType &&
                paymentsType?.some((item) => item?.value === 'neft' || item?.value === 'all') ? (
                  <div key={item?.subFields['neft'][0]?.id}>
                    <SelectField
                      key={item?.subFields['neft'][0]?.id}
                      control={control}
                      name={item?.subFields['neft'][0]?.id}
                      label={item?.subFields['neft'][0]?.label}
                      required={item?.subFields['neft'][0]?.required}
                      disabled={item?.subFields['neft'][0]?.disabled}
                      menuItem={item?.subFields['neft'][0]?.menuItem || apiDataMap['neftDefaultBank']}
                      placeholder="Select"
                      errors={errors}
                      setValue={setValue}
                      classes="w-full"
                    />
                    <InputField
                      id={item?.subFields['accountNumber'][0]?.id}
                      required={item?.subFields['accountNumber'][0]?.required}
                      label={item?.subFields['accountNumber'][0]?.label}
                      validation={item?.subFields['accountNumber'][0]?.validation}
                      control={control}
                      errors={errors}
                      disabled={item?.subFields['accountNumber'][0]?.disabled}
                      classes="w-full"
                    />
                  </div>
                ) : (
                  <div></div>
                )}
                {item?.subFields &&
                  paymentsType &&
                  paymentsType?.some((item) => item?.value === 'cheque' || item?.value === 'all') && (
                    <div>
                      <SelectField
                        key={item?.subFields['cheque'][0]?.id}
                        control={control}
                        name={item?.subFields['cheque'][0]?.id}
                        label={item?.subFields['cheque'][0]?.label}
                        required={item?.subFields['cheque'][0]?.required}
                        disabled={item?.subFields['cheque'][0]?.disabled}
                        menuItem={item?.subFields['cheque'][0]?.menuItem}
                        placeholder="Select"
                        errors={errors}
                        classes="w-full"
                      />
                    </div>
                  )}
              </div>
            ) : item?.type === 'autocomplete' ? (
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
                classes="w-full"
                isEdit={isEdit}
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
                classes="w-full"
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
