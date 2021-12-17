import { BlitzConfig, sessionMiddleware, simpleRolesIsAuthorized } from 'blitz'

const config: BlitzConfig = {
  middleware: [
    sessionMiddleware({
      cookiePrefix: 'slp-app',
      isAuthorized: simpleRolesIsAuthorized,
    }),
  ],
  images: {
    domains: ['tailwindui.com', 'images.unsplash.com'],
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '/patients/:slug',
  //       destination: '/patients/:slug/overview',
  //       permanent: true,
  //     },
  //   ]
  // },
  /* Uncomment this to customize the webpack config
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config
    return config
  },
  */
}

module.exports = config
