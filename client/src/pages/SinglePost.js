import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Button, Card, Grid, Image, Icon, Label } from "semantic-ui-react";
import moment from "moment";

import { AuthContext } from "../context/auth";
import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";

function SinglePost() {
    const navigate = useNavigate();
    let { postId } = useParams();
  console.log(postId);
  const { user } = useContext(AuthContext);
  const { data: { getPost } = {} } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });
  function deletePostCallback(){
      // instead of using props.history.push('/') use navigate('/') instead especially for react v6
        navigate('/');
  }

  //create markup here and see what we need
  // this will be conditional since it's dependent on whether we have the data from query or not yet
  let postMarkup;
  // if not getPost because we might still be loading
  if (!getPost) {
    // can put a spinner if to indicate loading, but for now it's just a paragraph saying loading post..
    postMarkup = <p>Loading post..</p>;
  } else {
    // else we need to get all the fields from the post
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      likes,
      likeCount,
      commentCount,
    } = getPost;

    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
              size="small"
              float="right"
            />
          </Grid.Column>
          <Grid.Column width={10}>
            {/* we'll give the Card the property of fluid so it takes up the entire width */}
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                {/* we need to import moment to format the time to "2 hours ago" or "1 day ago" */}
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                {/* we need to import the authContext for the likeButton when we're passing in our user */}
                <LikeButton user={user} post={{ id, likeCount, likes }} />
                <Button
                  as="div"
                  labelPosition="right"
                  onClick={() => console.log("comment on post")}
                >
                  <Button basic color="olive">
                    <Icon name="comments" />
                  </Button>
                  <Label basic color="olive" pointing="left">
                    {commentCount}
                  </Label>
                </Button>
                {/* if user and user.username equals the username of the post and...  */}
                {user && user.username === username && (
                    // when we delete our post, it successfully deletes it and when we go back to the homepage, it shows that it was deleted, but what we should do instead
                    // of manually going back to the homepage is by passing a callback to the delete button to automatically do it for us
                  <DeleteButton postId={id} callback={deletePostCallback}/>
                )}
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  return postMarkup;
}

const FETCH_POST_QUERY = gql`
  query ($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default SinglePost;
