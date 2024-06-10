import { useState } from "react";

const useProducerData = () => {
  const [data, setData] = useState([]);

  const updateData = (updatedData) => {
    setData(updatedData);
  };

  return { data, updateData };
};

export default useProducerData;
