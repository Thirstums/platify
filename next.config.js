const nextConfig = {
  experimental: {
    appDir: true,
  },
};

module.exports = {
  ...nextConfig, // Include nextConfig as a property
  images: {
    unoptimized: true,
  },
  env: {
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
    SPOTIFY_REDIRECT_URI: process.env.SPOTIFY_REDIRECT_URI,
  },
};
