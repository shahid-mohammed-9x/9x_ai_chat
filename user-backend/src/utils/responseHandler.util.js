class ResponseHandler {
  successResponseStandard(
    res,
    {
      success = true,
      statusCode = 200,
      message = "",
      data = null,
      otherData = {},
    }
  ) {
    let responseObject = {
      success,
      statusCode,
      message,
      data,
    };

    let otherDataKeysLength = Object.keys(otherData).length || 0;

    if (otherDataKeysLength > 0) {
      responseObject = { ...responseObject, ...otherData };
    }

    res.status(statusCode).json(responseObject);
  }
}

module.exports = new ResponseHandler();
