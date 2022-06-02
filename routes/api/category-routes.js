const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const catagoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(catagoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
try {
  const catagoryData = await Category.findByPk(req.params.id, {
    include: [{ model: Product }],
  });

  if (!catagoryData) {
    res.status(404).json({ message: 'No library card found with that id!' });
    return;
  }

  res.status(200).json(catagoryData);
} catch (err) {
  res.status(500).json(err);
}
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const locationData = await Category.create({
      reader_id: req.body.reader_id,
    });
    res.status(200).json(locationData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const catagoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!catagoryData) {
      res.status(404).json({ message: 'No library card found with that id!' });
      return;
    }

    res.status(200).json(catagoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
