import { useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";

function useGetProposalOTPById() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (proposalId) => {
    try {
      let url = `/api/proposal-otp-exception/${proposalId}`;

      const response = await axiosInstance.get(url);
      setData(response.data);
    } catch (error) {
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, fetchData, setLoading };
}

export default useGetProposalOTPById;
