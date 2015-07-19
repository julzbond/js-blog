function blogFactory(object){

  var author = object.author;
  var name = object.name;
  var posts = object.posts;
  var blog = {
    getAuthor: _getAuthor,
    getBlogName: _getBlogName,
    editAuthor: _editAuthor,
    editBlogName: _editBlogName,
    createPost: _createPost,
    getPosts: _getPosts,
    deletePost: _deletePost
  }

  return blog;

  function _getAuthor(){
    return author;
  }

  function _getBlogName(){
    return name;
  }

  function _editAuthor(revisedAuthor){
    author = revisedAuthor;
    return author;
  }

  function _editBlogName(revisedBlogName){
    name = revisedBlogName;
    return name;
  }

  function _createPost(object){
    // Create a post object
    var post = PostFactory(object);
    //Insert into 'posts' array
    posts.push(post);
    return posts;
  }

  function PostFactory(object){
    var type = object.type;
    var title = object.title;
    var timestamp = setTime();
    var tags = object.tags;
    var content = object.content;
    var publish = object.publish;
    return {
      type: type,
      title: title,
      timestamp: timestamp,
      tags: tags,
      content: content,
      publish: publish
    };
  }

  function setTime(){
    var timestamp = new Date();
    return timestamp;
  }

  // function publish(){
  //   return true;
  // }

  function _getPosts(){
    return posts;
  }

  function _deletePost(start, end){
    posts.splice(start, end);
    return posts;
  }

};
