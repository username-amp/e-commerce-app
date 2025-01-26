export const GET_USER_QUERY = `
  query GetUserByEmail($email: String!) {
    getUsernameByEmail(email: $email) {
      username
    }
  }
`;
