import React from 'react';
import PropTypes from 'prop-types';
import {
    ListGroup,
    ListGroupItem
} from 'reactstrap';
import InfiniteScroll from 'react-infinite-scroller';
import {connect} from 'react-redux';

import PostItem from 'components/PostItem.jsx';
import {listMorePosts} from 'states/post-actions.js';

import './PostList.css';

class PostList extends React.Component {
    static propTypes = {
        posts: PropTypes.array,
        hasMore: PropTypes.bool,
        searchText: PropTypes.string
    };

    constructor(props) {
        super(props);

        this.handleScroll = this.handleScroll.bind(this);
    }

    render() {
        const {posts, hasMore} = this.props;

        let children = (
            <ListGroupItem className='empty d-flex justify-content-center align-items-center'>
                <div className='empty-text'>No post here.<br />Go add some posts.</div>
            </ListGroupItem>
        );
        if (posts.length) {
            children = posts.map(p => (
                <ListGroupItem key={p.id} action>
                    <PostItem {...p} UserName={this.props.UserName}/>
                </ListGroupItem>
            ));
        }

        return (//我去掉了<InfiniteScroll initialLoad={false} loadMore={this.handleScroll} hasMore={hasMore}>
            <div className='post-list'>
                <ListGroup>
    
                        {children}
              
                </ListGroup>
            </div>
        );
    }

    handleScroll(page) {
        const {posts, searchText} = this.props;
        this.props.dispatch(listMorePosts(searchText, posts[posts.length - 1].id));
    }
}

export default connect(state => ({
    posts: state.post.posts,
    hasMore: state.post.hasMore,
    searchText: state.searchText
}))(PostList);
