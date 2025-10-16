// Regex patterns
export const patterns = {
  userNameEnd: /[A-Za-z0-9]$/,
  userName: /^[A-Za-z0-9._]+$/,
  userNameStart: /^[A-Za-z0-9]/,
  password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
}
