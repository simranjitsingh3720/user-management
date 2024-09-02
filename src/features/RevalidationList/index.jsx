import { useCallback, useEffect, useState } from 'react';
import ProducerForm from './ProducerForm/index';
import ProducerTable from './ProducerTable/index';
import useRevalidationList from './hooks/useRevalidationList';
import { useDispatch } from 'react-redux';
import { PAGECOUNT } from '../../utils/globalConstants';
import { COMMON_WORDS } from '../../utils/constants';

const RevalidationList = () => {
  const [userId, setUserId] = useState('');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(PAGECOUNT);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [order, setOrder] = useState(COMMON_WORDS.DESC);
  const [orderBy, setOrderBy] = useState(COMMON_WORDS.CREATED_AT);
  const dispatch = useDispatch();

  const { revalidationList, revalidationListLoading, revalidationListFetchData, pageTotalCount } =
    useRevalidationList();

  const loadData = useCallback(() => {
    if (userId && isFormSubmitted) {
      revalidationListFetchData({
        userId: userId,
        page: page,
        pageSize: pageSize,
        order: order,
        orderBy: orderBy,
      });
    }
  }, [userId, page, pageSize, order, orderBy, isFormSubmitted, revalidationListFetchData]);

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
          userId={userId}
          revalidationList={revalidationList}
          revalidationListLoading={revalidationListLoading}
          totalCount={pageTotalCount}
          page={page}
          setPage={setPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          order={order}
          setOrder={setOrder}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
        />
      )}
    </div>
  );
};

export default RevalidationList;
