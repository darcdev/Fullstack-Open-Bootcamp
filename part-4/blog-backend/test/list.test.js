const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
  const blogs = [];
  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total of likes", () => {
  test("of empty list is zero", () => {
    const blogs = [];
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(0);
  });
  test("when list has only one blog equals the like of that ", () => {
    const blogs = [
      {
        title: "Go To Mall",
        author: "Ester Weig",
        url: "http://www.gotomall.com",
        likes: 10,
      },
    ];
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(10);
  });
  test("when list is greater than one calc right", () => {
    const blogs = [
      {
        title: "Go To Mall",
        author: "Ester Weig",
        url: "http://www.gotomall.com",
        likes: 10,
      },
      {
        title: "Sharly Documental",
        author: "Sharly lia",
        url: "http://www.sharly.com",
        likes: 15,
      },
    ];
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(25);
  });
});

describe("favorite blog", () => {
  test("return the blog with more likes", () => {
    const blogs = [
      {
        title: "Go To Mall",
        author: "Ester Weig",
        url: "http://www.gotomall.com",
        likes: 10,
      },
      {
        title: "Sharly Documental",
        author: "Sharly lia",
        url: "http://www.sharly.com",
        likes: 15,
      },
    ];

    const result = listHelper.favoriteBlog(blogs);
    expect(result).toEqual({
      title: "Sharly Documental",
      author: "Sharly lia",
      likes: 15,
    });
  });
});
describe("blogs by author", () => {
  test("return the author with more blogs", () => {
    const blogs = [
      {
        title: "Go To Mall",
        author: "Ester Weig",
        url: "http://www.gotomall.com",
        likes: 10,
      },
      {
        title: "Get babies",
        author: "Sharly lia",
        url: "http://www.getbabies.com",
        likes: 15,
      },
      {
        title: "Sharly Documental",
        author: "Sharly lia",
        url: "http://www.sharly.com",
        likes: 5,
      },
      {
        title: "Hi",
        author: "Sharly lia",
        url: "http://www.hi.com",
        likes: 7,
      },
      {
        title: "The monkeys",
        author: "Ester Weig",
        url: "http://www.themonkeys.com",
        likes: 20,
      },
    ];

    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual({
      author: "Sharly lia",
      blogs: 3,
    });
  });
});
describe("likes by author", () => {
  test("return the author with more likes", () => {
    const blogs = [
      {
        title: "Go To Mall",
        author: "Ester Weig",
        url: "http://www.gotomall.com",
        likes: 10,
      },
      {
        title: "Get babies",
        author: "Sharly lia",
        url: "http://www.getbabies.com",
        likes: 15,
      },
      {
        title: "Sharly Documental",
        author: "Sharly lia",
        url: "http://www.sharly.com",
        likes: 5,
      },
      {
        title: "Hi",
        author: "Sharly lia",
        url: "http://www.hi.com",
        likes: 7,
      },
      {
        title: "The monkeys",
        author: "Ester Weig",
        url: "http://www.themonkeys.com",
        likes: 20,
      },
    ];

    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual({
      author: "Ester Weig",
      likes: 30,
    });
  });
});
