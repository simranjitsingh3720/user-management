import { Card, CardContent, Box, Grid, Switch, FormLabel, FormControlLabel } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useGetProducerData from '../../BANCALogin/hooks/useGetProducerData';
import useCreateEmployeeConfig from '../hooks/useCreateEmployeeConfig';
import useGetEmployeeByProducer from '../hooks/useGetEmployeeById';
import useUpdateEmployeeConfig from '../hooks/useUpdateEmployeeConfig';
import CustomButton from '../../../components/CustomButton';
import CustomAutoCompleteWithoutCheckbox from '../../../components/CustomAutoCompleteWithoutCheckbox';
import { COMMON_WORDS, FORM_HEADER_TEXT } from '../../../utils/constants';
import ListLoader from '../../../components/ListLoader';
import CustomFormHeader from '../../../components/CustomFormHeader';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../../stores/slices/userSlice';

function EmployeeConfigurationForm({ fetchData: listFetchFun }) {
  const params = useParams();
  const { id } = params;
  const dispatch = useDispatch();
  const { producerList, fetchData, loading: producerLoading } = useGetProducerData();
  const [dataList, setDataList] = useState([]);
  const { data: EmployeeProducerData, fetchData: fetchDataByProducer } = useGetEmployeeByProducer();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(
      fetchUser({ userType: COMMON_WORDS.EXTERNAL, searchKey: COMMON_WORDS.USER_TYPE, isAll: true, status: true })
    );
  }, [dispatch]);

  useEffect(() => {
    if (EmployeeProducerData && EmployeeProducerData?.data) {
      setDataList(
        (EmployeeProducerData?.data[0]?.products || []).map((item) => ({
          name: item.product,
          productId: item.id,
          isEmployee: item?.isEmployee || false,
        }))
      );
    }
  }, [EmployeeProducerData]);

  useEffect(() => {
    if (producerList && producerList?.data && !EmployeeProducerData?.data?.length)
      setDataList(
        (producerList?.data || []).map((item) => ({
          name: item.product,
          productId: item.id,
          isEmployee: false,
        }))
      );
  }, [producerList, EmployeeProducerData]);

  const { handleSubmit, control, setValue, formState, trigger } = useForm({
    defaultValues: {
      producer: null,
    },
  });

  const { errors } = formState;
  const { postData, loading } = useCreateEmployeeConfig(listFetchFun);
  const { UpdateDataFun, loading: updateLoading } = useUpdateEmployeeConfig(listFetchFun);

  const onSubmit = (data) => {
    if (EmployeeProducerData && EmployeeProducerData?.data?.length) {
      const field = dataList.map((item) => ({
        productId: item.productId,
        isEmployee: item.isEmployee,
      }));
      const payload = {
        id: EmployeeProducerData.data[0].employeeFlagConfig.id,
        properties: {
          fields: field,
          status: EmployeeProducerData.data[0].employeeFlagConfig.status,
        },
      };
      UpdateDataFun(payload);
    } else {
      const field = dataList.map((item) => ({
        productId: item.productId,
        isEmployee: item.isEmployee,
      }));
      const payload = {
        producerId: data.producer.id,
        fields: field,
      };
      postData(payload);
    }
  };

  const handleResetButton = () => {
    setDataList([]);
    setValue('producer', null);
  };

  const handleChange = (productId) => {
    const newDataList = [...dataList];
    const newUpdatedDataList = newDataList.map((item) => {
      if (item.productId === productId) {
        return {
          ...item,
          isEmployee: !item.isEmployee,
        };
      }
      return item;
    });
    setDataList(newUpdatedDataList);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <CustomFormHeader
              id={id}
              headerText={FORM_HEADER_TEXT.EMPLOYEE_FLAG}
              handleReset={handleResetButton}
              navigateRoute="/employee-flag-config"
            />
            <Grid item xs={12} md={6} lg={4}>
              <CustomAutoCompleteWithoutCheckbox
                name="producer"
                label="Select Producer"
                required={true}
                options={user.data || []}
                getOptionLabel={(option) => {
                  return `${option?.firstName} ${option?.lastName} - ${option?.producerCode}`;
                }}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                control={control}
                rules={{ required: 'Producer is required' }}
                error={Boolean(errors.producer)}
                helperText={errors.producer?.message}
                placeholder={COMMON_WORDS.SELECT}
                trigger={trigger}
                onChangeCallback={(newValue) => {
                  fetchDataByProducer(newValue?.id);
                  fetchData(newValue?.id);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              {producerLoading ? (
                <ListLoader rows={3} column={3} />
              ) : (
                producerList?.data?.length && (
                  <Grid container spacing={2}>
                    {dataList.map((item, index) => (
                      <Grid item xs={12} md={6} lg={4} key={index}>
                        <FormLabel component="legend" sx={{ textTransform: 'capitalize' }}>
                          {item.name}
                        </FormLabel>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={item.isEmployee}
                              onChange={() => handleChange(item.productId)}
                              inputProps={{ 'aria-label': 'toggle button' }}
                              label={item.isEmployee ? 'Yes' : 'No'}
                            />
                          }
                          label={item.isEmployee ? 'Yes' : 'No'}
                        />
                      </Grid>
                    ))}
                  </Grid>
                )
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <div className="mt-4">
        <CustomButton type="submit" variant="contained" disabled={loading || updateLoading}>
          Submit
        </CustomButton>
      </div>
    </Box>
  );
}

export default EmployeeConfigurationForm;
