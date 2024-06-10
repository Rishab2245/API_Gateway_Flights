const express = require('express');

const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');
const {rateLimit} = require('express-rate-limit');
const { createProxyMiddleware } = require('http-proxy-middleware');

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	limit:30 , 
})



const app = express();
app.use('/flightService',createProxyMiddleware({
      target: ServerConfig.FLIGHT_SERVICE,
      changeOrigin: true,
    }),
  );
app.use('/bookingService',createProxyMiddleware({
      target: ServerConfig.BOOKING_SERVICE,
      changeOrigin: true,
    }),
  );
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended : true}));
app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
});
