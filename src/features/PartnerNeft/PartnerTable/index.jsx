import React from "react";
import DynamicTable from "../DynamicTable";
import { useNavigate } from "react-router-dom";
import { TABLE_COLUMNS } from "../utils/constant";

const data = [
  { id: 1, lob: 1, product: "John Doe", producerCode: 28, producerName: "Producer Name", verificationMethod: "method"},
  { id: 2, lob: 2, product: "Jane Smith", producerCode: 34, producerName: "Producer Name", verificationMethod: "method"},
  { id: 3, lob: 3, product: "Sam Johnson", producerCode: 45, producerName: "Producer Name", verificationMethod: "method"},
  { id: 4, lob: 4, product: "Chris Lee", producerCode: 23, producerName: "Producer Name", verificationMethod: "method"},
  { id: 5, lob: 5, product: "Patricia Brown", producerCode: 52, producerName: "Producer Name", verificationMethod: "method"},
  { id: 6, lob: 6, product: "Michael White", producerCode: 30, producerName: "Producer Name", verificationMethod: "method"},
  { id: 7, lob: 7, product: "Linda Green", producerCode: 41, producerName: "Producer Name", verificationMethod: "method"},
  { id: 8, lob: 8, product: "Davlob Black", producerCode: 35, producerName: "Producer Name", verificationMethod: "method"},
  { id: 9, lob: 9, product: "Susan Gray", producerCode: 29, producerName: "Producer Name", verificationMethod: "method"},
  { id: 10,lob: 10, product: "James Blue", producerCode: 38, producerName: "Producer Name", verificationMethod: "method"},
];

const PartnerTable = () => {
  const navigate = useNavigate();

  const createNeftForm = () => {
      navigate("/partner-neft/form");
  };
  const udpateNeftForm = (id) => {
    navigate("/partner-neft/form/"+id);
};

  return <DynamicTable
          columns={TABLE_COLUMNS}
          data={data}
          createNeftForm={createNeftForm}
          udpateNeftForm={udpateNeftForm}
        />
};

export default PartnerTable;
