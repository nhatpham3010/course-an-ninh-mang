// import { useLocation, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import Header from "../../../components/Header/Header";
// import { ENDPOINTS } from "../../../routes/endPoints";
// import {
//   ChevronLeft,
//   Check,
//   Smartphone,
//   Building2,
//   Shield,
// } from "lucide-react";

// export default function Payment() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [paymentMethod, setPaymentMethod] = useState("momo");
//   const [formData, setFormData] = useState({
//     ho_ten: "",
//     email: "",
//     so_dien_thoai: "",
//   });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const token = localStorage.getItem("access_token");

//   useEffect(() => {
//     if (!location.state) {
//       navigate(ENDPOINTS.USER.COURSE);
//     }
//   }, [location.state, navigate]);

//   const packageData = location.state || {};
//   console.log("packageData", packageData);
//   const {
//     title = "Gói học chưa xác định",
//     price = 0,
//     period = "",
//     features = [],
//   } = packageData;

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setError("");
//   };

//   const handlePayment = async () => {
//     // Kiểm tra dữ liệu
//     if (!formData.ho_ten || !formData.email || !formData.so_dien_thoai) {
//       setError("Vui lòng điền đầy đủ thông tin trước khi thanh toán!");
//       return;
//     }

//     // Kiểm tra định dạng email
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       setError("Email không hợp lệ!");
//       return;
//     }

//     // Kiểm tra định dạng số điện thoại
//     const phoneRegex = /^[0-9]{10,11}$/;
//     if (!phoneRegex.test(formData.so_dien_thoai)) {
//       setError("Số điện thoại không hợp lệ (10-11 số)!");
//       return;
//     }

//     // Chuẩn bị dữ liệu gửi đến backend
//     const paymentData = {
//       ho_ten: formData.ho_ten,
//       email: formData.email,
//       so_dien_thoai: formData.so_dien_thoai,
//       phuong_thuc_thanh_toan: paymentMethod,
//       ten_goi: title,
//       so_tien: parseFloat(price),
//     };

//     try {
//       setLoading(true);
//       setError("");
//       const token = localStorage.getItem("access_token");
//       if (!token) {
//         setError("Vui lòng đăng nhập để thực hiện thanh toán");
//         navigate(ENDPOINTS.USER.LOGIN);
//         return;
//       }

//       const response = await axios.post(
//         "https://course-an-ninh-mang-backend.vercel.app/api/payment",
//         paymentData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       // Thanh toán thành công
//       alert(`Thanh toán thành công! Vai trò mới: ${response.data.new_role}`);
//       navigate(ENDPOINTS.USER.COURSES);
//     } catch (err) {
//       setError(err.response?.data?.message || "Lỗi khi xử lý thanh toán");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-lozo-gradient">
//       <Header />

//       {/* Breadcrumb */}
//       <div className="mx-auto max-w-7xl px-8 py-6">
//         <div className="flex items-center gap-2 text-sm">
//           <ChevronLeft className="h-4 w-4 text-[#9ca3af]" />
//           <a
//             href={ENDPOINTS.USER.COURSE}
//             className="text-[#9ca3af] hover:text-white transition-colors"
//           >
//             Chọn gói học
//           </a>
//           <span className="text-[#9ca3af]">/</span>
//           <span className="text-white">Thanh toán</span>
//         </div>
//       </div>

//       {/* Main */}
//       <div className="mx-auto max-w-7xl px-8 pb-20">
//         {error && (
//           <div className="mb-6 rounded-lg bg-red-500/20 p-4 text-red-400">
//             {error}
//           </div>
//         )}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* LEFT COLUMN */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Thông tin khách hàng */}
//             <div className="rounded-2xl border border-[#4b2d68] bg-gradient-to-r from-[#371658] to-[#43166f] p-6">
//               <h2 className="text-xl font-bold text-white mb-4">
//                 Thông tin khách hàng
//               </h2>

//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm text-[#d1d5db] mb-1">
//                     Họ và tên
//                   </label>
//                   <input
//                     type="text"
//                     name="ho_ten"
//                     value={formData.ho_ten}
//                     onChange={handleChange}
//                     className="w-full rounded-lg bg-[#4b2d68] text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-lozo-button"
//                     placeholder="Nhập họ và tên"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm text-[#d1d5db] mb-1">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="w-full rounded-lg bg-[#4b2d68] text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-lozo-button"
//                     placeholder="Nhập địa chỉ email"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm text-[#d1d5db] mb-1">
//                     Số điện thoại
//                   </label>
//                   <input
//                     type="text"
//                     name="so_dien_thoai"
//                     value={formData.so_dien_thoai}
//                     onChange={handleChange}
//                     className="w-full rounded-lg bg-[#4b2d68] text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-lozo-button"
//                     placeholder="Nhập số điện thoại"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Phương thức thanh toán */}
//             <div className="rounded-2xl border border-[#4b2d68] bg-gradient-to-r from-[#371658] to-[#43166f] p-6">
//               <h2 className="text-xl font-bold text-white mb-4">
//                 Chọn phương thức thanh toán
//               </h2>

//               <div className="space-y-3">
//                 <button
//                   onClick={() => setPaymentMethod("momo")}
//                   className={`flex items-center w-full gap-3 rounded-lg px-4 py-3 transition-all ${
//                     paymentMethod === "momo"
//                       ? "bg-lozo-button text-white"
//                       : "bg-[#4b2d68] text-[#d1d5db]"
//                   }`}
//                 >
//                   <Smartphone className="h-5 w-5" />
//                   <span>Thanh toán qua MoMo</span>
//                 </button>

//                 <button
//                   onClick={() => setPaymentMethod("bank_transfer")}
//                   className={`flex items-center w-full gap-3 rounded-lg px-4 py-3 transition-all ${
//                     paymentMethod === "bank_transfer"
//                       ? "bg-lozo-button text-white"
//                       : "bg-[#4b2d68] text-[#d1d5db]"
//                   }`}
//                 >
//                   <Building2 className="h-5 w-5" />
//                   <span>Chuyển khoản ngân hàng</span>
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* RIGHT COLUMN - ORDER SUMMARY */}
//           <div className="lg:col-span-1">
//             <div className="rounded-2xl border border-[#4b2d68] bg-gradient-to-r from-[#371658] to-[#43166f] p-6 sticky top-6">
//               <h2 className="text-xl font-bold text-white mb-4">
//                 Thông tin đơn hàng
//               </h2>

//               <div className="rounded-xl bg-[#4d226f] p-4 mb-6">
//                 <div className="flex items-center gap-3 mb-3">
//                   <div className="flex h-12 w-12 items-center justify-center rounded-[20%] bg-lozo-shield">
//                     <Shield className="h-6 w-6 text-white" />
//                   </div>
//                   <div>
//                     <h3 className="text-white font-medium">{title}</h3>
//                     <p className="text-sm text-[#d1d5db]">{period}</p>
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   {features.map((feature, index) => (
//                     <div key={index} className="flex items-center gap-2">
//                       <Check className="h-4 w-4 text-green-400" />
//                       <span className="text-sm text-[#d1d5db]">{feature}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Pricing */}
//               <div className="border-t border-lozo-gray-400 pt-4 space-y-3">
//                 <div className="flex justify-between">
//                   <span className="text-[#d1d5db]">Giá gói</span>
//                   <span className="text-white">
//                     {price.toLocaleString()} VND
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-[#d1d5db]">Giảm giá</span>
//                   <span className="text-green-400">-0 VND</span>
//                 </div>
//                 <div className="flex justify-between text-lg font-bold">
//                   <span className="text-white">Tổng cộng</span>
//                   <span className="text-white">
//                     {price.toLocaleString()} VND
//                   </span>
//                 </div>
//               </div>

//               <button
//                 onClick={handlePayment}
//                 disabled={loading}
//                 className={`w-full mt-6 rounded-xl py-3 text-white font-medium transition-opacity ${
//                   loading
//                     ? "bg-lozo-button/50 cursor-not-allowed"
//                     : "bg-lozo-button hover:opacity-90"
//                 }`}
//               >
//                 {loading ? "Đang xử lý..." : "Xác nhận thanh toán"}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Header from "../../../components/Header/Header";
import { ENDPOINTS } from "../../../routes/endPoints";
import {
  ChevronLeft,
  Check,
  Building2,
  Shield,
  Loader2,
  Upload,
  X,
  Image as ImageIcon,
} from "lucide-react";
import { uploadPaymentProof } from "../../../utils/cloudinaryUpload";
import { getConfig } from "../../../configs/getConfig.config";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("bank_transfer");
  const [formData, setFormData] = useState({
    ho_ten: "",
    email: "",
    so_dien_thoai: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [proofImage, setProofImage] = useState(null);
  const [proofImagePreview, setProofImagePreview] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [pendingPayment, setPendingPayment] = useState(null);
  const [checkingPayment, setCheckingPayment] = useState(true);

  // === KIỂM TRA THANH TOÁN ĐANG CHỜ DUYỆT ===
  useEffect(() => {
    const checkPendingPayment = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          navigate(ENDPOINTS.USER.LOGIN);
          return;
        }

        const { apiUrl } = getConfig();
        const baseApiUrl = apiUrl.endsWith("/api") ? apiUrl : `${apiUrl}/api`;
        const response = await axios.get(
          `${baseApiUrl}/payment`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const payments = response.data.data || response.data;
        
        // Filter chỉ lấy payment có trang_thai === 'pending'
        if (Array.isArray(payments)) {
          const pendingPayments = payments.filter(
            (payment) => payment.trang_thai === "pending"
          );
          if (pendingPayments.length > 0) {
            setPendingPayment(pendingPayments[0]); // Lấy payment đầu tiên đang pending
          } else {
            setPendingPayment(null); // Không có payment pending
          }
        } else {
          setPendingPayment(null);
        }
      } catch (error) {
        console.error("Error checking pending payment:", error);
        setPendingPayment(null);
      } finally {
        setCheckingPayment(false);
      }
    };

    checkPendingPayment();
  }, [navigate]);

  // === KIỂM TRA DỮ LIỆU GÓI HỌC ===
  useEffect(() => {
    if (!location.state) {
      navigate(ENDPOINTS.USER.COURSES);
    }
  }, [location.state, navigate]);

  const packageData = location.state || {};
  const {
    title = "Gói học chưa xác định",
    price = 0,
    period = "",
    features = [],
  } = packageData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  // Handle proof image selection
  const handleImageSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Vui lòng chọn file hình ảnh!");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Kích thước file không được vượt quá 5MB!");
      return;
    }

    try {
      setUploadingImage(true);
      setError("");

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setProofImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      // Upload to Cloudinary
      const uploadResult = await uploadPaymentProof(file);
      console.log("Upload result:", uploadResult); // Debug log
      
      if (!uploadResult || !uploadResult.url) {
        throw new Error("Upload thành công nhưng không nhận được URL ảnh!");
      }
      
      setProofImage({
        file,
        url: uploadResult.url,
        publicId: uploadResult.publicId,
      });
      
      console.log("Proof image set:", uploadResult.url); // Debug log
    } catch (err) {
      console.error("Error uploading proof image:", err);
      setError(err.message || "Lỗi khi upload hình ảnh chứng minh!");
      setProofImage(null);
      setProofImagePreview(null);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleRemoveImage = () => {
    setProofImage(null);
    setProofImagePreview(null);
  };

  // === GỬI THANH TOÁN ===
  const handlePayment = async () => {
    // Validation
    if (!formData.ho_ten || !formData.email || !formData.so_dien_thoai) {
      setError("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Email không hợp lệ!");
      return;
    }
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(formData.so_dien_thoai)) {
      setError("Số điện thoại không hợp lệ (10-11 số)!");
      return;
    }

    // Validate proof image
    if (!proofImage) {
      setError("Vui lòng upload hình ảnh chứng minh thanh toán!");
      return;
    }

    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("Vui lòng đăng nhập!");
      navigate(ENDPOINTS.USER.LOGIN);
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Prepare payment data with proof image URL (if bank transfer)
      const imageUrl = proofImage?.url;
      console.log("Submitting payment with image URL:", imageUrl); // Debug log
      
      if (!imageUrl) {
        setError("Không tìm thấy URL ảnh đã upload. Vui lòng upload lại!");
        return;
      }
      
      const paymentData = {
        ho_ten: formData.ho_ten,
        email: formData.email,
        so_dien_thoai: formData.so_dien_thoai,
        phuong_thuc_thanh_toan: paymentMethod,
        ten_goi: title,
        so_tien: parseFloat(price),
        // Include proof image URL
        hinh_anh_chung_minh: imageUrl,
      };
      
      console.log("Payment data:", paymentData); // Debug log

      // Get API URL from config
      const { apiUrl } = getConfig();
      // Add /api if not already in URL
      const baseApiUrl = apiUrl.endsWith("/api") ? apiUrl : `${apiUrl}/api`;
      const response = await axios.post(
        `${baseApiUrl}/payment`,
        paymentData,
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Backend trả về: { error_code: 0, message: "Success", data: {...} }
      const data = response.data.data || response.data;

      // === BANK_TRANSFER: Thành công, chờ admin duyệt ===
      if (data.payment_id) {
        toast.success(
          `Yêu cầu thanh toán đã được tạo! Đang chờ admin duyệt. ID: ${data.payment_id}`,
          {
            position: "top-right",
            autoClose: 5000,
          }
        );
        navigate(ENDPOINTS.USER.DASHBOARD);
        return;
      }

      throw new Error("Phản hồi không hợp lệ");
    } catch (err) {
      setError(
        err.response?.data?.message || "Lỗi thanh toán. Vui lòng thử lại!"
      );
    } finally {
      setLoading(false);
    }
  };


  // === TRANG THANH TOÁN CHÍNH ===
  return (
    <div className="min-h-screen bg-lozo-gradient">
      <Header />

      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-8 py-6">
        <div className="flex items-center gap-2 text-sm">
          <ChevronLeft className="h-4 w-4 text-[#9ca3af]" />
          <a
            href={ENDPOINTS.USER.COURSE}
            className="text-[#9ca3af] hover:text-white"
          >
            Chọn gói học
          </a>
          <span className="text-[#9ca3af]">/</span>
          <span className="text-white">Thanh toán</span>
        </div>
      </div>

      {/* Main */}
      <div className="mx-auto max-w-7xl px-8 pb-20">
        {error && (
          <div className="mb-6 rounded-lg bg-red-500/20 border border-red-500/50 p-4 text-red-400">
            {error}
          </div>
        )}

        {/* Thông báo thanh toán đang chờ duyệt */}
        {!checkingPayment && pendingPayment && (
          <div className="mb-6 p-4 bg-yellow-500/20 border border-yellow-500/40 rounded-xl">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-yellow-400 font-semibold mb-1">
                  Bạn có một yêu cầu thanh toán đang chờ duyệt
                </h3>
                <p className="text-yellow-300/80 text-sm mb-2">
                  Gói: <span className="font-medium">{pendingPayment.ten_goi}</span> - 
                  Số tiền: <span className="font-medium">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(pendingPayment.so_tien)}
                  </span>
                </p>
                <p className="text-yellow-300/60 text-xs">
                  Vui lòng chờ admin duyệt thanh toán trước khi tạo yêu cầu mới.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT: Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Thông tin khách hàng */}
            <div className="rounded-2xl border border-[#4b2d68] bg-gradient-to-r from-[#371658] to-[#43166f] p-6">
              <h2 className="text-xl font-bold text-white mb-4">
                Thông tin khách hàng
              </h2>
              <div className="space-y-4">
                <input
                  name="ho_ten"
                  value={formData.ho_ten}
                  onChange={handleChange}
                  placeholder="Họ và tên"
                  className="w-full rounded-lg bg-[#4b2d68] text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-lozo-button"
                />
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  type="email"
                  className="w-full rounded-lg bg-[#4b2d68] text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-lozo-button"
                />
                <input
                  name="so_dien_thoai"
                  value={formData.so_dien_thoai}
                  onChange={handleChange}
                  placeholder="Số điện thoại"
                  className="w-full rounded-lg bg-[#4b2d68] text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-lozo-button"
                />
              </div>
            </div>

            {/* Phương thức thanh toán - Chỉ chuyển khoản ngân hàng */}
            <div className="rounded-2xl border border-[#4b2d68] bg-gradient-to-r from-[#371658] to-[#43166f] p-6">
              <h2 className="text-xl font-bold text-white mb-4">
                Phương thức thanh toán
              </h2>
              <div className="flex items-center gap-3 rounded-lg px-4 py-3 bg-lozo-button text-white">
                <Building2 className="h-5 w-5" />
                <span>Chuyển khoản ngân hàng</span>
              </div>
            </div>

            {/* Upload proof image */}
            <div className="rounded-2xl border border-[#4b2d68] bg-gradient-to-r from-[#371658] to-[#43166f] p-6">
                <h2 className="text-xl font-bold text-white mb-4">
                  Hình ảnh chứng minh thanh toán
                </h2>
                <div className="space-y-4">
                  {proofImagePreview ? (
                    <div className="relative">
                      <img
                        src={proofImagePreview}
                        alt="Proof preview"
                        className="w-full h-48 object-cover rounded-lg border border-[#4b2d68]"
                      />
                      <button
                        onClick={handleRemoveImage}
                        className="absolute top-2 right-2 p-2 bg-red-500/80 hover:bg-red-500 rounded-full text-white transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-[#4b2d68] rounded-lg cursor-pointer hover:border-lozo-button transition-colors bg-[#4b2d68]/30">
                      {uploadingImage ? (
                        <div className="flex flex-col items-center gap-2">
                          <Loader2 className="h-8 w-8 animate-spin text-lozo-button" />
                          <span className="text-[#d1d5db]">Đang upload...</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <Upload className="h-8 w-8 text-[#d1d5db]" />
                          <span className="text-[#d1d5db]">
                            Click để chọn hình ảnh
                          </span>
                          <span className="text-sm text-[#9ca3af]">
                            (JPG, PNG, tối đa 5MB)
                          </span>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageSelect}
                        className="hidden"
                        disabled={uploadingImage}
                      />
                    </label>
                  )}
                  {proofImage && (
                    <div className="flex items-center gap-2 text-sm text-green-400">
                      <ImageIcon className="h-4 w-4" />
                      <span>Đã upload thành công</span>
                    </div>
                  )}
                </div>
              </div>
          </div>

          {/* RIGHT: Summary */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-[#4b2d68] bg-gradient-to-r from-[#371658] to-[#43166f] p-6 sticky top-6">
              <h2 className="text-xl font-bold text-white mb-4">
                Thông tin đơn hàng
              </h2>

              {/* QR Code */}
              <div className="rounded-xl bg-white p-4 mb-6 flex flex-col items-center">
                <p className="text-gray-700 text-sm font-medium mb-3 text-center">
                  Quét mã QR để thanh toán
                </p>
                <img
                  src="/qr.jpeg"
                  alt="QR Code thanh toán"
                  className="w-full max-w-[250px] h-auto rounded-lg"
                />
                <p className="text-gray-500 text-xs mt-3 text-center">
                  Chủ tài khoản: PHAM MINH NHAT
                  <br />
                  STK: 0001128325462
                </p>
              </div>

              <div className="rounded-xl bg-[#4d226f] p-4 mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-[20%] bg-lozo-shield">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{title}</h3>
                    <p className="text-sm text-[#d1d5db]">{period}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-sm text-[#d1d5db]">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-lozo-gray-400 pt-4 space-y-3">
                <div className="flex justify-between text-[#d1d5db]">
                  <span>Giá gói</span>
                  <span className="text-white">
                    {price.toLocaleString()} VND
                  </span>
                </div>
                <div className="flex justify-between text-[#d1d5db]">
                  <span>Giảm giá</span>
                  <span className="text-green-400">-0 VND</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-white">
                  <span>Tổng cộng</span>
                  <span>{price.toLocaleString()} VND</span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={loading || uploadingImage || !!pendingPayment}
                className={`w-full mt-6 rounded-xl py-3 font-medium transition-all flex items-center justify-center gap-2 ${
                  loading || uploadingImage || pendingPayment
                    ? "bg-lozo-button/50 cursor-not-allowed"
                    : "bg-lozo-button hover:opacity-90"
                } text-white`}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Đang xử lý...
                  </>
                ) : pendingPayment ? (
                  "Đang chờ duyệt thanh toán trước"
                ) : (
                  "Xác nhận thanh toán"
                )}
              </button>
              {pendingPayment && (
                <p className="text-yellow-400 text-xs text-center mt-2">
                  Vui lòng chờ admin duyệt thanh toán hiện tại trước khi tạo yêu cầu mới
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
