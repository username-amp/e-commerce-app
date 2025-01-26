export const SIGNIN_MUTATION = `
  mutation Signin($emailOrUsername: String!, $password: String!) {
    signin(emailOrUsername: $emailOrUsername, password: $password) {
      message
      token
    }
  }
`;
