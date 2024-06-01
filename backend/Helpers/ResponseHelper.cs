using Microsoft.AspNetCore.Mvc;

namespace backend.Helpers
{
    public class ResponseHelper
    {
        public ObjectResult CreateResponse(string message, object? data, string status)
        {
            return new ObjectResult(new
            {
                message = message,
                responseData = data,
                status = status,
                timeStamp = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")
            });
        }
    }
}
