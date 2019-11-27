//@desc   Get all bootcamps
//@route  GET /api/v1/bootcamps
//@access  Public

exports.getBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, msg: "show all bootcamps" });
};

//@desc   Get single bootcamp
//@route  GET /api/v1/bootcamps/:id
//@access  Public

exports.getBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `show a single bootcamp with id ${req.params.id}`
  });
};
