import axios from "axios";
import { useState } from "react";

function useCreatePrivilege() {
  const [loading, setLoading] = useState(false);

  async function postData(data) {
    console.log("data-->", data);
    setLoading(true);
    try {
      const response = await axios.post(
        "https://dev-usermgmt.tataaig.com/api/permission",
        data?.items
      );
      console.log("response", response);
      console.log("Response:", response.data);
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

export default useCreatePrivilege;
