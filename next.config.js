/** @type {import('next').NextConfig} */
const { DB_USER, DB_PASS, CLIENT_ID, CLIENT_SECRET } = process.env;

const nextConfig = {
  reactStrictMode: true,
  env: {
    DB_USER,
    DB_PASS,
    CLIENT_ID,
    CLIENT_SECRET,
  },
};

module.exports = nextConfig;
