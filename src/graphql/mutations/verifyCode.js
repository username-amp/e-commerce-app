export const VERIFY_CODE_MUTATION = `
  mutation VerifyCode($email: String!) {
    verifyCode(email: $email) {
      code
      status
      message
    }
  }
`;
