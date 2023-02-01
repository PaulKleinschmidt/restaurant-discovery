import { MobileView } from '../types/MobileView';
import { default as map } from '../assets/map.svg';
import { default as list } from '../assets/list.svg';

type TProps = {
  mobileView: MobileView;
  setMobileView(view: MobileView): void;
};

const toggleViewValue = (view: MobileView) =>
  view === MobileView.Map ? MobileView.List : MobileView.Map;

export const ToggleMobileView = ({ mobileView, setMobileView }: TProps) => {
  return (
    <button
      className="absolute bottom-4 left-1/2 translate-x-[-50%] bg-green text-white rounded-3xl shadow-sm py-3 px-6 font-bold flex lg:hidden w-28"
      onClick={() => setMobileView(toggleViewValue(mobileView))}
    >
      <img
        className="pr-2"
        src={mobileView === MobileView.Map ? list : map}
        alt="toggle icon"
      />
      {toggleViewValue(mobileView)}
    </button>
  );
};
