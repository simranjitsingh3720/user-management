import React, { useEffect, useState } from 'react';
import CustomTable from '../../../components/CustomTable';
import { generateTableHeadersChannel, generateTableHeadersProduct } from '../utils/Header';

const ProductListContent = (row) => {
  console.log('row', row);
  const HEADER_COLUMNS = row?.row?.type === 'Channel' ? generateTableHeadersChannel() : generateTableHeadersProduct();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (row && row?.row?.productDetails) {
      const arrayData = row?.row?.productDetails.map((productDetail) => ({
        product: productDetail?.product,
        product_code: productDetail?.product_code,
        isEmployee: productDetail?.isEmployee ? 'yes' : 'no',
      }));

      setData(arrayData);
    }
  }, [row]);

  return <CustomTable columns={HEADER_COLUMNS} rows={data || []} hideFooter />;
};

export default ProductListContent;
