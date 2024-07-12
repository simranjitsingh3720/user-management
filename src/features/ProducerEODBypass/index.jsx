import React, { useEffect, useState } from 'react';
// import SearchComponenet from './SearchComponenet';
import useGetEODBypass from './hooks/useGetEODBypass';
import styles from './styles.module.scss';
import TableHeader from './Table/TableHeader';
import ListLoader from '../../components/ListLoader';
import Table from './Table';
import NoDataFound from '../../components/NoDataCard';
import { MenuItem, Pagination, Select } from '@mui/material';
import { BUTTON_TEXT, selectRowsData } from '../../utils/globalConstants';
import { useDispatch, useSelector } from 'react-redux';
import { setTableName } from '../../stores/slices/exportSlice';
import { getPlaceHolder } from '../../utils/globalizationFunction';
import { COMMON_WORDS } from '../../utils/constants';
import SearchComponenet from '../../components/SearchComponent';
import { fetchUser } from '../../stores/slices/userSlice';

function getSelectedRowData(count) {
  let selectedRowData = [];

  for (let i = 0; i < selectRowsData.length; i++) {
    if (selectRowsData[i] <= count) {
      selectedRowData.push(selectRowsData[i]);
    }
  }

  return selectedRowData;
}

function ProducerEODBypass() {
  const dispatch = useDispatch();
  const [date, setDate] = useState({ startDate: '', endDate: '' });
  const { user } = useSelector((state) => state.user);
  const [userData, setUserData] = useState();
  const [rowsPage, setRowsPage] = useState(10);
  const [pageChange, setPageChange] = useState(1);

  const { data, loading, fetchData, setSort, sort } = useGetEODBypass(pageChange, rowsPage, date);

  const handlePaginationChange = (event, page) => {
    setPageChange(page);
  };

  const handleRowsChange = (event) => {
    setPageChange(1);
    setRowsPage(event.target.value);
  };

  useEffect(() => {
    dispatch(
      fetchUser({
        userType: COMMON_WORDS.PRODUCER,
        searchKey: COMMON_WORDS.ROLE_NAME,
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(setTableName(data?.data[0]?.producerEodByPass.label));
  }, [dispatch, data]);

  const optionLabelUser = (option) => {
    return option?.firstName ? `${option?.firstName?.toUpperCase()} ${option?.lastName?.toUpperCase()}` : '';
  };

  const renderOptionUserFunction = (props, option) => (
    <li {...props} key={option?.id}>
      {option?.firstName?.toUpperCase()} {''}
      {option?.lastName?.toUpperCase()}
    </li>
  );
  const fetchIdsAndConvert = (inputData) => {
    const ids = inputData.map((item) => item.id);
    return ids.join();
  };
  const handleGo = () => {
    const resultUserString = fetchIdsAndConvert(userData);
    fetchData(resultUserString);
  };

  return (
    <div>
      {/* <SearchComponenet
        fetchData={fetchData}
        setPageChange={setPageChange}
        setQuery={setQuery}
        searched={searched}
        setSearched={setSearched}
        producers={producers}
        setProducers={setProducers}
        date={date}
        setDate={setDate}
      /> */}
      <SearchComponenet
        setDate={setDate}
        dateField
        optionsData={user?.data || []}
        option={userData}
        setOption={setUserData}
        optionLabel={optionLabelUser}
        placeholder={getPlaceHolder(COMMON_WORDS.USER)}
        renderOptionFunction={renderOptionUserFunction}
        handleGo={handleGo}
        showButton={true}
        buttonText={BUTTON_TEXT.PRODUCER_EOD}
        navigateRoute="/producer-eod-bypass-list/form"
        showExportButton
      />
      <div className={styles.tableContainerStyle}>
        <div className={styles.tableStyled}>
          {loading ? (
            <>
              <TableHeader />
              <ListLoader />
            </>
          ) : data?.data && data?.data.length ? (
            <Table ListData={data?.data} loading={loading} fetchData={fetchData} sort={sort} setSort={setSort} />
          ) : (
            <NoDataFound />
          )}
        </div>
        <div className={styles.pageFooter}>
          <div className={styles.rowsPerPage}>
            <p className={styles.totalRecordStyle}>Showing Results:</p>
            <Select
              labelId="rows-per-page"
              id="rows-per-page"
              value={rowsPage}
              onChange={handleRowsChange}
              size="small"
              className={styles.customizeRowsSelect}
            >
              {getSelectedRowData(data?.totalCount).map((item) => (
                <MenuItem value={item} className={styles.styledOptionText}>
                  {item}
                </MenuItem>
              ))}
            </Select>
            <p className={styles.totalRecordStyle}>of {data?.totalCount}</p>
          </div>
          <Pagination
            count={data?.totalPageSize}
            color="primary"
            size="small"
            onChange={handlePaginationChange}
            page={pageChange}
            className={styles.marginFotter}
          />
        </div>
      </div>
    </div>
  );
}

export default ProducerEODBypass;
