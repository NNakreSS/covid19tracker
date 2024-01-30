import { useDispatch, useSelector } from "react-redux";
import { selectcountrys } from "../redux/covidSlice";

const Select = () => {
  const dispatch = useDispatch();
  const { countrys, selectedCountry } = useSelector((state) => state.covid);

  return (
    <select
      value={selectedCountry ? selectedCountry : ""}
      onChange={(e) => dispatch(selectcountrys(e.target.value))}
      className="mb-5 border-b-2 border-b-black p-2 outline-none font-bold sticky top-5 rounded-md"
    >
      <option value="">Select countrys</option>
      {countrys?.map((item, key) => (
        <option key={key} value={item.iso}>
          {item.name}
        </option>
      ))}
    </select>
  );
};

export default Select;
