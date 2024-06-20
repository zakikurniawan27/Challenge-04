import { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { BiPencil } from "react-icons/bi";
import { useNavigate, useLocation } from "react-router-dom";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [redata, setRedata] = useState(true);
  const [search, setSearch] = useState("");

  const navigate = useNavigate("");
  const location = useLocation();

  const handleGet = async () => {
    setLoading(true);
    try {
      const res = await axios({
        method: "GET",
        url: `https://6673d2c175872d0e0a93d639.mockapi.io/api/v1/todo${location.search}`,
      });
      setData(res?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setRedata(false);
    }
  };

  const handleGetdone = async () => {
    setLoading(true);
    try {
      const res = await axios({
        method: "GET",
        url: "https://6673d2c175872d0e0a93d639.mockapi.io/api/v1/todo",
      });
      setData(res.data.filter((item) => item.status === true));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setRedata(false);
    }
  };

  const handleGetTodo = async () => {
    setLoading(true);
    try {
      const res = await axios({
        method: "GET",
        url: "https://6673d2c175872d0e0a93d639.mockapi.io/api/v1/todo",
      });
      setData(res.data.filter((item) => item.status === false));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setRedata(false);
    }
  };

  useEffect(() => {
    if (redata) {
      handleGet();
    }
  }, [redata, location.search]);

  const handleDelete = async (id) => {
    setData(data.filter((item) => item.id !== id));
    try {
      await axios.delete(
        `https://6673d2c175872d0e0a93d639.mockapi.io/api/v1/todo/${id}`
      );
      setRedata(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteDone = () => {
    handleGet(
      data.forEach((item) => {
        if (item.complete === true) {
          axios.delete(
            `https://6673d2c175872d0e0a93d639.mockapi.io/api/v1/todo/${item.id}`
          );
        }
      })
    );
    setRedata(true);
  };

  const handleDeleteAll = async () => {
    handleGet(
      data.forEach((item) => {
        if (item.id) {
          axios.delete(
            `https://6673d2c175872d0e0a93d639.mockapi.io/api/v1/todo/${item.id}`
          );
        }
      })
    );
    setRedata(true);
  };

  const toggleComplete = async (item) => {
    try {
      await axios({
        method: "PUT",
        url: `https://6673d2c175872d0e0a93d639.mockapi.io/api/v1/todo/${item.id}`,
        data: {
          ...item,
          status: !item.status,
        },
      });
      setRedata(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white">
      <div className="text-xl columns-1 text-black ">
        <h1 className="font-bold text-center">TodoSearch</h1>
        <div className="border-solid border border-gray-300 rounded mx-40 my-2">
          <div className="form-control">
            <div className="input-group mt-5 ml-5">
              <button className="btn btn-square bg-cyan-500 border-cyan-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
              <input
                type="text"
                placeholder="Search Todo"
                className="input input-bordered bg-white border-solid border-2 border-gray-300 lg:basis-2/6 xl:basis-2/5"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <button
              type="submit"
              className="btn btn-info text-white mt-4 ml-5 mb-3 lg:basis-[40%] xl:basis-[43.8571429%]"
              onClick={() => {
                if (search) {
                  navigate(`?task=${search}`);
                }
                if (!search) {
                  alert("harap inputkan data");
                  navigate("/");
                } else if (search !== search.task) {
                  alert("Data tidak ada, harap masukan data yang sesuai");
                  navigate("/");
                }
                setRedata(true);
              }}
            >
              Search
            </button>
            <button
              id="btn-add"
              type="submit"
              className="btn btn-info text-white mt-4 mb-3 mx-5 lg:basis-56 xl:basis-72"
              onClick={() => navigate("/create")}
            >
              Add new Task
            </button>
          </div>
        </div>
        <div>
          <h5 className="text-center mt-5">TodoList</h5>
          <div className="flex flex-row mx-36">
            <button
              type="submit"
              className="get btn btn-info  text-white mt-4 ml-5 mb-3 lg:basis-72 xl:basis-96 "
              onClick={() => handleGet()}
            >
              All
            </button>
            <button
              type="submit"
              className="get btn btn-info  text-white mt-4 ml-5 mb-3 lg:basis-72 xl:basis-96 "
              onClick={() => handleGetdone()}
            >
              Done
            </button>
            <button
              type="submit"
              className="get btn btn-info  text-white mt-4 ml-5 mb-3 lg:basis-72 xl:basis-96"
              onClick={() => handleGetTodo()}
            >
              Todo
            </button>
          </div>
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : (
            data?.map((item) => (
              <>
                <div className=" border-solid border border-gray-300 rounded md:mx-40 xl:mx-44 my-2">
                  <div
                    className="flex flex-row justify-beetwen my-2 pl-3"
                    key={item.id}
                  >
                    {item.status === true ? (
                      <>
                        <p className="line-through text-red-700">{item.name}</p>
                        <input
                          type="checkbox"
                          checked
                          className="tmb checkbox checkbox-accent mt-1 absolute sm:ml-[47rem] xl:ml-[66rem]"
                        />
                      </>
                    ) : (
                      <>
                        <p>{item.name}</p>
                        <input
                          type="checkbox"
                          className="tmb checkbox checkbox-accent mt-1 absolute sm:ml-[47rem] xl:ml-[66rem]"
                          onClick={() => toggleComplete(item)}
                        />
                      </>
                    )}
                    <FaTrash
                      id="tmb1"
                      className="absolute cursor-pointer text-red-500 mt-1 sm:ml-[53rem] xl:ml-[72rem]"
                      type="submit"
                      onClick={() => handleDelete(item.id)}
                    />
                    <BiPencil
                      id="tmb2"
                      className="absolute cursor-pointer text-yellow-500 mt-1 sm:ml-[50rem] xl:ml-[69rem]"
                      type="submit"
                      onClick={() => {
                        navigate(`/edit/${item.id}`);
                      }}
                    />
                  </div>
                </div>
              </>
            ))
          )}
          <div className="flex flex-row mt-10 ml-40 mb-5">
            <button
              className="btn btn-error bg-red-700 text-white lg:basis-[41%] xl:basis-[43.8571429%]"
              onClick={() => handleDeleteDone()}
            >
              Delete done Task
            </button>
            <button
              className="btn btn-error bg-red-700 text-white lg:basis-[41%] xl:basis-[43.8571429%] ml-3"
              onClick={() => handleDeleteAll()}
            >
              Delete all Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
