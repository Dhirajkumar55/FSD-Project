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

export const USER_DETAILS = gql`
    query User($email: String!) {
        user(email: $email) {
            id
            name
            username
            imageURL
            email
        }
    }

`;

export const CREATE_POST = gql`
     mutation CreatePost($title: String!, $description: String!,$goal: String!, $membercount:Int!, $duration:Int!, $weeklyhrs:Int!, $skills:[String!]!){
        createPost(title:$title , description:$description , goal:$goal , membercount:$membercount, duration:$duration, weeklyhrs:$weeklyhrs, skills:$skills){
            id
        }
    }
`;

export const UPDATE_POST = gql`
    mutation UpdatePost($updatePostId: ID!, $title: String, $description: String, $skills: [String!], $weeklyhrs: Int, $duration: Int, $membercount: Int, $goal: String) {
        updatePost(id: $updatePostId, title: $title, description: $description, skills: $skills, weeklyhrs: $weeklyhrs, duration: $duration, membercount: $membercount, goal: $goal) {
            id
            title
            description
            goal
            membercount
            duration
            weeklyhrs
            skills
            createdAt
        }
    }
`;