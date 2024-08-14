import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../../../components/CustomButton';
import CustomAutoCompleteWithoutCheckbox from '../../../components/CustomAutoCompleteWithoutCheckbox';
import { COMMON_WORDS } from '../../../utils/constants';
import { fetchUser } from '../../../stores/slices/userSlice';
import ExportDropdown from '../../ExportDropdown';
import BulkUpload from '../../../assets/BulkUpload';
import { useNavigate } from 'react-router-dom';
import generateTableHeaders from '../utils/generateTableHeaders';

const ProducerForm = ({ onFormSubmit, revalidationListLoading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tableName } = useSelector((state) => state.export);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      producer: null,
    },
  });

  const onSubmit = (data) => {
    onFormSubmit(data);
  };

  const { user, userLoading } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(
      fetchUser({
        userType: COMMON_WORDS.EXTERNAL,
        searchKey: COMMON_WORDS.USER_TYPE,
        isAll: true,
        status: true,
      })
    );
  }, [dispatch]);

  const handleBulkUpload = () => {
    navigate('bulk-upload');
  };

  const header = generateTableHeaders();

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sm={6} lg={4}>
            <CustomAutoCompleteWithoutCheckbox
              name="producer"
              label="Select Producer"
              required={true}
              loading={userLoading}
              options={user.data || []}
              getOptionLabel={(option) => {
                return `${option?.firstName} ${option?.lastName} - (${option?.producerCode})`;
              }}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              control={control}
              rules={{ required: 'Producer is required' }}
              error={Boolean(errors.producer)}
              helperText={errors.producer?.message}
              placeholder={COMMON_WORDS.SELECT}
            />
          </Grid>

          <Grid item xs={12} sm={6} lg={4} alignItems={Boolean(errors.producer) ? 'center' : 'flex-end'} display="flex">
            <CustomButton
              type="submit"
              variant="contained"
              color="primary"
              className="w-full md:w-auto"
              loading={revalidationListLoading}
            >
              Submit
            </CustomButton>
            <ExportDropdown tableHeader={header} />
            {tableName && <CustomButton variant="outlined" onClick={handleBulkUpload} startIcon={<BulkUpload />} />}
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default ProducerForm;
