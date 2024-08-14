import React, { useEffect, useState } from 'react';
import CustomTable from '../../../components/CustomTable';
import { generateTableHeadersProduct } from '../utils/generateTableHeaders';

const Content = (row) => {
  const HEADER_COLUMNS = generateTableHeadersProduct();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (row && row?.row?.productDetails) {
      const arrayData = row?.row?.productDetails.map((productDetail) => ({
        product: productDetail?.product,
        productCode: productDetail?.productCode,
        isEmployee: productDetail?.isEmployee ? 'yes' : 'no',
      }));

      setData(arrayData);
    }
  }, [row]);

  return <CustomTable columns={HEADER_COLUMNS} rows={data || []} hideFooter />;
};

export default Content;
