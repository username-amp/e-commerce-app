export const GOOGLE_SIGNIN_MUTATION = `
  mutation googleSignin($email: String!, $name: String!, $image: String) {
  googleSignin(email: $email, name: $name, image: $image) {
    token
  }
}

`;
