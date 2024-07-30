import { Box, Card, CardContent, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BitlyLinkMandatory, STATUS } from '../../utils/constants';
import CustomButton from '../../../../components/CustomButton';
import CustomFormHeader from '../../../../components/CustomFormHeader';
import { COMMON_WORDS, FORM_HEADER_TEXT } from '../../../../utils/constants';
import UserTypeToggle from '../../../../components/CustomRadioButtonGroup';
import CustomAutoCompleteWithoutCheckbox from '../../../../components/CustomAutoCompleteWithoutCheckbox';
import { useDispatch, useSelector } from 'react-redux';
import { getChannels } from '../../../../Redux/getChannel';
import { fetchUser } from '../../../../stores/slices/userSlice';
import Loader from '../../ProducerCode/Loader';
import TableList from '../../ProducerCode/TableList';
import useCreateBitlyLink from '../../hooks/useCreateBitlyLink';
import useGetProductByProducerId from '../../hooks/useGetProductByProducerId';

function ChannelForm() {
  const dispatch = useDispatch();
  const { user, userLoading } = useSelector((state) => state.user);
  const channelType = useSelector((state) => state.channelType.channelType);
  const [dataList, setDataList] = useState();

  const { producerList, fetchData, loading: producerLoading } = useGetProductByProducerId(setDataList);
  const { postData, loading: createLoading } = useCreateBitlyLink();

  useEffect(() => {
    if (producerList && producerList?.data)
      setDataList(
        (producerList?.data || []).map((item) => ({
          name: item.product,
          productId: item.id,
          isMandatory: false,
        }))
      );
  }, [producerList]);

  const { handleSubmit, control, formState, watch, setValue } = useForm({
    defaultValues: {
      select: 'byChannel',
    },
  });

  useEffect(() => {
    dispatch(
      fetchUser({
        userType: COMMON_WORDS.PRODUCER,
        searchKey: COMMON_WORDS.ROLE_NAME,
        isAll: true,
      })
    );
    dispatch(getChannels());
  }, [dispatch]);

  const { errors } = formState;

  const onSubmit = (data) => {
    if (watch('select') === 'byProducer') {
      const field = (dataList || []).map((item) => ({
        productId: item.productId,
        isMandatory: item.isMandatory,
      }));

      const payload = {
        producerId: data.producerCode.id,
        fields: field,
      };
      postData(payload);
    } else {
      const payload = {
        channelId: data.channel.id,
        fields: {
          isMandatory: data.bitlyLinkMandatory.value === 'yes' ? true : false,
        },
      };
      postData(payload);
    }
  };

  const handleReset = () => {
    setValue('channel', null);
    setValue('bitlyLinkMandatory', null);
    setValue('producerCode', null);
    setDataList([]);
  };

  useEffect(() => {
    setValue('channel', null);
    setValue('bitlyLinkMandatory', null);
    setValue('producerCode', null);
    setDataList([]);
  }, [watch('select')]);

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <CustomFormHeader
              headerText={FORM_HEADER_TEXT.CONFIG}
              navigateRoute="/proposal-bitly-config"
              handleReset={handleReset}
            />
            <Grid item xs={12} sm={6} lg={6}>
              <UserTypeToggle
                menuItem={STATUS}
                label="Select"
                required={true}
                control={control}
                name="select"
                defaultValue="byChannel"
              />
            </Grid>
            {watch('select') === 'byChannel' ? (
              <Grid item xs={12}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                  <Grid item xs={12} sm={6} lg={6}>
                    <CustomAutoCompleteWithoutCheckbox
                      name="channel"
                      label="Channel"
                      required
                      options={channelType || []}
                      getOptionLabel={(option) =>
                        `${option?.label?.toUpperCase() || ''} - ${option?.numChannelCode || ''}`
                      }
                      control={control}
                      rules={{ required: 'Channel is required' }}
                      error={Boolean(errors.channel)}
                      helperText={errors.channel?.message}
                      disableClearable
                      placeholder={COMMON_WORDS.SELECT}
                      renderOption={(props, option) => (
                        <li {...props} key={option.id}>
                          {option?.label?.toUpperCase()} - {option?.numChannelCode}
                        </li>
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} lg={6}>
                    <CustomAutoCompleteWithoutCheckbox
                      name="bitlyLinkMandatory"
                      label="Bitly Link Mandatory"
                      required
                      options={BitlyLinkMandatory || []}
                      getOptionLabel={(option) => option?.label?.toUpperCase() || ''}
                      control={control}
                      rules={{ required: 'Bitly Link is required' }}
                      error={Boolean(errors.bitlyLinkMandatory)}
                      helperText={errors.bitlyLinkMandatory?.message}
                      disableClearable
                      placeholder={COMMON_WORDS.SELECT}
                      renderOption={(props, option) => (
                        <li {...props} key={option.id}>
                          {option?.label?.toUpperCase()}
                        </li>
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              <>
                <Grid item xs={12}>
                  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12} sm={6} lg={6}>
                      <CustomAutoCompleteWithoutCheckbox
                        name="producerCode"
                        label="Producer Code"
                        required
                        loading={userLoading}
                        options={user.data || []}
                        getOptionLabel={(option) =>
                          `${option?.firstName?.toUpperCase() || ''} ${option?.lastName?.toUpperCase() || ''} - ${
                            option.producerCode || ''
                          }`
                        }
                        control={control}
                        rules={{ required: 'Producer is required' }}
                        error={Boolean(errors.producerCode)}
                        helperText={errors.producerCode?.message}
                        disableClearable
                        placeholder={COMMON_WORDS.SELECT}
                        renderOption={(props, option) => (
                          <li {...props} key={option.id}>
                            {option?.firstName?.toUpperCase() || ''} {option?.lastName?.toUpperCase() || ''} -{' '}
                            {option?.producerCode || ''}
                          </li>
                        )}
                        onChangeCallback={(newValue) => {
                          fetchData(newValue?.id);
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  {producerLoading ? (
                    <Loader />
                  ) : (
                    dataList?.length > 0 && <TableList dataList={dataList} setDataList={setDataList} />
                  )}
                </Grid>
              </>
            )}
          </Grid>
        </CardContent>
      </Card>
      <CustomButton type="submit" variant="contained" disabled={createLoading} className="mt-4">
        Submit
      </CustomButton>
    </Box>
  );
}

export default ChannelForm;
