import { useState, useEffect } from 'react';

const initialData = [
  {
    id: 1,
    userName: "John",
    mobileNumber: 9456509722,
    emailId: "pushpender.singh@tataaig.com",
    active: true,
  },
  {
    id: 2,
    userName: "Jane",
    mobileNumber: 9456509722,
    emailId: "pushpender.singh@tataaig.com",
    active: true,
  },
  {
    id: 3,
    userName: "Alex",
    mobileNumber: 9456509722,
    emailId: "pushpender.singh@tataaig.com",
    active: true,
  },
  {
    id: 4,
    userName: "John",
    mobileNumber: 9456509722,
    emailId: "pushpender.singh@tataaig.com",
    active: true,
  },
  {
    id: 5,
    userName: "Jane",
    mobileNumber: 9456509722,
    emailId: "pushpender.singh@tataaig.com",
    active: true,
  },
  {
    id: 6,
    userName: "Alex",
    mobileNumber: 9456509722,
    emailId: "pushpender.singh@tataaig.com",
    active: true,
  },
  {
    id: 7,
    userName: "John",
    mobileNumber: 9456509722,
    emailId: "pushpender.singh@tataaig.com",
    active: true,
  },
  {
    id: 8,
    userName: "Jane",
    mobileNumber: 9456509722,
    emailId: "pushpender.singh@tataaig.com",
    active: true,
  },
  {
    id: 9,
    userName: "Alex",
    mobileNumber: 9456509722,
    emailId: "pushpender.singh@tataaig.com",
    active: true,
  },
  {
    id: 10,
    userName: "John",
    mobileNumber: 9456509722,
    emailId: "pushpender.singh@tataaig.com",
    active: true,
  },
  {
    id: 11,
    userName: "Jane",
    mobileNumber: 9456509722,
    emailId: "pushpender.singh@tataaig.com",
    active: true,
  },
  {
    id: 12,
    userName: "Alex",
    mobileNumber: 9456509722,
    emailId: "pushpender.singh@tataaig.com",
    active: true,
  },
];

const useProducerData = () => {
  const [data, setData] = useState(initialData);

  // Simulate fetching data from an API
  useEffect(() => {
    // Fetch data logic here
    // For example, using fetch or axios to get data from an API
    // Assuming the fetched data structure is the same as initialData
  }, []);

  const updateData = (updatedData) => {
    setData(updatedData);
    console.log('Data updated:', updatedData);

    // Simulate an API call to update data
    // For example, using fetch or axios to send updatedData to an API
  };

  return { data, updateData };
};

export default useProducerData;
