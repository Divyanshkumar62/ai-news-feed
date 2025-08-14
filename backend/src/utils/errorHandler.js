// Generic error handling function
export const handleError = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
};