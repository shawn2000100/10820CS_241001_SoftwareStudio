import React from 'react';
import PropTypes from 'prop-types';
import {
    ListGroup,
    ListGroupItem
} from 'reactstrap';
import {connect} from 'react-redux';

import PostItem from 'components/PostItem.jsx';

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
        let {posts} = this.props;
        if(!posts) posts = [];

        let children = (
            <ListGroupItem className='empty d-flex justify-content-center align-items-center'>
                <div className='empty-text'>No post here.<br />Go add some posts.</div>
            </ListGroupItem>
        );
        if (posts.length) {
            children = posts.map(p => (
                <ListGroupItem key={p.id} action>
                    <PostItem {...p} />
                </ListGroupItem>
            ));
        }

        return (
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
    searchText: state.searchText,
    // TODO
}))(PostList);
