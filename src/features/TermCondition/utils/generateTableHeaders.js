function generateTableHeaders() {
  return [
    {
      id: "producerCode",
      value: "Producer code",
      sortable: false,
    },
    {
      id: "producerName",
      value: "Producer Name",
      sortable: false,
    },
    {
      id: "producerType",
      value: "Producer Type",
      sortable: false,
    },
    {
      id: "producerAddress",
      value: "Producer Address",
      sortable: false,
    },
    {
      id: "producerAddress",
      value: "E-Acceptance Date",
      sortable: false,
    },
    {
      id: "producerAddress",
      value: "Status",
      sortable: false,
    },
    {
      id: "producerAddress",
      value: "IP Address",
      sortable: false,
    },
    {
      id: "createdAt",
      value: "Created At",
      sortable: true,
    },
    {
      id: "updatedAt",
      value: "Updated At",
      sortable: true,
    },
  ];
}

export default generateTableHeaders;
