import React, { useEffect, useState } from 'react';
import CustomTable from '../../../components/CustomTable';
import { generateTableHeadersProduct } from '../utils/Header';

const ProductListContent = (row) => {
  const HEADER_COLUMNS = generateTableHeadersProduct();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (row && row?.row?.products) {
      const arrayData = row?.row?.products.map((productDetail) => ({
        product: productDetail?.product,
        product_code: productDetail?.productCode,
        bitlyLinkMandatory: productDetail?.isMandatory ? 'yes' : 'no',
      }));

      setData(arrayData);
    }
  }, [row]);

  return <CustomTable columns={HEADER_COLUMNS} rows={data || []} hideFooter />;
};

export default ProductListContent;
