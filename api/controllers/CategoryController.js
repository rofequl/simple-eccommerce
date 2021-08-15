

// Get all
module.exports.index = function (req, res, next) {
  res.send('Hello World! a')
}

// Get one
module.exports.show = function(req, res) {
  const id = req.params.id;
  res.send(`This is your path: ${id}`)
}

// Create
module.exports.create = [

]

// Update
module.exports.update = [

]


// Delete
module.exports.delete = function(req, res) {

}
