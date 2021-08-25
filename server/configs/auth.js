export const auth = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error_msg", "Please log in first!");
    res.redirect("/api/users/login");
  },
};
