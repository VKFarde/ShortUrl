import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Res() {
  const URL = process.env.URL;
  const nav = useNavigate();
  const url = `${URL}/api/v1/res`;
  const [user, setuser] = useState({
    email: "",
    password: "",
    cpass: "",
  });

  const hChange = (e) => {
    const newUser = { ...user, [e.target.name]: e.target.value };
    setuser(newUser);
  };

  const hSubmit = async (e) => {
    e.preventDefault();

    if (user.cpass !== user.password) {
      alert("Both the password must be same");
      return 0;
    }

    try {
      const da = await JSON.stringify(user);
      console.log(da);
      const req = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: da,
      });

      const res = await req.json();
      alert(res.msg);

      if (req.status === 200) {
        nav("/");
      } else {
        return 0;
      }
    } catch (err) {
      alert(err);
      console.log(err);
    }
  };
  return (
    <div className="min-w-full min-h-screen flex flex-wrap justify-center item-center relative dark:bg-gray-900 ">
      <div
        className="min-h-max m-4 w-96 justify-center item-center flex flex-col flex-wrap text-center gap-4
      "
      >
        <h2 className="block mb-2 text-2xl font-bold text-gray-900 dark:text-white">
          Sign Up
        </h2>
        <form className=" text-left" onSubmit={(e) => hSubmit(e)}>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium  text-slate-500 "
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={(e) => hChange(e)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-slate-500 "
            >
              New password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => hChange(e)}
              value={user.password}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-slate-500 "
            >
              Re-Enter password
            </label>
            <input
              type="password"
              id="cpass"
              name="cpass"
              value={user.cpass}
              onChange={(e) => hChange(e)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-800 dark:hover:bg-lime-800 dark:focus:ring-blue-800 min-w-full"
          >
            Submit
          </button>
        </form>
        <h6 className="block mb-2 text-sm font-medium  ">
          <Link to="/" className="text-slate-700 hover:text-slate-500">
            Already Register!
          </Link>
        </h6>
      </div>
    </div>
  );
}

export default Res;
