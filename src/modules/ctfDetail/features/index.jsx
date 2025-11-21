// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { ArrowLeft, CheckCircle, Clock, FileDown } from "lucide-react";
// import Header from "../../../components/Header/Header";

// const ctfDetail = () => {
//   const { id } = useParams(); // lấy ID ctf từ URL
//   const [ctf, setctf] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const token = localStorage.getItem("access_token");

//   useEffect(() => {
//     const fetchctf = async () => {
//       try {
//         const res = await axios.get(
//           `https://course-an-ninh-mang-backend.vercel.app/api/courses/ctf-detail/${id}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setctf(res.data);
//       } catch (error) {
//         console.error("Lỗi khi tải ctf:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchctf();
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-white">
//         Đang tải ctf...
//       </div>
//     );
//   }

//   if (!ctf) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-white">
//         Không tìm thấy ctf
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-lozo-dark to-lozo-darker text-white">
//       <Header />

//       <div className="max-w-5xl mx-auto px-8 py-12">
//         {/* Nút quay lại */}
//         <a
//           href="/ctfs"
//           className="inline-flex items-center text-lozo-primary hover:underline mb-8"
//         >
//           <ArrowLeft className="w-5 h-5 mr-2" /> Quay lại danh sách ctfs
//         </a>

//         {/* Thông tin ctf */}
//         <div className="p-8 rounded-2xl border border-gray-600/50 bg-gray-900/40 backdrop-blur-sm mb-8">
//           <div className="flex items-center justify-between mb-4">
//             <h1 className="text-3xl font-bold">{ctf.title}</h1>
//             {ctf.status === "completed" && (
//               <CheckCircle className="w-6 h-6 text-green-400" />
//             )}
//           </div>
//           <p className="text-gray-300 mb-4">{ctf.description}</p>

//           <div className="flex items-center text-gray-400 text-sm space-x-4">
//             <span className="px-3 py-1 border border-gray-600/40 rounded">
//               {ctf.difficulty}
//             </span>
//             <span className="flex items-center">
//               <Clock className="w-4 h-4 mr-1" />{" "}
//               {ctf.estimatedTime || "30 phút"}
//             </span>
//           </div>
//         </div>

//         {/* PDF Viewer */}
//         <div className="p-8 rounded-2xl border border-gray-700/50 bg-gray-900/40">
//           <h2 className="text-2xl font-semibold mb-4">Bài tập PDF</h2>
//           {ctf.pdfUrl ? (
//             <>
//               <iframe
//                 src={ctf.pdfUrl}
//                 title="ctf PDF"
//                 className="w-full h-[600px] border border-gray-600 rounded-lg mb-4"
//               />
//               <a
//                 href={ctf.pdfUrl}
//                 download
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-flex items-center bg-lozo-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-lozo-secondary transition"
//               >
//                 <FileDown className="w-4 h-4 mr-2" />
//                 Tải về file PDF
//               </a>
//             </>
//           ) : (
//             <p className="text-gray-400">Không có file PDF cho ctf này.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ctfDetail;
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import {
//   ArrowLeft,
//   FileDown,
//   Shield,
//   Users,
//   LogOut,
//   Bell,
//   Star,
//   User,
//   Clock,
// } from "lucide-react";
// import Header from "../../../components/Header/Header";
// import { ENDPOINTS } from "../../../routes/endPoints";

// const CTFDetail = () => {
//   const { id } = useParams(); // lấy ID ctf từ URL
//   const navigate = useNavigate();
//   const [ctf, setctf] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const token = localStorage.getItem("access_token");
//   const userrole = JSON.parse(localStorage.getItem("user"))?.role || "user";
//   const username = JSON.parse(localStorage.getItem("user"))?.name || "User";

//   useEffect(() => {
//     const fetchctf = async () => {
//       try {
//         const res = await axios.get(
//           `https://course-an-ninh-mang-backend.vercel.app/api/courses/ctf-detail/${id}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setctf(res.data);
//       } catch (error) {
//         console.error("Lỗi khi tải ctf:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchctf();
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-white">
//         Đang tải ctf...
//       </div>
//     );
//   }

//   if (!ctf) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-white">
//         Không tìm thấy ctf
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-lozo-dark to-lozo-darker text-white">
//       {/* Header */}
//       {userrole === "admin" ? (
//         <header className="bg-gradient-to-r from-orange-900 to-orange-800 border-b border-orange-700/50 px-6 py-3">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
//                 <Shield className="w-5 h-5 text-white" />
//               </div>
//               <span className="text-white font-bold text-xl">LozoAcademy</span>
//               <div className="bg-red-600 px-2 py-1 rounded text-white text-sm font-medium">
//                 ADMIN
//               </div>
//             </div>

//             <div className="flex items-center gap-4">
//               <Link
//                 to={ENDPOINTS.USER.MANAMENT}
//                 className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white transition-colors"
//               >
//                 <Users className="w-4 h-4" />
//                 <span>Quản lý khóa học</span>
//               </Link>
//               <Link
//                 to={ENDPOINTS.USER.ADMINDASHBOARD}
//                 className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white transition-colors"
//               >
//                 <Users className="w-4 h-4" />
//                 <span>Dashboard</span>
//               </Link>
//               <button className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white transition-colors">
//                 <Bell className="w-4 h-4" />
//                 <span>Xin chào, {username}</span>
//               </button>
//               <Link
//                 to="/"
//                 className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white transition-colors"
//               >
//                 <LogOut className="w-4 h-4" />
//                 <span>Đăng xuất</span>
//               </Link>
//             </div>
//           </div>
//         </header>
//       ) : (
//         <Header />
//       )}

//       {/* Nội dung */}
//       <div className="max-w-5xl mx-auto px-8 py-12">
//         {/* Nút quay lại */}
//         <button
//           onClick={() => navigate(-1)}
//           className="inline-flex items-center text-lozo-primary hover:underline mb-8"
//         >
//           <ArrowLeft className="w-5 h-5 mr-2" /> Quay lại danh sách ctfs
//         </button>

//         {/* Thông tin CTF */}
//         <div className="p-8 rounded-2xl border border-gray-600/50 bg-gray-900/40 backdrop-blur-sm mb-8">
//           <h1 className="text-3xl font-bold mb-4">{ctf.ten}</h1>
//           <p className="text-gray-300 mb-4">{ctf.mota}</p>

//           <div className="bg-white shadow-lg rounded-2xl p-6">
//             <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-gray-700">
//               <div className="flex items-center gap-2">
//                 <Star size={16} className="text-yellow-500" />
//                 <span>
//                   <strong>Loại CTF:</strong> {ctf.loaictf}
//                 </span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <User size={16} className="text-blue-500" />
//                 <span>
//                   <strong>Tác giả:</strong> {ctf.tacgia}
//                 </span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Clock size={16} className="text-green-500" />
//                 <span>
//                   <strong>Thời lượng:</strong>{" "}
//                   {ctf.duration.seconds || "Không giới hạn"}
//                 </span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Star size={16} className="text-orange-500" />
//                 <span>
//                   <strong>Điểm:</strong> {ctf.points || 0} pts
//                 </span>
//               </div>
//               <div className="col-span-2">
//                 <strong>Chỗ AI:</strong> {ctf.choai || "Không có"}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* PDF Viewer */}
//         <div className="p-8 rounded-2xl border border-gray-700/50 bg-gray-900/40">
//           <h2 className="text-2xl font-semibold mb-4">Bài tập PDF</h2>
//           {ctf.pdf_url ? (
//             <>
//               <iframe
//                 src={ctf.pdf_url}
//                 title="ctf PDF"
//                 className="w-full h-[600px] border border-gray-600 rounded-lg mb-4"
//               />
//               <a
//                 href={ctf.pdf_url}
//                 download
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-flex items-center bg-lozo-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-lozo-secondary transition"
//               >
//                 <FileDown className="w-4 h-4 mr-2" />
//                 Tải về file PDF
//               </a>
//             </>
//           ) : (
//             <p className="text-gray-400">Không có file PDF cho ctf này.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CTFDetail;
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { getConfig } from "../../../configs/getConfig.config";
import {
  ArrowLeft,
  FileDown,
  Shield,
  Users,
  LogOut,
  Bell,
  Star,
  User,
  Clock,
  CheckCircle,
  XCircle,
  Award,
  Tag,
  BookOpen,
  Flag,
  Upload,
  X,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";
import Header from "../../../components/Header/Header";
import { ENDPOINTS } from "../../../routes/endPoints";
import { uploadToCloudinary } from "../../../utils/cloudinaryUpload";

const CTFDetail = () => {
  const { id } = useParams(); // lấy ID ctf từ URL
  const navigate = useNavigate();
  const [ctf, setctf] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("access_token");
  const userrole = JSON.parse(localStorage.getItem("user"))?.role || "user";
  const username = JSON.parse(localStorage.getItem("user"))?.name || "User";

  // State cho nộp đáp án
  const [answerText, setAnswerText] = useState("");
  const [answerFile, setAnswerFile] = useState(null);
  const [answerFilePreview, setAnswerFilePreview] = useState(null);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null); // null | 'success' | 'error'
  const [submitMessage, setSubmitMessage] = useState("");

  // State cho timer
  const [timeRemaining, setTimeRemaining] = useState(null); // seconds
  const [timerStarted, setTimerStarted] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);

  // Parse duration từ string (ví dụ: "15 minutes", "1 hour 30 minutes") sang seconds
  const parseDurationToSeconds = (duration) => {
    if (!duration) return null;
    
    // Nếu là string
    if (typeof duration === "string") {
      let totalSeconds = 0;
      
      // Parse "15 minutes" hoặc "15 phút"
      const minutesMatch = duration.match(/(\d+)\s*(?:minutes?|ph[uú]t)/i);
      if (minutesMatch) {
        totalSeconds += parseInt(minutesMatch[1]) * 60;
      }
      
      // Parse "1 hour" hoặc "1 giờ"
      const hoursMatch = duration.match(/(\d+)\s*(?:hours?|gi[ờơ])/i);
      if (hoursMatch) {
        totalSeconds += parseInt(hoursMatch[1]) * 3600;
      }
      
      // Parse "45 seconds" hoặc "45 giây"
      const secondsMatch = duration.match(/(\d+)\s*(?:seconds?|giây)/i);
      if (secondsMatch) {
        totalSeconds += parseInt(secondsMatch[1]);
      }
      
      // Parse "1 hour 30 minutes"
      const hourMinutesMatch = duration.match(/(\d+)\s*(?:hours?|gi[ờơ])\s*(\d+)\s*(?:minutes?|ph[uú]t)/i);
      if (hourMinutesMatch) {
        totalSeconds = parseInt(hourMinutesMatch[1]) * 3600 + parseInt(hourMinutesMatch[2]) * 60;
      }
      
      return totalSeconds > 0 ? totalSeconds : null;
    }
    
    // Nếu là object (PostgreSQL INTERVAL)
    if (typeof duration === "object") {
      const { years, months, days, hours, minutes, seconds } = duration;
      let totalSeconds = 0;
      if (years) totalSeconds += years * 365 * 24 * 3600;
      if (months) totalSeconds += months * 30 * 24 * 3600;
      if (days) totalSeconds += days * 24 * 3600;
      if (hours) totalSeconds += hours * 3600;
      if (minutes) totalSeconds += minutes * 60;
      if (seconds) totalSeconds += seconds;
      return totalSeconds > 0 ? totalSeconds : null;
    }
    
    return null;
  };

  useEffect(() => {
    const fetchctf = async () => {
      try {
        const { apiUrl } = getConfig();
        const baseApiUrl = apiUrl.endsWith("/api") ? apiUrl : `${apiUrl}/api`;
        const res = await axios.get(
          `${baseApiUrl}/ctf/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        // Backend trả về: { error_code: 0, message: "Success", data: {...} }
        const ctfData = res.data.data || res.data;
        setctf(ctfData);
        
        // Khởi tạo timer nếu có duration và CTF chưa hoàn thành
        if (ctfData.duration && !(ctfData.status === "completed" || ctfData.hasSubmitted)) {
          const durationSeconds = parseDurationToSeconds(ctfData.duration);
          if (durationSeconds) {
            // Kiểm tra xem đã có timer trong localStorage chưa
            const timerKey = `ctf_timer_${id}`;
            const savedTimer = localStorage.getItem(timerKey);
            
            if (savedTimer) {
              const { startTime, duration } = JSON.parse(savedTimer);
              const elapsed = Math.floor((Date.now() - startTime) / 1000);
              const remaining = duration - elapsed;
              
              if (remaining > 0) {
                setTimeRemaining(remaining);
                setTimerStarted(true);
              } else {
                setTimerExpired(true);
                localStorage.removeItem(timerKey);
              }
            } else {
              // Bắt đầu timer mới
              const startTime = Date.now();
              localStorage.setItem(timerKey, JSON.stringify({ startTime, duration: durationSeconds }));
              setTimeRemaining(durationSeconds);
              setTimerStarted(true);
            }
          }
        }
      } catch (error) {
        console.error("Lỗi khi tải ctf:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchctf();
  }, [id]);

  // Timer countdown effect
  useEffect(() => {
    if (!timerStarted || timerExpired || timeRemaining === null) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setTimerExpired(true);
          const timerKey = `ctf_timer_${id}`;
          localStorage.removeItem(timerKey);
          toast.warning("⏰ Hết thời gian làm bài!", { position: "top-center", autoClose: 5000 });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerStarted, timerExpired, id]);

  // Xử lý chọn file
  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type (cho phép tất cả file types)
    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setSubmitResult("error");
      setSubmitMessage("Kích thước file không được vượt quá 10MB!");
      return;
    }

    try {
      setUploadingFile(true);
      setSubmitResult(null);
      setSubmitMessage("");

      // Create preview
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setAnswerFilePreview(reader.result);
        };
        reader.readAsDataURL(file);
      }

      // Upload to Cloudinary
      const uploadResult = await uploadToCloudinary(file, {
        folder: "ctf-answers",
        resourceType: "auto",
      });
      
      setAnswerFile({
        file,
        url: uploadResult.url,
        publicId: uploadResult.publicId,
      });
    } catch (err) {
      console.error("Error uploading file:", err);
      setSubmitResult("error");
      setSubmitMessage(err.message || "Lỗi khi upload file!");
      setAnswerFile(null);
      setAnswerFilePreview(null);
    } finally {
      setUploadingFile(false);
    }
  };

  const handleRemoveFile = () => {
    setAnswerFile(null);
    setAnswerFilePreview(null);
  };

  // Xử lý nộp đáp án
  const handleSubmitAnswer = async (e) => {
    e.preventDefault();
    
    // Kiểm tra timer đã hết chưa
    if (timerExpired) {
      setSubmitResult("error");
      setSubmitMessage("⏰ Hết thời gian làm bài! Không thể nộp đáp án.");
      return;
    }
    
    if (!answerText && !answerFile) {
      setSubmitResult("error");
      setSubmitMessage("Vui lòng nhập đáp án text hoặc upload file!");
      return;
    }

    try {
      setSubmitting(true);
      setSubmitResult(null);
      setSubmitMessage("");

      const { apiUrl } = getConfig();
      const baseApiUrl = apiUrl.endsWith("/api") ? apiUrl : `${apiUrl}/api`;
      
      const response = await axios.post(
        `${baseApiUrl}/ctf/${id}/submit`,
        {
          answerText: answerText || null,
          answerFileUrl: answerFile?.url || null,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data.data || response.data;
      
      setSubmitResult("success");
      setSubmitMessage(response.data.message || "Nộp đáp án thành công! Điểm đã được cập nhật.");
      
      // Reset form
      setAnswerText("");
      setAnswerFile(null);
      setAnswerFilePreview(null);
      
      // Refresh CTF data to show updated status
      const res = await axios.get(
        `${baseApiUrl}/ctf/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const ctfData = res.data.data || res.data;
      setctf(ctfData);
    } catch (err) {
      console.error("Error submitting answer:", err);
      setSubmitResult("error");
      setSubmitMessage(
        err.response?.data?.message || "Lỗi khi nộp đáp án. Vui lòng thử lại!"
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Đang tải ctf...
      </div>
    );
  }

  if (!ctf) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Không tìm thấy ctf
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-lozo-dark to-lozo-darker text-white">
        <Header />

      {/* Nội dung */}
      <div className="max-w-5xl mx-auto px-8 py-12">
        {/* Nút quay lại */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-lozo-primary hover:underline mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Quay lại danh sách ctfs
        </button>

        {/* Timer - Hiển thị nổi bật (chỉ hiển thị khi chưa hoàn thành) */}
        {timerStarted && timeRemaining !== null && !(ctf.status === "completed" || ctf.hasSubmitted) && (
          <div className={`mb-6 rounded-2xl shadow-xl overflow-hidden ${
            timerExpired 
              ? "bg-gradient-to-r from-red-600 to-red-700" 
              : timeRemaining <= 300 
                ? "bg-gradient-to-r from-orange-600 to-orange-700" 
                : "bg-gradient-to-r from-blue-600 to-blue-700"
          }`}>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white/80 text-sm font-medium">Thời gian còn lại</p>
                    <p className={`text-3xl font-bold text-white ${
                      timerExpired ? "animate-pulse" : ""
                    }`}>
                      {timerExpired 
                        ? "00:00:00" 
                        : `${Math.floor(timeRemaining / 3600).toString().padStart(2, '0')}:${Math.floor((timeRemaining % 3600) / 60).toString().padStart(2, '0')}:${(timeRemaining % 60).toString().padStart(2, '0')}`
                      }
                    </p>
                  </div>
                </div>
                {timerExpired && (
                  <div className="px-4 py-2 bg-white/20 rounded-lg">
                    <p className="text-white font-semibold">⏰ Hết thời gian</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Thông tin CTF */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          {/* Header với gradient */}
          <div className="bg-gradient-to-r from-lozo-purple via-lozo-purple-light to-lozo-secondary p-8">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-white mb-3">
                  {ctf.title || ctf.ten}
                </h1>
                <p className="text-white/90 text-lg leading-relaxed">
                  {ctf.description || ctf.mota}
                </p>
              </div>
              {ctf.status === "completed" && (
                <div className="ml-4">
                  <CheckCircle className="w-8 h-8 text-green-300" />
                </div>
              )}
            </div>
          </div>

          {/* Thông tin chi tiết */}
          <div className="p-6 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                  <Tag className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-medium mb-1">Loại CTF</p>
                  <p className="text-gray-900 font-semibold">
                    {ctf.category || ctf.loaictf || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-medium mb-1">Tác giả</p>
                  <p className="text-gray-900 font-semibold">
                    {ctf.author || ctf.tacgia || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-medium mb-1">Thời lượng</p>
                  <p className="text-gray-900 font-semibold">
                    {ctf.duration?.seconds 
                      ? `${ctf.duration.seconds} phút` 
                      : ctf.duration || "Không giới hạn"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-medium mb-1">Điểm</p>
                  <p className="text-gray-900 font-semibold">
                    {ctf.points || 0} pts
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-medium mb-1">Độ khó</p>
                  <p className="text-gray-900 font-semibold">
                    {ctf.difficulty || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-medium mb-1">Dành cho ai</p>
                  <p className="text-gray-900 font-semibold">
                    {ctf.choai || "Không có"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-red-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Bài tập PDF</h2>
            </div>
          </div>
          <div className="p-8">
            {ctf.pdfUrl || ctf.pdf_url ? (
              <div className="space-y-4">
              {/* Hiển thị PDF trực tiếp từ Cloudinary */}
              <div className="w-full h-[600px] border-2 border-gray-200 rounded-xl shadow-lg overflow-hidden bg-gray-100">
              <iframe
                  src={ctf.pdfUrl || ctf.pdf_url}
                  title="CTF PDF"
                  className="w-full h-full"
                  allow="fullscreen"
                  onError={() => {
                    console.error('Error loading PDF in iframe');
                  }}
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    window.open(ctf.pdfUrl || ctf.pdf_url, '_blank');
                  }}
                  className="inline-flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-700 transition-colors"
                >
                  <BookOpen className="w-5 h-5" />
                  Mở trong tab mới
                </button>
                <button
                  onClick={async () => {
                    try {
                      const pdfUrl = ctf.pdfUrl || ctf.pdf_url;
                      const response = await fetch(pdfUrl);
                      const blob = await response.blob();
                      const url = window.URL.createObjectURL(blob);
                      const link = document.createElement('a');
                      link.href = url;
                      link.download = `ctf-${ctf.title || id}.pdf`;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                      window.URL.revokeObjectURL(url);
                      toast.success('Đang tải file PDF...', { position: "top-right", autoClose: 2000 });
                    } catch (error) {
                      console.error('Error downloading PDF:', error);
                      toast.error('Không thể tải file PDF', { position: "top-right", autoClose: 3000 });
                    }
                  }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-lozo-purple to-lozo-purple-light text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-lg"
                >
                  <FileDown className="w-5 h-5" />
                  Tải về file PDF
                </button>
              </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <BookOpen className="w-10 h-10 text-gray-400" />
                </div>
                <p className="text-gray-500 text-lg">Không có file PDF cho CTF này.</p>
              </div>
            )}
          </div>
        </div>

        {/* Nộp Đáp Án */}
        <section className="bg-white rounded-2xl shadow-xl overflow-hidden mt-8">
          <div className="bg-gradient-to-r from-lozo-purple to-lozo-purple-light p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                <Flag className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Nộp Đáp Án</h2>
            </div>
          </div>
          <div className="p-8">
            {(ctf.hasSubmitted || ctf.status === "completed") ? (
              <div className="space-y-6">
                <div className="p-6 bg-green-50 border-2 border-green-200 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-green-800 font-bold text-xl">
                        Đã nộp đáp án
                      </h3>
                      <p className="text-green-600 text-sm mt-1">
                        Bạn đã nộp đáp án cho CTF này. Không thể nộp lại.
                      </p>
                    </div>
                  </div>
                  {ctf.submittedAnswer && (
                    <div className="mt-4 p-4 bg-white rounded-lg border border-green-200">
                      <p className="text-gray-700 font-semibold mb-2">Đáp án đã nộp (Text):</p>
                      <p className="text-gray-600">{ctf.submittedAnswer}</p>
                    </div>
                  )}
                  {ctf.submittedFile && (
                    <div className="mt-4 p-4 bg-white rounded-lg border border-green-200">
                      <p className="text-gray-700 font-semibold mb-2">File đã nộp:</p>
                      <a
                        href={ctf.submittedFile}
                target="_blank"
                rel="noopener noreferrer"
                        className="text-blue-600 hover:underline flex items-center gap-2"
                      >
                        <FileDown className="w-4 h-4" />
                        Xem file đã nộp
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitAnswer} className="space-y-6">
              {/* Text Answer */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Đáp án (Text)
                </label>
                <textarea
                  placeholder="Nhập đáp án của bạn (ví dụ: lozo{flag_here}) hoặc mô tả chi tiết..."
                  className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lozo-purple focus:border-transparent transition-all text-lg min-h-[120px] resize-y"
                  value={answerText}
                  onChange={(e) => {
                    setAnswerText(e.target.value);
                    setSubmitResult(null);
                  }}
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Hoặc Upload File
                </label>
                {answerFilePreview ? (
                  <div className="relative">
                    <img
                      src={answerFilePreview}
                      alt="File preview"
                      className="w-full h-48 object-cover rounded-xl border-2 border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="absolute top-2 right-2 p-2 bg-red-500/80 hover:bg-red-500 rounded-full text-white transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : answerFile ? (
                  <div className="p-4 bg-gray-50 border-2 border-gray-200 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileDown className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-700 font-medium">
                        {answerFile.file.name}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-lozo-purple transition-colors bg-gray-50">
                    {uploadingFile ? (
                      <div className="flex flex-col items-center gap-2">
                        <Loader2 className="h-8 w-8 animate-spin text-lozo-purple" />
                        <span className="text-gray-600">Đang upload...</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <Upload className="h-8 w-8 text-gray-400" />
                        <span className="text-gray-600 font-medium">
                          Click để chọn file
                        </span>
                        <span className="text-sm text-gray-400">
                          (Tất cả định dạng, tối đa 10MB)
                        </span>
                      </div>
                    )}
                    <input
                      type="file"
                      onChange={handleFileSelect}
                      className="hidden"
                      disabled={uploadingFile}
                    />
                  </label>
                )}
                {answerFile && (
                  <div className="flex items-center gap-2 text-sm text-green-600 mt-2">
                    <ImageIcon className="h-4 w-4" />
                    <span>File đã được upload thành công</span>
                  </div>
          )}
        </div>

              {/* Submit Button */}
            <button
              type="submit"
                disabled={submitting || uploadingFile || (!answerText && !answerFile) || timerExpired}
                className="w-full px-8 py-4 bg-gradient-to-r from-lozo-purple to-lozo-purple-light text-white rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-lg text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Đang nộp...</span>
                  </>
                ) : (
                  <>
                    <Flag className="w-5 h-5" />
                    <span>Nộp Đáp Án</span>
                  </>
                )}
            </button>

          {/* Hiển thị kết quả */}
              {submitResult === "success" && (
                <div className="p-4 bg-green-50 border-2 border-green-200 rounded-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-green-800 font-semibold text-lg">
                      Nộp đáp án thành công! 🎉
                    </p>
                    <p className="text-green-600 text-sm mt-1">
                      {submitMessage || "Điểm đã được cập nhật."}
                    </p>
                  </div>
            </div>
          )}
              {submitResult === "error" && (
                <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                    <XCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-red-800 font-semibold text-lg">
                      Lỗi
                    </p>
                    <p className="text-red-600 text-sm mt-1">
                      {submitMessage || "Vui lòng thử lại!"}
                    </p>
                  </div>
            </div>
          )}
            </form>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CTFDetail;
