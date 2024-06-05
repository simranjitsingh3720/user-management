import React from "react";
import ProducerForm from "./ProducerForm/index";
import ProducerTable from "./ProducerTable/index";
import useRevalidationList from "./hooks/useRevalidationList";

const RevalidationList = () => {
  const {
    revalidationList,
    revalidationListFetchData,
  } = useRevalidationList();

  const onFormSubmit = (data) => {
    const userId = data.producer.id;
    revalidationListFetchData(userId);
  };

  return (
    <div className="container">
      <ProducerForm onFormSubmit={onFormSubmit} />
      {revalidationList.length > 0 ? <ProducerTable revalidationList={revalidationList} /> : ""}
    </div>
  );
};

export default RevalidationList;
