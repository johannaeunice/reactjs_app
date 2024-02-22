const { createProxyMiddleware } = require('http-proxy-middleware');

const express = require('express');
const app = express();

// Define the target API URL
const target = 'https://le-nkap-v1.onrender.com';

// Create a proxy middleware instance
const proxy = createProxyMiddleware({
  target,
  changeOrigin: true, // for vhosted sites, changes host header to match to target's host
  secure: false, // only for dev environment without ssl
  onProxyRes: function(proxyRes, req, res) {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
  },
  onError: function(err, req, res) {
    console.error(err);
    res.status(500).send('Proxy Error');
  }
});

// Mount the proxy middleware
app.use('/', proxy);

// Start the Express server
const port = 3001; // Choose any available port
app.listen(port, () => {
  console.log(`Proxy server is running on http://localhost:${port}`);
});
