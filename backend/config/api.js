module.exports = {
  rest: {
    defaultLimit: 25,
    maxLimit: 100,
    withCount: true,
    maxPopulateDepth: 5,   // ← default is 2; 5 allows populate[hero][populate][bg_image]
  },
};
