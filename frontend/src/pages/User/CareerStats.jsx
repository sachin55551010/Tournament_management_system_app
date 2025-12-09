import { useState } from "react";
import { BattingStats } from "../../components/BattingStats";
import { BowlingStats } from "../../components/BowlingStats";
import { Header } from "../../components/Header";
import Bat from "../../../assets/batsman.svg";
import Ball from "../../../assets/bowler.svg";
import { useParams } from "react-router-dom";
import { useProfileQuery } from "../../store/authApi";

export const CareerStats = () => {
  const [activeTab, setActiveTab] = useState("batting");
  const { playerId } = useParams();
  const { data, isLoading } = useProfileQuery(playerId);
  const handleActiveTabBtn = (val) => {
    setActiveTab(val);
  };
  return (
    <div className="flex flex-col items-center">
      <Header data={data?.playerProfile?.playerName} />
      <div className="mt-18 w-[97%] rounded flex justify-center gap-4">
        <button
          onClick={() => handleActiveTabBtn("batting")}
          className={`btn btn-soft btn-primary font-black py-2 rounded-md px-3 hover: transition-all duration-300 ${
            activeTab === "batting" && "scale-110 btn btn-active btn-primary"
          }`}
        >
          <img src={Bat} alt="" className="h-6 w-auto" />
          Batting
        </button>
        <button
          onClick={() => handleActiveTabBtn("bowling")}
          className={`btn btn-soft btn-primary  font-black py-2 rounded-md px-3 hover: transition-all duration-300 ${
            activeTab === "bowling" && "scale-110 btn btn-active btn-primary"
          }`}
        >
          <img src={Ball} alt="" className="h-6 w-auto" />
          Bowling
        </button>
      </div>
      <div className="mt-8 w-[97%] md:w-[80%] lg:w-[80%] flex flex-col items-center gap-2 rounded-lg bg-base-200 p-2">
        {activeTab === "batting" ? (
          <BattingStats data={data} isLoading={isLoading} />
        ) : (
          <BowlingStats data={data} isLoading={isLoading} />
        )}
      </div>
    </div>
  );
};
