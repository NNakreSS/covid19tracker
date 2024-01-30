import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGetCountries = createAsyncThunk(
  "covid/fetchGetCountries",
  async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/regions`
    );
    return data.data;
  }
);

export const fetchGetTotal = createAsyncThunk(
  "covid/fetchGetTotal",
  async (countrie) => {
    const { data } = await axios(
      `${import.meta.env.VITE_BASE_URL}/reports/total?`,
      {
        params: {
          ...(countrie && { iso: countrie }),
        },
      }
    );
    return data.data;
  }
);

const initialState = {
  total: {},
  countries: {},
  selectedCountrie: null,
  status: "idle",
  error: null,
};

const reducers = {
  selectCountrie(state, action) {
    state.selectedCountrie = action.payload;
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

    .addCase(fetchGetCountries.fulfilled, (state, action) => {
      state.countries = action.payload;
    })
    .addCase(fetchGetCountries.pending, (state, action) => {
      console.log("ülke dataları bekleniyor...");
    })
    .addCase(fetchGetCountries.rejected, (state, action) => {
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
export const { selectCountrie } = covidSlice.actions;
