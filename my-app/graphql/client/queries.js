import {gql} from "@apollo/client";

export const GET_POSTS = gql`
    query Posts($orderBy: PostOrderByInput) {
        posts(orderBy: $orderBy) {
            id
            title
            createdAt
            goal
            membercount
            duration
            weeklyhrs
            skills
            postedBy {
                id
                name
                email
                username
                imageURL
            }
        }
    }
`;

export const GET_POST = gql`
    query Post($postId: ID!) {
        post(id: $postId) {
            id
            title
            description
            goal
            membercount
            duration
            weeklyhrs
            skills
            createdAt
            postedBy {
                id
            }
        }
    }
`;

export const LOGIN_USER = gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      id
      name
      username
      email
    }
  }
}
`

export const USER_POSTS = gql`
    query User($email: String!) {
        user(email: $email) {
            posts {
                id
                title
                goal
                membercount
                duration
                weeklyhrs
                skills
                createdAt
                postedBy {
                    id
                    name
                    username
                    email
                    imageURL
                }
            }
        }
    }
`;