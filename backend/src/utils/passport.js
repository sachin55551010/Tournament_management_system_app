import passport from "passport";
import { User } from "../models/userSchema.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Player } from "../models/playerSchema.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/v1/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            profileImg: profile.photos[0].value,
            isLoggedIn: true,
          });
        }
        let player = await Player.findOne({ playerId: user._id });
        if (!player) {
          player = await Player.create({
            playerName: user.name,
            playerId: user._id,
            isVarified: true,
          });
        }

        return cb(null, player);
      } catch (error) {
        console.log("google OAuth error : ", error);
        return cb(error, null);
      }
    }
  )
);

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: process.env.FACEBOOK_CLIENT_ID,
//       clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
//       callbackURL: "/api/v1/auth/facebook/callback",
//       profileFields: [
//         "id",
//         "displayName",
//         "emails",
//         "name",
//         "picture.type(large)",
//       ],
//     },
//     async function (accessToken, refreshToken, profile, done) {
//       try {
//         let user = await User.findOne({ facebookId: profile.id });

//         if (!user) {
//           user = await User.create({
//             facebookId: profile.id,
//             name: profile.displayName,
//             email: profile.emails?.[0]?.value || "",
//             profileImg: profile.photos?.[0]?.value || "",
//             isLoggedIn: true,
//           });
//         }
//

//         return done(null, user);
//       } catch (error) {
//         return done(error, null);
//       }
//     }
//   )
// );
