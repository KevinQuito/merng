import React from "react";
import { Button, Form } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { useForm } from "../util/hooks";
import { FETCH_POSTS_QUERY } from "../util/graphql";

function PostForm() {
  const { values, onChange, onSubmit } = useForm(createPostCallBack, {
    body: "",
  });

  // the way we handled errors on the register and login page is we used onError method and set them to local errors, but here it doesn't make sense
  // since we only have one error, and there's point in getting it from a deep nested property, so we'll just get it from our second parameter error
  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      // instead of console logging in the results, we want to access the cache, so we'll be using cache instead of _
      //   console.log(result);
      // now all the data that's sitting in our cache should be inside const data
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      // inside const data, the cache/our response is inside the createPost, so we need to edit the createPost entry result.data.createPost
      // we need to persist this, so we'll use proxy.writeQuery
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data: { getPosts: [result.data.createPost, ...data.getPosts]}});
      values.body = "";
    },
  });

  function createPostCallBack() {
    createPost();
  }

  return (
    <Form onSubmit={onSubmit}>
      <h2>Create a post:</h2>
      <Form.Field>
        <Form.Input
          placeholder="Hi World"
          name="body"
          onChange={onChange}
          value={values.body}
        />
        <Button type="submit" color="olive">
          Submit
        </Button>
      </Form.Field>
    </Form>
  );
}

// need to write a mutation to persist a post to our database
const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default PostForm;
