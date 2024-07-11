import React from 'react';
import styles from './styles.module.scss';
import { Divider, Grid, IconButton, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import LeftArrow from '../../../assets/LeftArrow';
import CustomButton from '../../../components/CustomButton';
import UserTypeToggle from '../../../components/CustomRadioButtonGroup';
import InputField from '../../../components/CustomTextfield';
import SelectField from '../../../components/CustomSelect';
import NotificationTable from '../Table';
import { customerArr, userArray } from '../utils/constants';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

function CreateCommunicationRestrictionForm() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      typeOfUser: userArray[0].value,
    },
  });

  const user = watch('typeOfUser');

  const onSubmit = (data) => {
    console.log(data);
  };

  const back = () => {
    navigate('/communication-restrictions');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formMainContainer}>
      <div className={styles.createContainer}>
        {/* <div className={`flex items-center justify-between ${styles.borderBottom}`}>
          <div className={`${styles.formHeaderStyle} flex flex-col`}>
            <div className={styles.subHeader}>
              <IconButton aria-label="back" onClick={back}>
                <LeftArrow />
              </IconButton>
              <span className={styles.headerTextStyle}>Create New Communications Restrictions</span>
            </div>
            <div className={styles.headerPara}>
              Please fill the details for the type of user you select and click 'Submit' to create new communications
              restrictions
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <CustomButton variant="outlined" onClick={back}>
              Cancel
            </CustomButton>
          </div>
        </div> */}

        <Grid item xs={12}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={8}>
              <div className="flex items-center">
                <IconButton
                  aria-label="back"
                  onClick={() => {
                    navigate('/partner-neft');
                  }}
                >
                  <LeftArrow />
                </IconButton>
                <Typography variant="h6" noWrap fontWeight={600} color="#465465">
                  'Update Partner NEFT Flag' 'Create New Partner NEFT Flag'
                </Typography>
              </div>
            </Grid>
            <Grid
              item
              xs={4}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}
            >
              <CustomButton variant="outlined" startIcon={<RestartAltIcon />}>
                Reset
              </CustomButton>
            </Grid>
          </Grid>
          <Divider style={{ margin: '1rem 0' }} />
        </Grid>
        <div className="m-5 grid grid-cols-2 gap-4">
          <UserTypeToggle menuItem={userArray} label="Type Of User" required control={control} name="typeOfUser" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 px-5">
          {user === 'customer' ? (
            customerArr.map((item) => (
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
              />
            ))
          ) : (
            <SelectField
              key="producer"
              control={control}
              name="producer"
              label="Select Producer"
              required
              disabled={false}
              menuItem={userArray}
              errors={errors}
              setValue={setValue}
              classes="w-full"
            />
          )}
        </div>
        <NotificationTable control={control} setValue={setValue} watch={watch} />
        <div className="mt-8 w-32">
          <CustomButton className="w-full" type="submit" variant="contained" onClick={onSubmit}>
            Submit
          </CustomButton>
        </div>
      </div>
    </form>
  );
}

export default CreateCommunicationRestrictionForm;
