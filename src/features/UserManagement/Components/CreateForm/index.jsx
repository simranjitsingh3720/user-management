/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import usePostUser from '../hooks/usePostUser';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getLobs } from '../../../../Redux/getLob';
import { clearProducts, getProducts } from '../../../../Redux/getProduct';
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
import Loader from './../../../../components/Loader';
import {
  AUTOCOMPLETE,
  DATE_FORMAT,
  DROPDOWN,
  FORM_LABEL,
  FORM_VALUE,
  LOB,
  LOGIN_TYPE,
  PAYMENT_CALL,
  PAYMENT_TYPE,
  PRODUCER_ARR,
  PRODUCER_CODE_CALL,
  PRODUCER_PARTNER_ARR,
  ROLE_SELECT,
} from '../utils/constants';
import apiUrls from '../../../../utils/apiUrls';
import useSubmit from '../hooks/useSubmit';
import { getLoginType } from '../../../../Redux/getLoginType';
import CustomFormHeader from '../../../../components/CustomFormHeader';
import { FORM_HEADER_TEXT } from '../../../../utils/constants';
import dayjs from 'dayjs';
import { getProducerTypes } from '../../../../Redux/getProducerType';
import { clearMasterPolicy, getMasterPolicies } from '../../../../Redux/getMasterPolicy';

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
  const producerType = useSelector((state) => state.producerType.producerType);
  const masterPolicy = useSelector((state) => state.masterPolicy.masterPolicy);
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
    typeOfProducer: producerType,
    loginType: loginType,
    masterPolicy: masterPolicy,
  });
  const { loading, postData } = usePostUser();
  const [roleConfig, setRoleConfig] = useState([]);
  const [resetClicked, setResetClicked] = useState(false);
  const [jsonData, setJsonData] = useState([]);
  const [roleChanged, setRoleChanged] = useState(false);
  const today = dayjs().format(DATE_FORMAT);
  const [editData, setEditData] = useState({});
  const {
    handleSubmit,
    setValue,
    reset,
    control,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      roleSelect: null,
      loginType: [],
      active: 'yes',
      startDate: today,
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
    if (params?.id && role.length > 0) {
      setIsEdit(true);
      getUserDetails(params?.id);
    }
  }, [role]);

  useEffect(() => {
    dispatch(getRoles());
    dispatch(getLoginType());
    dispatch(getLobs());
    dispatch(getLocations());
    dispatch(getMasterPolicies());
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
    if (producerType) {
      updatedApiDataMap.typeOfProducer = producerType;
    }
    if (loginType) {
      updatedApiDataMap.loginType = loginType;
    }
    if (masterPolicy) {
      updatedApiDataMap.masterPolicy = masterPolicy;
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
    producerType,
    loginType,
    masterPolicy,
  ]);

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
      resetValues['startDate'] = today;
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
    resultObject['startDate'] = today;
    setResetClicked(!resetClicked);
    reset(resultObject);
    if (isEdit) {
      if (params?.id) {
        setIsEdit(true);
        getUserDetails(params?.id);
      }
    }
  };

  useEffect(() => {
    dispatch(clearProducts());
    dispatch(clearMasterPolicy());
    if (lobsWatch) {
      dispatch(getProducts(lobsWatch));
      setValue('masterPolicy', []);
    }
  }, [lobsWatch?.length]);

  const productWatch = watch('product');

  useEffect(() => {
    dispatch(clearMasterPolicy());
    if (
      rolesWatch?.roleName === 'partner' &&
      lobsWatch &&
      lobsWatch?.length > 0 &&
      productWatch &&
      productWatch.length > 0
    ) {
      const containsTravel = lobsWatch.some((item) => item.value === 'travel');
      const containsProduct = productWatch.some((item) => item.value === 'groupbusinesstravelaccident');
      const containsProductGuard = productWatch.some((item) => item.value === 'smallbusinesstravelguard');
      if (containsTravel && containsProduct && containsProductGuard) {
        dispatch(clearMasterPolicy());
        dispatch(getMasterPolicies('both'));
      } else if (containsTravel && containsProduct) {
        dispatch(clearMasterPolicy());
        dispatch(getMasterPolicies('groupbusinesstravelaccident'));
      } else if (containsTravel && containsProductGuard) {
        dispatch(clearMasterPolicy());
        dispatch(getMasterPolicies('smallbusinesstravelguard'));
      } else {
        dispatch(clearMasterPolicy());
        dispatch(getMasterPolicies([]));
      }
    } else {
      dispatch(clearMasterPolicy());
    }
  }, [lobsWatch, productWatch, rolesWatch]);

  useEffect(() => {
    if (rolesWatch && rolesWatch?.roleName) {
      userTypeFetch(rolesWatch?.id);

      if (PRODUCER_CODE_CALL.some((role) => rolesWatch?.roleName?.includes(role))) {
        dispatch(getProducerCodes(rolesWatch));
        roleHierarchyFetch(rolesWatch?.id);
      }
      if (PRODUCER_ARR.some((role) => rolesWatch?.roleName?.includes(role))) {
        dispatch(getParentCode(rolesWatch));
        dispatch(getProducerTypes());
        dispatch(getChannels());
        dispatch(getHouseBanks());
      }
      if (PAYMENT_CALL.some((role) => rolesWatch?.roleName?.includes(role))) {
        dispatch(getPaymentTypes());
      }
    }
  }, [rolesWatch?.roleName]);

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
    const masterPolicyIds = masterPolicy.map((policy) => policy.value);
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
      gcStatus: PRODUCER_ARR.includes(roleName) ? false : '',
      producerCode: typeof producerCode === 'string' ? producerCode : '',
      producerType: typeOfProducer,
      channelId: channelType,
      bankingLimit,
      sendEmail: PRODUCER_PARTNER_ARR.includes(roleName) ? sendEmail === FORM_VALUE.YES : '',
      domain,
      paymentType: paymentTypeNames,
      houseBankId,
      ocrChequeScanning: paymentTypeNames.includes('cheque') ? chequeOCRScanning === FORM_VALUE.YES : '',
      ckyc: PRODUCER_ARR.includes(roleName) ? cKyc === FORM_VALUE.YES : '',
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
          loginType.filter((item) => value.includes(item.id))
        );
        break;

      case FORM_LABEL.LOB:
        setValue(
          FORM_VALUE.LOB,
          lobs.filter((item) => value.includes(item.id))
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

      case FORM_LABEL.CKYC:
        setValue(FORM_VALUE.CKYC, value ? FORM_VALUE.YES : FORM_VALUE.NO);
        break;

      case FORM_LABEL.SEND_EMAIL:
        setValue(FORM_VALUE.SEND_EMAIL, value ? FORM_VALUE.YES : FORM_VALUE.NO);
        break;

      case FORM_LABEL.GC_STATUS:
        setValue(FORM_LABEL.GC_STATUS, value ? FORM_VALUE.YES : FORM_VALUE.NO);
        break;

      case FORM_LABEL.ROLE_NAME:
        setValue(FORM_VALUE.ROLE_SELECT, role.find((item) => item.roleName === value) || null);
        break;

      case FORM_LABEL.LOCATION:
        setValue(
          FORM_VALUE.LOCATION,
          locations.filter((item) => value.includes(item.id))
        );
        break;

      case FORM_LABEL.PAYMENT_TYPE:
        setValue(
          FORM_LABEL.PAYMENT_TYPE,
          paymentType.filter((item) => value.includes(item.id))
        );
        break;
      case FORM_LABEL.OCR_CHEQUE_SCANNING:
        setValue(FORM_VALUE.CHEQUE_OCR_SCANNING, value ? FORM_VALUE.YES : FORM_VALUE.NO);
        break;

      case FORM_LABEL.PRODUCER_TYPE:
        setValue(
          FORM_VALUE.PRODUCER_TYPE,
          producerType.filter((item) => value.includes(item.id))
        );
        break;

      case FORM_LABEL.PRODUCT:
        setValue(
          FORM_LABEL.PRODUCT,
          products.filter((item) => value.includes(item.id))
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
      setEditData(data);
    }
  };

  useEffect(() => {
    if (editData && Object.keys(editData).length > 0) {
      Object.entries(editData).forEach(([key, value]) => processKey(key, value));
    }
  }, [
    editData,
    locations,
    producerCode,
    parentCode,
    loginType,
    channelType,
    neftDefaultBank,
    producerType,
    loginType,
    lobs,
    paymentType,
  ]);

  return (
    <>
      {loading && <Loader></Loader>}
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formMainContainer}>
        <div className={styles.createNewUserContainer}>
          <div className="p-4 pb-0">
            <CustomFormHeader
              headerText={FORM_HEADER_TEXT.USER}
              navigateRoute="/user-management"
              handleReset={handleReset}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-8 gap-5 py-5">
            <AutocompleteMultipleField
              key={ROLE_SELECT}
              control={control}
              name={ROLE_SELECT}
              label="Role"
              required
              disabled={!isEdit ? false : true}
              options={role || []}
              validation={{ required: 'Role is required' }}
              errors={errors}
              multiple={false}
              resetClicked={resetClicked}
              roleChanged={roleChanged}
              classes="w-full"
              isEdit={isEdit}
              trigger={trigger}
              showCheckbox={false}
              setValue={setValue}
            />
            <AutocompleteFieldAll
              key={LOGIN_TYPE}
              control={control}
              name={LOGIN_TYPE}
              label={'Login Type'}
              required
              roleChanged={roleChanged}
              options={apiDataMap[LOGIN_TYPE]}
              resetClicked={resetClicked}
              validation={{ required: 'Login Type is required' }}
              errors={errors}
              apiDataMap={apiDataMap}
              classes="w-full"
              isEdit={isEdit}
              trigger={trigger}
              setValue={setValue}
              disabled={!isEdit ? false : true}
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
                  disabled={!isEdit ? item?.disabled : !item?.canEdit}
                  classes="w-full"
                  trigger={trigger}
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
                  trigger={trigger}
                  disabled={!isEdit ? item?.disabled : !item?.canEdit}
                />
              ) : item?.type === 'autocomplete' && item?.multiple === true ? (
                <AutocompleteMultipleField
                  key={item?.id}
                  control={control}
                  roleChanged={roleChanged}
                  name={item?.id}
                  label={item?.label}
                  required={item?.required}
                  disabled={!isEdit ? item?.disabled : !item?.canEdit}
                  options={apiDataMap[item?.id]}
                  validation={item?.validation}
                  errors={errors}
                  multiple={item?.multiple}
                  resetClicked={resetClicked}
                  classes="w-full"
                  isEdit={isEdit}
                  trigger={trigger}
                  setValue={setValue}
                />
              ) : item?.type === 'autocomplete' && item?.all === true ? (
                <>
                  <AutocompleteFieldAll
                    control={control}
                    name={item?.id}
                    label={item?.label}
                    required={item?.required}
                    roleChanged={roleChanged}
                    disabled={!isEdit ? item?.disabled : !item?.canEdit}
                    options={apiDataMap[item?.id]}
                    resetClicked={resetClicked}
                    validation={item?.validation}
                    errors={errors}
                    apiDataMap={apiDataMap}
                    setValue={setValue}
                    classes="w-full"
                    isEdit={isEdit}
                    trigger={trigger}
                  />
                  {item?.subFields !== undefined &&
                    item?.subFields['neft'] &&
                    roleValue !== 'partner' &&
                    paymentsType &&
                    paymentsType?.some((item) => item?.value === 'neft' || item?.value === 'all') && (
                      <div className="grid gap-5" key={item?.subFields['neft'][0]?.id}>
                        <SelectField
                          key={item?.subFields['neft'][0]?.id}
                          control={control}
                          name={item?.subFields['neft'][0]?.id}
                          label={item?.subFields['neft'][0]?.label}
                          required={item?.subFields['neft'][0]?.required}
                          disabled={
                            !isEdit ? item?.subFields['neft'][0]?.disabled : !item?.subFields['neft'][0]?.canEdit
                          }
                          menuItem={item?.subFields['neft'][0]?.menuItem || apiDataMap['neftDefaultBank']}
                          placeholder="Select"
                          errors={errors}
                          setValue={setValue}
                          classes="w-full"
                          trigger={trigger}
                        />
                      </div>
                    )}

                  {item?.subFields !== undefined &&
                    item?.subFields['neft'] &&
                    roleValue !== 'partner' &&
                    paymentsType &&
                    paymentsType?.some((item) => item?.value === 'neft' || item?.value === 'all') && (
                      <InputField
                        id={item?.subFields['accountNumber'][0]?.id}
                        required={item?.subFields['accountNumber'][0]?.required}
                        label={item?.subFields['accountNumber'][0]?.label}
                        validation={item?.subFields['accountNumber'][0]?.validation}
                        control={control}
                        errors={errors}
                        disabled={
                          !isEdit
                            ? item?.subFields['accountNumber'][0]?.disabled
                            : !item?.subFields['accountNumber'][0]?.canEdit
                        }
                        classes="w-full"
                        trigger={trigger}
                      />
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
                          menuItem={item?.subFields['cheque'][0]?.menuItem}
                          disabled={
                            !isEdit ? item?.subFields['cheque'][0]?.disabled : !item?.subFields['cheque'][0]?.canEdit
                          }
                          placeholder="Select"
                          errors={errors}
                          classes="w-full"
                          setValue={setValue}
                          trigger={trigger}
                        />
                      </div>
                    )}
                </>
              ) : item?.type === 'autocomplete' ? (
                <AutocompleteMultipleField
                  key={item?.id}
                  control={control}
                  name={item?.id}
                  label={item?.label}
                  required={item?.required}
                  roleChanged={roleChanged}
                  disabled={!isEdit ? item?.disabled : !item?.canEdit}
                  options={apiDataMap[item?.id]}
                  validation={item?.validation}
                  errors={errors}
                  multiple={false}
                  resetClicked={resetClicked}
                  classes="w-full"
                  isEdit={isEdit}
                  trigger={trigger}
                  setValue={setValue}
                />
              ) : (
                <SelectField
                  key={item?.id}
                  control={control}
                  name={item?.id}
                  label={item?.label}
                  required={item?.required}
                  disabled={!isEdit ? item?.disabled : !item?.canEdit}
                  menuItem={item?.menuItem || apiDataMap[item?.id]}
                  placeholder={item?.label}
                  errors={errors}
                  setValue={setValue}
                  classes="w-full"
                  trigger={trigger}
                />
              )
            )}
          </div>
        </div>
        <div>
          <CustomButton type="submit">Submit</CustomButton>
        </div>
      </form>
    </>
  );
}

export default CreateUserCreationForm;
