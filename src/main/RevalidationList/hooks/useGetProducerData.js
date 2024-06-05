import { useState, useEffect } from "react";

const useGetProducerData = () => {
  const [producerData, setProducerData] = useState(null);

  const getProducerData = async () => {
    // Call API if needed
    setProducerData([
      {
        label: "pushpender",
      },
      {
        label: "pushpender1",
      },
      {
        label: "pushpender2",
      },
    ]);
  };

  useEffect(() => {
    getProducerData();
  }, []);

  return { producerData };
};

export default useGetProducerData;
