import { BlitzConfig, sessionMiddleware, simpleRolesIsAuthorized, Ctx } from 'blitz'

const config: BlitzConfig = {
  middleware: [
    sessionMiddleware({
      cookiePrefix: 'slp-app',
      isAuthorized: simpleRolesIsAuthorized,
    }),
    (req, res, next) => {
      return next()
    },
  ],
  images: {
    domains: ['tailwindui.com', 'images.unsplash.com'],
  },
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
