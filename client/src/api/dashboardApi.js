import apiClient from "./apiClient";

export const fetchData = (type) => {
  return apiClient.get(`/data/${type.toLowerCase()}`).then((r) => {
    console.log(`[${type}] Response:`, r.data);

    const data = r.data.data;

    if (!data) {
      return null;
    }

    if (Array.isArray(data)) {
      return data.length > 0 ? data[0] : null;
    }

    return data;
  }).catch(err => {
    console.error(`[${type}] Error:`, err);
    return null;
  });
};
