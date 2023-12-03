export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const setBearerToken = (http) => {
  const token = localStorage.getItem("token");
  http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
