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
import { getChannels } from '../../../Redux/getChannel';
import DateField from '../../../components/CustomDateInput';
import { fetchLobData } from '../../../stores/slices/lobSlice';
import { clearProducts, fetchAllProductData } from '../../../stores/slices/productSlice';
import useGetProposalOTPList from '../hooks/useGetProposalOTPList';

function ProposalForm() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);
  const { lob } = useSelector((state) => state.lob);
  const { products } = useSelector((state) => state.product);
  const channelType = useSelector((state) => state.channelType.channelType);

  const { fetchProposalOtp } = useGetProposalOTPList();
  const [proposalDataByID, setProposalDataByID] = useState(null);
  const { postData, loading: proposalOTPLoading } = useCreateProposalOTP();
  const { UpdateDataFun } = useUpdateProposal();

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
      groupStatus: 'byProducerCode',
      channel: null,
    },
  });

  const [OTPValue, setOTPValue] = useState('byChannel');

  useEffect(() => {
    // Get User Data
    dispatch(
      fetchUser({
        userType: COMMON_WORDS.PRODUCER,
        searchKey: COMMON_WORDS.ROLE_NAME,
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
  }, [id]);

  useEffect(() => {
    if (proposalDataByID) {
      const {
        lob,
        proposalOtpException: {startDate, endDate, isChannel },
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
      setValue('startDate', dayjs(startDate, 'DD/MM/YYYY').format('DD/MM/YYYY'));
      setValue('endDate', dayjs(endDate, 'DD/MM/YYYY').format('DD/MM/YYYY'));
      setValue('groupStatus', isChannel ? 'byChannel' : 'byProducerCode');
    }
  }, [proposalDataByID]);

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
          status: proposalDataByID.data.status,
        },
      };

      UpdateDataFun(payload);
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

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent>
          <Box mb={2}>
            <CustomFormHeader
              id={id}
              headerText={FORM_HEADER_TEXT.PROPOSAL_OTP}
              navigateRoute="/proposalotpexception"
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
                  disableClearable={true}
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
                  control={control}
                  rules={{ required: 'Producer Name is required' }}
                  options={user?.data || []}
                  getOptionLabel={(option) => `${option?.firstName} ${option?.lastName}`}
                  isOptionEqualToValue={(option, value) => option?.id === value?.id}
                  placeholder="Select"
                  error={Boolean(errors.producerCode)}
                  helperText={errors.producerCode?.message}
                  disableClearable={true}
                  trigger={trigger}
                  disabled={id ? true : false}
                />
              </Grid>
            )}

            <Grid item xs={12} sm={6} lg={4}>
              <CustomAutoCompleteWithoutCheckbox
                name="lob"
                label="LOB"
                control={control}
                rules={{ required: 'LOB is required' }}
                options={lob?.data || []}
                getOptionLabel={(option) => `${option?.lob}`}
                isOptionEqualToValue={(option, value) => option?.id === value?.id}
                placeholder="Select"
                required
                error={Boolean(errors.lob)}
                helperText={errors.lob?.message}
                disableClearable={true}
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
                disableClearable={true}
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
