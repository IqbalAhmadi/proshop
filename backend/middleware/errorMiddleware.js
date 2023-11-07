const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  next(error) // pass error to error handler
}

// Error handler middleware
const errorHandler = (err, req, res, next) => {
  // set status code to 500 if status code is 200
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode
  let message = err.message

  // Check for Mongoose bad ObjectId
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    message = 'Invalid ID'
    statusCode = 400
  }
  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'production' ? '🧁' : err.stack,
  })
}

export { notFound, errorHandler }
