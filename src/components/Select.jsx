import { useDispatch, useSelector } from "react-redux";
import { selectCountrie } from "../redux/covidSlice";

const Select = () => {
  const dispatch = useDispatch();
  const { countries, selectedCountrie } = useSelector((state) => state.covid);

  return (
    <select
      value={selectedCountrie ? selectedCountrie : ""}
      onChange={(e) => dispatch(selectCountrie(e.target.value))}
      className="mb-5 border-b-2 border-b-black p-2 outline-none font-bold sticky top-5 rounded-md"
    >
      <option value="">Select Countrie</option>
      {countries?.map((item, key) => (
        <option key={key} value={item.iso}>
          {item.name}
        </option>
      ))}
    </select>
  );
};

export default Select;
