import React from "react";

const Contact = () => {
  return (
    <div className="h-screen pt-20 text-black">
      <div className="w-full md:w-96 md:max-w-full mx-auto">
        <h1 className="text-center m-6 text-3xl">Contact Us</h1>
        <div className="p-6 border border-gray-300 sm:rounded-md">
          <form
            method="POST"
            action="https://public.herotofu.com/v1/e340df80-694a-11ee-a03a-39e472c5760d"
          >
            <label className="block mb-6">
              <span className="text-gray-700">Your name</span>
              <input
                type="text"
                name="name"
                className="
            block
            w-full
            mt-1
            border-gray-300
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
          "
                placeholder="Joe Bloggs"
              />
            </label>
            <label className="block mb-6">
              <span className="text-gray-700">Email address</span>
              <input
                name="email"
                type="email"
                className="
            block
            w-full
            mt-1
            border-gray-300
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
          "
                placeholder="joe.bloggs@example.com"
                required
              />
            </label>
            <label className="block mb-6">
              <span className="text-gray-700">Message</span>
              <textarea
                name="message"
                className="
            block
            w-full
            mt-1
            border-gray-300
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
          "
                rows="3"
                placeholder="Tell us what you're thinking about..."
              ></textarea>
            </label>
            <div className="mb-6">
              <button
                type="submit"
                className="
            h-10
            px-5
            text-indigo-100
            bg-indigo-700
            rounded-lg
            transition-colors
            duration-150
            focus:shadow-outline
            hover:bg-indigo-800
          "
              >
                Contact Us
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
