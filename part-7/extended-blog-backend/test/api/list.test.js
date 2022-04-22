const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../../app");
const helper = require("../test_helper");
const Blog = require("../../models/blog");
const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  const newBlogs = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseBlogs = newBlogs.map((blog) => blog.save());
  await Promise.all(promiseBlogs);
});

describe("when there is initially some blogs saved", () => {
  test("blogs are returned as JSON", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all notes are returned", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(5);
  });
});

describe("viewing a specific blog", () => {
  test("blogs contain property id", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body[0]).toBeDefined();
  });
});

describe("addition of a new blog", () => {
  let auth = {};

  beforeAll(async () => {
    await loginUser(auth);
  });

  test("blog have property like 0 by default ", async () => {
    const newBlog = {
      title: "Mr Robot",
      author: "Michael Jordan",
      url: "http://www.mrrobot.com",
    };
    const response = await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", "bearer " + auth.token)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body.blog.likes).toBe(0);
  });

  test("a new blog can be added", async () => {
    const newBlog = {
      title: "Mr Robot",
      author: "Michael Jordan",
      url: "http://www.mrrobot.com",
      likes: 50,
    };
    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", "bearer " + auth.token)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const blogsTitle = blogsAtEnd.map((blog) => blog.title);

    expect(blogsTitle).toContain("Mr Robot");
  });

  test("a new blog can't be added without token", async () => {
    const newBlog = {
      title: "Mr Robot",
      author: "Michael Jordan",
      url: "http://www.mrrobot.com",
      likes: 50,
    };
    await api.post("/api/blogs").send(newBlog).expect(401);
  });

  test("blog without title or url is not added", async () => {
    const newBlog = {
      title: "Mr Robot",
      author: "Michael Jordan",
      likes: 50,
    };
    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", "bearer " + auth.token)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

describe("Updating blog", () => {
  test("likes blog is updated", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({
        likes: 15,
      })
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body.blog).toEqual({
      ...blogToUpdate,
      likes: 15,
    });
  });
});

describe("Deletion of a blog", () => {
  let auth = {};

  beforeAll(async () => {
    await loginUser(auth);
  });

  test("blog is deleted with status code 204 if id is valid", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", "bearer " + auth.token);
    expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const blogsTitle = blogsAtEnd.map((blog) => blog.title);

    expect(blogsTitle).not.toContain(blogToDelete.title);
  });
});

afterAll(() => {
  mongoose.connection.close();
});

// Functions

async function loginUser(auth) {
  const response = await api
    .post("/auth")
    .send({
      username: "darcdev",
      password: "diego",
    })
    .expect(200);
  auth.token = response.body.token;
}
