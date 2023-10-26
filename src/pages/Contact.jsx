import React from "react";

const Contact = () => {
  return (
    <div className="h-screen pt-20">
      <div className="flex flex-col items-center">
        <div className="bg-black w-full h-[20vh] flex flex-col justify-center">
          <h1 className="text-center m-6 text-5xl text-white">Contact Us</h1>
        </div>
        <div className="m-6 p-6 w-1/3 border-gray-300 border dark:bg-black bg-inherit">
          <form
            method="POST"
            action="https://public.herotofu.com/v1/e340df80-694a-11ee-a03a-39e472c5760d"
          >
            <label className="block mb-6">
              <span className="">Your name</span>
              <input
                type="text"
                name="name"
                className="
            w-full
            mt-1
            p-2
            border
            border-gray-300
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
            bg-inherit
          "
                placeholder="Mr Dr Bones Jones"
              />
            </label>
            <label className="block mb-6">
              <span className="">Email address</span>
              <input
                name="email"
                type="email"
                className="
            w-full
            mt-1
            p-2
            border
            border-gray-300
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
            bg-inherit
          "
                placeholder="joe.bloggs@example.com"
                required
              />
            </label>
            <label className="block mb-6">
              <span className="">Message</span>
              <textarea
                name="message"
                className="
            w-full
            mt-1
            p-2
            border
            border-gray-300
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
            bg-inherit
          "
                rows="3"
                placeholder="Let's Hear It!"
              ></textarea>
            </label>
            <div className="flex w-full justify-center">
              <button
                type="submit"
                className="
            p-4 w-1/3
            text-white
            bg-emerald-600
            rounded-lg
            transition-colors
            duration-150
            focus:shadow-outline
            hover:bg-emerald-800
          "
              >
                Submit
              </button>
            </div>
            <div></div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
