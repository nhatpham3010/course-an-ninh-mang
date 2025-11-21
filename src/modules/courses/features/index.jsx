import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getConfig } from "../../../configs/getConfig.config";
import Courses from "../components/Courses";
import Header from "../../../components/Header/Header";
import { ENDPOINTS } from "../../../routes/endPoints";

const Landing = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [checking, setChecking] = useState(true);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const checkUserPackage = async () => {
      if (!token) {
        setChecking(false);
        return;
      }

      try {
        const { apiUrl } = getConfig();
        const baseApiUrl = apiUrl.endsWith("/api") ? apiUrl : `${apiUrl}/api`;
        const response = await axios.get(
          `${baseApiUrl}/user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const dashboardData = response.data.data || response.data;
        setUserInfo(dashboardData.userInfo);

        // Nếu chưa có gói, redirect đến trang chọn gói
        if (!dashboardData.userInfo?.currentPackage) {
          navigate(ENDPOINTS.USER.PACKAGES, { replace: true });
        }
      } catch (error) {
        console.error("Lỗi khi kiểm tra gói học:", error);
      } finally {
        setChecking(false);
      }
    };

    checkUserPackage();
  }, [token, navigate]);

  if (checking) {
    return (
      <div className="flex justify-center items-center h-screen text-white text-xl">
        Đang kiểm tra...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <Courses />
    </div>
  );
};
export default Landing;
