import { apiGet, apiPost } from "./http.js";

export const getCourses = () => apiGet("/courses");
export const getCourse = (courseId) => apiGet(`/courses/${courseId}`);
export const enrollCourse = ({ courseId }) =>
  apiPost("/enrollments", { courseId });
export const getEnrollments = () => apiGet("/users/me/enrollments");
export const createCourse = (payload) => apiPost("/courses", payload);
