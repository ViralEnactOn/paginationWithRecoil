/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { atom, selector, useRecoilCallback } from "recoil";

export const baseURL = "https://dummyjson.com";

export const limitState = atom({
  key: "limit",
  default: 10,
});

export const skipState = atom({
  key: "skip",
  default: 0,
});

export const industriesDataState = atom({
  key: "industriesData",
  default: null,
});

export const fetchIndustriesData = selector({
  key: "fetchIndustriesData",
  get: ({ get }) => {
    const limit = get(limitState);
    const skip = get(skipState);
    return API_CALL({ limit, skip });
  },
  set: (limit, skip) => {
    console.log("called", limit, skip);
    // return API_CALL({ limit, skip });
  },
});

async function API_CALL({ limit, skip }) {
  try {
    const response = await fetch(
      `${baseURL}/todos?limit=${limit}&skip=${skip}`
    );
    const data = await response.json();
    return data.todos;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
