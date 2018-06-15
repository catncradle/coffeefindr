// const googleplaces = require("googleplaces");

// export default googleplaces("AIzaSyCsrkC5mOTfE3h2L8_lqs0nxLQUywJWZAo", "json");

const RapidAPI = require("rapidapi-connect");
const rapid = new RapidAPI(
  "default-application_5b2193e6e4b09cbc057a08fe",
  "e9d73727-1f2b-40be-b108-08f4c973c18d"
);

export default rapid;

// rapid
//   .call("GooglePlaces", "getNearbyPlacesByType", {
//     coordinate: "-33.8670522, 151.1957362",
//     apiKey: "AIzaSyCsrkC5mOTfE3h2L8_lqs0nxLQUywJWZAo",
//     radius: "500",
//     type: ["cafe"]
//   })
//   .on("success", payload => {
//     console.log(payload);
//   })
//   .on("error", payload => {
//     console.log(payload);
//   });
