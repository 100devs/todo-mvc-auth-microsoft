module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs");
  },
};

// We are serving the index.ejs when the user ask for the front page.
