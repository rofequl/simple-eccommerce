const {body, validationResult} = require('express-validator');
const Category = require('../schema/category');
const Resize = require('../helper/SaveImage');


// Get all
module.exports.index = function (req, res, next) {
  Category.find({}, function (err, category) {
    if (err) return res.status(500).json({message: 'Error getting records.'});
    return res.json(category);
  })
}

// Get one
module.exports.show = function (req, res) {
  const id = req.params.id;
  res.send(`This is your path: ${id}`)
}

// Create
module.exports.create = [
  body('name', 'Please enter category name').notEmpty(),
  // eslint-disable-next-line prefer-promise-reject-errors
  body('name').custom(value => Category.findOne({name: value}).then(v => v !== null ? Promise.reject('Category name already in use') : '')),
  body('banner', 'Please upload banner image').custom((value, {req}) => req.files.some(v => v.fieldname === "banner")),
  body('icon', 'Please upload icon image').custom((value, {req}) => req.files.some(v => v.fieldname === "icon")),

  async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({errors: errors.mapped()})
    const banner = req.files.find(v => v.fieldname === "banner")
    const icon = req.files.find(v => v.fieldname === "icon")
    const bannerFileUpload = new Resize('images/category', 800, 800, banner.originalname.substring(banner.originalname.lastIndexOf("."), banner.originalname.length).toLowerCase());
    const iconFileUpload = new Resize('images/category', 100, 100, banner.originalname.substring(banner.originalname.lastIndexOf("."), banner.originalname.length).toLowerCase());
    const bannerName = bannerFileUpload.save(banner.buffer);
    const iconName = iconFileUpload.save(icon.buffer);
    const uuid = Math.random().toString(36).slice(-6);
    // initialize record
    const newCategory = new Category({
      name: req.body.name,
      slug: req.body.name.replace(/[^a-zA-Z ]/g, "").replace(/\s+/g, '-').toLowerCase() + '-' + uuid,
      banner: 'images/category/' + bannerName,
      icon: 'images/category/' + iconName,
    })
    // save record
    await newCategory.save(function (err, category) {
      if (err) {
        return res.status(500).json({
          message: 'Error saving record',
          error: err
        });
      }
      return res.json({
        message: 'saved',
        _id: category._id
      });
    })
  }
]

// Update
module.exports.update = []


// Delete
module.exports.delete = function (req, res) {

}
