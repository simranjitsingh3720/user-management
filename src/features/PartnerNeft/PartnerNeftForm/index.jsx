import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Card, CardContent, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import CustomButton from '../../../components/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLobData } from '../../../stores/slices/lobSlice';
import { clearProducts, fetchAllProductData } from '../../../stores/slices/productSlice';
import { fetchUser } from '../../../stores/slices/userSlice';
import { COMMON_WORDS, FORM_HEADER_TEXT } from '../../../utils/constants';
import { VERIFICATION_METHOD } from '../utils/constant';
import useSubmit from '../hooks/useSubmit';
import CustomAutoCompleteWithoutCheckbox from '../../../components/CustomAutoCompleteWithoutCheckbox';
import CustomFormHeader from '../../../components/CustomFormHeader';

const PartnerNeftForm = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const { lob, lobLoading } = useSelector((state) => state.lob);
  const { products, productsLoading } = useSelector((state) => state.product);
  const { user, userLoading } = useSelector((state) => state.user);
  const { createPartnerNeft, getPartnerNeft, updatePartnerNeft } = useSubmit();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
    resetField,
  } = useForm({
    defaultValues: {
      lob: null,
      product: null,
      producer: null,
      verificationMethod: null,
    },
  });

  const onSubmit = async (data) => {
    if (params.id) {
      updatePartnerNeft(params.id, data);
    } else {
      createPartnerNeft(data);
    }
  };

  const getPartnerNeftDetails = async (id) => {
    const data = await getPartnerNeft(id);
    if (data) {
      setValue('lob', data.lob);
      setValue('producer', data.producer);

      const index = VERIFICATION_METHOD.findIndex((item) => data.verificationMethod === item.value);
      setValue('verificationMethod', VERIFICATION_METHOD[index]);

      if (data.lob?.id) {
        dispatch(fetchAllProductData({ lobId: data.lob.id, status: true }));
        setValue('product', data.product);
      }
    }
  };

  const handleReset = () => {
    dispatch(clearProducts());
    if (params.id) {
      resetField('producer');
      resetField('verificationMethod');
    } else {
      reset();
    }
  };

  useEffect(() => {
    if (params.id) {
      getPartnerNeftDetails(params.id);
    }
  }, [params.id]);

  useEffect(() => {
    dispatch(clearProducts());
    dispatch(fetchLobData({ isAll: true, status: true }));
    dispatch(
      fetchUser({
        userType: COMMON_WORDS.EXTERNAL,
        searchKey: COMMON_WORDS.USER_TYPE,
        status: true,
        isAll: true,
      })
    );
  }, [dispatch]);

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <CustomFormHeader
              id={params.id}
              navigateRoute="/partner-neft"
              handleReset={handleReset}
              headerText={FORM_HEADER_TEXT.PARTNER_NEFT_FLAG}
            />
            <Grid item xs={12} sm={6} lg={4}>
              <CustomAutoCompleteWithoutCheckbox
                name="lob"
                label="LOB"
                required={true}
                loading={lobLoading}
                options={lob.data || []}
                getOptionLabel={(option) => option?.lob}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                control={control}
                rules={{ required: 'LOB is required' }}
                error={Boolean(errors.lob)}
                helperText={errors.lob?.message}
                disableClearable={true}
                placeholder={COMMON_WORDS.SELECT}
                disabled={params.id ? true : false}
                onChangeCallback={(newValue) => {
                  setValue('product', null);
                  if (newValue && newValue.id) {
                    dispatch(fetchAllProductData({ lobId: newValue.id, status: true }));
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6} lg={4}>
              <CustomAutoCompleteWithoutCheckbox
                name="product"
                label="Product"
                required={true}
                loading={productsLoading}
                options={products.data || []}
                getOptionLabel={(option) => option?.product}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                control={control}
                rules={{ required: 'Product is required' }}
                error={Boolean(errors.product)}
                helperText={errors.product?.message}
                disableClearable={true}
                disabled={params.id ? true : false}
                placeholder={COMMON_WORDS.SELECT}
              />
            </Grid>

            <Grid item xs={12} sm={6} lg={4}>
              <CustomAutoCompleteWithoutCheckbox
                name="producer"
                label="Producer"
                required={true}
                loading={userLoading}
                options={user.data || []}
                getOptionLabel={(option) => {
                  return `${option?.firstName} ${option?.lastName}`;
                }}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                control={control}
                rules={{ required: 'Producer is required' }}
                error={Boolean(errors.producer)}
                helperText={errors.producer?.message}
                disableClearable={true}
                placeholder={COMMON_WORDS.SELECT}
              />
            </Grid>

            <Grid item xs={12} sm={6} lg={4}>
              <CustomAutoCompleteWithoutCheckbox
                name="verificationMethod"
                label="Verification Method"
                required={true}
                options={VERIFICATION_METHOD || []}
                getOptionLabel={(option) => option?.label}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                control={control}
                rules={{ required: 'Verification Method is required' }}
                error={Boolean(errors.verificationMethod)}
                helperText={errors.verificationMethod?.message}
                disableClearable={true}
                placeholder={COMMON_WORDS.SELECT}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <div className="flex items-center mt-4">
        <CustomButton type="submit" variant="contained">
          Submit
        </CustomButton>
      </div>
    </Box>
  );
};

export default PartnerNeftForm;
