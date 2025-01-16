// This controller just handles the home page
module.exports = {
  getIndex: (req, res) => {
    // When someone visits home page
    res.render('index.ejs'); // Show them the index.ejs file (home page)
  },
};
