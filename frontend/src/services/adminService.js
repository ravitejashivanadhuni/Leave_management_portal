import api from "./api";

export const getDashboard = () =>
  api.get("/admin/dashboard");

export const getLeaveRequests = () =>
  api.get("/admin/leaves");

export const approveLeave = (id, data) =>
  api.put(`/admin/approve/${id}`, data);

export const rejectLeave = (id, data) =>
  api.put(`/admin/reject/${id}`, data);

export const getEmployees = () =>
  api.get("/admin/employees");