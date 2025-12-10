export default () => ({
  port: parseInt(process.env.PORT ?? '3000', 10), // fallback to 3000
  mongodbUri: process.env.MONGODB_URI ?? '',      // fallback empty string
});
