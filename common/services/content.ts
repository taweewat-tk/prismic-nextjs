import { gql } from "@apollo/client";
import { client } from "./apollo-client";

export const whyus = async () => {
  try {
    const response = await client.query({
      query: gql`
        query WhyUs {
          allWhyUss {
            edges {
              node {
                head
                description
              }
            }
          }
        }
      `,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
