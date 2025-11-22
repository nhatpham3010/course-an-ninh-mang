import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ENDPOINTS } from "../../../routes/endPoints";
import { CheckCircle, Home } from "lucide-react";

export default function PaymentReturn() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    // Đếm ngược và tự động chuyển về trang chính sau 3 giây
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate(ENDPOINTS.INDEX);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleGoHome = () => {
    navigate(ENDPOINTS.INDEX);
  };

  return (
    <div className="min-h-screen bg-lozo-gradient flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-gradient-to-r from-[#371658] to-[#43166f] rounded-2xl border border-[#4b2d68] p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-green-500 p-4">
              <CheckCircle className="h-16 w-16 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">
            Thành công, vui lòng chờ admin duyệt
          </h1>
          <p className="text-[#d1d5db] mb-6">
            Hệ thống sẽ tự động chuyển về trang chính sau{" "}
            <span className="text-lozo-button font-bold text-xl">{countdown}</span> giây
          </p>
          <button
            onClick={handleGoHome}
            className="w-full bg-lozo-button hover:opacity-90 text-white font-medium py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <Home className="h-5 w-5" />
            Về trang chính ngay
          </button>
        </div>
      </div>
    </div>
  );
}
