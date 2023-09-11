const sequelize = require("../config/connection");
const { User, Post } = require("../models");

const userData = require("./user.json");
const blogPostData = require("./postData.json");

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    for (const blogPost of blogPostData) {
      const randomUser = users[Math.floor(Math.random() * users.length)].id;
      const postData = { ...blogPost, user_id: randomUser };

      const newPost = await Post.create(postData);
      console.log(`New post created with ID ${newPost.id}`);
    }

    console.log('Seed data inserted successfully.');
  } catch (error) {
    console.error('Error inserting seed data:', error);
  }
};

seedDatabase();
