import { useSelector } from "react-redux";

export const BattingStats = () => {
  const { authUser } = useSelector((state) => state.auth);

  const battingStats = authUser?.player?.careerStats?.batting;

  const battingStatArray = Object.entries(battingStats).map(([key, value]) => {
    return { label: key.charAt(0).toUpperCase() + key.slice(1), value };
  });

  return (
    <div className="w-full">
      <h1 className="text-center font-extrabold mt-4">Batting Stats</h1>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-2 gap-y-4 mt-6">
        <div className="flex flex-col items-center justify-center p-2 rounded bg-base-100">
          <h1 className="font-extrabold">Matches</h1>
          <span className="font-bold">
            {authUser?.player?.careerStats?.matches}
          </span>
        </div>
        {battingStatArray.map((data) => {
          return (
            <div
              className="flex flex-col items-center justify-center p-2 rounded bg-base-100"
              key={data.label}
            >
              <h1 className="font-extrabold">{data.label}</h1>
              <span className="font-bold">{data.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
