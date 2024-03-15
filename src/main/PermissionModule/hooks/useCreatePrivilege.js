import { useState } from "react";
import axiosInstance from "../../../core/axiosInstance"; // Import the instance

function useCreatePrivilege() {
  const [toast, setToast] = useState(false);
  const [loading, setLoading] = useState(false);

  async function postData(data) {
    console.log("data-->", data);
    setLoading(true);
    try {
      const response = await axiosInstance.post("/api/permission", data?.items);
      console.log("response", response);
      console.log("Response:", response.data);
      // Handle the response as needed
    } catch (error) {
      console.error("Error:", error);
      setToast(true);
      // Handle errors
    } finally {
      setLoading(false); // Set loading to false when request finishes (whether success or failure)
    }
  }
  return { postData, loading, toast, setToast };
}

export default useCreatePrivilege;
