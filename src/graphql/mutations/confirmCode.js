export const CONFIRM_CODE_MUTATION = `
 mutation ConfirmCode($email: String!, $code: String!) {
  confirmCode(email: $email, code: $code) {
    code
    status
    message
  }
}
`;
