import axios from "axios";

const fetchGraphQL = async (query, variables = {}) => {
  try {
    const response = await axios.post(
      `http://localhost:8004/graphql`,
      {
        query,
        variables,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.errors) {
      console.error("GraphQL errors:", response.data.errors);
      return { errors: response.data.errors };
    }

    return response.data;
  } catch (error) {
    console.error("Graph request failed", error);
    throw error;
  }
};

export default fetchGraphQL;
