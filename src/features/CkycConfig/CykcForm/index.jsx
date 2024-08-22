import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Card, CardContent, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import CustomButton from '../../../components/CustomButton';
import { forWhomEnable, STATUS } from '../utils/constants';
import useGetLobData from '../../../hooks/useGetLobData';
import useGetCkycById from '../hooks/useGetCkycById';
import useHandleCkyc from '../hooks/useHandleCkyc';
import { clearProducts, fetchAllProductData } from '../../../stores/slices/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import UserTypeToggle from '../../../components/CustomRadioButtonGroup';
import CustomFormHeader from '../../../components/CustomFormHeader';
import { COMMON_WORDS, FORM_HEADER_TEXT } from '../../../utils/constants';
import CustomAutoCompleteWithoutCheckbox from '../../../components/CustomAutoCompleteWithoutCheckbox';

const CkycForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { products, productsLoading } = useSelector((state) => state.product);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    watch,
    trigger,
  } = useForm({
    defaultValues: {
      lob: null,
      product: null,
      cykc: 'enable',
      forWhom: null,
    },
  });

  useEffect(() => {
    setValue('forWhom', null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('cykc')]);

  const { UpdateData, postData, loading } = useHandleCkyc();

  const { data: ckycDataById, fetchData: ckycFetchData } = useGetCkycById();

  useEffect(() => {
    if (id) {
      ckycFetchData(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (ckycDataById && ckycDataById?.data) {
      setValue('lob', ckycDataById.data.lob);
      dispatch(fetchAllProductData({ lobId: ckycDataById.data.lob.id }));
      setValue('product', ckycDataById.data.product);
      setValue('cykc', ckycDataById.data.isCKYCApplicable ? 'enable' : 'disable');
      if (ckycDataById.data.isCKYCApplicable) {
        const selectedValue = forWhomEnable.find((item) => item.value === ckycDataById.data.forWhom);
        setValue('forWhom', selectedValue);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ckycDataById]);

  const onSubmit = (data) => {
    if (id) {
      UpdateData(id, data);
    } else {
      postData(data);
    }
  };

  const handleResetButton = () => {
    dispatch(clearProducts());
    if (!id) {
      setValue('lob', null);
      setValue('product', null);
    }
    setValue('cykc', 'enable');
    setValue('forWhom', null);
  };

  const { data: lobListData, loading: lobLoading } = useGetLobData();

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <CustomFormHeader
              id={id}
              headerText={FORM_HEADER_TEXT.CKYC_CONFIG}
              handleReset={handleResetButton}
              navigateRoute="/ckyc-config"
            />
            <Grid item xs={12} sm={6} lg={4}>
              <CustomAutoCompleteWithoutCheckbox
                name="lob"
                label="LOB"
                control={control}
                rules={{ required: 'LOB is required' }}
                options={lobListData?.data || []}
                getOptionLabel={(option) => {
                  return option?.lob || '';
                }}
                className="customize-select"
                loading={lobLoading}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                placeholder={COMMON_WORDS.SELECT}
                required={true}
                error={Boolean(errors.lob)}
                helperText={errors.lob?.message}
                disabled={id ? true : false}
                onChangeCallback={() => {
                  setValue('product', null);
                  dispatch(fetchAllProductData({ lobId: watch('lob')?.id, status: true }));
                }}
                trigger={trigger}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <CustomAutoCompleteWithoutCheckbox
                name="product"
                label="Product"
                control={control}
                rules={{ required: 'Product is required' }}
                options={products?.data || []}
                getOptionLabel={(option) => option?.product || ''}
                loading={productsLoading}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                placeholder={COMMON_WORDS.SELECT}
                required={true}
                error={Boolean(errors.product)}
                helperText={errors.product?.message}
                trigger={trigger}
                disabled={id ? true : false}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <UserTypeToggle
                menuItem={STATUS}
                label="CKYC Applicable"
                required={true}
                control={control}
                name="cykc"
                defaultValue="enable"
              />
            </Grid>

            {watch('cykc') === 'enable' && (
              <Grid item xs={12} sm={6} lg={4}>
                <CustomAutoCompleteWithoutCheckbox
                  name="forWhom"
                  label="For Whom"
                  control={control}
                  rules={{ required: 'For Whom is required' }}
                  options={forWhomEnable}
                  getOptionLabel={(option) => option?.label || ''}
                  isOptionEqualToValue={(option, value) => {
                    return option.value === value.value;
                  }}
                  placeholder={COMMON_WORDS.SELECT}
                  required={true}
                  error={Boolean(errors.forWhom)}
                  helperText={errors.forWhom?.message}
                  trigger={trigger}
                />
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>
      <div className="mt-4">
        <CustomButton type="submit" variant="contained" disabled={loading}>
          {id ? 'Update' : 'Submit'}
        </CustomButton>
      </div>
    </Box>
  );
};

export default CkycForm;
