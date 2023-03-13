const Admin = require("../models/Admin");
const Category = require("../models/Category");

const addCategory = async (req, res) => {
  try {
    const admin = await Admin.findOne({ _id: req.params.id })
    const newCategory = new Category(req.body);
    if (admin?.role === 'admin') {
      newCategory.approved = "true"
      newCategory.status = 'Show'
    }

    // console.log(newCategory);

    await newCategory.save();
    res.status(200).send({
      message: "Category Added Successfully!",
      status: 200,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
      status: 500,
    });
  }
};

const addAllCategory = async (req, res) => {
  try {
    await Category.insertMany(req.body);
    res.status(200).send({
      message: "Category Added successfully!",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getShowingCategory = async (req, res) => {
  try {
    const categories = await Category.find({ status: "Show" }).sort({
      _id: -1,
    });
    res.send(categories);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find({}).sort({ _id: -1 });
    res.send(categories);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.send(category);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (category) {
      category.parent = req.body.parent;
      // category.slug = req.body.slug;
      category.type = req.body.type;
      // category.icon = req.body.icon;
      category.subCategory = req.body.subCategory;
      await category.save();
      res.send({ message: "Category Updated Successfully!" });
    }
  } catch (err) {
    res.status(404).send({ message: "Category not found!" });
  }
};

const updateStatus = (req, res) => {
  const newStatus = req.body.status;

  Category.updateOne(
    { _id: req.params.id },
    {
      $set: {
        status: newStatus,
      },
    },
    (err) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else {
        res.status(200).send({
          message: `Category ${newStatus} Successfully!`,
        });
      }
    }
  );
};

const deleteSubCategory = async (req, res) => {
  const id = req.params.id

  try {
    const category = await Category.findById({ _id: id })
    console.log(category);
  } catch (error) {

  }
}

const deleteCategory = (req, res) => {
  Category.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).send({
        message: err.message,
        status: 500,
      });
    } else {
      res.status(200).send({
        message: "Category Deleted Successfully!",
        status: 200,
      });
    }
  });

  //This is for delete children category
  // Category.updateOne(
  //   { _id: req.params.id },
  //   {
  //     $pull: { children: req.body.title },
  //   },
  //   (err) => {
  //     if (err) {
  //       res.status(500).send({ message: err.message });
  //     } else {
  //       res.status(200).send({
  //         message: 'Category Deleted Successfully!',
  //       });
  //     }
  //   }
  // );


};

module.exports = {
  addCategory,
  addAllCategory,
  getAllCategory,
  getShowingCategory,
  getCategoryById,
  updateCategory,
  updateStatus,
  deleteSubCategory,
  deleteCategory,
};
