import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getConfig } from "../../../configs/getConfig.config";
import { ENDPOINTS } from "../../../routes/endPoints";
import {
  Shield,
  Users,
  LogOut,
  Bell,
  CreditCard,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Search,
  Filter,
  RefreshCw,
  Image as ImageIcon,
  User,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  Package,
} from "lucide-react";
import { toast } from "react-toastify";

const PaymentAdmin = () => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // all, pending, completed
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [processingId, setProcessingId] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmPaymentId, setConfirmPaymentId] = useState(null);
  const token = localStorage.getItem("access_token");
  const username = JSON.parse(localStorage.getItem("user"))?.name || "Admin";

  useEffect(() => {
    fetchPayments();
  }, []);

  useEffect(() => {
    filterPayments();
  }, [payments, searchTerm, statusFilter]);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const { apiUrl } = getConfig();
      const baseApiUrl = apiUrl.endsWith("/api") ? apiUrl : `${apiUrl}/api`;
      const response = await axios.get(`${baseApiUrl}/payment`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = response.data.data || response.data;
      setPayments(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Lỗi khi tải danh sách thanh toán:", error);
      toast.error("Không thể tải danh sách thanh toán!", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const filterPayments = () => {
    let filtered = [...payments];

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((p) => p.trang_thai === statusFilter);
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.ho_ten?.toLowerCase().includes(term) ||
          p.email?.toLowerCase().includes(term) ||
          p.ten_goi?.toLowerCase().includes(term) ||
          p.id?.toString().includes(term)
      );
    }

    setFilteredPayments(filtered);
  };

  const showApproveConfirm = (paymentId) => {
    setConfirmPaymentId(paymentId);
    setShowConfirmModal(true);
  };

  const handleConfirm = async () => {
    if (!confirmPaymentId) return;

    try {
      setProcessingId(confirmPaymentId);
      setShowConfirmModal(false);
      
      const { apiUrl } = getConfig();
      const baseApiUrl = apiUrl.endsWith("/api") ? apiUrl : `${apiUrl}/api`;
      
      await axios.put(`${baseApiUrl}/payment/${confirmPaymentId}/approve`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      toast.success("Duyệt thanh toán thành công!", {
        position: "top-right",
        autoClose: 3000,
      });
      
      fetchPayments();
      setShowDetailModal(false);
    } catch (error) {
      console.error("Lỗi khi duyệt thanh toán:", error);
      toast.error(
        error.response?.data?.message || "Không thể duyệt thanh toán!",
        { position: "top-right", autoClose: 3000 }
      );
    } finally {
      setProcessingId(null);
      setConfirmPaymentId(null);
    }
  };

  const handleCancelConfirm = () => {
    setShowConfirmModal(false);
    setConfirmPaymentId(null);
  };

  const openDetailModal = (payment) => {
    setSelectedPayment(payment);
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setSelectedPayment(null);
    setShowDetailModal(false);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-400" />;
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

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const stats = {
    total: payments.length,
    pending: payments.filter((p) => p.trang_thai === "pending").length,
    completed: payments.filter((p) => p.trang_thai === "completed").length,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Đang tải danh sách thanh toán...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-lozo-dark to-lozo-darker">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-900 to-orange-800 border-b border-orange-700/50 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold text-xl">LozoAcademy</span>
            <div className="bg-red-600 px-2 py-1 rounded text-white text-sm font-medium">
              ADMIN
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to={ENDPOINTS.USER.MANAMENT}
              className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white transition-colors"
            >
              <Users className="w-4 h-4" />
              <span>Quản lý khóa học</span>
            </Link>
            <Link
              to={ENDPOINTS.USER.ADMINDASHBOARD}
              className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white transition-colors"
            >
              <Users className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
            <Link
              to={ENDPOINTS.USER.ADMINPAYMENT}
              className="flex items-center gap-2 px-4 py-2 bg-orange-700 text-white rounded-lg transition-colors"
            >
              <CreditCard className="w-4 h-4" />
              <span>Quản lý thanh toán</span>
            </Link>
            <button className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white transition-colors">
              <Bell className="w-4 h-4" />
              <span>Xin chào, {username}</span>
            </button>
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Đăng xuất</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800/60 border border-gray-600 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <CreditCard className="w-8 h-8 text-blue-400" />
              <span className="text-blue-400 text-sm font-medium">Tổng</span>
            </div>
            <p className="text-3xl font-bold text-white">{stats.total}</p>
            <p className="text-gray-400 text-sm mt-2">Tổng số thanh toán</p>
          </div>
          <div className="bg-gray-800/60 border border-gray-600 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-8 h-8 text-yellow-400" />
              <span className="text-yellow-400 text-sm font-medium">Chờ duyệt</span>
            </div>
            <p className="text-3xl font-bold text-white">{stats.pending}</p>
            <p className="text-gray-400 text-sm mt-2">Đang chờ duyệt</p>
          </div>
          <div className="bg-gray-800/60 border border-gray-600 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="w-8 h-8 text-green-400" />
              <span className="text-green-400 text-sm font-medium">Hoàn thành</span>
            </div>
            <p className="text-3xl font-bold text-white">{stats.completed}</p>
            <p className="text-gray-400 text-sm mt-2">Đã duyệt</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-800/60 border border-gray-600 rounded-xl p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm theo tên, email, gói học..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="all">Tất cả</option>
                  <option value="pending">Chờ duyệt</option>
                  <option value="completed">Đã duyệt</option>
                </select>
              </div>
            </div>
            <button
              onClick={fetchPayments}
              className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Làm mới
            </button>
          </div>
        </div>

        {/* Payments Table */}
        <div className="bg-gray-800/60 border border-gray-600 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                    Khách hàng
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                    Gói học
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                    Số tiền
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                    Trạng thái
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                    Ngày tạo
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredPayments.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-gray-400">
                      Không có thanh toán nào
                    </td>
                  </tr>
                ) : (
                  filteredPayments.map((payment) => (
                    <tr
                      key={payment.id}
                      className="hover:bg-gray-700/30 transition-colors"
                    >
                      <td className="px-6 py-4 text-white font-medium">
                        #{payment.id}
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-white font-medium">{payment.ho_ten}</p>
                          <p className="text-gray-400 text-sm">{payment.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-white">{payment.ten_goi}</td>
                      <td className="px-6 py-4 text-white font-semibold">
                        {formatCurrency(payment.so_tien)}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(payment.trang_thai)}`}
                        >
                          {getStatusIcon(payment.trang_thai)}
                          {getStatusText(payment.trang_thai)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-400 text-sm">
                        {formatDate(payment.ngay_thanh_toan)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => openDetailModal(payment)}
                            className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300 hover:text-white transition-colors"
                            title="Xem chi tiết"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {payment.trang_thai === "pending" && (
                            <button
                              onClick={() => showApproveConfirm(payment.id)}
                              disabled={processingId === payment.id}
                              className="p-2 bg-green-600 hover:bg-green-700 rounded-lg text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              title="Duyệt"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedPayment && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 border border-gray-600 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">
                  Chi tiết thanh toán #{selectedPayment.id}
                </h2>
                <button
                  onClick={closeDetailModal}
                  className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Status */}
              <div className="flex items-center gap-3">
                <span className="text-gray-400">Trạng thái:</span>
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedPayment.trang_thai)}`}
                >
                  {getStatusIcon(selectedPayment.trang_thai)}
                  {getStatusText(selectedPayment.trang_thai)}
                </span>
              </div>

              {/* Customer Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-gray-700/50 rounded-lg">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-gray-400 text-sm">Họ và tên</p>
                    <p className="text-white font-medium">{selectedPayment.ho_ten}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-700/50 rounded-lg">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <p className="text-white font-medium">{selectedPayment.email}</p>
                  </div>
                </div>
                {selectedPayment.so_dien_thoai && (
                  <div className="flex items-center gap-3 p-4 bg-gray-700/50 rounded-lg">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-gray-400 text-sm">Số điện thoại</p>
                      <p className="text-white font-medium">
                        {selectedPayment.so_dien_thoai}
                      </p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3 p-4 bg-gray-700/50 rounded-lg">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-gray-400 text-sm">Ngày tạo</p>
                    <p className="text-white font-medium">
                      {formatDate(selectedPayment.ngay_thanh_toan)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-gray-700/50 rounded-lg">
                  <Package className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-gray-400 text-sm">Gói học</p>
                    <p className="text-white font-medium">{selectedPayment.ten_goi}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-700/50 rounded-lg">
                  <DollarSign className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-gray-400 text-sm">Số tiền</p>
                    <p className="text-white font-semibold text-lg">
                      {formatCurrency(selectedPayment.so_tien)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-700/50 rounded-lg">
                  <CreditCard className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-gray-400 text-sm">Phương thức</p>
                    <p className="text-white font-medium">
                      {selectedPayment.phuong_thuc_thanh_toan === "bank_transfer"
                        ? "Chuyển khoản ngân hàng"
                        : selectedPayment.phuong_thuc_thanh_toan}
                    </p>
                  </div>
                </div>
              </div>

              {/* Proof Image */}
              {selectedPayment.hinh_anh_chung_minh && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <ImageIcon className="w-5 h-5 text-gray-400" />
                    <p className="text-gray-400 font-medium">Hình ảnh chứng minh</p>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <img
                      src={selectedPayment.hinh_anh_chung_minh}
                      alt="Proof"
                      className="w-full max-w-md mx-auto rounded-lg border border-gray-600"
                    />
                  </div>
                </div>
              )}

              {/* Actions */}
              {selectedPayment.trang_thai === "pending" && (
                <div className="flex gap-3 pt-4 border-t border-gray-700">
                  <button
                    onClick={() => showApproveConfirm(selectedPayment.id)}
                    disabled={processingId === selectedPayment.id}
                    className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Duyệt thanh toán
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 border border-gray-600 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 bg-green-500/20">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">
                  Duyệt thanh toán
                </h3>
                <p className="text-gray-300">
                  Bạn có chắc chắn muốn duyệt thanh toán này?
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleCancelConfirm}
                className="flex-1 px-4 py-3 rounded-lg border border-gray-600 text-white hover:bg-gray-700 transition-colors font-medium"
              >
                Hủy
              </button>
              <button
                onClick={handleConfirm}
                disabled={processingId === confirmPaymentId}
                className="flex-1 px-4 py-3 rounded-lg text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-green-600 hover:bg-green-700"
              >
                {processingId === confirmPaymentId ? "Đang xử lý..." : "Xác nhận"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentAdmin;

