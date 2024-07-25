import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Grid,
  Box,
  Card,
  CardContent,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import useCreateProposalOTP from '../hooks/usecreateProposalOTP';
import useGetProposalOTPById from '../hooks/useGetProposalOTPById';
import useUpdateProposal from '../hooks/useUpdateProposal';
import useGetProducerData from '../../BANCALogin/hooks/useGetProducerData';
import useGetLobListData from '../hooks/useGetLobListData';
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

function ProposalForm() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const channelType = useSelector((state) => state.channelType.channelType);

  const { handleSubmit, control, setValue, formState, trigger, watch } = useForm({
    defaultValues: {
      producerCode: null,
      lob: null,
      product: null,
      startDate: null,
      endDate: null,
    },
  });

  const [OTPValue, setOTPValue] = useState('byProducerCode');

  const { errors } = formState;

  const { data: proposalDataByID, fetchData: fetchDataProposalById } = useGetProposalOTPById();

  useEffect(() => {
    if (id) fetchDataProposalById(id);
  }, [id]);

  useEffect(() => {
    if (proposalDataByID && proposalDataByID?.data) {
      setValue('producerCode', proposalDataByID?.data?.producer);
      setValue('lob', proposalDataByID?.data?.lob);
      setValue('product', proposalDataByID?.data?.product);
      setValue('startDate', dayjs(proposalDataByID?.data?.startDate, 'DD/MM/YYYY').format('DD/MM/YYYY'));
      setValue('endDate', dayjs(proposalDataByID?.data?.endDate, 'DD/MM/YYYY').format('DD/MM/YYYY'));
      setOTPValue(proposalDataByID?.data?.producer ? 'byProducerCode' : 'byChannel');
    }
  }, [proposalDataByID]);

  const handleChange = (val) => {
    setOTPValue(val);
  };

  const { producerList, fetchData: fetchProducerListData } = useGetProducerData();

  const { data: lobList, fetchData: fetchLobData } = useGetLobListData();

  // Get User Data
  useEffect(() => {
    dispatch(
      fetchUser({
        userType: COMMON_WORDS.PRODUCER,
        searchKey: COMMON_WORDS.ROLE_NAME,
        isAll: true,
        status: true,
      })
    );

    dispatch(getChannels());
  }, [dispatch]);

  const { postData, loading: proposalOTPLoading } = useCreateProposalOTP();

  const { UpdateDataFun } = useUpdateProposal();

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
                defaultValue="byProducerCode"
                disabled={id}
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
                    return `${option?.label?.toUpperCase() || ''} - ${option?.numChannelCode || ''}`;
                  }}
                  control={control}
                  rules={{ required: 'Channel is required' }}
                  error={Boolean(errors.channel)}
                  helperText={errors.channel?.message}
                  disableClearable={true}
                  placeholder={COMMON_WORDS.SELECT}
                  renderOption={(props, option) => (
                    <li {...props} key={option.id}>
                      {option?.label?.toUpperCase()} - {option?.numChannelCode}
                    </li>
                  )}
                  trigger={trigger}
                  onChangeCallback={(newValue) => {
                    // to do
                  }}
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
                  getOptionLabel={(option) => `${option?.firstName?.toUpperCase()} ${option?.lastName?.toUpperCase()}`}
                  placeholder="Select"
                  error={Boolean(errors.producerCode)}
                  helperText={errors.producerCode?.message}
                  disableClearable={true}
                  onChangeCallback={(newValue) => {
                    fetchProducerListData(newValue.id);
                    setValue('product', null);
                    setValue('lob', null);
                  }}
                  trigger={trigger}
                />
              </Grid>
            )}

            <Grid item xs={12} sm={6} lg={4}>
              <CustomAutoCompleteWithoutCheckbox
                name="product"
                label="Product"
                control={control}
                rules={{ required: 'Product is required' }}
                options={producerList?.data || []}
                getOptionLabel={(option) => `${option?.product?.toUpperCase()} - ${option?.productCode}`}
                placeholder="Select"
                required
                error={Boolean(errors.product)}
                helperText={errors.product?.message}
                disableClearable={true}
                onChangeCallback={(newValue) => {
                  fetchLobData(newValue.id);
                  setValue('lob', null);
                }}
                trigger={trigger}
              />
            </Grid>

            <Grid item xs={12} sm={6} lg={4}>
              <CustomAutoCompleteWithoutCheckbox
                name="lob"
                label="LOB"
                control={control}
                rules={{ required: 'LOB is required' }}
                options={lobList?.data || []}
                getOptionLabel={(option) => `${option?.lob?.toUpperCase()} - ${option?.lobCode}`}
                placeholder="Select"
                required
                error={Boolean(errors.lob)}
                helperText={errors.lob?.message}
                disableClearable={true}
                trigger={trigger}
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
