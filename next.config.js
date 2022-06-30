/** @type {import('next').NextConfig} */
const { DB_USER, DB_PASS } = process.env;

const nextConfig = {
  reactStrictMode: true,
  env: {
    DB_USER,
    DB_PASS,
  },
};

module.exports = nextConfig;
