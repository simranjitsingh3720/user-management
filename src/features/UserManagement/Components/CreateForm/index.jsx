/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import usePostUser from '../hooks/usePostUser';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import InputField from '../../../../components/CustomTextfield';
import DateField from '../../../../components/CustomDateInput';
import SelectField from '../../../../components/CustomSelect';
import AutocompleteMultipleField from '../../../../components/CustomAutocomplete';
import AutocompleteFieldAll from '../../../../components/CustomAutocompleteAll';
import CustomButton from '../../../../components/CustomButton';
import useGetUserType from '../hooks/useGetUserType';
import useGetRoleHierarchy from '../hooks/useRoleHierarchy';
import Loader from './../../../../components/Loader';
import apiUrls from '../../../../utils/apiUrls';
import useSubmit from '../hooks/useSubmit';
import CustomFormHeader from '../../../../components/CustomFormHeader';
import { COMMON_WORDS, FORM_HEADER_TEXT } from '../../../../utils/constants';
import dayjs from 'dayjs';
import {
  ARR_CONTAINS,
  COMMON,
  FORM_LABEL,
  FORM_VALUE,
  PAYMENT_OPTIONS,
  REQUIRED_ERR,
  excludedLabels,
} from '../utils/constants';
import useUpdateUser from '../hooks/useUpdateUser';
import errorHandler from '../../../../utils/errorHandler';
import { clearProducts, getProducts } from '../../../../stores/slices/getProduct';
import { clearMasterPolicy, getMasterPolicies } from '../../../../stores/slices/getMasterPolicy';
import { clearZones, getZones } from '../../../../stores/slices/getZone';
import { clearPlans, getPlans } from '../../../../stores/slices/getPlan';
import { getProducerCodes } from '../../../../stores/slices/getProducerCode';
import { getParentCode } from '../../../../stores/slices/getParentCode';
import { getProducerTypes } from '../../../../stores/slices/getProducerType';
import { getChannels } from '../../../../stores/slices/getChannel';
import { getHouseBanks } from '../../../../stores/slices/getHouseBank';
import { getPaymentTypes } from '../../../../stores/slices/getPaymentType';
import { getLoginType } from '../../../../stores/slices/getLoginType';
import { getLobs } from '../../../../stores/slices/getLob';
import { getLocations } from '../../../../stores/slices/getLocation';
import { getRoles } from '../../../../stores/slices/getRole';
import { DATE_FORMAT } from '../../../../utils/globalConstants';

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
  const plans = useSelector((state) => state.plan.plan);
  const zones = useSelector((state) => state.zone.zone);
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
    plan: plans,
    zone: zones,
  });
  const { loading, postData } = usePostUser();
  const { updateUserLoading, updateData } = useUpdateUser();
  const [roleConfig, setRoleConfig] = useState([]);
  const [resetClicked, setResetClicked] = useState(false);
  const [jsonData, setJsonData] = useState([]);
  const [roleChanged, setRoleChanged] = useState(false);
  const today = dayjs().format(COMMON.DATE_FORMAT);
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
      startDate: today,
      gcStatus: COMMON.NO,
      producerStatus: COMMON.ACTIVE,
    },
  });

  const roleValue = watch(COMMON.ROLE_SELECT)?.roleName;
  const paymentsType = watch(COMMON.PAYMENT_TYPE);
  const lobsWatch = watch(COMMON.LOB);
  const rolesWatch = watch(COMMON.ROLE_SELECT);
  const { userType, userTypeFetch } = useGetUserType();
  const { roleHierarchy, roleHierarchyFetch } = useGetRoleHierarchy();
  const params = useParams();
  const { getUserById } = useSubmit();
  const [isEdit, setIsEdit] = useState(false);
  const productWatch = watch(FORM_LABEL.PRODUCT);
  const planWatch = watch(FORM_LABEL.PLAN);
  const productRef = useRef(false);
  const planRef = useRef(false);
  const zoneRef = useRef(false);
  const masterPolicyRef = useRef(false);

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
        errorHandler.handleError(error);
      }
    };
    fetchData();
  }, []);

  const fetchUserById = useCallback(() => {
    return getUserDetails(params?.id);
  }, [params?.id]);

  useEffect(() => {
    if (params?.id && role.length > 0) {
      productRef.current = false;
      planRef.current = false;
      zoneRef.current = false;
      masterPolicyRef.current = false;
      setIsEdit(true);
      fetchUserById();
    }
  }, [role]);

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
    if (producerType) {
      updatedApiDataMap.typeOfProducer = producerType;
    }
    if (loginType) {
      updatedApiDataMap.loginType = loginType;
    }
    if (masterPolicy) {
      updatedApiDataMap.masterPolicy = masterPolicy;
    }
    if (plans) {
      updatedApiDataMap.plan = plans;
    }
    if (zones) {
      updatedApiDataMap.zone = zones;
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
    plans,
    zones,
  ]);

  useEffect(() => {
    if (jsonData) {
      setValue(COMMON.ROLE_SELECT, '');
    }
  }, []);

  useEffect(() => {
    if (roleValue && !isEdit) {
      let originalArray = roleConfig;
      if (originalArray) {
        let resultObject = originalArray?.reduce((resetValues, item) => {
          if (item?.type === COMMON.AUTOCOMPLETE && item?.multiple === true) {
            resetValues[item?.id] = [];
          }
          if (item?.type === COMMON.AUTOCOMPLETE) {
            resetValues[item?.id] = null;
          } else if (item?.type !== COMMON.DROPDOWN) {
            resetValues[item?.id] = '';
          }
          return resetValues;
        }, {});
        setRoleChanged(!roleChanged);
        if (resultObject) {
          resultObject.roleSelect = watch(COMMON?.ROLE_SELECT);
          resultObject[FORM_LABEL.START_DATE] = today;
          resultObject[COMMON.PRODUCER_STATUS] = COMMON.ACTIVE;
          reset(resultObject);
        }
      }
    }
  }, [roleValue]);

  useEffect(() => {
    if (jsonData && roleValue) {
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
    } else {
      setRoleConfig([]);
    }
  }, [roleValue, jsonData]);

  const handleReset = () => {
    let originalArray = roleConfig;
    if (originalArray) {
      let resultObject = originalArray?.reduce((resetValues, item) => {
        if (item?.type === COMMON.AUTOCOMPLETE && item?.multiple === true) {
          resetValues[item?.id] = [];
        }
        if (item?.type === COMMON.AUTOCOMPLETE) {
          resetValues[item?.id] = null;
        } else if (item?.type !== COMMON.DROPDOWN) {
          resetValues[item?.id] = '';
        }
        return resetValues;
      }, {});
      resultObject.roleSelect = '';
      resultObject[FORM_LABEL.START_DATE] = today;
      setResetClicked(!resetClicked);
      reset(resultObject);
      if (isEdit) {
        if (params?.id) {
          setIsEdit(true);
          getUserDetails(params?.id);
        }
      }
    }
  };

  useEffect(() => {
    dispatch(clearProducts());
    dispatch(clearMasterPolicy());
    dispatch(clearPlans());
    dispatch(clearZones());
    setValue(FORM_LABEL.PRODUCT, null);
    setValue(FORM_LABEL.PLAN, null);
    setValue(FORM_LABEL.ZONE, null);
    setValue(FORM_LABEL.MASTER_POLICY, null);
    if (lobsWatch && lobsWatch.length > 0) {
      dispatch(getProducts(lobsWatch));
    }
  }, [lobsWatch]);

  useEffect(() => {
    if (lobs && lobs.length > 0 && ARR_CONTAINS.ADMIN_ARR.includes(rolesWatch?.roleName) && !isEdit) {
      setValue(COMMON_WORDS.LOB, lobs);
    }
  }, [lobs, rolesWatch?.roleName]);

  useEffect(() => {
    if (products && products.length > 0 && ARR_CONTAINS.ADMIN_ARR.includes(rolesWatch?.roleName) && !isEdit) {
      setValue(COMMON_WORDS.PRODUCT, products);
    }
  }, [products, rolesWatch?.roleName]);

  useEffect(() => {
    dispatch(clearPlans());
    dispatch(clearZones());
    dispatch(clearMasterPolicy());
    setValue(FORM_LABEL.PLAN, null);
    setValue(FORM_LABEL.ZONE, null);
    setValue(FORM_LABEL.MASTER_POLICY, null);
    if (lobsWatch && lobsWatch?.length > 0 && productWatch && productWatch.length > 0) {
      if (ARR_CONTAINS.PLAN_ZONE_ARR?.includes(rolesWatch?.roleName)) {
        dispatch(getPlans(productWatch));
      } else if (ARR_CONTAINS.MASTER_POLICY_ARR?.includes(rolesWatch?.roleName)) {
        dispatch(getMasterPolicies(productWatch));
      }
    }
  }, [productWatch]);

  useEffect(() => {
    setValue(FORM_LABEL.ZONE, null);
    dispatch(clearZones());
    if (productWatch && productWatch.length > 0 && planWatch && planWatch.length > 0) {
      dispatch(getZones(planWatch));
    }
  }, [planWatch]);

  useEffect(() => {
    if (rolesWatch && rolesWatch?.roleName) {
      userTypeFetch(rolesWatch?.id);
      if (ARR_CONTAINS.PRODUCER_CODE_CALL.some((role) => rolesWatch?.roleName?.includes(role))) {
        dispatch(getProducerCodes(rolesWatch));
        roleHierarchyFetch(rolesWatch?.id);
      }
      if (ARR_CONTAINS.PRODUCER_ARR.some((role) => rolesWatch?.roleName?.includes(role))) {
        dispatch(getParentCode(rolesWatch));
        dispatch(getProducerTypes());
        dispatch(getChannels());
        dispatch(getHouseBanks());
      }
      if (ARR_CONTAINS.PAYMENT_CALL.some((role) => rolesWatch?.roleName?.includes(role))) {
        dispatch(getPaymentTypes());
      }
    }
  }, [rolesWatch?.roleName]);

  const createUserPayload = (data) => {
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
      employeeCode,
      pospAadhar,
      pospPAN,
      transactionType,
      producerStatus,
      revalidation,
      roleAssignment,
      externalPosp,
      plan,
      zone,
      status,
    } = data;

    const { id: roleId, roleName } = roleSelect;
    const [userTypeObj = {}] = userType || [];
    const { userType: userTypeStr, id: userTypeId } = userTypeObj;
    const childIds = Array.isArray(producerCode) ? producerCode.map((code) => code.id) : [];
    const loginTypeIds = loginType.map((type) => type.id);
    const locationIds = location && location.map((loc) => loc.id);
    const productIds = product && product.map((prod) => prod.id);
    const planIds = plan && plan.map((plan) => plan.id);
    const zoneIds = zone && zone.map((zone) => zone.id);
    const paymentTypeNames = paymentType && paymentType.map((payment) => payment.name);
    const masterPolicyIds = masterPolicy && masterPolicy.map((policy) => policy.value);
    const roleHierarchyId =
      roleHierarchy && (parentCode || childIds.length > 0 || ARR_CONTAINS.PLAN_ZONE_ARR?.includes(roleName))
        ? roleHierarchy.id
        : '';
    const payload = {
      mobileNo: mobileNumber,
      email,
      startDate,
      endDate,
      status: active === FORM_VALUE.YES || status === FORM_VALUE.ACTIVE,
      roleId,
      roleName,
      firstName,
      lastName,
      groupIds,
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
      gcStatus: ARR_CONTAINS.PRODUCER_ARR?.includes(roleName) ? false : '',
      producerCode:
        typeof producerCode === 'string' && !ARR_CONTAINS.DEO_USER_ARR?.includes(roleName) ? producerCode : '',
      parentId:
        typeof producerCode === 'string' && ARR_CONTAINS.DEO_USER_ARR?.includes(roleName) ? producerCode : parentCode,
      producerType: typeOfProducer,
      channelId: channelType,
      bankingLimit,
      sendEmail: ARR_CONTAINS.PRODUCER_PARTNER_ARR?.includes(roleName) ? sendEmail === FORM_VALUE.YES : '',
      domain,
      paymentType: paymentTypeNames,
      houseBankId: ARR_CONTAINS.PRODUCER_ARR?.includes(roleName)
        ? neftDefaultBank && Object.keys(neftDefaultBank).length > 0
          ? neftDefaultBank
          : ''
        : '',
      ocrChequeScanning: paymentTypeNames?.includes(COMMON.CHEQUE)
        ? chequeOCRScanning && chequeOCRScanning === FORM_VALUE.YES
        : '',
      ckyc: ARR_CONTAINS.PRODUCER_ARR?.includes(roleName) ? cKyc === FORM_VALUE.YES : '',
      partnerName,
      masterPolicyIds,
      brokerType,
      brokerRoleName,
      branchCode,
      dataEntryUserName,
      employeeCode,
      pospAadhar,
      pospPAN,
      transactionType,
      producerStatus: ARR_CONTAINS.DEO_USER_ARR?.includes(roleName) ? producerStatus === COMMON.ACTIVE : '',
      revalidation: ARR_CONTAINS.DEO_USER_ARR?.includes(roleName) ? revalidation === FORM_VALUE.ACTIVE : '',
      roleAssigned: ARR_CONTAINS.DEO_USER_ARR?.includes(roleName) ? roleAssignment : '',
      externalPosp,
      planIds,
      zoneIds,
    };

    const filteredData = Object.fromEntries(
      Object.entries(payload).filter(
        ([key, value]) => value !== '' && !(Array.isArray(value) && value.length === 0) && value !== null
      )
    );
    return filteredData;
  };

  const updateUserPayload = (data, role) => {
    const {
      producerCode,
      location,
      product,
      paymentType,
      employeeId,
      firstName,
      lastName,
      mobileNumber,
      email,
      vertical,
      subVertical,
      solId,
      endDate,
      active,
      ntloginId,
      chequeOCRScanning,
      neftDefaultBank,
      dataEntryUserName,
      plan,
      zone,
      pospAadhar,
      pospPAN,
      revalidation,
      externalPosp,
      roleAssignment,
      transactionType,
      status,
      loginType,
      sendEmail,
      domain,
      masterPolicy,
      parentCode,
    } = data;

    const childIds = producerCode && Array.isArray(producerCode) ? producerCode.map((code) => code.id) : [];
    const locationIds = location ? location.map((loc) => loc.id) : [];
    const productIds = product ? product.map((prod) => prod.id) : [];
    const paymentTypeNames = paymentType ? paymentType.map((payment) => payment.name) : [];
    const roleHierarchyId = roleHierarchy && (parentCode || childIds.length) ? roleHierarchy.id : '';
    const loginTypeIds = loginType ? loginType.map((type) => type.id) : [];
    const planIds = plan && plan.map((plan) => plan.id);
    const zoneIds = zone && zone.map((zone) => zone.id);
    const masterPolicyIds = masterPolicy && masterPolicy.map((policy) => policy.value);

    let payload = {
      employeeId: editData && editData.employeeId !== employeeId ? employeeId : '',
      firstName,
      lastName,
      mobileNo: editData && editData.mobileNo !== mobileNumber ? mobileNumber : '',
      email: editData && editData.email !== email ? email : '',
      vertical,
      subVertical,
      solId,
      endDate,
      status: active === FORM_VALUE.YES,
      loginTypeIds,
    };

    let deoPayload = {
      mobileNo: editData && editData.mobileNo !== mobileNumber ? mobileNumber : '',
      solId,
      locationIds,
      productIds,
      planIds,
      zoneIds,
      pospAadhar,
      pospPAN,
      transactionType,
      paymentType: paymentTypeNames,
      endDate,
      revalidation: revalidation === FORM_VALUE.ACTIVE,
      externalPosp,
      roleAssigned: roleAssignment,
      status: status === FORM_VALUE.ACTIVE,
      loginTypeIds,
    };

    if (ARR_CONTAINS.CLIENT_ARR?.includes(role)) {
      payload = {
        ...payload,
        roleHierarchyId,
        childIds,
        locationIds,
        productIds,
      };
    } else if (ARR_CONTAINS.PRODUCER_ARR?.includes(role)) {
      payload = {
        loginTypeIds,
        locationIds,
        productIds,
        paymentType: paymentTypeNames,
        houseBankId:
          ARR_CONTAINS.PRODUCER_ARR?.includes(role) && paymentTypeNames?.includes(COMMON.NEFT)
            ? Array.isArray(neftDefaultBank)
              ? neftDefaultBank.join(',')
              : neftDefaultBank
            : '',
        ocrChequeScanning: paymentTypeNames?.includes(COMMON.CHEQUE)
          ? chequeOCRScanning && chequeOCRScanning === FORM_VALUE.YES
          : '',
        planIds,
        zoneIds,
      };
    } else if (ARR_CONTAINS.DATA_ENTRY_USER_ARR?.includes(role)) {
      payload = {
        ...payload,
        locationIds,
        productIds,
      };
    } else if (ARR_CONTAINS.ADMIN_ARR?.includes(role)) {
      payload = {
        ...payload,
        locationIds,
        ntId: editData && editData.ntId !== ntloginId ? ntloginId : '',
      };
    } else if (COMMON.PARTNER_EMPLOYEE === role || COMMON.SSO === role) {
      payload = {
        ...deoPayload,
        email: editData && editData.email !== email ? email : '',
        dataEntryUserName: editData && editData.dataEntryUserName !== dataEntryUserName ? dataEntryUserName : '',
      };
    } else if (COMMON.EXTERNAL_POSP === role) {
      payload = { ...deoPayload };
    } else if (COMMON.PARTNER === role) {
      payload = {
        loginTypeIds,
        firstName,
        lastName,
        mobileNo: editData && editData.mobileNo !== mobileNumber ? mobileNumber : '',
        productIds,
        sendEmail: sendEmail === FORM_VALUE.YES,
        domain,
        endDate,
        status: active === FORM_VALUE.YES,
        paymentType: paymentTypeNames,
        masterPolicyIds,
      };
    } else {
      payload = {
        ...payload,
        locationIds,
        productIds,
        ntId: editData && editData.ntId !== ntloginId ? ntloginId : '',
      };
    }

    const filteredData = Object.fromEntries(
      Object.entries(payload).filter(([key, value]) => value !== '' && !(Array.isArray(value) && value.length === 0))
    );

    return filteredData;
  };

  const onSubmit = (data) => {
    if (params?.id) {
      const { id: roleId, roleName } = data?.roleSelect;
      const updatePayload = updateUserPayload(data, rolesWatch.roleName);
      updateData(params.id, roleId, roleName, updatePayload);
    } else {
      const filteredData = createUserPayload(data);
      postData(filteredData);
    }
  };

  const formatDate = (date) => {
    if (!date) return '';
    return dayjs(date).format(DATE_FORMAT);
  };

  const processKey = (key, value) => {
    switch (key) {
      case FORM_LABEL.START_DATE:
        setValue(key, formatDate(value));
        break;

      case FORM_LABEL.END_DATE:
        setValue(key, formatDate(value));
        break;

      case FORM_LABEL.LOGIN_TYPE:
        setValue(
          FORM_VALUE.LOGIN_TYPE,
          loginType.filter((item) => value?.includes(item.id))
        );
        break;

      case FORM_LABEL.CHANNEL_ID:
        setValue(
          FORM_VALUE.CHANNEL_TYPE,
          channelType.filter((item) => value?.includes(item.id)).map((item) => item.id)
        );
        break;

      case FORM_LABEL.PRODUCER_TYPE:
        setValue(
          FORM_VALUE.TYPE_OF_PRODUCER,
          producerType.filter((item) => value?.includes(item.id)).map((item) => item.id)
        );
        break;

      case FORM_LABEL.LOB:
        if (lobs && lobs.length > 0) {
          setValue(
            FORM_VALUE.LOB,
            lobs.filter((item) => value?.includes(item.id))
          );
        }
        break;

      case FORM_LABEL.PRODUCT:
        setValue(
          FORM_LABEL.PRODUCT,
          products.filter((item) => value?.includes(item.id))
        );
        break;

      case FORM_LABEL.CHILDS:
        setValue(
          FORM_VALUE.PRODUCER_CODE,
          producerCode.filter((item) => value?.includes(item.id))
        );
        break;

      case FORM_LABEL.PRODUCER:
        if (ARR_CONTAINS.DEO_USER_ARR?.includes(rolesWatch?.roleName)) {
          setValue(FORM_VALUE.PRODUCER_CODE, value[0]);
        } else {
          setValue(FORM_VALUE.PARENT_CODE, value[0]);
        }
        break;

      case FORM_LABEL.NT_ID:
        setValue(FORM_VALUE.NT_LOGIN_ID, value);
        break;

      case FORM_LABEL.MOBILE_NO:
        setValue(FORM_VALUE.MOBILE_NUMBER, value);
        break;

      case FORM_LABEL.STATUS:
        setValue(FORM_VALUE.ACTIVE, value ? FORM_VALUE.YES : FORM_VALUE.NO);
        setValue(FORM_LABEL.STATUS, value ? FORM_VALUE.ACTIVE : FORM_VALUE.INACTIVE);
        break;

      case FORM_LABEL.REVALIDATION:
        setValue(FORM_LABEL.REVALIDATION, value ? FORM_VALUE.ACTIVE : FORM_VALUE.INACTIVE);
        break;

      case FORM_LABEL.ROLE_ASSIGNED:
        setValue(FORM_VALUE.ROLE_ASSIGNMENT, value);
        break;

      case FORM_LABEL.MASTER_POLICY:
        setValue(
          FORM_LABEL.MASTER_POLICY,
          masterPolicy.filter((item) => value?.includes(item.id))
        );
        break;

      case FORM_LABEL.PLAN:
        setValue(
          FORM_LABEL.PLAN,
          plans.filter((item) => value?.includes(item.id))
        );
        break;

      case FORM_LABEL.ZONE:
        setValue(
          FORM_LABEL.ZONE,
          zones.filter((item) => value?.includes(item.id))
        );
        break;

      case FORM_LABEL.CKYC:
        setValue(FORM_VALUE.CKYC, value ? FORM_VALUE.YES : FORM_VALUE.NO);
        break;

      case FORM_LABEL.PRODUCER_STATUS:
        setValue(FORM_LABEL.PRODUCER_STATUS, value ? COMMON.ACTIVE : FORM_VALUE.INACTIVE);
        break;

      case FORM_LABEL.SEND_EMAIL:
        setValue(FORM_VALUE.SEND_EMAIL, value ? FORM_VALUE.YES : FORM_VALUE.NO);
        break;

      case FORM_LABEL.GC_STATUS:
        setValue(FORM_LABEL.GC_STATUS, value ? FORM_VALUE.YES : FORM_VALUE.NO);
        break;

      case FORM_LABEL.ROLE_NAME:
        setValue(
          FORM_VALUE.ROLE_SELECT,
          role.find((item) => item.roleName === value)
        );
        break;

      case FORM_LABEL.LOCATION:
        setValue(
          FORM_VALUE.LOCATION,
          locations.filter((item) => value?.includes(item.id))
        );
        break;

      case FORM_LABEL.PAYMENT_TYPE:
        setValue(
          FORM_LABEL.PAYMENT_TYPE,
          paymentType.filter((item) => value?.includes(item.id))
        );
        break;

      case FORM_LABEL.HOUSE_BANK:
        setValue(FORM_VALUE.NEFT_DEFAULT_BANK, value);
        break;

      case FORM_LABEL.OCR_CHEQUE_SCANNING:
        setValue(FORM_VALUE.CHEQUE_OCR_SCANNING, value ? FORM_VALUE.YES : FORM_VALUE.NO);
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
      Object.entries(editData).forEach(([key, value]) => {
        if (!excludedLabels?.includes(key)) {
          processKey(key, value);
        }
      });
    }
  }, [editData]);

  const neftValue = watch(COMMON.DEFAULT_HOUSE_BANK);
  const paymentsWatch = watch(COMMON_WORDS.PAYMENT_TYPE);

  useEffect(() => {
    if (neftValue && ARR_CONTAINS.PRODUCER_ARR.some((role) => rolesWatch?.roleName?.includes(role))) {
      const selectedHouseBank = neftDefaultBank.find((obj) => obj.id === neftValue);
      if (selectedHouseBank) {
        setValue(COMMON.ACCOUNT_NUMBER, selectedHouseBank?.accountNumber);
      }
    }
  }, [neftValue]);

  useEffect(() => {
    if (paymentsWatch && paymentsWatch.length > 0) {
      const paymentNameArr = paymentsWatch.map((item) => item.value);
      if (
        paymentNameArr.includes(PAYMENT_OPTIONS.SELF_PAYMENT_LINK) &&
        !paymentNameArr.includes(PAYMENT_OPTIONS.ONLINE_PAYMENT)
      ) {
        const onlinePaymentObj = paymentType.find((item) => item.value === PAYMENT_OPTIONS.ONLINE_PAYMENT);
        setValue(COMMON_WORDS.PAYMENT_TYPE, [...paymentsWatch, onlinePaymentObj]);
      }
    }
  }, [paymentsWatch]);

  const useFormLabelEffect = (label, dependency, ref = null) => {
    useEffect(() => {
      if ((!ref || !ref.current) && dependency?.length > 0 && editData && Object.keys(editData).length > 0) {
        if (editData[label]) {
          processKey(label, editData[label]);
          if (ref) ref.current = true;
        }
      }
    }, [dependency, editData]);
  };

  useFormLabelEffect(FORM_LABEL.LOB, lobs);
  useFormLabelEffect(FORM_LABEL.PRODUCT, products);
  useFormLabelEffect(FORM_LABEL.LOGIN_TYPE, loginType);
  useFormLabelEffect(FORM_LABEL.HOUSE_BANK, neftDefaultBank);
  useFormLabelEffect(FORM_LABEL.PRODUCER_TYPE, producerType);
  useFormLabelEffect(FORM_LABEL.LOCATION, locations);
  useFormLabelEffect(FORM_LABEL.CHANNEL_ID, channelType);
  useFormLabelEffect(FORM_LABEL.PAYMENT_TYPE, paymentType);
  useFormLabelEffect(FORM_LABEL.PRODUCER, producerCode);
  useFormLabelEffect(FORM_LABEL.PLAN, plans);
  useFormLabelEffect(FORM_LABEL.ZONE, zones);
  useFormLabelEffect(FORM_LABEL.MASTER_POLICY, masterPolicy);

  return (
    <>
      {(loading || updateUserLoading) && <Loader></Loader>}
      <form onSubmit={handleSubmit(onSubmit)} className="mb-3">
        <div className="bg-white h-full mb-5 rounded-xl shadow-lg shadow-shadowColor">
          <div className="p-4 pb-0">
            <CustomFormHeader
              id={params?.id}
              headerText={FORM_HEADER_TEXT.USER}
              navigateRoute="/user-management"
              handleReset={handleReset}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-8 gap-5 py-5">
            <AutocompleteMultipleField
              key={COMMON.ROLE_SELECT}
              control={control}
              name={COMMON.ROLE_SELECT}
              label="Role"
              required
              disabled={!isEdit ? false : true}
              options={role || []}
              validation={{ required: REQUIRED_ERR.ROLE }}
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
              key={COMMON.LOGIN_TYPE}
              control={control}
              name={COMMON.LOGIN_TYPE}
              label={'Login Type'}
              required
              roleChanged={roleChanged}
              options={apiDataMap[COMMON.LOGIN_TYPE]}
              resetClicked={resetClicked}
              validation={{ required: REQUIRED_ERR.LOGIN_TYPE }}
              errors={errors}
              apiDataMap={apiDataMap}
              classes="w-full"
              isEdit={isEdit}
              trigger={trigger}
              setValue={setValue}
              disabled={false}
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
                  isEdit={false}
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
                    item?.subFields[COMMON.PAYMENT_NEFT] &&
                    roleValue !== COMMON.PARTNER &&
                    paymentsType &&
                    paymentsType?.some((item) => item?.value === COMMON.PAYMENT_NEFT || item?.value === COMMON.ALL) && (
                      <div className="grid gap-5" key={item?.subFields[COMMON.PAYMENT_NEFT][0]?.id}>
                        <SelectField
                          key={item?.subFields[COMMON.PAYMENT_NEFT][0]?.id}
                          control={control}
                          name={item?.subFields[COMMON.PAYMENT_NEFT][0]?.id}
                          label={item?.subFields[COMMON.PAYMENT_NEFT][0]?.label}
                          required={item?.subFields[COMMON.PAYMENT_NEFT][0]?.required}
                          disabled={
                            !isEdit
                              ? item?.subFields[COMMON.PAYMENT_NEFT][0]?.disabled
                              : !item?.subFields[COMMON.PAYMENT_NEFT][0]?.canEdit
                          }
                          menuItem={
                            item?.subFields[COMMON.PAYMENT_NEFT][0]?.menuItem || apiDataMap[COMMON.DEFAULT_HOUSE_BANK]
                          }
                          placeholder="Select"
                          errors={errors}
                          setValue={setValue}
                          classes="w-full"
                          trigger={trigger}
                        />
                      </div>
                    )}

                  {item?.subFields !== undefined &&
                    item?.subFields[COMMON.PAYMENT_NEFT] &&
                    roleValue !== COMMON.PARTNER &&
                    neftValue &&
                    paymentsType &&
                    paymentsType?.some((item) => item?.value === COMMON.PAYMENT_NEFT || item?.value === COMMON.ALL) && (
                      <InputField
                        id={item?.subFields[COMMON.ACCOUNT_NUMBER][0]?.id}
                        required={neftValue ? true : false}
                        label={item?.subFields[COMMON.ACCOUNT_NUMBER][0]?.label}
                        validation={item?.subFields[COMMON.ACCOUNT_NUMBER][0]?.validation}
                        control={control}
                        errors={errors}
                        disabled={
                          !isEdit
                            ? item?.subFields[COMMON.ACCOUNT_NUMBER][0]?.disabled
                            : !item?.subFields[COMMON.ACCOUNT_NUMBER][0]?.canEdit
                        }
                        classes="w-full"
                        trigger={trigger}
                      />
                    )}

                  {item?.subFields &&
                    paymentsType &&
                    paymentsType?.some(
                      (item) => item?.value === COMMON.PAYMENT_CHEQUE || item?.value === COMMON.ALL
                    ) && (
                      <div>
                        <SelectField
                          key={item?.subFields[COMMON.PAYMENT_CHEQUE][0]?.id}
                          control={control}
                          name={item?.subFields[COMMON.PAYMENT_CHEQUE][0]?.id}
                          label={item?.subFields[COMMON.PAYMENT_CHEQUE][0]?.label}
                          required={item?.subFields[COMMON.PAYMENT_CHEQUE][0]?.required}
                          menuItem={item?.subFields[COMMON.PAYMENT_CHEQUE][0]?.menuItem}
                          disabled={
                            !isEdit
                              ? item?.subFields[COMMON.PAYMENT_CHEQUE][0]?.disabled
                              : !item?.subFields[COMMON.PAYMENT_CHEQUE][0]?.canEdit
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
