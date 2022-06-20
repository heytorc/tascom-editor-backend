// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export default {
  secret: process.env.JWT_SECRET,
};
