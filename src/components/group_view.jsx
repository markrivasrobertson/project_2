import request from 'superagent';
import React from 'react';
import Post from './post.jsx';
import PostList from './postlist.jsx';
import firebase from '../../firebase.config.js';
import UserView from './user_view.jsx';

class GroupView extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
      posts: [],
    };
    this.handlePublish = this.handlePublish.bind(this);
    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.publishPost = this.publishPost.bind(this);
    this.getUsers = this.getUsers.bind(this);
    // this.consoler = this.consoler.bind(this);
  }
  componentWillMount() {
    // console.log('component pre mounting');
    setTimeout(() => {
      this.getUsers();
    });
  }
  // no longer serving any noticeable function, since the buttons to which it was attached are gone
  // consoler() {
  //   console.log('clickety');
  // }
  getUsers() {
    // console.log('get users called');
    const url = 'https://license-plate-scavenger-hunt.firebaseio.com/users/.json';
    request.get(url).then((response) => {
      let users = [];
      const userData = response.body;
      if (userData) {
        users = Object.keys(userData).map((id) => {
          return {
            uid: id,
            user: userData[id].user_name,
            remaining: userData[id].remaining,
          };
        });
      }
      this.setState({ users: users });
    });
  }
  componentDidMount() {
    // why is this here again, when it was called in component will mount?
    this.getPosts();
  }
  getPosts() {
    // console.log('getPosts called');
    const url = 'https://license-plate-scavenger-hunt.firebaseio.com/posts/.json';
    request.get(url)
      .then((response) => {
        const postsData = response.body;
        let posts = [];
        if (postsData) {
          posts = Object.keys(postsData).map((id) => {
            const individualPostData = postsData[id];
            return {
              id: id,
              author: individualPostData.author,
              content: individualPostData.content,
            };
          });
        }
        this.setState({ posts: posts });
      });
  }
  handlePublish({ id, content, author }) {
    // console.log('handle publish called');
    if (id) {
      this.updatePost({ id, content, author });
    } else {
      this.publishPost({ content, author });
    }
  }
  updatePost({ id, content, author }) {
    // console.log('updatePost called');
    const url = `https://license-plate-scavenger-hunt.firebaseio.com/posts/${id}.json`;
    request.patch(url)
      .send({ content, author })
      .then(() => {
        this.getPosts();
      });
  }
  deletePost(id) {
    // console.log('deletePost called');
    const url = `https://license-plate-scavenger-hunt.firebaseio.com/posts/${id}.json`;
    // console.log(url);
    request.del(url)
      .then(() => {
        this.getPosts();
      });
  }
  publishPost({ content, author }) {
    // console.log('publishPost called');
    const url = 'https://license-plate-scavenger-hunt.firebaseio.com/posts/.json';
    request.post(url)
      .send({ content, author })
      .then(() => {
        this.getPosts();
      });
  }
  render() {
    // console.log(firebase.auth().currentUser.uid);
    const displayedProfiles = this.state.users.map((obj, idx) => {
      const individualName = obj.user;
      const individualRemaining = obj.remaining;
      const individualId = obj.uid;
      // console.log(obj);
      return (
        <div key={idx} className="userListDisplay">
          <h1>{individualName}<br /><span>{individualRemaining}</span> license plates to go!</h1>
          <UserView id={individualId} />
        </div>
      );
    });
    return (
      <div>
        <div>
          <PostList
            handleDelete={this.deletePost}
            handlePublish={this.handlePublish}
            posts={this.state.posts}
          />
          <Post
            handleDelete={this.deletePost}
            handlePublish={this.handlePublish}
          />
        </div>
        <ul>
          {displayedProfiles}
        </ul>
      </div>
    );
  }
}

export default GroupView;

/*
<Link to="/:user" params={{ user: individualId }}>View Plates</Link>
this is seemingly useless, after the workaround with Kate
*/
