import React from "react";
import { Button, Card, Icon, Label, Image } from "semantic-ui-react";
import { Link } from 'react-router-dom';
import moment from "moment";

function PostCard({
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) {

    function likePost(){
        console.log("Like Post!!!!")
    }
    function commentOnPost(){
        console.log("Comment on Post!!!!")
    }
  return (
    //   fluid allows them to take more space, which looks nicer on the front end
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{username}</Card.Header>
        {/* if you want to remove the ago in "2 hours ago" then make it .fronNow(true) 'cause right now it's defaulted to false */}
        {/* we can make the timestamp a link to the post itself by make ing the Card.Meta as={Link} to={`/posts/${id of the post}}` */}
        <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow()}</Card.Meta>
        <Card.Description>
          {body}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
      <Button as='div' labelPosition='right' onClick={likePost}>
          {/* we put color='olive' basic so that the button isn't highlighted, we'll make it so that when the user clicks on the button, then it will highlight it*/}
      <Button color='olive' basic>
        <Icon name='heart' />
      </Button>
      <Label basic color='olive' pointing='left'>
        {likeCount}
      </Label>
    </Button>
    <Button as='div' labelPosition='right' onClick={commentOnPost}>
          {/* we put color='olive' basic so that the button isn't highlighted, we'll make it so that when the user clicks on the button, then it will highlight it*/}
      <Button color='blue' basic>
        <Icon name='comments' />
      </Button>
      <Label basic color='blue' pointing='left'>
        {commentCount}
      </Label>
    </Button>
      </Card.Content>
    </Card>
  );
}

export default PostCard;
