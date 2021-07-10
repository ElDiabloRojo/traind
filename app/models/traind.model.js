module.exports = mongoose => {
  const Traind = mongoose.model(
    "traind",
    mongoose.Schema(
      {
        title: String,
        description: String,
        published: Boolean
      },
      { timestamps: true }
    )
  );

  return Traind;
};