const handleErr = (res, errMsg) => {
  res.json({
    success: false,
    message: errMsg
  })
}

module.exports = { handleErr };