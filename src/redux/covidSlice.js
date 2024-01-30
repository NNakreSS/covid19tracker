import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGetcountrys = createAsyncThunk(
  "covid/fetchGetcountrys",
  async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/regions`
    );
    return data.data;
  }
);

export const fetchGetTotal = createAsyncThunk(
  "covid/fetchGetTotal",
  async (countrys) => {
    const { data } = await axios(
      `${import.meta.env.VITE_BASE_URL}/reports/total?`,
      {
        params: {
          ...(countrys && { iso: countrys }),
        },
      }
    );
    return data.data;
  }
);

const initialState = {
  total: {},
  countrys: {},
  selectedCountry: null,
  status: "idle",
  error: null,
};

const reducers = {
  selectcountrys(state, action) {
    state.selectedCountry = action.payload;
  },
};

const extraReducers = (builder) => {
  builder
    .addCase(fetchGetTotal.fulfilled, (state, action) => {
      state.total = action.payload;
      state.status = "success";
    })
    .addCase(fetchGetTotal.rejected, (state, action) => {
      state.error = action.error.message;
      state.status = "erro";
    })
    .addCase(fetchGetTotal.pending, (state, action) => {
      state.status = "pending";
    })

    .addCase(fetchGetcountrys.fulfilled, (state, action) => {
      state.countrys = action.payload;
    })
    .addCase(fetchGetcountrys.pending, (state, action) => {
      console.log("ülke dataları bekleniyor...");
    })
    .addCase(fetchGetcountrys.rejected, (state, action) => {
      console.warn("error : ", action.error.message);
    });
};

const covidSlice = createSlice({
  name: "covid",
  initialState,
  reducers,
  extraReducers,
});

export default covidSlice.reducer;
export const { selectcountrys } = covidSlice.actions;
