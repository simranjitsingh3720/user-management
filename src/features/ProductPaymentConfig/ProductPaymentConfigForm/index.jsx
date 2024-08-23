import { Box, Card, CardContent, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import useGetPayment from '../hooks/useGetPayment';
import useCreatePaymentConfig from '../hooks/useCreatePaymentConfig';
import useGetPaymentConfigByID from '../hooks/useGetPaymentConfigByID';
import useUpdatePaymentConfig from '../hooks/useUpdatePaymentConfig';
import CustomButton from '../../../components/CustomButton';
import CustomFormHeader from '../../../components/CustomFormHeader';
import { COMMON_WORDS, FORM_HEADER_TEXT } from '../../../utils/constants';
import CustomAutoCompleteWithoutCheckbox from '../../../components/CustomAutoCompleteWithoutCheckbox';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLobData } from '../../../stores/slices/lobSlice';
import { clearProducts, fetchAllProductData } from '../../../stores/slices/productSlice';

function ProductPaymentConfigForm() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { lob, lobLoading } = useSelector((state) => state.lob);
  const { products, productsLoading } = useSelector((state) => state.product);

  const { handleSubmit, control, setValue, formState, watch, trigger } = useForm({
    defaultValues: {
      lob: null,
      product: null,
      payment: [],
    },
  });

  const { data: paymentDataByID, fetchData: fetchPaymentDataByID } = useGetPaymentConfigByID();

  useEffect(() => {
    dispatch(clearProducts());
    dispatch(fetchLobData({ isAll: true, status: true }));

    if (id) fetchPaymentDataByID(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { paymentTypeList, paymentTypeLoading } = useGetPayment();

  const { postData, loading: createPaymentLoading } = useCreatePaymentConfig();

  const { UpdateDataFun, updateLoading } = useUpdatePaymentConfig();

  const { errors } = formState;

  useEffect(() => {
    if (paymentDataByID && paymentDataByID?.data) {
      const { lob, product, paymentTypeIds } = paymentDataByID?.data;

      const paymentTypesData = JSON.parse(paymentTypeIds);
      const filterData = paymentTypeList?.data?.filter((item) => paymentTypesData?.includes(item.id));

      setValue('lob', lob || null);
      setValue('product', product || null);
      setValue('payment', filterData || []);
      dispatch(fetchAllProductData({ lobId: lob.id }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentDataByID]);

  const lobWatch = watch('lob');

  useEffect(() => {
    if (!id) setValue('product', null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lobWatch]);

  const onSubmit = (data) => {
    if (id) {
      const payload = {
        id: id,
        properties: {
          status: true,
          productId: data?.product?.id,
          paymentTypeIds: data?.payment.map((item) => item.id),
        },
      };
      UpdateDataFun(payload);
    } else {
      const payload = {
        lobId: data?.lob?.id,
        productId: data?.product?.id,
        paymentTypeIds: data?.payment.map((item) => item.id),
      };
      postData(payload);
    }
  };

  const handleReset = () => {
    if (id) {
      setValue('payment', []);
    } else {
      setValue('lob', null);
      setValue('product', null);
      setValue('payment', []);
      dispatch(clearProducts());
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent>
          <CustomFormHeader
            id={id}
            headerText={FORM_HEADER_TEXT.PAYMENT_CONFIG}
            navigateRoute="/product-payment-config"
            handleReset={handleReset}
          />
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <CustomAutoCompleteWithoutCheckbox
                name="lob"
                label="LOB"
                control={control}
                rules={{ required: 'LOB is required' }}
                options={lob.data || []}
                loading={lobLoading}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => option?.lob || ''}
                required
                error={Boolean(errors.lob)}
                helperText={errors.lob?.message}
                onChangeCallback={(newValue) => {
                  dispatch(fetchAllProductData({ lobId: newValue?.id, status: true }));
                }}
                placeholder={COMMON_WORDS.SELECT}
                trigger={trigger}
                disabled={id ? true : false}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <CustomAutoCompleteWithoutCheckbox
                name="product"
                label="Product"
                control={control}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                rules={{ required: 'Product is required' }}
                options={products?.data || []}
                loading={productsLoading}
                getOptionLabel={(option) => option?.product || ''}
                required
                error={Boolean(errors.product)}
                helperText={errors.product?.message}
                placeholder={COMMON_WORDS.SELECT}
                trigger={trigger}
                disabled={id ? true : false}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <CustomAutoCompleteWithoutCheckbox
                name="payment"
                label="Payment Type"
                control={control}
                loading={paymentTypeLoading}
                rules={{ required: 'Payment Type is required' }}
                options={[{ id: 'selectAll', name: 'Select All' }, ...(paymentTypeList?.data || [])]}
                getOptionLabel={(option) => option?.name || ''}
                required
                error={Boolean(errors.payment)}
                helperText={errors.payment?.message}
                placeholder={COMMON_WORDS.SELECT}
                trigger={trigger}
                multiple
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChangeCallback={(newValue) => {
                  if (newValue.some((option) => option.name === 'Select All')) {
                    const isSelectAllSelected = newValue.find((option) => option.name === 'Select All');
                    if (isSelectAllSelected) {
                      const allOptionsSelected = paymentTypeList?.data || [];
                      setValue('payment', allOptionsSelected);
                    } else {
                      setValue('payment', []);
                    }
                  } else {
                    setValue('payment', newValue);
                  }
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <div className="mt-4">
        <CustomButton
          type="submit"
          variant="contained"
          disabled={updateLoading || createPaymentLoading}
          loading={updateLoading || createPaymentLoading}
        >
          {id ? 'Update' : 'Submit'}
        </CustomButton>
      </div>
    </Box>
  );
}

export default ProductPaymentConfigForm;
