const blogRouter = require('express').Router();
const tokenValidator = require('../middlewares/tokenValidator');
const Blog = require('../models/blog');
const User = require('../models/user');

blogRouter.get('/', async (request, response) => {
  const blog = await Blog.find({})
    .populate('user', { blogs: 0 })
    .sort({ likes: -1 });
  return response.json(blog);
});

blogRouter.post('/', tokenValidator(), async (request, response) => {
  const { title, author, url, likes } = request.body;
  const { id: userId } = request.user;

  if (!title || !url) {
    return response.status(400).send({ error: 'Solicitud Incorrecta' });
  }

  const user = await User.findById(userId);

  const newBlog = {
    title,
    author,
    url,
    likes: likes || 0,
    user: user.id,
  };

  const blog = new Blog(newBlog);

  const blogCreated = await blog.save();

  user.blogs = user.blogs.concat(blog.id);
  user.save();

  response.status(200).json({ blog: blogCreated });
});

blogRouter.put('/:id', tokenValidator(), async (request, response) => {
  const { likes } = request.body;
  const blog = {
    likes,
  };
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  }).populate('user', { blogs: 0 });

  response.status(200).json({
    blog: updatedBlog,
  });
});

blogRouter.delete('/:id', tokenValidator(), async (request, response) => {
  const { id } = request.params;
  const { id: userId } = request.user;
  const blog = await Blog.findById(id);

  if (!blog) {
    response.status(400).json({
      error: 'No existe el blog que intentas eliminar',
    });
  }

  if (!(blog.user.toString() === userId)) {
    return response.status(401).json({
      error:
        'unauthorized operation , you dont have permissions to delete this blog',
    });
  }

  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = blogRouter;
