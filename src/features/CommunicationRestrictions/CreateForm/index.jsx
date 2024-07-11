import React from 'react';
import styles from './styles.module.scss';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import CustomButton from '../../../components/CustomButton';
import UserTypeToggle from '../../../components/CustomRadioButtonGroup';
import InputField from '../../../components/CustomTextfield';
import SelectField from '../../../components/CustomSelect';
import NotificationTable from '../Table';
import { customerArr, userArray } from '../utils/constants';
import CustomFormHeader from '../../../components/CustomFormHeader';
import { FORM_HEADER_TEXT } from '../../../utils/constants';

function CreateCommunicationRestrictionForm() {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

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
        <CustomFormHeader
          id={id}
          navigateRoute="/communication-restrictions"
          headerText={FORM_HEADER_TEXT.COMMUNICATION_RESTRICTION}
        />
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
