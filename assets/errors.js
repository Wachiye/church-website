const errors = [
    {
        "code":201,
        "name":"RESOURCE_CREATED",
        "message":"Resource created successfully"
    },
    {
        "code":204,
        "name":"NO_CONTENT"
    },
    {
        "code":400,
        "name":"NO_CONTENT",
        "message":"Bad Request"
    },
    {
        "code":401,
        "name":"AUTH_ERR_UNAUTHORIZED",
        "message":"Access Denied. You are not authorized to do this action.Login required"
    },
    {
        "code":404,
        "name":"RESOURCE_NOT_FOUND",
        "message" :"The specified resource does not exist."
    },
    {
        "code":500,
        "name":"SERVER_ERR",
        "message":"An error occurred while processing your request."
    }
  ]

module.exports = errors;