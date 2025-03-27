import { useQuery } from "react-query";
import axios from "axios";

const getAdminPayroll = async () => {
  try {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      throw new Error("No authentication token found.");
    }

    const response = await axios.get(
      `https://phaseii-backend.amanahhr.com/api/admin/configuration/show/1`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    if (response.status === 200) {
      return response.data.response;
    } else {
      throw new Error("Failed to fetch manager.");
    }
  } catch (error) {
    console.log("Failed to fetch manager.", error);
  }
};

export const UseGetAdminPayrollConfigration = () => {
  return useQuery("AdminPayrolConfigration", () => getAdminPayroll());
};
