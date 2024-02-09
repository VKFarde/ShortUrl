import { useState } from "react";

function Convert() {
  const URL = process.env.URL;
  const [val, setval] = useState({ val: "" });
  const hSubmit = async (e) => {
    e.preventDefault();
    const url = `${URL}/api/v1/convert`;
    try {
      const da = await JSON.stringify(val);
      const token = localStorage.getItem("token");
      console.log(da);
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: da,
      });
      const data = await res.json();
      if (res.status === 200) {
        alert(data.msg, data.url);
        window.location.reload();
      }
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form
      className=" flex flex-col justify-left item center sm:flex-row m-4 sm:m-8 sm:gap-4 gap-1"
      onSubmit={(e) => hSubmit(e)}
    >
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Enter your url"
        name="val"
        value={val.val}
        required
        onChange={(e) => {
          const t = { ...val, [e.target.name]: e.target.value };
          setval(t);
        }}
      />

      <button
        type="submit"
        className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-800 dark:hover:bg-lime-800 dark:focus:ring-blue-800 "
      >
        Convert
      </button>
    </form>
  );
}

export default Convert;
