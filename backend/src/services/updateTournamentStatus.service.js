import { Tournament } from "../models/tournamentSchema.js";
export const updateTournamentService = async () => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    //update status from upcoming -> ongoing
    let tournamentDate = await Tournament.updateMany(
      {
        startDate: { $lte: today },
        endDate: { $gte: today },
        status: "Upcoming",
      },
      { $set: { status: "Ongoing" } },
    );

    //update status ongoing -> completed
    await Tournament.updateMany(
      {
        status: "ongoing",
        endDate: { $gt: today },
      },
      { $set: { status: "Completed" } },
    );
  } catch (error) {
    console.log(error);
  }
};
