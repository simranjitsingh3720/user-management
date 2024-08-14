import { Box, Card, CardContent, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useCreateProduct from '../hooks/useCreateProduct';
import CustomButton from '../../../components/CustomButton';
import InputField from '../../../components/CustomTextfield';
import CustomAutoCompleteWithoutCheckbox from '../../../components/CustomAutoCompleteWithoutCheckbox';
import { COMMON_WORDS, FORM_HEADER_TEXT } from '../../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLobData } from '../../../stores/slices/lobSlice';
import UserTypeToggle from '../../../components/CustomRadioButtonGroup';
import { STATUS } from '../../../utils/globalConstants';
import CustomFormHeader from '../../../components/CustomFormHeader';

function ProductForm() {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    trigger,
  } = useForm({
    defaultValues: {
      lob: null,
    },
  });

  const { postData, loading } = useCreateProduct();
  const { lob, lobLoading } = useSelector((state) => state.lob);

  useEffect(() => {
    dispatch(fetchLobData({ isAll: true, status: true }));
  }, [dispatch]);

  const onSubmit = (formData) => {
    const { product, productCode, productValue, lob, status } = formData;
    const payload = {
      product: product,
      productCode: productCode,
      productValue: productValue,
      lobId: lob.id,
      status: status === COMMON_WORDS.ACTIVE ? true : false,
    };
    postData(payload);
  };

  const FormFields = [
    {
      id: 'product',
      label: 'Product',
      value: 'product',
      required: true,
      validation: {
        required: 'Product is required',
      },
    },
    {
      id: 'productCode',
      label: 'Product Code',
      value: 'productCode',
      required: true,
      validation: {
        required: 'Product Code is required',
      },
    },
    {
      id: 'productValue',
      label: 'Product Value',
      value: 'productValue',
      required: true,
      validation: {
        required: 'Product Value is required',
      },
    },
  ];

  const handleReset = () => {
    reset();
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CustomFormHeader
                headerText={FORM_HEADER_TEXT.PRODUCT}
                navigateRoute="/product"
                handleReset={handleReset}
              />
            </Grid>

            {FormFields.map((item) => (
              <Grid item xs={12} md={6} lg={4} key={item.value}>
                <InputField
                  key={item?.id}
                  id={item?.id}
                  required={item?.required}
                  label={item?.label}
                  validation={item?.validation}
                  control={control}
                  errors={errors}
                  disabled={item?.disabled}
                  classes="w-full"
                  trigger={trigger}
                />
              </Grid>
            ))}

            <Grid item xs={12} md={6} lg={4}>
              <CustomAutoCompleteWithoutCheckbox
                name="lob"
                label="LOB"
                required={true}
                loading={lobLoading}
                options={lob?.data || []}
                getOptionLabel={(option) => option?.lob}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                control={control}
                rules={{ required: 'LOB is required' }}
                error={Boolean(errors.lob)}
                helperText={errors.lob?.message}
                placeholder={COMMON_WORDS.SELECT}
                renderOption={(props, option) => (
                  <li {...props} key={option.id} style={{ textTransform: 'capitalize' }}>
                    {option?.lob}
                  </li>
                )}
                trigger={trigger}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <UserTypeToggle
                menuItem={STATUS}
                label="Status"
                required={true}
                control={control}
                name="status"
                defaultValue="active"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <div className="mt-4">
        <CustomButton type="submit" variant="contained" disabled={loading} loading={loading}>
          Submit
        </CustomButton>
      </div>
    </Box>
  );
}

export default ProductForm;
