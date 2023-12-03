import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUrl, getUrls } from "../Redux/slices/url";
import toast, { Toaster } from "react-hot-toast";

function AddNewUrl() {
  const dispatch = useDispatch();
  const { createUrlLoading } = useSelector((state) => state.urls);

  const title = useRef();
  const link = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createUrl({ title: title.current.value, link: link.current.value })
    );

    dispatch(getUrls());

    toast.success("URL created successfully!");

    title.current.value = "";
    link.current.value = "";
  };

  return (
    <div className="md:w-1/2 w-full h-fit p-10 bg-white rounded-md">
      <h2 className="text-3xl font-bold mb-10">Short New URL</h2>
      <form className="flex flex-col w-[80%] gap-y-5" onSubmit={handleSubmit}>
        <input
          className="p-2 border border-gray-300 rounded"
          ref={title}
          type="text"
          name="title"
          placeholder="Title"
        />
        <input
          className="p-2 border border-gray-300 rounded"
          ref={link}
          type="text"
          name="link"
          placeholder="Destination"
        />
        <button
          disabled={createUrlLoading}
          className="w-fit py-2 px-6 mt-2 bg-orange-700 hover:bg-orange-800 text-white text-lg"
          type="submit"
        >
          Add
        </button>
      </form>
      <Toaster />
    </div>
  );
}

export default AddNewUrl;
