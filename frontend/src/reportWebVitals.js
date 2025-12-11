// this function optionally measures web app performance
// only runs if a callback (onPerfEntry) is provided
const reportWebVitals = onPerfEntry => {
  // check if callback is a valid function
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // dynamically load performance tools from web-vitals ref: https://web.dev/vitals/
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // these functions collect different performance metrics
      getCLS(onPerfEntry); // layout shift score
      getFID(onPerfEntry); // input delay
      getFCP(onPerfEntry); // first paint of content
      getLCP(onPerfEntry); // largest element paint
      getTTFB(onPerfEntry); // server time-to-first-byte. helped by ai 
    });
  }
};

export default reportWebVitals;


// cra docs https://create-react-app.dev/docs/measuring-performance/