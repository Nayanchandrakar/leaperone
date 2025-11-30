// Regex patterns
export const patterns = {
  userNameEnd: /[A-Za-z0-9]$/,
  userName: /^[A-Za-z0-9._]+$/,
  userNameStart: /^[A-Za-z0-9]/,
  telegram: /^https?:\/\/t\.me\/[a-zA-Z0-9_-]+$/,
  vimeoUrl: /^https?:\/\/www\.vimeo\.com\/[\w-]+$/,
  youtubeUrl: /^https?:\/\/www\.youtube\.com\/watch\?v=[\w-]+$/,
  password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
}
