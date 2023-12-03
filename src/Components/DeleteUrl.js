import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsDeleting } from "../Redux/slices/url";
import { deleteUrl } from "../Redux/slices/url";

function DeleteUrl({ id }) {
  const { isDeleting } = useSelector((state) => state.urls);

  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(
      deleteUrl({
        id,
      })
    );

    dispatch(setIsDeleting(false));
  };

  const handleCancel = () => {
    dispatch(setIsDeleting(false));
  };

  if (isDeleting) {
    return (
      <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-9 mx-2 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">Delete URL</h2>
          <p className="text-slate-600 mb-4">
            Are you sure you want to delete this URL?
          </p>
          <div>
            <button
              onClick={handleRemove}
              className="w-1/3 py-2 mt-2 bg-red-700 hover:bg-red-800 text-white text-lg"
              type="submit"
            >
              Remove
            </button>
            <button
              onClick={handleCancel}
              className="w-1/3 py-2 mt-2 ml-2 bg-black hover:bg-slate-900 text-white text-lg"
              type="button"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default DeleteUrl;
