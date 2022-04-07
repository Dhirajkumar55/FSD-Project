import {gql} from "@apollo/client";

export const GET_POSTS = gql`
    query Posts($filter: String,$orderBy: PostOrderByInput) {
        posts(filter: $filter,orderBy: $orderBy) {
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

export const REGISTER_USER = gql`
    mutation Signup($email: String!, $username: String!, $password: String!, $name: String!) {
        signup(email: $email, username: $username, password: $password, name: $name) {
            token
            user {
                id
                name
                username
                email
            }
        }
    }
`;