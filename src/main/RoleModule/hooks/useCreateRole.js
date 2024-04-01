import { useState } from "react";
import axiosInstance from "../../../core/axiosInstance"; // Import the instance

function useCreateRole() {
  const [loading, setLoading] = useState(false);

  async function postData(data) {
    setLoading(true);
    try {
      await axiosInstance.post("/api/role", data);

      // Handle the response as needed
    } catch (error) {
      console.error("Error:", error);
      // Handle errors
    } finally {
      setLoading(false); // Set loading to false when request finishes (whether success or failure)
    }
  }
  return { postData, loading };
}

export default useCreateRole;
