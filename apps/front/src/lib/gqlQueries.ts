import { gql } from "graphql-tag";
import { skip } from "node:test";

export const GET_POSTS = gql`

query posts ($skip:Float, $take:Float) {
    posts (skip:$skip, take:$take) {
        id
        title
        thumbnail
        content
        createdAt
        slug
    }
    postsCount
}
`;