// import classNames from "classnames";
import { useSelector } from "react-redux";

const Cards = () => {
  const total = useSelector((state) => state.covid.total);

  const Card = ({ color, title, number, updateTime }) => {
    const clasColor = {
      sky: {
        bg: `bg-sky-200`,
        br: `border-b-sky-500`,
        text: `text-sky-900`,
      },
      green: {
        bg: `bg-green-200`,
        br: `border-b-green-500`,
        text: "text-green-900",
      },
      red: {
        bg: `bg-red-200`,
        br: `border-b-red-500`,
        text: `text-red-900`,
      },
      yellow: {
        bg: `bg-yellow-200`,
        br: `border-b-yellow-500`,
        text: `text-yellow-900`,
      },
    };

    return (
      <div
        className={`${clasColor[color].bg} ${clasColor[color].br} border-b-8 grid grid-cols-1 gap-1 grid-rows-4 text-black rounded-md p-5 min-h-56`}
      >
        <span className={`text-xl font-bold ${clasColor[color].text}`}>
          {title}
        </span>
        <span className="text-2xl font-semibold">
          {number.toLocaleString("tr")}
        </span>
        <span className="text-lg font-semibol ">Last updated at</span>
        <span className="text-gray-700/60 font-bold">{updateTime}</span>
      </div>
    );
  };

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
      <Card
        color="sky"
        title="Infected"
        number={total.confirmed}
        updateTime={total.last_update}
      />
      <Card
        color="green"
        title="Recovered"
        number={total.recovered}
        updateTime={total.last_update}
      />
      <Card
        color="red"
        title="Deaths"
        number={total.deaths}
        updateTime={total.last_update}
      />
      <Card
        color="yellow"
        title="Active"
        number={total.active}
        updateTime={total.last_update}
      />
    </div>
  );
};

export default Cards;
