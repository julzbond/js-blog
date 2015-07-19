/****Check if Browser or CLI****/
var window = window || undefined;

if (window) {
  GLOBAL = window;
} else {
  var fs = require('fs');
  var vm = require('vm');
  var chai = require('chai');
  var functionsFile = fs.readFileSync(process.cwd() + '/blog.js');
  vm.runInThisContext(functionsFile); // file runs and it's contents has access to GLOBAL
}
/*******************************/
var expect = chai.expect;
var should = chai.should();

var blogFactory = GLOBAL.blogFactory;

describe("blogFactory", function() {

  var blog1, blog2;

  beforeEach(function(){
    blog1 = blogFactory({
      author: "Julia",
      name: "Test Blog",
      posts: []
    });

    blog2 = blogFactory({
      author: "Person 2",
      name: "Test Blog 2",
      posts: []
    });

  });

  it('should be a function', function () {
    expect(blogFactory).to.exist;
    expect(blogFactory).to.be.an('function');
  });

  it('should have an author', function () {
    expect(blog1.getAuthor).to.be.an('function');
    expect(blog1.getAuthor()).to.equal("Julia");
    expect(blog2.getAuthor()).to.equal("Person 2");
  });

  it('should have a name', function () {
    expect(blog1.getBlogName).to.be.an('function');
    expect(blog1.getBlogName()).to.equal("Test Blog");
    expect(blog2.getBlogName()).to.equal("Test Blog 2");
  });

  it('should edit author name', function () {
    expect(blog1.editAuthor).to.be.an('function');
    blog1.editAuthor("Jason");
    expect(blog1.getAuthor()).to.equal("Jason");
    blog2.editAuthor("Blog 2");
    expect(blog2.getAuthor()).to.equal("Blog 2");
  });

  it('should edit blog name', function () {
    expect(blog1.editBlogName).to.be.an('function');
    blog1.editBlogName("Wordpress Blog");
    expect(blog1.getBlogName()).to.equal("Wordpress Blog");
    expect(blog2.getBlogName()).to.equal("Test Blog 2");
  });

  describe("PostFactory", function() {

    var newPost1, newPost2;

    beforeEach(function(){

      function setTime(){
        var timestamp = new Date();
        return timestamp;
      }

      newPost1 = {
        type: "post",
        title: "My First Post",
        timestamp: setTime(),
        tags: ["post", "awesome", "new"],
        content: "Modules are an integral piece of any robust application's architecture and typically help in keeping the units of code for a project both cleanly separated and organized.",
        publish: true
      };

      newPost2 = {
        type: "post",
        title: "My Second Post",
        timestamp: setTime(),
        tags: ["words", "sweet", "dog"],
        content: "Some words about dogs.",
        publish: true
      };
    });

    it('should create new post', function () {
      expect(blog1.createPost).to.be.an('function');
      blog1.createPost(newPost1);
      expect(blog1.getPosts()).to.deep.equal([newPost1]);
      blog2.createPost(newPost1);
      blog2.createPost(newPost2);
      expect(blog2.getPosts()).to.deep.equal([newPost1, newPost2]);

    });

    it('should have posts', function () {
      expect(blog1.getPosts).to.be.an('function');
      blog1.createPost(newPost1);
      expect(blog1.getPosts()).to.deep.equal([newPost1]);
      blog2.createPost(newPost1);
      blog2.createPost(newPost2);
      expect(blog2.getPosts()).to.deep.equal([newPost1, newPost2]);
    });

    it('should delete post at given index', function () {
      expect(blog1.deletePost).to.be.an('function');
      blog1.createPost(newPost1);
      blog1.deletePost(0, 1);
      expect(blog1.getPosts()).to.deep.equal([]);
      blog2.createPost(newPost1);
      blog2.createPost(newPost2);
      blog2.deletePost(0, 1);
      expect(blog2.getPosts()).to.deep.equal([newPost2]);
    });
  });
});
