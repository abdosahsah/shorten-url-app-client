import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUrls } from "../Redux/slices/url";
import { formatDate } from "../utils/utils";
import EditUrl from "./EditUrl";
import DeleteUrl from "./DeleteUrl";
import { setIsEditing, setIsDeleting } from "../Redux/slices/url";

function UrlsList() {
  const [editUrl, setEditUrl] = useState(null);
  const [deleteUrlId, setDeleteUrlId] = useState(null);

  const dispatch = useDispatch();

  const { urlsLoading, urls } = useSelector((state) => state.urls);
  const { isEditing } = useSelector((state) => state.urls);

  const handleEditUrl = (url) => {
    dispatch(setIsEditing(true));
    setEditUrl(url);
  };

  const handleDeleteUrl = (id) => {
    dispatch(setIsDeleting(true));
    setDeleteUrlId(id);
  };

  useEffect(() => {
    dispatch(getUrls());
  }, [dispatch]);

  return (
    <div className="md:w-1/2 w-full p-10 bg-white rounded-md max-h-[420px] overflow-y-scroll">
      <h2 className="text-3xl font-bold mb-5">List URLs</h2>

      {urlsLoading && <small>Loading...</small>}

      {urls.length !== 0 ? (
        <ul>
          {urls.map((url) => (
            <li key={url._id} className="p-3 hover:bg-orange-50">
              <small className="text-gray-500">
                {formatDate(url.createdAt)}
              </small>
              <h3 className="text-lg font-semibold">{url.title}</h3>
              <div className="flex flex-row gap-3 pb-3">
                <a
                  className="underline"
                  href={`http://localhost:8000/${url.identifier}`}
                >
                  Visit
                </a>
                <button
                  className="underline text-orange-500"
                  onClick={() => handleEditUrl(url)}
                >
                  Edit
                </button>
                <button
                  className="underline text-red-500"
                  onClick={() => handleDeleteUrl(url._id)}
                >
                  Remove
                </button>
              </div>
              <hr />
            </li>
          ))}
        </ul>
      ) : (
        <small>No URLs found</small>
      )}
      {/* Edit URL */}
      <EditUrl editing={isEditing} url={editUrl} />
      <DeleteUrl id={deleteUrlId} />
    </div>
  );
}

export default UrlsList;
