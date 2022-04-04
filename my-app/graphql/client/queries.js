import {gql} from "@apollo/client";

export const GET_POSTS = gql`
    query Posts {
        posts {
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
                name
                username
                email
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