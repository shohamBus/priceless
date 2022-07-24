/** @type {import('next').NextConfig} */
const { DB_USER, DB_PASS, CLIENT_ID, CLIENT_SECRET, NEXT_PUBLIC_ADMIN_EMAIL } =
  process.env;

const nextConfig = {
  reactStrictMode: true,
  env: {
    DB_USER,
    DB_PASS,
    CLIENT_ID,
    CLIENT_SECRET,
    NEXT_PUBLIC_ADMIN_EMAIL,
  },
};

module.exports = nextConfig;
