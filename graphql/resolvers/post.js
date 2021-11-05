// resolver moved from index.js
const Post = require('../../models/Post');


module.exports = {
    Query: {
        sayHi: () => 'Hello World!',
        // if your query fails, it might actually stop your server, which is not good, so we use async to simplify the syntax necessary to consume promise-based APIs
        async getPosts(){
                try{
                    const posts = await Post.find(); // .find() will find all of them if there isn't anything specified
                    return posts
                }catch(err){
                    throw new Error(err);
                }
        }

    }
}