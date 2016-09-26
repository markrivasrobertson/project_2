import React from 'react';
import Post from './post.jsx';

const propTypes = {
  posts: React.PropTypes.array.isRequired,
  handlePublish: React.PropTypes.func,
  handleDelete: React.PropTypes.func,
};

class PostList extends React.Component {
  render() {
    const postElements = this.props.posts.map((post, idx) => {
      return (
        <li key={idx}>
          <Post
            handleDelete={this.props.handleDelete}
            handlePublish={this.props.handlePublish}
            author={post.author}
            content={post.content}
            id={post.id}
          />
        </li>
      );
    });
    return (
      <ul>
        {postElements}
      </ul>
    );
  }
}


PostList.propTypes = propTypes;

export default PostList;
