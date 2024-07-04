import React, { useCallback, useEffect, useState } from "react";
import ProducerForm from "./ProducerForm/index";
import ProducerTable from "./ProducerTable/index";
import useRevalidationList from "./hooks/useRevalidationList";

const RevalidationList = () => {
  const [userId, setUserId] = useState('');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  
  const {
    revalidationList,
    revalidationListLoading,
    revalidationListFetchData,
    pageTotalCount,
  } = useRevalidationList();

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
  }, [page, pageSize, loadData, isFormSubmitted]);

  const onFormSubmit = (data) => {
    setUserId(data.producer.id);
    setIsFormSubmitted(true);
  };

  return (
    <div className="container">
      <ProducerForm onFormSubmit={onFormSubmit} revalidationList={revalidationList} />
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
