import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_APP_API,
  prepareHeaders: (headers) => {
    if (localStorage.getItem("starter:token")) {
      headers.set(
        "authorization",
        `Bearer ${localStorage.getItem("starter:token")}`
      );
    }

    return headers;
  },
});
