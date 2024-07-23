import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Autocomplete,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Grid,
  Box,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import useGetUserData from '../../BANCALogin/hooks/useGetUserData';
import useCreateProposalOTP from '../hooks/usecreateProposalOTP';
import useGetProposalOTPById from '../hooks/useGetProposalOTPById';
import useUpdateProposal from '../hooks/useUpdateProposal';
import useGetProducerData from '../../BANCALogin/hooks/useGetProducerData';
import useGetLobListData from '../hooks/useGetLobListData';
import 'dayjs/locale/en-gb';
import CustomButton from '../../../components/CustomButton';
import CustomFormHeader from '../../../components/CustomFormHeader';
import { FORM_HEADER_TEXT } from '../../../utils/constants';

function ProposalForm() {
  const { id } = useParams();

  const { handleSubmit, control, setValue, formState } = useForm({
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

  const handleChange = (event) => {
    setOTPValue(event.target.value);
  };

  const { producerList, fetchData: fetchProducerListData } = useGetProducerData();

  const { data: lobList, fetchData: fetchLobData } = useGetLobListData();

  const { userData } = useGetUserData();

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
        };
      } else {
        payload = {
          producerId: data?.producerCode?.id,
          productId: data?.product?.id,
          lobId: data?.lob?.id,
          startDate: data?.startDate,
          endDate: data?.endDate,
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
            <Grid item xs={12}>
              <Typography variant="h6">
                Select <span style={{ color: 'red' }}>*</span>
              </Typography>
              <RadioGroup
                row
                aria-labelledby="insillion-status-row-radio-buttons-group-label"
                name="groupStatus"
                defaultValue="byChannel"
                value={OTPValue}
                onChange={handleChange}
              >
                <FormControlLabel value="byChannel" control={<Radio />} label="By Channel" disabled={id} />
                <FormControlLabel value="byProducerCode" control={<Radio />} label="By Producer Code" disabled={id} />
              </RadioGroup>
            </Grid>

            {OTPValue === 'byChannel' ? (
              <Grid item xs={12} sm={6} lg={4}>
                <Typography variant="h6">
                  Channel <span style={{ color: 'red' }}>*</span>
                </Typography>
                <Controller
                  name="channel"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Autocomplete
                      id="channel"
                      options={[]}
                      disabled={id}
                      getOptionLabel={(option) =>
                        `${option?.firstName?.toUpperCase()} ${option?.lastName?.toUpperCase()}`
                      }
                      renderInput={(params) => <TextField {...params} placeholder="Select" />}
                      onChange={(event, newValue) => field.onChange(newValue)}
                      ListboxProps={{ style: { maxHeight: '200px' } }}
                    />
                  )}
                />
                {errors.channel && <Typography color="error">This field is required</Typography>}
              </Grid>
            ) : (
              <Grid item xs={12} sm={6} lg={4}>
                <Typography variant="h6">
                  Producer Code <span style={{ color: 'red' }}>*</span>
                </Typography>
                <Controller
                  name="producerCode"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Autocomplete
                      id="producerCode"
                      disabled={id}
                      options={userData || []}
                      value={field.value}
                      getOptionLabel={(option) =>
                        `${option?.firstName?.toUpperCase()} ${option?.lastName?.toUpperCase()}`
                      }
                      renderInput={(params) => <TextField {...params} placeholder="Select" />}
                      onChange={(event, newValue) => {
                        field.onChange(newValue);
                        fetchProducerListData(newValue.id);
                        setValue('product', null);
                        setValue('lob', null);
                      }}
                      ListboxProps={{ style: { maxHeight: '200px' } }}
                    />
                  )}
                />
                {errors.producerCode && <Typography color="error">This field is required</Typography>}
              </Grid>
            )}

            <Grid item xs={12} sm={6} lg={4}>
              <Typography variant="h6">
                Product <span style={{ color: 'red' }}>*</span>
              </Typography>
              <Controller
                name="product"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Autocomplete
                    id="product"
                    disabled={id}
                    options={producerList?.data || []}
                    value={field.value}
                    getOptionLabel={(option) => `${option?.product?.toUpperCase()} - ${option?.product_code}`}
                    renderInput={(params) => <TextField {...params} placeholder="Select" />}
                    onChange={(event, newValue) => {
                      field.onChange(newValue);
                      fetchLobData(newValue.id);
                      setValue('lob', null);
                    }}
                    ListboxProps={{ style: { maxHeight: '200px' } }}
                  />
                )}
              />
              {errors.product && <Typography color="error">This field is required</Typography>}
            </Grid>

            <Grid item xs={12} sm={6} lg={4}>
              <Typography variant="h6">
                LOB <span style={{ color: 'red' }}>*</span>
              </Typography>
              <Controller
                name="lob"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Autocomplete
                    id="lob"
                    disabled={id}
                    options={lobList?.data || []}
                    value={field.value}
                    getOptionLabel={(option) => `${option?.lob?.toUpperCase()} - ${option?.lob_value}`}
                    renderInput={(params) => <TextField {...params} placeholder="Select by LOB Name..." />}
                    onChange={(event, newValue) => field.onChange(newValue)}
                    ListboxProps={{ style: { maxHeight: '200px' } }}
                  />
                )}
              />
              {errors.lob && <Typography color="error">This field is required</Typography>}
            </Grid>

            <Grid item xs={12} sm={6} lg={4}>
              <Typography variant="h6">
                Start Date <span style={{ color: 'red' }}>*</span>
              </Typography>
              <Controller
                name="startDate"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                    <DatePicker
                      className='w-full'
                      minDate={dayjs()}
                      value={field.value ? dayjs(field.value, 'DD/MM/YYYY') : null}
                      onChange={(date) => setValue('startDate', dayjs(date).format('DD/MM/YYYY'))}
                      renderInput={(params) => <TextField {...params} size="small" />}
                    />
                  </LocalizationProvider>
                )}
              />
              {errors.startDate && <Typography color="error">This field is required</Typography>}
            </Grid>

            <Grid item xs={12} sm={6} lg={4}>
              <Typography variant="h6">
                End Date <span style={{ color: 'red' }}>*</span>
              </Typography>
              <Controller
                name="endDate"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                    <DatePicker
                      className='w-full'
                      minDate={dayjs()}
                      value={field.value ? dayjs(field.value, 'DD/MM/YYYY') : null}
                      onChange={(date) => setValue('endDate', dayjs(date).format('DD/MM/YYYY'))}
                      renderInput={(params) => <TextField {...params} size="small" />}
                    />
                  </LocalizationProvider>
                )}
              />
              {errors.endDate && <Typography color="error">This field is required</Typography>}
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
