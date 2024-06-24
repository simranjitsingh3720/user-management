export const TABLE_COLUMNS = [
  { headerName: "LOB", field: "lob" },
  { headerName: "Product", field: "product" },
  { headerName: "Producer Name", field: "producerName" },
  { headerName: "Producer Code", field: "producerCode" },
  { headerName: "Verification Method", field: "verificationMethod" },
];

export const VERIFICATION_METHOD = [
    { label: "Partner", value: "partner" },
    { label: "NEFT PACE", value: "neft pace" },
    { label: "Banca", value: "banca" },
]

export const API_END_POINTS = {
  POST_API: 'api/partner-neft',
  GET_API: 'api/partner-neft'
}

export const VERFICATION_ENUM = Object.freeze({
  partner: "Partner",
  "neft pace": "NEFT PACE",
  banca: "Banca"
});