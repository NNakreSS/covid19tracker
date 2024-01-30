import { useEffect } from "react";
// redux
import { fetchGetcountrys, fetchGetTotal } from "../redux/covidSlice";
import { useDispatch, useSelector } from "react-redux";
// components
import Cards from "./Cards";
import Select from "./Select";
import Loading from "./Loading";
import Chart from "./Chart";

const Main = () => {
  const dispatch = useDispatch();
  const { status, selectedCountry } = useSelector((state) => state.covid);

  useEffect(() => {
    dispatch(fetchGetcountrys());
  }, []);

  useEffect(() => {
    dispatch(fetchGetTotal(selectedCountry));
  }, [selectedCountry]);

  if (status == "error") return <Error />;
  if (status == "pending") return <Loading />;
  return (
    <main className="w-12/12 md:w-11/12 lg:w-10/12 m-auto">
      {status == "success" && (
        <>
          <header className="mb-5">
            <h1 className="font-bold text-6xl">COVID-19</h1>
            <span className="text-black/50">Global and Country Wise Cases of Corona Virus</span>
          </header>
          <Select />
          <Cards />
          <div className="mt-10">
            <Chart />
          </div>
          <footer className="flex justify-center items-center h-10 p-3 w-full bg-black/50 mt-5 rounded-md text-white font-medium ">NakreS</footer>
        </>
      )}
    </main>
  );
};

export default Main;
