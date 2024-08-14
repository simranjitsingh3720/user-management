import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Grid, Box, Card, CardContent } from '@mui/material';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import useCreateProposalOTP from '../hooks/usecreateProposalOTP';
import useUpdateProposal from '../hooks/useUpdateProposal';
import CustomButton from '../../../components/CustomButton';
import CustomFormHeader from '../../../components/CustomFormHeader';
import { COMMON_WORDS, FORM_HEADER_TEXT } from '../../../utils/constants';
import UserTypeToggle from '../../../components/CustomRadioButtonGroup';
import { PROPOSAL_CREATE_BY } from '../utils/constants';
import { fetchUser } from '../../../stores/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import CustomAutoCompleteWithoutCheckbox from '../../../components/CustomAutoCompleteWithoutCheckbox';
import DateField from '../../../components/CustomDateInput';
import { fetchLobData } from '../../../stores/slices/lobSlice';
import { clearProducts, fetchAllProductData } from '../../../stores/slices/productSlice';
import useGetProposalOTPList from '../hooks/useGetProposalOTPList';
import { fetchLobByUserId } from '../../../stores/slices/lobUserSlice';
import { getChannels } from '../../../stores/slices/getChannel';
import { DATE_FORMAT } from '../../../utils/globalConstants';

function ProposalForm() {
  const dispatch = useDispatch();
  const { data: lobData, loading: lobLoading } = useSelector((state) => state.lobUser);
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);
  const { lob } = useSelector((state) => state.lob);
  const { products } = useSelector((state) => state.product);
  const channelType = useSelector((state) => state.channelType.channelType);

  const { fetchProposalOtp } = useGetProposalOTPList();
  const [proposalDataByID, setProposalDataByID] = useState(null);
  const { postData, loading: proposalOTPLoading } = useCreateProposalOTP();
  const { updateProposalData } = useUpdateProposal();

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    trigger,
    watch,
  } = useForm({
    defaultValues: {
      producerCode: null,
      lob: null,
      product: null,
      startDate: null,
      endDate: null,
      groupStatus: 'byChannel',
      channel: null,
    },
  });

  const [OTPValue, setOTPValue] = useState('byChannel');

  useEffect(() => {
    dispatch(
      fetchUser({
        userType: COMMON_WORDS.EXTERNAL,
        searchKey: COMMON_WORDS.USER_TYPE,
        isAll: true,
        status: true,
      })
    );

    dispatch(getChannels());
    dispatch(fetchLobData({ isAll: true, status: true }));
    dispatch(clearProducts());
  }, [dispatch]);

  useEffect(() => {
    async function fetchData() {
      if (id) {
        const data = await fetchProposalOtp({ id });
        setProposalDataByID(data[0]);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (proposalDataByID) {
      const {
        lob,
        proposalOtpException: { startDate, endDate, isChannel },
        channel,
        producer,
        product,
      } = proposalDataByID;

      setOTPValue(isChannel ? 'byChannel' : 'byProducerCode');
      if (isChannel) {
        setValue('channel', channel?.[0]);
      } else {
        setValue('producerCode', producer?.[0]);
      }
      setValue('lob', lob?.[0]);
      setValue('product', product?.[0]);
      setValue('startDate', dayjs(startDate).format(DATE_FORMAT));
      setValue('endDate', dayjs(endDate).format(DATE_FORMAT));
      setValue('groupStatus', isChannel ? 'byChannel' : 'byProducerCode');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [proposalDataByID, OTPValue]);

  const handleChange = (val) => {
    setOTPValue(val);
  };

  const onSubmit = (data) => {
    if (id) {
      const payload = {
        id: id,
        properties: {
          startDate: data?.startDate,
          endDate: data?.endDate,
          status: proposalDataByID?.proposalOtpException?.status || false,
        },
      };

      updateProposalData(payload);
    } else {
      let payload = {};
      if (OTPValue === 'byChannel') {
        payload = {
          channelId: data?.channel?.id,
          productId: data?.product?.id,
          lobId: data?.lob?.id,
          startDate: data?.startDate,
          endDate: data?.endDate,
          isChannel: true,
        };
      } else {
        payload = {
          producerId: data?.producerCode?.id,
          productId: data?.product?.id,
          lobId: data?.lob?.id,
          startDate: data?.startDate,
          endDate: data?.endDate,
          isChannel: false,
        };
      }

      postData(payload);
    }
  };

  const handleReset = () => {
    if (id) {
      setValue('startDate', null);
      setValue('endDate', null);
    } else {
      setValue('channel', null);
      setValue('lob', null);
      setValue('product', null);
      setValue('startDate', null);
      setValue('endDate', null);
      setValue('producerCode', null);
    }
  };

  useEffect(() => {
    if (!id) {
      setValue('producerCode', null);
      setValue('channel', null);
      setValue('lob', null);
      setValue('product', null);
      setValue('startDate', null);
      setValue('endDate', null);
    }
  }, [watch('groupStatus')]);

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent>
          <Box mb={2}>
            <CustomFormHeader
              id={id}
              headerText={FORM_HEADER_TEXT.PROPOSAL_OTP}
              navigateRoute="/proposalotpexception"
              handleReset={handleReset}
            />
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={4}>
              <UserTypeToggle
                menuItem={PROPOSAL_CREATE_BY}
                label="Select By"
                required={true}
                control={control}
                name="groupStatus"
                disabled={id ? true : false}
                onChangeCallback={handleChange}
              />
            </Grid>

            {OTPValue === 'byChannel' ? (
              <Grid item xs={12} sm={6} lg={4}>
                <CustomAutoCompleteWithoutCheckbox
                  name="channel"
                  label="Channel"
                  required={true}
                  options={channelType || []}
                  getOptionLabel={(option) => {
                    return `${option?.txtChannelName}`;
                  }}
                  isOptionEqualToValue={(option, value) => {
                    return option?.id === value?.id;
                  }}
                  control={control}
                  rules={{ required: 'Channel is required' }}
                  error={Boolean(errors.channel)}
                  helperText={errors.channel?.message}
                  placeholder={COMMON_WORDS.SELECT}
                  trigger={trigger}
                  disabled={id ? true : false}
                />
              </Grid>
            ) : (
              <Grid item xs={12} sm={6} lg={4}>
                <CustomAutoCompleteWithoutCheckbox
                  name="producerCode"
                  label="Producer Name"
                  required={true}
                  control={control}
                  rules={{ required: 'Producer Name is required' }}
                  options={user?.data || []}
                  getOptionLabel={(option) => `${option?.firstName} ${option?.lastName}`}
                  isOptionEqualToValue={(option, value) => option?.id === value?.id}
                  placeholder="Select"
                  error={Boolean(errors.producerCode)}
                  helperText={errors.producerCode?.message}
                  trigger={trigger}
                  disabled={id ? true : false}
                  onChangeCallback={(newValue) => {
                    setValue('lob', null);
                    setValue('product', null);
                    dispatch(fetchLobByUserId(newValue.id));
                  }}
                />
              </Grid>
            )}

            <Grid item xs={12} sm={6} lg={4}>
              <CustomAutoCompleteWithoutCheckbox
                name="lob"
                label="LOB"
                control={control}
                rules={{ required: 'LOB is required' }}
                options={watch('groupStatus') === 'byChannel' ? lob?.data || [] : lobData}
                loading={lobLoading}
                getOptionLabel={(option) => `${option?.lob}`}
                isOptionEqualToValue={(option, value) => option?.id === value?.id}
                placeholder="Select"
                required
                error={Boolean(errors.lob)}
                helperText={errors.lob?.message}
                trigger={trigger}
                onChangeCallback={(newValue) => {
                  setValue('product', null);
                  dispatch(fetchAllProductData({ ids: newValue.id, status: true, edge: COMMON_WORDS.HAS_LOB }));
                }}
                disabled={id ? true : false}
              />
            </Grid>

            <Grid item xs={12} sm={6} lg={4}>
              <CustomAutoCompleteWithoutCheckbox
                name="product"
                label="Product"
                control={control}
                rules={{ required: 'Product is required' }}
                options={products?.data || []}
                getOptionLabel={(option) => `${option?.product}`}
                isOptionEqualToValue={(option, value) => option?.id === value?.id}
                placeholder="Select"
                required
                error={Boolean(errors.product)}
                helperText={errors.product?.message}
                trigger={trigger}
                disabled={id ? true : false}
              />
            </Grid>

            <Grid item xs={12} sm={6} lg={4}>
              <DateField
                key="startDate"
                control={control}
                name="startDate"
                labelVisible={true}
                label="Start Date"
                required
                errors={errors}
                classes="w-full"
                setValue={setValue}
                watch={watch}
                trigger={trigger}
              />
            </Grid>

            <Grid item xs={12} sm={6} lg={4}>
              <DateField
                key="endDate"
                control={control}
                name="endDate"
                labelVisible={true}
                label="End Date"
                required
                errors={errors}
                classes="w-full"
                setValue={setValue}
                watch={watch}
                trigger={trigger}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <div className="mt-4">
        <CustomButton type="submit" variant="contained" disabled={proposalOTPLoading}>
          {id ? 'Update' : 'Submit'}
        </CustomButton>
      </div>
    </Box>
  );
}

export default ProposalForm;
