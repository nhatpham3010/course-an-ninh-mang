import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ENDPOINTS } from "../../../routes/endPoints";
import Header from "../../../components/Header/Header";
import {
  BookOpen,
  CheckCircle,
  Target,
  Award,
  Zap,
  CreditCard,
  Clock,
  CheckCircle2,
  XCircle,
  GraduationCap,
  User,
  Mail,
  Calendar,
  ArrowLeft,
} from "lucide-react";
import axios from "axios";
import { getConfig } from "../../../configs/getConfig.config";

export default function UserProfile() {
  const navigate = useNavigate();
  const username = JSON.parse(localStorage.getItem("user"))?.name || "User";
  const [dashboardData, setDashboardData] = useState({
    stats: [],
    learningProgress: [],
    recentActivities: [],
    actionCards: [],
    userInfo: null,
    payments: [],
  });
  const [loading, setLoading] = useState(true);

  // ✅ Gọi API backend khi load trang
  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);

      try {
        const token = localStorage.getItem("access_token");
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
        setDashboardData(dashboardData);
      } catch (error) {
        console.error("Lỗi khi tải thông tin:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-white text-xl">
        Đang tải dữ liệu...
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-green-400" />;
      case "rejected":
        return <XCircle className="w-5 h-5 text-red-400" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-400" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "completed":
        return "Đã hoàn thành";
      case "rejected":
        return "Đã từ chối";
      default:
        return "Đang chờ duyệt";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "text-green-400 bg-green-400/10 border-green-400/20";
      case "rejected":
        return "text-red-400 bg-red-400/10 border-red-400/20";
      default:
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-lozo-form-bg to-lozo-form-mid">
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Header với nút quay lại */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate(ENDPOINTS.USER.DASHBOARD)}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Quay lại
          </button>
          <h1 className="text-3xl font-bold text-white">Thông tin tài khoản</h1>
        </div>

        {/* Thông tin cá nhân */}
        <div className="bg-gray-800/60 border border-gray-600 rounded-xl p-6 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-6 h-6 text-lozo-purple-light" />
            <h2 className="text-2xl font-bold text-white">Thông tin cá nhân</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-400 text-sm mb-1">Họ và tên</p>
              <p className="text-white font-semibold text-lg">
                {dashboardData.userInfo?.ten || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Email</p>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <p className="text-white font-semibold text-lg">
                  {dashboardData.userInfo?.email || "N/A"}
                </p>
              </div>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Ngày sinh</p>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <p className="text-white font-semibold text-lg">
                  {formatDate(dashboardData.userInfo?.ngaysinh)}
                </p>
              </div>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Gói học đang tham gia</p>
              {dashboardData.userInfo?.currentPackage ? (
                <div className="flex items-center gap-2 mb-3">
                  <Award className="w-4 h-4 text-lozo-purple-light" />
                  <p className="text-white font-semibold text-lg">
                    {dashboardData.userInfo.currentPackage}
                  </p>
                </div>
              ) : (
                <p className="text-gray-400 mb-3">Chưa có gói học</p>
              )}
              <Link
                to={ENDPOINTS.USER.PACKAGES}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-lozo-purple to-lozo-purple-light text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
              >
                <Award className="w-4 h-4" />
                Nâng cấp ngay
              </Link>
            </div>
          </div>
        </div>

        {/* Khóa học đang tham gia */}
        {dashboardData.userInfo?.courses && dashboardData.userInfo.courses.length > 0 && (
          <div className="bg-gray-800/60 border border-gray-600 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap className="w-6 h-6 text-lozo-purple-light" />
              <h2 className="text-2xl font-bold text-white">Khóa học đang tham gia</h2>
            </div>

            <div className="space-y-4">
              {dashboardData.userInfo.courses.map((course) => (
                <Link
                  key={course.id}
                  to={`/user/demo/${course.id}`}
                  className="block bg-gray-700/40 rounded-lg p-4 border border-gray-600/50 hover:bg-gray-700/60 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-lg mb-2">{course.ten}</h3>
                      {course.mota && (
                        <p className="text-gray-400 text-sm mb-2 line-clamp-2">{course.mota}</p>
                      )}
                    </div>
                    <span className="text-lozo-purple-light text-sm font-medium">
                      {course.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2 mb-2">
                    <div
                      className="bg-gradient-to-r from-lozo-purple to-lozo-purple-light h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{course.completed_lessons}/{course.total_lessons} bài học</span>
                    <span className="capitalize">{course.trangthai}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Lịch sử thanh toán */}
        <div className="bg-gray-800/60 border border-gray-600 rounded-xl p-6 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6">
            <CreditCard className="w-6 h-6 text-lozo-purple-light" />
            <h2 className="text-2xl font-bold text-white">Lịch sử thanh toán</h2>
          </div>

          {!dashboardData.payments || dashboardData.payments.length === 0 ? (
            <div className="text-center py-8">
              <CreditCard className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400 mb-4">Bạn chưa có giao dịch thanh toán nào</p>
            </div>
          ) : (
            <div className="space-y-4">
              {dashboardData.payments.map((payment) => (
                <div
                  key={payment.id}
                  className="bg-gray-700/40 border border-gray-600 rounded-lg p-4 hover:bg-gray-700/60 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-semibold text-white">
                          {payment.ten_goi}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getStatusColor(payment.trang_thai)}`}
                        >
                          {getStatusIcon(payment.trang_thai)}
                          {getStatusText(payment.trang_thai)}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-400">Số tiền</p>
                          <p className="text-white font-semibold">
                            {formatCurrency(payment.so_tien)}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400">Phương thức</p>
                          <p className="text-white">
                            {payment.phuong_thuc_thanh_toan === "bank_transfer"
                              ? "Chuyển khoản"
                              : payment.phuong_thuc_thanh_toan}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400">Ngày tạo</p>
                          <p className="text-white">
                            {formatDate(payment.ngay_thanh_toan)}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400">Email</p>
                          <p className="text-white">{payment.email}</p>
                        </div>
                      </div>
                      {payment.hinh_anh_chung_minh && (
                        <div className="mt-3">
                          <p className="text-gray-400 text-sm mb-2">Hình ảnh chứng minh</p>
                          <a
                            href={payment.hinh_anh_chung_minh}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lozo-purple-light hover:text-lozo-purple text-sm underline"
                          >
                            Xem hình ảnh
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

