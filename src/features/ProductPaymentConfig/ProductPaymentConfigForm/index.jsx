import { Autocomplete, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import useGetLobListData from '../../ProductModule/hooks/useGetLobListData';
import useGetProductList from '../hooks/useGetProductList';
import useGetPayment from '../hooks/useGetPayment';
import useCreatePaymentConfig from '../hooks/useCreatePaymentConfig';
import useGetPaymentConfigByID from '../hooks/useGetPaymentConfigByID';
import useUpdatePaymentConfig from '../hooks/useUpdatePaymentConfig';
import CustomButton from '../../../components/CustomButton';
import CustomFormHeader from '../../../components/CustomFormHeader';
import { FORM_HEADER_TEXT } from '../../../utils/constants';

function ProductPaymentConfigForm() {
  const { id } = useParams();

  const { handleSubmit, control, setValue, formState, getValues, watch } = useForm({
    defaultValues: {
      lob: null,
      product: null,
      payment: [],
    },
  });

  const { data: paymentDataByID, fetchData: fetchPaymentDataByID } = useGetPaymentConfigByID();

  useEffect(() => {
    if (id) fetchPaymentDataByID(id);
  }, [id]);

  const { data: lobListData } = useGetLobListData();

  const { data, fetchData } = useGetProductList();

  const { data: paymentData } = useGetPayment();

  const { postData, loading: createPaymentLoading } = useCreatePaymentConfig();

  const { UpdateDataFun, updateLoading } = useUpdatePaymentConfig();

  const { errors } = formState;

  useEffect(() => {
    if (paymentDataByID && paymentDataByID?.data) {
      setValue('lob', paymentDataByID?.data.lob || null);
      setValue('product', paymentDataByID?.data.product || null);
      setValue('payment', paymentDataByID?.data.paymentTypes || []);
      fetchData(paymentDataByID?.data.lob?.id);
    }
  }, [paymentDataByID]);

  const lobWatch = watch('lob');

  useEffect(() => {
    if (!id) setValue('product', null);
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
      setValue('product', null);
      setValue('payment', []);
    } else {
      setValue('lob', null);
      setValue('product', null);
      setValue('payment', []);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.createNewUserContainer}>
          <div className="px-4 pt-4">
            <CustomFormHeader
              id={id}
              headerText={FORM_HEADER_TEXT.PAYMENT_CONFIG}
              navigateRoute="/product-payment-config"
              handleReset={handleReset}
            />
          </div>
          <div className={styles.containerStyle}>
            <div className={styles.fieldContainerStyle}>
              <span className={styles.labelText}>
                LOB <span className={styles.styledRequired}>*</span>
              </span>
              <Controller
                name="lob"
                control={control}
                rules={{ required: 'LOB is required' }}
                render={({ field }) => (
                  <Autocomplete
                    id="lob"
                    options={lobListData?.data || []}
                    disabled={id}
                    // value={getValues("lob")}
                    value={field.value}
                    getOptionLabel={(option) => {
                      return option?.lob || '';
                    }}
                    className={styles.customizeSelect}
                    size="small"
                    renderInput={(params) => <TextField {...params} placeholder="Select by LOB Name..." />}
                    onChange={(event, newValue) => {
                      fetchData(newValue?.id);
                      field.onChange(newValue);
                    }}
                    ListboxProps={{
                      style: {
                        maxHeight: '200px',
                      },
                    }}
                  />
                )}
              />
              <div className={styles.styledError}>{errors.lob && <span>{errors.lob.message}</span>} </div>
            </div>
            <div className={styles.fieldContainerStyle}>
              <span className={styles.labelText}>
                Product <span className={styles.styledRequired}>*</span>
              </span>
              <Controller
                name="product"
                control={control}
                rules={{ required: 'Product is required' }}
                render={({ field }) => (
                  <Autocomplete
                    id="product"
                    options={data?.data || []}
                    value={field.value}
                    getOptionLabel={(option) => option?.product || ''}
                    className={styles.customizeSelect}
                    size="small"
                    renderInput={(params) => <TextField {...params} placeholder="Select" />}
                    onChange={(event, newValue) => {
                      field.onChange(newValue);
                    }}
                    ListboxProps={{
                      style: {
                        maxHeight: '200px',
                      },
                    }}
                  />
                )}
              />
              <div className={styles.styledError}>{errors.product && <span>{errors.product.message}</span>} </div>
            </div>
            <div className={styles.fieldContainerStyle}>
              <span className={styles.labelText}>
                Payment Type <span className={styles.styledRequired}>*</span>
              </span>
              <Controller
                name="payment"
                control={control}
                rules={{ required: 'Payment is required' }}
                render={({ field }) => (
                  <Autocomplete
                    id="payment"
                    value={getValues('payment')}
                    options={[{ name: 'Select All' }, ...(paymentData?.data || [])]}
                    getOptionLabel={(option) => {
                      return option?.name;
                    }}
                    disableCloseOnSelect
                    multiple
                    className={styles.customizeSelect}
                    size="small"
                    renderInput={(params) => <TextField {...params} placeholder="Select" />}
                    // onChange={(event, newValue) => {
                    //   field.onChange(newValue);
                    // }}
                    onChange={(event, newValue) => {
                      if (newValue.some((option) => option.name === 'Select All')) {
                        const isSelectAllSelected = newValue.find((option) => option.name === 'Select All');
                        if (isSelectAllSelected) {
                          const allOptionsSelected = paymentData?.data || [];
                          field.onChange(allOptionsSelected);
                        } else {
                          field.onChange([]);
                        }
                      } else {
                        field.onChange(newValue);
                      }
                    }}
                    ListboxProps={{
                      style: {
                        maxHeight: '200px',
                      },
                    }}
                  />
                )}
              />
              <div className={styles.styledError}>{errors.payment && <span>{errors.payment.message}</span>} </div>
            </div>
          </div>
        </div>
        <CustomButton type="submit" variant="contained" disabled={updateLoading || createPaymentLoading}>
          {id ? 'Update' : 'Submit'}
        </CustomButton>
      </form>
    </div>
  );
}

export default ProductPaymentConfigForm;
