module.exports = {
    images: {
      domains: ['api.bodasdehoy.com', '137.184.148.28', "96.126.110.203"],
    },
    typescript: {
      // Ignorar errores de TypeScript durante el build (styled-jsx legacy issue)
      ignoreBuildErrors: true,
    },
    eslint: {
      // Ignorar errores de ESLint durante el build
      ignoreDuringBuilds: true,
    },
  }