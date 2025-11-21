import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { getConfig } from "../configs/getConfig.config";

// Get API URL from config
const getApiBaseUrl = () => {
  const { apiUrl } = getConfig();
  return apiUrl.endsWith("/api") ? apiUrl : `${apiUrl}/api`;
};

// Create axios instance with dynamic baseURL
const createApiInstance = () => {
  const token = localStorage.getItem("access_token");
  return axios.create({
    baseURL: getApiBaseUrl(),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

// Hook chính
export const useCourseData = (courseId, lessonId) => {
  const [courseData, setCourseData] = useState(null);
  const [lessonData, setLessonData] = useState(null);
  const [selectedLessonId, setSelectedLessonId] = useState(lessonId || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 Hàm lấy nội dung bài học (dùng lại được khi click sidebar)
  const fetchLessonById = useCallback(async (lessonId) => {
    try {
      setLoading(true);
      const api = createApiInstance();
      const lessonResponse = await api.get(`/courses/${lessonId}/content`);
      // Backend trả về: { error_code: 0, message: "Success", data: {...} }
      const lessonData = lessonResponse.data.data || lessonResponse.data;
      setLessonData(lessonData);
      setSelectedLessonId(lessonId);
      console.log("📗 Lesson Data:", lessonData);
    } catch (err) {
      console.error("❌ Lỗi khi tải bài học:", err);
      setError(err.response?.data?.message || "Không thể tải nội dung bài học");
      setLessonData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔹 Gọi API khóa học khi courseId thay đổi
  useEffect(() => {
    if (!courseId) {
      setError("Thiếu ID khóa học");
      setLoading(false);
      return;
    }

    const fetchCourse = async () => {
      try {
        setLoading(true);
        setError(null);
        const api = createApiInstance();
        const courseResponse = await api.get(`/courses/${courseId}`);
        // Backend trả về: { error_code: 0, message: "Success", data: {...} }
        const course = courseResponse.data.data || courseResponse.data;
        setCourseData(course);
        console.log("📘 Course Data:", course);

        // Nếu chưa có lessonId => tự động lấy bài đầu tiên
        let initialLessonId =
          lessonId || (course.lessons?.length ? course.lessons[0].id : null);

        if (initialLessonId) {
          await fetchLessonById(initialLessonId);
        } else {
          setLessonData(null);
        }
      } catch (err) {
        console.error("❌ Lỗi khi fetch dữ liệu khóa học:", err);
        setError(err.response?.data?.message || "Lỗi kết nối backend");
        setCourseData(null);
        setLessonData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId, lessonId, fetchLessonById]);

  return {
    courseData,
    lessonData,
    loading,
    error,
    selectedLessonId,
    fetchLessonById, // 👈 dùng để gọi khi chọn bài học mới
  };
};
