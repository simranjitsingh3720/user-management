const errorHandler = {
    logError: (error, info = {}) => {
      console.error('Error:', error);
      if (info.componentStack) {
        console.error('Component Stack:', info.componentStack);
      }
    },
  
    handleError: (error, info = {}) => {
      errorHandler.logError(error, info);
    },
  };
  
  export default errorHandler;
  