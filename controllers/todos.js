module.exports = {
  getPage: async (req, res) => {
    res.render('todos', {msg: 'none yet'});
  }
}
