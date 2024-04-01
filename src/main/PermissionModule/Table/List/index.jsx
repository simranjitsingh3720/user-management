import React, { useState } from "react";
import styles from "./styles.module.css";
import EditLogo from "../../../../assets/EditLogo";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Tooltip,
} from "@mui/material";
import capitalizeFirstLetter from "../../../../globalization/globalizationFunction";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import InfoIcon from "@mui/icons-material/Info";
import useUpdatePrivilege from "../../hooks/useUpdatePrivilege";

function List({ item, fetchData, setLoading }) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const { updateData } = useUpdatePrivilege(setOpen, fetchData);

  const onSubmit = (data) => {
    const privilegeStatus = data?.privilegeStatus === "true";
    updateData(item?.id, privilegeStatus);
    setLoading(true);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <div className={styles.listHeader}>
        <div className={styles.nameCell}>
          {" "}
          {item.permissionName.length > 30 ? (
            <Tooltip title={item.permissionName.toUpperCase()}>
              <span>{`${item.permissionName
                .substring(0, 30)
                .toUpperCase()}...`}</span>
            </Tooltip>
          ) : (
            <span>{item.permissionName.toUpperCase()}</span>
          )}
        </div>
        <div className={styles.privilegeTypeCell}>
          {capitalizeFirstLetter(item?.permissionType)}
        </div>
        {/* <div className={styles.moduleCell}>
        <text>
          Module:<span className={styles.styleSpan}>{item.module || "-"}</span>
        </text>
        <text>
          Sub-Module:
          <span className={styles.styleSpan}>{item.subModule || "-"}</span>
        </text>
      </div> */}
        {/* <div className={styles.apiCell}>{item.api || "-"}</div> */}
        {/* <div className={styles.crudCell}>
        {item?.crud?.join(", ").toUpperCase()}
      </div> */}

        <div className={styles.createdAt}> {item.createdAt}</div>
        <div className={styles.privilegeStatusCell}>
          <div
            className={
              item?.status
                ? styles.styledActiveSelect
                : styles.styledInactiveSelect
            }
          >
            {item?.status ? "Active" : "Inactive"}
          </div>
        </div>
        <div className={styles.actionCell}>
          <Tooltip title="Change status">
            <IconButton
              aria-label="back"
              type="button"
              onClick={() => setOpen(true)}
            >
              <EditLogo color="primary" />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Change status
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.formMainContainer}
          >
            <div className={styles.infoIconStyle}>
              <InfoIcon fontSize="x-large" className={styles.iconStyle} />
            </div>
            <text className={styles.styledText}>
              Are you sure you want to change the privilege status?
            </text>
            <div className={styles.radioStyle}>
              <RadioGroup
                row
                aria-labelledby="privilege-status-row-radio-buttons-group-label"
                name="privilegeStatus"
                defaultValue={item?.status ? true : false}
              >
                <FormControlLabel
                  value={true}
                  control={<Radio size="small" />}
                  label="Active"
                  {...register("privilegeStatus", { required: true })}
                />
                <FormControlLabel
                  value={false}
                  control={<Radio size="small" />}
                  label="Inactive"
                  {...register("privilegeStatus", { required: true })}
                />
              </RadioGroup>
              <div className={styles.styledError}>
                {errors.privilegeStatus && <span>This field is required</span>}
              </div>
            </div>
            <div className={styles.SubmitContainer}>
              <Button
                variant="outlined"
                onClick={() => setOpen(false)}
                size="small"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                className={styles.styledButton}
                size="small"
              >
                Submit
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default List;
