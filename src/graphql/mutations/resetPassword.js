export const RESET_PASSWORD_MUTATION = `
  mutation ResetPassword($email: String!, $newPassword: String!) {
    resetPassword(email: $email, newPassword: $newPassword) {
      code
      status
      message
    }
  }
`;
