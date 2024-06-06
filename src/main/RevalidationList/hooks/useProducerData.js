import { useState } from 'react';

const useProducerData = () => {
  const [data, setData] = useState([]);

  const updateData = (updatedData) => {
    setData(updatedData);
    console.log('Data updated:', updatedData);
  };

  return { data, updateData };
};

export default useProducerData;
