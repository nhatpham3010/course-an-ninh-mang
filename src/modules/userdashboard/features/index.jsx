// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { ENDPOINTS } from "../../../routes/endPoints";
// import Header from "../../../components/Header/Header";
// import {
//   BookOpen,
//   CheckCircle,
//   Target,
//   TrendingUp,
//   Shield,
//   Users,
//   LogOut,
//   Award,
//   Zap,
//   FlaskConical,
// } from "lucide-react";

// export default function UserDashboard() {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState("khoa-hoc");

//   const stats = [
//     {
//       title: "Khóa học đang học",
//       value: "3",
//       subtitle: "+1 tuần này",
//       icon: BookOpen,
//       color: "purple",
//       gradient: "from-purple-500 to-pink-500",
//       link: ENDPOINTS.USER.COURSES,
//     },
//     {
//       title: "Module hoàn thành",
//       value: "22",
//       subtitle: "+5 tuần này",
//       icon: CheckCircle,
//       color: "green",
//       gradient: "from-green-500 to-emerald-500",
//       link: ENDPOINTS.USER.COURSES,
//     },
//     {
//       title: "Lab hoàn thành",
//       value: "15",
//       subtitle: "+3 tuần này",
//       icon: Target,
//       color: "blue",
//       gradient: "from-blue-500 to-cyan-500",
//       link: ENDPOINTS.USER.LABS,
//     },
//     {
//       title: "Chứng chỉ đã nhận",
//       value: "10",
//       subtitle: "+1 tuần này",
//       icon: Award,
//       color: "orange",
//       gradient: "from-orange-500 to-red-500",
//       link: ENDPOINTS.USER.CER,
//     },
//   ];

//   const learningProgress = [
//     {
//       title: "An ninh mạng cơ bản",
//       progress: 75,
//       modules: "9/12 modules",
//       lastAccess: "Lần cuối: 2 ngày trước",
//     },
//     {
//       title: "Ethical Hacking cơ bản",
//       progress: 45,
//       modules: "7/15 modules",
//       lastAccess: "Lần cuối: 1 tuần trước",
//     },
//     {
//       title: "Thử thách CTF",
//       progress: 30,
//       modules: "6/20 modules",
//       lastAccess: "Lần cuối: 3 ngày trước",
//     },
//   ];

//   const recentActivities = [
//     {
//       title: "Hoàn thành: Network Security Basics",
//       time: "2 giờ trước",
//       points: "+50 điểm",
//     },
//     {
//       title: "Hoàn thành lab: SQL Injection Practice",
//       time: "1 ngày trước",
//       points: "+75 điểm",
//     },
//     {
//       title: "Vượt qua quiz: Web Security Fundamentals",
//       time: "2 ngày trước",
//       points: "+25 điểm",
//     },
//   ];

//   const actionCards = [
//     {
//       title: "Khóa học",
//       subtitle: "Xem thông tin từng khóa học",
//       icon: BookOpen,
//       gradient: "from-purple-500 to-pink-500",
//       link: ENDPOINTS.USER.COURSES,
//     },
//     {
//       title: "Thực hành Lab",
//       subtitle: "Luyện tập với bài lab thực tế",
//       icon: Target,
//       gradient: "from-blue-500 to-cyan-500",
//       link: ENDPOINTS.USER.LABS,
//     },
//     {
//       title: "Thử thách CTF",
//       subtitle: "Tham gia các cuộc thi CTF",
//       icon: Award,
//       gradient: "from-orange-500 to-red-500",
//       link: ENDPOINTS.USER.CFT,
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-lozo-form-bg to-lozo-form-mid">
//       {/* Header */}
//       <Header />

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
//         {/* Welcome Section */}
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
//           <div>
//             <h1 className="text-4xl font-bold text-white mb-2">
//               Chào mừng trở lại,{" "}
//               <span className="text-lozo-purple-light">user</span>
//             </h1>
//             <p className="text-white/80 text-xl">
//               Tiếp tục hành trình học tập an ninh mạng của bạn nhé ~
//             </p>
//           </div>

//           {/* Flashcard Feature */}
//           <Link
//             to={ENDPOINTS.USER.FLASHCARD}
//             className="bg-gray-800/60 border border-gray-600 rounded-2xl p-4 flex items-center gap-4 backdrop-blur-sm"
//           >
//             <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl flex items-center justify-center transform -rotate-1">
//               <img
//                 src="https://api.builder.io/api/v1/image/assets/TEMP/e27bb23ccb6db08dab340dc18d3524cf95de075e?width=88"
//                 alt="Flashcards"
//                 className="w-11 h-14"
//               />
//             </div>
//             <div>
//               <h3 className="text-white font-bold text-xl">
//                 Học với Flashcard
//               </h3>
//             </div>
//           </Link>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
//           {stats.map((stat, index) => {
//             const IconComponent = stat.icon;
//             return (
//               <Link
//                 to={stat.link}
//                 key={index}
//                 className="bg-gray-800/60 border border-gray-600 rounded-xl p-6 backdrop-blur-sm relative overflow-hidden"
//               >
//                 {/* Gradient Corner */}
//                 <div
//                   className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${stat.gradient} opacity-20 rounded-bl-full`}
//                 ></div>

//                 <div className="flex items-start justify-between mb-6">
//                   <div
//                     className={`p-3 rounded-lg bg-gradient-to-r ${stat.gradient}`}
//                   >
//                     <IconComponent className="w-6 h-6 text-white" />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <p className="text-3xl font-bold text-white">{stat.value}</p>
//                   <p className="text-gray-400 text-lg">{stat.title}</p>
//                   <p
//                     className={`text-sm font-medium ${stat.color === "purple" ? "text-purple-400" : stat.color === "green" ? "text-green-400" : stat.color === "blue" ? "text-blue-400" : "text-orange-400"}`}
//                   >
//                     {stat.subtitle}
//                   </p>
//                 </div>
//               </Link>
//             );
//           })}
//         </div>

//         {/* Main Content Grid */}
//         <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
//           {/* Learning Progress */}
//           <div className="xl:col-span-2">
//             <div className="bg-gray-800/60 border border-gray-600 rounded-xl p-6 backdrop-blur-sm">
//               <div className="flex items-center justify-between mb-8">
//                 <h2 className="text-2xl font-bold text-white">
//                   Tiến độ học tập
//                 </h2>
//                 <Zap className="w-9 h-9 text-lozo-purple-light" />
//               </div>

//               <div className="space-y-6">
//                 {learningProgress.map((course, index) => (
//                   <div key={index} className="space-y-3">
//                     <div className="flex items-center justify-between">
//                       <h3 className="text-lg font-semibold text-white">
//                         {course.title}
//                       </h3>
//                       <span className="text-lozo-purple-light font-medium">
//                         {course.progress}%
//                       </span>
//                     </div>

//                     <div className="w-full bg-gray-600 rounded-full h-2">
//                       <div
//                         className="bg-gradient-to-r from-lozo-purple to-lozo-purple-light h-2 rounded-full transition-all duration-300"
//                         style={{ width: `${course.progress}%` }}
//                       ></div>
//                     </div>

//                     <div className="flex items-center justify-between text-sm">
//                       <span className="text-gray-400">{course.modules}</span>
//                       <span className="text-gray-400">{course.lastAccess}</span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Recent Activity */}
//           <div>
//             <div className="bg-gray-800/60 border border-gray-600 rounded-xl p-6 backdrop-blur-sm">
//               <h3 className="text-xl font-bold text-white mb-6">
//                 Hoạt động gần đây
//               </h3>

//               <div className="space-y-4">
//                 {recentActivities.map((activity, index) => (
//                   <div key={index} className="flex items-start gap-3">
//                     <div className="w-8 h-8 bg-gradient-to-r from-lozo-purple to-lozo-purple-light rounded-full flex items-center justify-center flex-shrink-0 mt-1">
//                       <CheckCircle className="w-4 h-4 text-white" />
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <p className="text-white font-medium text-sm leading-relaxed">
//                         {activity.title}
//                       </p>
//                       <div className="flex items-center justify-between mt-2">
//                         <span className="text-gray-400 text-sm">
//                           {activity.time}
//                         </span>
//                         <span className="text-lozo-purple-light text-sm font-medium">
//                           {activity.points}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Action Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {actionCards.map((card, index) => {
//             const IconComponent = card.icon;
//             return (
//               <div
//                 key={index}
//                 className="bg-gray-800/60 border border-gray-600 rounded-xl p-6 backdrop-blur-sm hover:scale-105 transition-transform cursor-pointer"
//               >
//                 <Link to={card.link} className="text-center space-y-4">
//                   <div
//                     className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${card.gradient} flex items-center justify-center`}
//                   >
//                     <IconComponent className="w-8 h-8 text-white" />
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-bold text-white mb-2">
//                       {card.title}
//                     </h3>
//                     <p className="text-gray-400">{card.subtitle}</p>
//                   </div>
//                 </Link>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ENDPOINTS } from "../../../routes/endPoints";
import Header from "../../../components/Header/Header";
import { BookOpen, CheckCircle, Target, Award, Zap, CreditCard, Clock, CheckCircle2, XCircle, GraduationCap } from "lucide-react";
import axios from "axios";
import { getConfig } from "../../../configs/getConfig.config";

export default function UserDashboard() {
  const navigate = useNavigate();
  const username = JSON.parse(localStorage.getItem("user")).name;
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
        // Lấy token từ localStorage hoặc nơi bạn lưu
        const token = localStorage.getItem("access_token");

        const { apiUrl } = getConfig();
        const baseApiUrl = apiUrl.endsWith("/api") ? apiUrl : `${apiUrl}/api`;
        const response = await axios.get(
          `${baseApiUrl}/user`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // thêm token vào header
            },
          }
        );

        // Backend trả về: { error_code: 0, message: "Success", data: {...} }
        const dashboardData = response.data.data || response.data;
        setDashboardData(dashboardData);
      } catch (error) {
        console.error("Lỗi khi tải dashboard:", error);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-lozo-form-bg to-lozo-form-mid">
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Chào mừng */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Chào mừng trở lại,{" "}
              <span className="text-lozo-purple-light">{username}</span>
            </h1>
            <p className="text-white/80 text-xl">
              Tiếp tục hành trình học tập an ninh mạng của bạn nhé ~
            </p>
          </div>
          {/* Gói học và khóa học đang tham gia */}
          <div className="flex flex-col gap-3">
            {dashboardData.userInfo?.currentPackage ? (
              <div className="bg-gradient-to-r from-lozo-purple to-lozo-purple-light rounded-xl p-4 border border-lozo-purple-light/50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Award className="w-6 h-6 text-white" />
                    <div>
                      <p className="text-white/80 text-sm">Gói học đang tham gia</p>
                      <p className="text-white font-bold text-lg">
                        {dashboardData.userInfo.currentPackage}
                      </p>
                    </div>
                  </div>
                </div>
                <Link
                  to={ENDPOINTS.USER.PACKAGES}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors text-sm font-medium"
                >
                  <Award className="w-4 h-4" />
                  Nâng cấp
                </Link>
              </div>
            ) : (
              <Link
                to={ENDPOINTS.USER.PACKAGES}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-lozo-purple to-lozo-purple-light text-white rounded-xl hover:opacity-90 transition-opacity font-semibold"
              >
                <Award className="w-5 h-5" />
                Nâng cấp ngay
              </Link>
            )}
            {dashboardData.userInfo?.courses && dashboardData.userInfo.courses.length > 0 && (
              <div className="bg-gray-800/60 border border-gray-600 rounded-xl p-4 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-3">
                  <GraduationCap className="w-5 h-5 text-lozo-purple-light" />
                  <p className="text-white font-semibold">Khóa học đang tham gia</p>
                </div>
                <div className="space-y-2">
                  {dashboardData.userInfo.courses.slice(0, 3).map((course) => (
                    <div
                      key={course.id}
                      className="bg-gray-700/40 rounded-lg p-3 border border-gray-600/50"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-white font-medium text-sm flex-1">{course.ten}</h4>
                        <span className="text-lozo-purple-light text-xs font-medium">
                          {course.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-600 rounded-full h-1.5 mb-1">
                        <div
                          className="bg-gradient-to-r from-lozo-purple to-lozo-purple-light h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>{course.completed_lessons}/{course.total_lessons} bài học</span>
                        <span className="capitalize">{course.trangthai}</span>
                      </div>
                    </div>
                  ))}
                  {dashboardData.userInfo.courses.length > 3 && (
                    <Link
                      to={ENDPOINTS.USER.COURSES}
                      className="text-lozo-purple-light hover:text-lozo-purple text-xs font-medium text-center block pt-2"
                    >
                      Xem thêm {dashboardData.userInfo.courses.length - 3} khóa học khác →
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Thống kê (stats) */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {dashboardData.stats.map((stat, index) => {
            const icons = [BookOpen, CheckCircle, Target, Award];
            const colors = [
              "from-purple-500 to-pink-500",
              "from-green-500 to-emerald-500",
              "from-blue-500 to-cyan-500",
              "from-orange-500 to-red-500",
            ];
            const Icon = icons[index % icons.length];
            const gradient = colors[index % colors.length];

            return (
              <div
                key={index}
                className="bg-gray-800/60 border border-gray-600 rounded-xl p-6 backdrop-blur-sm relative overflow-hidden"
              >
                <div
                  className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${gradient} opacity-20 rounded-bl-full`}
                ></div>
                <div className="flex items-start justify-between mb-6">
                  <div
                    className={`p-3 rounded-lg bg-gradient-to-r ${gradient}`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                  <p className="text-gray-400 text-lg">{stat.title}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tiến độ học tập */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            <div className="bg-gray-800/60 border border-gray-600 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white">
                  Tiến độ học tập
                </h2>
                <Zap className="w-9 h-9 text-lozo-purple-light" />
              </div>

              <div className="space-y-6">
                {dashboardData.learningProgress.map((course, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-white">
                        {course.title}
                      </h3>
                      <span className="text-lozo-purple-light font-medium">
                        {course.progress}%
                      </span>
                    </div>

                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-lozo-purple to-lozo-purple-light h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">{course.modules}</span>
                      <span className="text-gray-400">{course.lastAccess}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hoạt động gần đây */}
          <div>
            <div className="bg-gray-800/60 border border-gray-600 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-6">
                Hoạt động gần đây
              </h3>

              <div className="space-y-4">
                {dashboardData.recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-lozo-purple to-lozo-purple-light rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium text-sm leading-relaxed">
                        {activity.title}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-gray-400 text-sm">
                          {activity.time}
                        </span>
                        <span className="text-lozo-purple-light text-sm font-medium">
                          {activity.points}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dashboardData.actionCards.map((card, index) => (
            <Link
              key={index}
              to={card.link}
              className="bg-gray-800/60 border border-gray-600 rounded-xl p-6 backdrop-blur-sm hover:scale-105 transition-transform cursor-pointer text-center space-y-4"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r from-lozo-purple to-lozo-purple-light flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-400">{card.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Lịch sử thanh toán */}
        <div className="bg-gray-800/60 border border-gray-600 rounded-xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <CreditCard className="w-6 h-6 text-lozo-purple-light" />
              <h2 className="text-2xl font-bold text-white">Lịch sử thanh toán</h2>
            </div>
            <Link
              to={ENDPOINTS.USER.PROFILE}
              className="text-lozo-purple-light hover:text-lozo-purple text-sm font-medium"
            >
              Xem tất cả →
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-8 text-gray-400">Đang tải...</div>
          ) : !dashboardData.payments || dashboardData.payments.length === 0 ? (
            <div className="text-center py-8">
              <CreditCard className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400 mb-4">Bạn chưa có giao dịch thanh toán nào</p>
                  <Link
                    to={ENDPOINTS.USER.PACKAGES}
                    className="inline-block px-6 py-2 bg-gradient-to-r from-lozo-purple to-lozo-purple-light text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
                  >
                    Nâng cấp ngay
                  </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {(dashboardData.payments || []).slice(0, 5).map((payment) => {
                const getStatusIcon = () => {
                  switch (payment.trang_thai) {
                    case "completed":
                      return <CheckCircle2 className="w-5 h-5 text-green-400" />;
                    case "rejected":
                      return <XCircle className="w-5 h-5 text-red-400" />;
                    default:
                      return <Clock className="w-5 h-5 text-yellow-400" />;
                  }
                };

                const getStatusText = () => {
                  switch (payment.trang_thai) {
                    case "completed":
                      return "Đã hoàn thành";
                    case "rejected":
                      return "Đã từ chối";
                    default:
                      return "Đang chờ duyệt";
                  }
                };

                const getStatusColor = () => {
                  switch (payment.trang_thai) {
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
                  });
                };

                const formatCurrency = (amount) => {
                  return new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(amount);
                };

                return (
                  <div
                    key={payment.id}
                    className="bg-gray-700/40 border border-gray-600 rounded-lg p-4 hover:bg-gray-700/60 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-white">
                            {payment.ten_goi}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getStatusColor()}`}
                          >
                            {getStatusIcon()}
                            {getStatusText()}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
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
                      </div>
                    </div>
                  </div>
                );
              })}
              {dashboardData.payments && dashboardData.payments.length > 5 && (
                <div className="text-center pt-4">
                  <Link
                    to={ENDPOINTS.USER.PROFILE}
                    className="text-lozo-purple-light hover:text-lozo-purple text-sm font-medium"
                  >
                    Xem thêm {dashboardData.payments.length - 5} giao dịch khác →
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
