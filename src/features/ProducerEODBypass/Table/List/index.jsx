import React from "react";
import moment from "moment";
import styles from "./styles.module.scss";
import { IconButton, Tooltip } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

const calculateUnlockedDays = (startDateString, endDateString) => {
  const startMoment = moment(startDateString, "DD/MM/YYYY");
  const endMoment = moment(endDateString, "DD/MM/YYYY");

  const differenceInDays = endMoment.diff(startMoment, "days");

  return differenceInDays;
};

function List({ item, fetchData: fetchGroupList, canUpdate }) {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/producer-eod-bypass-list/form/${item?.producerEodByPass?.id}`);
  };
  return (
    <div>
      <div className={styles.listHeader}>
        <div className={styles.code}>{item?.producer[0]?.producerCode || "-"}</div>
        <div className={styles.producerName}>
          {`${item?.producer[0]?.firstName} ${item?.producer[0]?.lastName} ` || "-"}
        </div>

        <div className={styles.unlockedDays}>
          {calculateUnlockedDays(item?.producerEodByPass?.startDate, item?.producerEodByPass?.endDate) || "-"}
        </div>
        <div className={styles.startDate}> {item?.producerEodByPass?.startDate || "-"}</div>

        <div className={styles.endDate}> {item?.producerEodByPass?.endDate || "-"}</div>

        {item?.producerEodByPass?.reason.length > 20 ? (
          <Tooltip title={item.reason}>
            <span className={styles.reason}>{`${item?.producerEodByPass?.reason.substring(
              0,
              25
            )}...`}</span>
          </Tooltip>
        ) : (
          <span className={styles.reason}>{item?.producerEodByPass?.reason || ""}</span>
        )}

        <div className={styles.createdAt}> {item?.producerEodByPass?.createdAt || "-"}</div>
        <div className={styles.createdAt}> {item?.producerEodByPass?.updatedAt || "-"}</div>

        <div className={styles.productStatus}>
          <Tooltip title="Edit EOD Lock Bypass">
            <IconButton
              aria-label="back"
              type="button"
              onClick={() => {
                handleEditClick();
              }}
              disabled={!canUpdate}
            >
              <EditIcon color="primary" />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default List;
