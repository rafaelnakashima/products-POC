import { gql } from "@apollo/client";

export const GET_ALL_PRODUCTS = gql`
  query {
    getAllProducts {
      id
      description
      price
      image
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation createProduct($input: NewProductDto!) {
    createProduct(input: $input) {
      description
      price
      image
    }
  }
`;
