const validateModel = (Model) => async (req, res, next) => {
  try {
    const doc = new Model(req.body);

    await doc.validate();

    next();
  } catch (err) {
    const errors = {};

    if (err.errors) {
      Object.keys(err.errors).forEach((key) => {
        errors[key] = err.errors[key].message;
      });
    } else {
      errors.general = err.message;
    }

    res.status(400).json({
      message: "Validation failed",
      errors,
    });
  }
};

export default validateModel;
