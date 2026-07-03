import api from "./api";

export const getDashboard = () =>
  api.get("/admin/dashboard");

export const getEmployees = () =>
  api.get("/admin/employees");

export const getLeaveRequests = () =>
  api.get("/admin/leaves");

export const approveLeave = (id) =>
  api.put(`/admin/approve/${id}`);

export const rejectLeave = (id) =>
  api.put(`/admin/reject/${id}`);