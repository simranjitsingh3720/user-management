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

export const COMMON_FIELDS = {
  childFieldsToFetch: "product,lob,producer",
  childFieldsEdge: "hasProduct,hasLob,hasProducer",
  hasProduct: "hasProduct",
  hasProducer: "hasProducer",
  hasLob: "hasLob",
  createdAt: "createdAt",
  hasPermission: "hasPermission",
}

export const SEARCH_OPTIONS = [
  {
    label: "Product",
    value: "product",
  },
  {
    label: "LOB",
    value: "lob",
  },
  {
    label: "Producer Name",
    value: "producer",
  }
];