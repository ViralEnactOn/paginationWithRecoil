/* eslint-disable no-async-promise-executor */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from "react";
import { atom, selector, useRecoilCallback, useRecoilState } from "recoil";

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
  set: ({ get, set }, { limit, newSkip }) => {
    // set(skipState, newSkip);
    // const response = await API_CALL({ limit, skip: newSkip });
    // const currentData = get(industriesDataState);
    // console.log({ currentData, response });
    // return [...currentData, ...response];
    return API_CALL({ limit, skip: newSkip });
  },
});

async function API_CALL({ limit, skip }) {
  // const [dataState, setDataState] = useRecoilState(industriesDataState);
  console.log("API_CALL", { limit, skip });

  try {
    const response = await fetch(
      `${baseURL}/todos?limit=${limit}&skip=${skip}`
    );
    const data = await response.json();
    // setDataState((prev) => {
    // if (prev === null) {
    //   return data.todos;
    // } else {
    //   return [...prev, ...data.todos];
    // }
    // });
    return data.todos;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
