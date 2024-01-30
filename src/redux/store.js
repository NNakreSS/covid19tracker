import { configureStore } from "@reduxjs/toolkit";
import covid from "./covidSlice";

const store = configureStore({
  reducer: {
    covid,
  },
});

export default store;
