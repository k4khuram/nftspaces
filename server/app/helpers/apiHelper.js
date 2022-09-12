
  exports.getSuccessResponse = (data,message) => {
    return {
        success:true,
        data: data,
        message:message
    }

  },
  
  exports.getFailedResponse = (data,message) => {
    return {
        success:false,
        data: data,
        message:message
    }

  },

  exports.getNotFoundResponse = (data ,message) => {
    return {
        success:false,
        data: data,
        message:message
    }

  }

