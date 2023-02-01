import { View } from '../types/View';
import { default as map } from '../assets/map.svg';
import { default as list } from '../assets/list.svg';

type TProps = {
  view: View;
  toggleView(view: View): void;
};

const toggleViewValue = (view: View) =>
  view === View.Map ? View.List : View.Map;

export const ToggleView = ({ view, toggleView }: TProps) => {
  return (
    <button
      className="absolute bottom-4 left-1/2 translate-x-[-50%] bg-green text-white rounded-3xl shadow-sm py-3 px-6 font-bold flex lg:hidden w-28"
      onClick={() => toggleView(toggleViewValue(view))}
    >
      <img
        className="pr-2"
        src={view === View.Map ? list : map}
        alt="toggle icon"
      />
      {toggleViewValue(view)}
    </button>
  );
};
