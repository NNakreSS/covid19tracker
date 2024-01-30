import { useSelector } from "react-redux";

const Error = () => {
  const error = useSelector((state) => state.covid.error);
  return <span>{error}</span>;
};

export default Error;
