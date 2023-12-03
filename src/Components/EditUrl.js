import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUrls, setIsEditing } from "../Redux/slices/url";
import { updateUrl } from "../Redux/slices/url";
import toast from "react-hot-toast";

function EditUrl({ url, editing }) {
  const dispatch = useDispatch();

  const { editSuccess, editError } = useSelector((state) => state.urls);

  const title = useRef();
  const link = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      updateUrl({
        id: url._id,
        data: {
          title: title.current.value,
          link: link.current.value,
        },
      })
    );

    if (editSuccess) {
      toast.success("URL updated successfully!");
    }

    dispatch(getUrls());

    title.current.value = "";
    link.current.value = "";

    dispatch(setIsEditing(false));
  };

  const handleCancel = () => {
    dispatch(setIsEditing(false));
  };

  if (editing) {
    return (
      <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-9 mx-2 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">Edit URL</h2>
          {editError && <small className="text-red-500">{editError}</small>}
          <form>
            <input
              className="w-[80%] p-2 border border-gray-300 rounded block mb-4"
              ref={title}
              type="text"
              name="title"
              placeholder="Title"
              defaultValue={url ? url.title : ""}
            />
            <input
              className="w-[80%] p-2 border border-gray-300 rounded block mb-6"
              ref={link}
              type="text"
              name="link"
              placeholder="Destination"
              defaultValue={url ? url.link : ""}
            />
            <div>
              <button
                onClick={handleSubmit}
                className="w-1/3 py-2 mt-2 bg-orange-700 hover:bg-orange-800 text-white text-lg"
                type="submit"
              >
                Edit
              </button>
              <button
                onClick={handleCancel}
                className="w-1/3 py-2 mt-2 ml-2 bg-black hover:bg-slate-900 text-white text-lg"
                type="button"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default EditUrl;
