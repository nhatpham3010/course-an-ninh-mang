import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { ENDPOINTS } from "../../routes/endPoints";

const RequiredAdmin = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem("access_token");
  const [checked, setChecked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!token) {
      setChecked(true);
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const userRole = user?.role || "";
      
      // Kiểm tra nếu role là "admin"
      setIsAdmin(userRole === "admin");
    } catch (error) {
      console.error("Error parsing user data:", error);
      setIsAdmin(false);
    }

    setChecked(true);
  }, [token]);

  if (!token) {
    return <Navigate to={ENDPOINTS.AUTH.LOGIN} state={{ from: location }} replace />;
  }

  if (!checked) {
    return null; // Chờ kiểm tra xong
  }

  if (!isAdmin) {
    toast.error("Bạn không có quyền truy cập trang này!", {
      position: "top-right",
      autoClose: 3000,
    });
    return <Navigate to={ENDPOINTS.USER.DASHBOARD} replace />;
  }

  return children;
};

export default RequiredAdmin;

