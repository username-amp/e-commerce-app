export const GET_HOME_PRODUCTS_QUERY = `
  query {
    displayProduct {
      code
      status
      message
      data {
        _id
        name
        images
        price
        solds
        ratings
      }
    }
  }
`;
