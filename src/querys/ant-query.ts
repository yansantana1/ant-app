import { gql } from "@apollo/client";

const INFO_ANT = gql`
  query {
      ants {
        name
        length
        color
        weight
      }
  }
`;

export default INFO_ANT;