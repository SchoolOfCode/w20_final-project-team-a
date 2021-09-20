export const API_URL = process.env.REACT_APP_ENV==="prod"?process.env.REACT_APP_PROD_HOST : process.env.REACT_APP_DEV_HOST
export const VALID_IMAGE_TYPES = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png']
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024