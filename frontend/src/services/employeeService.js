import api from "./api";

export const getDashboard = () =>
  api.get("/employee/dashboard");

export const getLeaveHistory = () =>
  api.get("/employee/leaves");

export const applyLeave = (data) =>
  api.post("/employee/apply-leave", data);

export const cancelLeave = (id) =>
  api.delete(`/employee/cancel/${id}`);

export const getLeaveTypes = () =>
  api.get("/employee/leave-types");