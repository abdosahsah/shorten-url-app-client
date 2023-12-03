import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import URLService from "../../API/Services/urlService";

export const createUrl = createAsyncThunk(
  "urls/create",
  async ({ title, link }) => {
    const res = await URLService.create({ title, link });
    return res.data;
  }
);

export const updateUrl = createAsyncThunk(
  "urls/update",
  async ({ id, data }) => {
    const res = await URLService.update(id, data);
    return res.data;
  }
);

export const getUrl = createAsyncThunk("urls/show", async ({ id }) => {
  const res = await URLService.getOne(id);
  return res.data;
});

export const getUrls = createAsyncThunk("urls/all", async () => {
  const res = await URLService.getAll();
  return res.data.data;
});

export const deleteUrl = createAsyncThunk("urls/delete", async ({ id }) => {
  const response = await URLService.remove(id);
  return response.data;
});

const urlSlice = createSlice({
  name: "urls",
  initialState: {
    urlsLoading: false,
    urls: [],
    urlsEroor: null,
    createUrlLoading: false,
    createUrlError: null,
    isEditing: false,
    editSuccess: false,
    editError: null,
    isDeleting: false,
    deleteSuccess: false,
  },

  reducers: {
    setIsEditing: (state, action) => {
      state.isEditing = action.payload;
    },
    setIsDeleting: (state, action) => {
      state.isDeleting = action.payload;
    },
  },

  extraReducers(builder) {
    builder
      // Get Urls
      .addCase(getUrls.pending, (state) => {
        state.urlsLoading = true;
      })
      .addCase(getUrls.fulfilled, (state, action) => {
        state.urlsLoading = false;
        state.urls = action.payload;
      })
      .addCase(getUrls.rejected, (state) => {
        state.urlsLoading = false;
        state.urlsEroor = "Something went wrong";
      })
      // Create Url
      .addCase(createUrl.pending, (state) => {
        state.createUrlLoading = true;
      })
      .addCase(createUrl.fulfilled, (state) => {
        state.createUrlLoading = false;
      })
      .addCase(createUrl.rejected, (state) => {
        state.createUrlLoading = false;
        state.createUrlError = "Something went wrong";
      })
      // Update Url
      .addCase(updateUrl.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.editSuccess = true;
        }
      })
      .addCase(updateUrl.rejected, (state) => {
        state.editSuccess = false;
        state.editError = "Something went wrong";
      })
      // Delete Url
      .addCase(deleteUrl.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.deleteSuccess = true;
        }
      })
      .addCase(deleteUrl.rejected, (state) => {
        state.deleteSuccess = false;
      });
  },
});

export const { setIsEditing, setIsDeleting } = urlSlice.actions;

export default urlSlice.reducer;
