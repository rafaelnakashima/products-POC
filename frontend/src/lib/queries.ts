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

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: Float!) {
    deleteProduct(id: $id)
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query getProductById($id: Float!) {
    getProductById(id: $id) {
      id
      description
      price
      image
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation updateProduct($id: Float!, $input: UpdateProductDto!) {
    updateProduct(id: $id, input: $input) {
      description
      price
      image
    }
  }
`;