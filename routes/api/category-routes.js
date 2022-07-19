const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
  const allCategories = await Category.findAll({
    include: [{model: Product}]
  });

  res.status(200).json(allCategories);
} catch (err) {
  res.status(500).json(err)
}
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  try{
   const singleCategoryData = await Category.findByPk(req.params.id, {
      include: [{model: Product}]
    });
    if(!singleCategoryData) {
      res.status(404).json({message: 'No Category found with that id!'});
      return;
    }
    res.status(200).json(singleCategoryData);
  } catch (err) {
    res.status(500).json(err)
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    if (req.body.category_name) {
      const categoryData = await Category.create(
        { category_name: req.body.category_name },
        { fields: ["category_name"] }
      );
      res.status(200).json(categoryData);
    } else {
      res.status(400).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update({
      where: {
        id: req.params.id
      }
    })
    if(!categoryData) {
      res.status(404).json({ message: 'No category found with that id!'});
      return;
    }
    res.status(200).json(categoryData)

  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      },
    });

    if(!categoryData) {
      res.status(404).json({ message: 'No category found with that id!'});
      return;
    }
    res.status(200).json(categoryData)

  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;