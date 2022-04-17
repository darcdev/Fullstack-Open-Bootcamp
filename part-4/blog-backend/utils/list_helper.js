const lodash = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs = []) => {
  const total = blogs.reduce((sum, blog) => blog.likes + sum, 0);
  return total;
};

const favoriteBlog = (blogs = []) => {
  const favorite = lodash.orderBy(blogs, ["likes"], ["desc"])[0];
  const { title, author, likes } = favorite;
  return { title, author, likes };
};

const mostBlogs = (blogs = []) => {
  const groupAuthors = lodash.countBy(blogs, "author");
  const invert = lodash.invertBy(groupAuthors);
  const max = Math.max(...Object.keys(invert));

  const author = invert[max][0];
  const numBlogs = max;

  return {
    author,
    blogs: numBlogs,
  };
};

const mostLikes = (blogs = []) => {
  const groupAuthors = lodash.groupBy(blogs, "author");
  const authorLikes = lodash.mapValues(groupAuthors, (blogsAuthor) => {
    const likes = lodash.reduce(
      blogsAuthor,
      (result, blog) => {
        return result + blog.likes;
      },
      0
    );
    return likes;
  });
  const invert = lodash.invertBy(authorLikes);
  const likes = Math.max(...Object.keys(invert));

  const author = invert[likes][0];

  console.log(author);
  console.log(likes);

  return {
    author,
    likes,
  };
  return;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
