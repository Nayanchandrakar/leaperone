// Regex patterns
export const patterns = {
  userNameEnd: /[A-Za-z0-9]$/,
  userName: /^[A-Za-z0-9._]+$/,
  userNameStart: /^[A-Za-z0-9]/,
  telegram: /^https?:\/\/t\.me\/[a-zA-Z0-9_-]+$/,
  vimeoUrl: /^https?:\/\/www\.vimeo\.com\/[\w-]+$/,
  youtubeUrl: /^https?:\/\/www\.youtube\.com\/watch\?v=[\w-]+$/,
  password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,

  // Social Media URLs
  facebook: /^https?:\/\/(www\.)?(facebook\.com|fb\.com)\/[\w.-]+\/?$/,
  instagram: /^https?:\/\/(www\.)?instagram\.com\/[\w.-]+\/?$/,
  twitter: /^https?:\/\/(www\.)?(twitter\.com|x\.com)\/[\w]+\/?$/,
  linkedin: /^https?:\/\/(www\.)?linkedin\.com\/(in|company)\/[\w-]+\/?$/,
  snapchat: /^https?:\/\/(www\.)?snapchat\.com\/add\/[\w.-]+\/?$/,
  pinterest: /^https?:\/\/(www\.)?pinterest\.com\/[\w.-]+\/?$/,
  tiktok: /^https?:\/\/(www\.)?tiktok\.com\/@[\w.-]+\/?$/,
  twitch: /^https?:\/\/(www\.)?twitch\.tv\/[\w-]+\/?$/,
  behance: /^https?:\/\/(www\.)?behance\.net\/[\w-]+\/?$/,

  // Communication URLs
  phone: /^tel:\+?[\d\s()-]+$/,
  email: /^mailto:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  sms: /^sms:\+?[\d]+$/,
  whatsapp: /^https?:\/\/(wa\.me|api\.whatsapp\.com\/send\?phone=)\+?[\d]+$/,
  wechat: /^weixin:\/\/[\w]+$/,

  // Business URLs
  googleBusiness:
    /^https?:\/\/(www\.)?google\.com\/maps\/place\/[\w\s,+-]+\/@[\d.,-]+z\/data=[\w!-]+$/,
  yelp: /^https?:\/\/(www\.)?yelp\.com\/biz\/[\w-]+$/,
  etsy: /^https?:\/\/(www\.)?etsy\.com\/shop\/[\w-]+\/?$/,

  // Payment URLs
  paypal: /^https?:\/\/(www\.)?paypal\.me\/[\w]+\/?$/,
  stripe: /^https?:\/\/(www\.)?pay\.stripe\.com\/[\w-]+$/,
  cashapp: /^https?:\/\/cash\.app\/\$[\w]+\/?$/,
  zelle: /^[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/,
  venmo: /^https?:\/\/(www\.)?venmo\.com\/[\w-]+\/?$/,

  // Music URLs
  appleMusic: /^https?:\/\/(www\.)?music\.apple\.com\/[\w/-]+$/,
  soundCloud: /^https?:\/\/(www\.)?soundcloud\.com\/[\w-]+\/?$/,
  spotify: /^https?:\/\/open\.spotify\.com\/(artist|user|playlist)\/[\w]+\/?$/,

  // Location URL
  location: /^https?:\/\/(www\.)?(google\.com\/maps|maps\.google\.com|goo\.gl\/maps)\/[\w?&=.-]+$/,
}
