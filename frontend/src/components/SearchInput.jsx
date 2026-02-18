import { useState } from "react";

export const SearchInput = ({ onSearch }) => {
  const [filter, setFilter] = useState({
    search: "",
    value: "",
    status: "",
  });

  const handleSearchBtn = (value) => {
    const newFilter = { ...filter, value };
    setFilter(newFilter);
    onSearch(newFilter);
    setFilter((prev) => ({ ...prev, search: "" }));
  };

  const handleOnChange = (e) => {
    const newFilter = { ...filter, status: e.target.value };
    setFilter(newFilter);
    onSearch(newFilter);
  };
  return (
    <div className="flex items-center justify-between px-3">
      <div className="md:w-[40%] relative">
        <input
          onChange={(e) => setFilter({ ...filter, search: e.target.value })}
          value={filter.search}
          type="text"
          className="border bg-base-100 mt-2 rounded-lg h-9 mb-2 outline-none pl-2 w-full"
          placeholder="Search..."
        />

        {/* search section */}
        {filter.search && (
          <div className="bg-base-100 border p-4 rounded-md flex flex-col gap-2 w-85 md:w-[80%] absolute">
            <button
              className="flex gap-1 cursor-pointer"
              onClick={() => handleSearchBtn("organiserName")}
            >
              <span>{filter.search} :</span>
              <p className="badge badge-soft badge-accent">Organiser Name</p>
            </button>
            <button
              className="flex gap-1 cursor-pointer"
              onClick={() => handleSearchBtn("tournamentName")}
            >
              <span>{filter.search} :</span>
              <p className="badge badge-soft badge-accent">Tournament Name</p>
            </button>
            <button
              onClick={() => handleSearchBtn("ground")}
              className="flex gap-1 cursor-pointer"
            >
              <span>{filter.search} :</span>
              <p className="badge badge-soft badge-accent">Ground</p>
            </button>
            <button
              onClick={() => handleSearchBtn("city")}
              className="flex gap-1 cursor-pointer"
            >
              <span>{filter.search} :</span>
              <p className="badge badge-soft badge-accent">City</p>
            </button>
          </div>
        )}
      </div>
      <div className="mr-2 w-50 md:w-[30%]">
        <label htmlFor="status" className="flex items-center gap-2">
          Status
          <select
            name=""
            id="status"
            className="select select-bordered ml-2 outline-0 rounded-lg"
            onChange={handleOnChange}
          >
            <option value="">All</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </label>
      </div>
    </div>
  );
};
