import React, { useCallback, useEffect, useState } from 'react';
import ProducerForm from './ProducerForm/index';
import ProducerTable from './ProducerTable/index';
import useRevalidationList from './hooks/useRevalidationList';
import { useDispatch } from 'react-redux';
import { PAGECOUNT } from '../../utils/globalConstants';

const RevalidationList = () => {
  const [userId, setUserId] = useState('');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(PAGECOUNT);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const dispatch = useDispatch();

  const { revalidationList, revalidationListLoading, revalidationListFetchData, pageTotalCount } =
    useRevalidationList();

  const loadData = useCallback(() => {
    if (userId && isFormSubmitted) {
      revalidationListFetchData({
        userId: userId,
        page: page,
        pageSize: pageSize,
      });
    }
  }, [userId, page, pageSize, isFormSubmitted, revalidationListFetchData]);

  useEffect(() => {
    if (isFormSubmitted) {
      loadData();
    }
  }, [page, pageSize, loadData, isFormSubmitted, dispatch]);

  const onFormSubmit = (data) => {
    setUserId(data.producer.id);
    setIsFormSubmitted(true);
  };


  return (
    <div className="container">
      <ProducerForm onFormSubmit={onFormSubmit} revalidationList={revalidationList} revalidationListLoading={revalidationListLoading} />
      {revalidationList.length > 0 && (
        <ProducerTable
          revalidationList={revalidationList}
          revalidationListLoading={revalidationListLoading}
          totalCount={pageTotalCount}
          page={page}
          setPage={setPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
      )}
    </div>
  );
};

export default RevalidationList;
