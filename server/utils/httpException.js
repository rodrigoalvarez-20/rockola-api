class HttpException extends Error {
    status;
    message;
    error_full;
  
    constructor(status, message, error_full) {
      super(message);
      this.status = status;
      this.message = message;
      this.error_full = error_full;
    }
  }
  
  export default HttpException;