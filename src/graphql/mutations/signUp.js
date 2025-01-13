export const SIGNUP_MUTATION = `
    mutation Signup(
        $name: String!,
        $username: String!,
        $email: String!,
        $password: String!,
        $confirmPassword: String!,
        $role: String!,
        $address: String,
        $phoneNumber: String,
        $gender: String!,
        $birthdate: String!
        ) {
            signup(
                name: $name,
                username: $username,
                email: $email,
                password: $password,
                confirmPassword: $confirmPassword,
                role: $role,
                address: $address,
                phoneNumber: $phoneNumber,
                gender: $gender,
                birthdate: $birthdate
            ) {
                message
                token
                }
        }
`;
