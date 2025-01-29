export const GET_PRODUCT_BY_ID_QUERY = `
     query GetProductById($_id: String!) {
        getProductById(_id: $_id) {
            code
            status
            message
            data {
                _id
                name
                price
                ratings
                images
                category
                stock
                hasWarranty
                warrantyType
                warrantyDuration
                shipsFrom
                description
            }
        }
    }
`;
