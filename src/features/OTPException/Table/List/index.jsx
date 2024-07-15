import React, { useState } from 'react';
import styles from './styles.module.scss';
import { Dialog, DialogContent, DialogTitle, IconButton, Switch } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import useUpdateOTPException from '../../hooks/useUpdateOTPException';
import CustomButton from '../../../../components/CustomButton';

function List({ item, fetchData: fetchGroupList }) {
  const { channel = [], producer = [] } = item;
  const [changeStatusOpen, setChangeStatusOpen] = useState(false);

  const [checked] = useState(item?.otpException?.status);

  const handleChange = () => {
    setChangeStatusOpen(true);
  };

  const handleChangeStatusClose = () => {
    setChangeStatusOpen(false);
  };

  const { UpdateDataFun, updateLoading } = useUpdateOTPException(setChangeStatusOpen, fetchGroupList);

  const handleClickYes = () => {
    const payload = {
      id: item?.otpException?.id,
      properties: {
        status: !item?.otpException?.status,
      },
    };
    UpdateDataFun(payload);
  };
  return (
    <div className={styles.listHeader}>
      <div className={styles.nameCell}>{item?.otpException?.type || '-'}</div>
      {producer?.length ? (
        <div className={styles.nameCell}>
          {`${item?.producer?.[0]?.firstName} ${item?.producer[0]?.lastName}` || '-'}
        </div>
      ) : (
        <div className={styles.nameCell}>{channel?.[0]?.txtChannelName || '-'} </div>
      )}
      {producer.length ? (
        <div className={styles.nameCell}>{item?.producer?.[0]?.producerCode || '-'}</div>
      ) : (
        <div className={styles.nameCell}>{item?.channel?.[0]?.numChannelCode || '-'}</div>
      )}

      <div className={styles.productStatus}>
        <div>
          <Switch checked={checked} onChange={handleChange} inputProps={{ 'aria-label': 'toggle button' }} />
        </div>
        <div className={styles.styledActiveSelect}>{item?.otpException?.status ? 'Active' : 'Inactive'}</div>
      </div>

      <Dialog onClose={handleChangeStatusClose} aria-labelledby="customized-dialog-title" open={changeStatusOpen}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Change status
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleChangeStatusClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <div className={styles.infoIconStyle}>
            <InfoIcon fontSize="x-large" className={styles.iconStyle} />
          </div>
          <span className={styles.styledText}>Are you sure you want to change the OTP Exception status?</span>

          <div className={styles.SubmitContainer}>
            <CustomButton variant="outlined" onClick={() => setChangeStatusOpen(false)}>
              No
            </CustomButton>
            <CustomButton variant="contained" disabled={updateLoading} onClick={() => handleClickYes()}>
              Yes
            </CustomButton>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default List;
