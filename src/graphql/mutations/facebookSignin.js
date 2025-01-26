export const FACEBOOK_SIGNIN_MUTATION = `
  mutation FacebookSignIn($email: String!, $name: String!, $image: String) {
    facebookSignin(email: $email, name: $name, image: $image) {
      message
      token
    }
  }
`;
