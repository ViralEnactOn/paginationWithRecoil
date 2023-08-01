/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-no-target-blank */
import { useEffect } from "react";
import "./App.css";
import {
  fetchIndustriesData,
  industriesDataState,
  skipState,
  limitState,
  baseURL,
} from "./store/store";
import { useRecoilValue, useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { ThreeCircles } from "react-loader-spinner";
import axios from "axios";

function usingAxios() {
  const navigate = useNavigate();
  const [updateData, setUpdateData] = useRecoilState(industriesDataState);
  const [skip, setSkip] = useRecoilState(skipState);
  const [limit, setLimit] = useRecoilState(limitState);

  // Fetch Data
  const fetchMoreData = async (skipRecord) => {
    try {
      const response = await axios.get(
        `${baseURL}/todos?limit=${limit}&skip=${skipRecord}`
      );

      setUpdateData((prevIndustriesData) => {
        if (updateData === null || updateData === undefined) {
          return response.data.todos;
        } else {
          return [...prevIndustriesData, ...response.data.todos];
        }
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (updateData === null) {
      fetchMoreData(skip);
    }
  }, []);

  // Pagination logic
  const handlePageClick = () => {
    setSkip((prevSkip) => prevSkip + 10);
    fetchMoreData(skip + 10);
  };

  // Handle change page
  const handleNavigate = () => {
    navigate("/all");
  };
  return (
    <main className="flex justify-center min-w-max bg-gray-100">
      <div className="container">
        <div className=" flex justify-center ">
          <button
            className="bg-cyan-500 mt-10 p-2 rounded-lg"
            onClick={() => handleNavigate()}
          >
            Show All Records
          </button>
        </div>
        <InfiniteScroll
          dataLength={updateData ? updateData.length : 10}
          next={handlePageClick}
          hasMore={
            updateData ? (updateData.length === 150 ? false : true) : true
          }
          loader={
            <div className="flex justify-center mt-10 mb-10">
              <ThreeCircles
                height="50"
                width="50"
                color="#4d94a9"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="three-circles-rotating"
                outerCircleColor=""
                innerCircleColor=""
                middleCircleColor=""
              />
            </div>
          }
        >
          <div className="flex flex-col justify-evenly mt-12">
            {updateData !== null &&
              updateData !== undefined &&
              updateData.map((data, index) => {
                return (
                  <div key={index} className="bg-white rounded-lg p-5 mt-10">
                    <div className="flex justify-center">{data.todo}</div>
                  </div>
                );
              })}
          </div>
        </InfiniteScroll>
      </div>
    </main>
  );
}

export default usingAxios;
