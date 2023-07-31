/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-no-target-blank */
import { Suspense, startTransition, useEffect } from "react";
import "./App.css";
import {
  fetchIndustriesData,
  industriesDataState,
  skipState,
  limitState,
  baseURL,
} from "./store/store";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { ThreeCircles } from "react-loader-spinner";
import axios from "axios";

function App() {
  const navigate = useNavigate();
  const [firstData, setFirstData] = useRecoilState(fetchIndustriesData);
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

  const fetchData = () => {
    // setUpdateData((prevIndustriesData) => {
    //   if (prevIndustriesData === null || prevIndustriesData === undefined) {
    //     return firstData;
    //   } else {
    //     return [...prevIndustriesData, ...firstData];
    //   }
    // });
    // setLoading(false);
  };

  useEffect(() => {
    // (async () => {
    //   const firstData = await useRecoilValue(fetchIndustriesData);
    // })();
    // if (updateData === null) {
    //   // fetchMoreData(skip);
    //   // fetchData();
    // }
  }, []);

  // Pagination logic
  const handlePageClick = () => {
    console.log("next call");
    let newSkip = skip + 10;
    setFirstData(limit, newSkip);
    // startTransition(() => {
    //   setSkip((prevSkip) => prevSkip + 10);
    // });
  };

  useEffect(() => {
    // setFirstData(limit, skip);
    return () => {};
  }, [skip]);

  // Handle change page
  const handleNavigate = () => {
    navigate("/all");
  };

  return (
    <>
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
            dataLength={firstData ? firstData.length : 10}
            next={handlePageClick}
            hasMore={
              firstData ? (firstData.length === 150 ? false : true) : true
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
              {firstData !== null &&
                firstData !== undefined &&
                firstData.map((data, index) => {
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
    </>
  );
}

export default App;
