module.exports = {
  reactStrictMode: true,
  trailingSlash: true,
  env: {
    development: {
      clientAddress: 'http://localhost:3000',
      salesAnalisisClientAddress: 'http://localhost:3001',
      apiAddress: 'http://localhost:8081',
      scpApiAddress: 'http://localhost:7081',
      authApiAddress: 'http://localhost:9081',
      socketAddress: 'http://localhost:8081/wsc'
    },
    production: {
      clientAddress: 'https://www.sellertl.com',
      salesAnalisisClientAddress: 'https://sales-analysis.sellertl.com',
      apiAddress: 'https://api.sellertl.com',
      scpApiAddress: 'https://scp.sellertl.com',
      authApiAddress: 'https://auth.sellertl.com',
      socketAddress: 'https://api.sellertl.com/wsc'
      // clientAddress: 'http://localhost:3000',
      // salesAnalisisClientAddress: 'http://localhost:3001',
      // apiAddress: 'http://localhost:8081',
      // scpApiAddress: 'http://localhost:7081',
      // authApiAddress: 'http://localhost:9081',
      // socketAddress: 'http://localhost:8081/wsc'
    }
  },
  images: {
    loader: "imgix",
    path: "http://localhost:3000",
  },
}
