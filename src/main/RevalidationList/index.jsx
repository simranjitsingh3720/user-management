import React from "react";
import ProducerForm from "./ProducerForm/index";
import ProducerTable from "./ProducerTable/index";
import useGetRevalidationList from "./hooks/useGetRevalidationList";

const RevalidationList = () => {
  const {
    revalidationList,
    revalidationListFetchData,
  } = useGetRevalidationList();

  const onFormSubmit = (data) => {
    const userId = data.producer.id;
    revalidationListFetchData(userId);
  };

  return (
    <div className="conatiner">
      <ProducerForm onFormSubmit={onFormSubmit} />
      {revalidationList.length > 0 ? <ProducerTable revalidationList={revalidationList} /> : ""}
    </div>
  );
};

export default RevalidationList;
