import { Autocomplete, Box, Card, CardContent, Grid, IconButton, MenuItem, Select, TextField } from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import LeftArrow from '../../../../assets/LeftArrow';
import { BitlyLinkMandatory, STATUS } from '../../constants';
import CustomButton from '../../../../components/CustomButton';
import CustomFormHeader from '../../../../components/CustomFormHeader';
import { FORM_HEADER_TEXT } from '../../../../utils/constants';
import UserTypeToggle from '../../../../components/CustomRadioButtonGroup';
import { Watch } from '@mui/icons-material';

function ChannelForm() {
  const navigate = useNavigate();

  const { handleSubmit, control, formState, watch } = useForm({
    defaultValues: {
      select: 'byChannel',
    },
  });

  console.log(watch('select'));
  const { errors } = formState;

  const onSubmit = (data) => {};

  return (
    // <div>
    //   {' '}
    //   <form onSubmit={handleSubmit(onSubmit)}>
    //     <div className={styles.createNewUserContainer}>
    //       <div className="p-4">
    //         <CustomFormHeader headerText={FORM_HEADER_TEXT.CONFIG} navigateRoute="/proposal-bitly-config" />
    //       </div>

    //       <UserTypeToggle
    //         menuItem={STATUS}
    //         label="Select"
    //         required={true}
    //         control={control}
    //         name="select"
    //         defaultValue="byChannel"
    //       />
    //       <div className={styles.containerStyle}>
    //         <div className={styles.fieldContainerStyle}>
    //           <span className={styles.labelText}>
    //             Select Channel <span className={styles.styledRequired}>*</span>
    //           </span>
    //           <Controller
    //             name="channel"
    //             control={control}
    //             rules={{ required: 'Channel is required' }}
    //             render={({ field }) => (
    //               <Autocomplete
    //                 id="channel"
    //                 options={[]}
    //                 getOptionLabel={(option) => option?.groupName?.toUpperCase() || ''}
    //                 className={styles.customizeSelect}
    //                 size="small"
    //                 renderInput={(params) => <TextField {...params} placeholder="Select" />}
    //                 onChange={(event, newValue) => {
    //                   field.onChange(newValue);
    //                 }}
    //                 ListboxProps={{
    //                   style: {
    //                     maxHeight: '200px',
    //                   },
    //                 }}
    //               />
    //             )}
    //           />
    //           <div className={styles.styledError}>{errors.channel && <span>{errors.channel.message}</span>}</div>
    //         </div>
    //         <div className={styles.fieldContainerStyle}>
    //           <span className={styles.labelText}>
    //             Bitly Link Mandatory <span className={styles.styledRequired}>*</span>
    //           </span>
    //           <Controller
    //             name="bitlyLinkMandatory"
    //             control={control}
    //             rules={{ required: 'Bitly Link is required' }}
    //             render={({ field }) => (
    //               <Select
    //                 labelId="search-select"
    //                 id="bitlyLinkMandatory"
    //                 onChange={(event, newValue) => {
    //                   field.onChange(newValue);
    //                 }}
    //                 size="small"
    //                 displayEmpty
    //                 className={styles.customizeSelect}
    //                 renderValue={(selected) => {
    //                   if (selected === undefined) {
    //                     return <div className={styles.placeholderStyle}>Select</div>;
    //                   }
    //                   const selectedItem = BitlyLinkMandatory.find((item) => item.value === selected);
    //                   return selectedItem ? selectedItem.label : '';
    //                 }}
    //               >
    //                 {BitlyLinkMandatory.map((item) => (
    //                   <MenuItem value={item.value} className={styles.styledOptionText}>
    //                     {item.label}
    //                   </MenuItem>
    //                 ))}
    //               </Select>
    //             )}
    //           />
    //           <div className={styles.styledError}>
    //             {errors.bitlyLinkMandatory && <span>{errors.bitlyLinkMandatory.message}</span>}
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <CustomButton type="submit" variant="contained">
    //       Submit
    //     </CustomButton>
    //   </form>
    // </div>
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <CustomFormHeader headerText={FORM_HEADER_TEXT.CONFIG} navigateRoute="/proposal-bitly-config" />
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
            <Grid item xs={12} sm={6} lg={4}></Grid>
          </Grid>
        </CardContent>
      </Card>
      <CustomButton type="submit" variant="contained">
        Submit
      </CustomButton>
    </Box>
  );
}

export default ChannelForm;
