const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "Go To Mall",
    author: "Ester Weig",
    url: "http://www.gotomall.com",
    likes: 10,
    user: "60bd5e5ecb515e23f63bbeb1",
  },
  {
    title: "Get babies",
    author: "Sharly lia",
    url: "http://www.getbabies.com",
    likes: 15,
    user: "60bd5e5ecb515e23f63bbeb1",
  },
  {
    title: "Sharly Documental",
    author: "Sharly lia",
    url: "http://www.sharly.com",
    likes: 5,
    user: "60bd5e5ecb515e23f63bbeb1",
  },
  {
    title: "Hi",
    author: "Sharly lia",
    url: "http://www.hi.com",
    likes: 7,
    user: "60bd5e5ecb515e23f63bbeb1",
  },
  {
    title: "The monkeys",
    author: "Ester Weig",
    url: "http://www.themonkeys.com",
    likes: 20,
    user: "60bd5e5ecb515e23f63bbeb1",
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
};
