import { COMMON_WORDS } from "./constants";

export const buildParams = ({
  isAll,
  page,
  pageSize,
  order,
  orderBy,
  lobId,
  childFieldsToFetch,
  ids,
  edge,
}) => {
  let params = {};

  if (isAll) {
    return {
      isAll,
    };
  }

  if (page !== null && pageSize !== null) {
    params.pageNo = page;
    params.pageSize = pageSize;
  }

  if (orderBy !== null && order !== null) {
    params.sortKey = orderBy;
    params.sortOrder = order;
  }

  if (childFieldsToFetch) {
    const childFields = childFieldsToFetch.split(",");

    params.childFieldsToFetch = childFieldsToFetch;
    if (childFields.includes(COMMON_WORDS.LOB)) {
      params.childFieldsEdge = COMMON_WORDS.HAS_LOB;
    }
  }

  if (ids) {
    params.ids = ids;
    params.edge = edge;
    params.isExclusive = true;
  }

  if (lobId) {
    params.ids = lobId;
    params.edge = COMMON_WORDS.HAS_LOB;
    params.isExclusive = true;
  }

  return params;
};
