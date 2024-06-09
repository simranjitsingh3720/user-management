import React from "react";
import CustomTable from "../CustomTable";

const PartnerTable = () => {
  const data = [
    { lob: 1, product: "John Doe", producerCode: 28, producerName: "Producer Name", verificationMethod: "method"},
    { lob: 2, product: "Jane Smith", producerCode: 34, producerName: "Producer Name", verificationMethod: "method"},
    { lob: 3, product: "Sam Johnson", producerCode: 45, producerName: "Producer Name", verificationMethod: "method"},
    { lob: 4, product: "Chris Lee", producerCode: 23, producerName: "Producer Name", verificationMethod: "method"},
    { lob: 5, product: "Patricia Brown", producerCode: 52, producerName: "Producer Name", verificationMethod: "method"},
    { lob: 6, product: "Michael White", producerCode: 30, producerName: "Producer Name", verificationMethod: "method"},
    { lob: 7, product: "Linda Green", producerCode: 41, producerName: "Producer Name", verificationMethod: "method"},
    { lob: 8, product: "Davlob Black", producerCode: 35, producerName: "Producer Name", verificationMethod: "method"},
    { lob: 9, product: "Susan Gray", producerCode: 29, producerName: "Producer Name", verificationMethod: "method"},
    { lob: 10, product: "James Blue", producerCode: 38, producerName: "Producer Name", verificationMethod: "method"},
  ];

  const columns = [
    { header: "LOB", accessor: "lob" },
    { header: "Product", accessor: "product" },
    { header: "Producer Name", accessor: "producerName" },
    { header: "Producer Code", accessor: "producerCode" },
    { header: "Verification Method", accessor: "verificationMethod" }
  ];

  return <CustomTable data={data} columns={columns} />;
};

export default PartnerTable;
