import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userApi";

function Data() {
  const { IsLoggedIn } = useContext(UserContext);
  const [data, setdata] = useState(null);
  const URL = process.env.URL;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${URL}/api/v1/userUrls`, {
          method: "GET",
          headers: {
            token: token,
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const da = await res.json();
        console.log(da);
        setdata(da);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error state if needed
      }
    };
    fetchData();
  }, [IsLoggedIn]);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-4 sm:m-8">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              URls
            </th>
            <th scope="col" className="px-6 py-3">
              ShorlUrls
            </th>
            <th scope="col" className="px-6 py-3">
              Visit Count
            </th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((data, index) => {
              return (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  key={index}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <a href={data.redirectURL} target="_blank" rel="nofollow">
                      {data.redirectURL}
                    </a>
                  </th>
                  <td className="px-6 py-4">
                    <a
                      href={`${URL}/${data.shortId}`}
                      rel="nofollow"
                      target="_blank"
                    >
                      {`${URL}/${data.shortId}`}
                    </a>
                  </td>
                  <td className="px-6 py-4">{data.visitHistory.length}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default Data;
