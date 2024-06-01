using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Repositories;
using backend.Helpers;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivitiesController : ControllerBase
    {
        private readonly IActivityRepository _activityRepository;
        private readonly ResponseHelper _responseHelper;

        public ActivitiesController(IActivityRepository activityRepository, ResponseHelper responseHelper)
        {
            _activityRepository = activityRepository;
            _responseHelper = responseHelper;
        }

        // GET: api/Activities
        [HttpGet]
        public async Task<IActionResult> GetActivities()
        {
            try
            {
                var Activities = await _activityRepository.GetAllActivities();
                return _responseHelper.CreateResponse("Activities retrieved successfully", Activities, "success");
            }
            catch (Exception ex)
            {
                return _responseHelper.CreateResponse($"An error occurred: {ex.Message}", null, "fail");
            }
        }

        // GET: api/Activities/details
        [HttpGet("details")]
        public async Task<IActionResult> GetAllactivityDetails()
        {
            try
            {
                var activityDetails = await _activityRepository.GetAllActivityDetails();
                return _responseHelper.CreateResponse("activity details retrieved successfully", activityDetails, "success");
            }
            catch (Exception ex)
            {
                return _responseHelper.CreateResponse($"An error occurred: {ex.Message}", null, "fail");
            }
        }

        // GET: api/Activities/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Getactivity(int id)
        {
            try
            {
                var activity = await _activityRepository.GetActivityById(id);
                if (activity == null)
                {
                    return _responseHelper.CreateResponse("activity not found", null, "fail");
                }
                return _responseHelper.CreateResponse("activity retrieved successfully", activity, "success");
            }
            catch (Exception ex)
            {
                return _responseHelper.CreateResponse($"An error occurred: {ex.Message}", null, "fail");
            }
        }

        // PUT: api/Activities/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Putactivity(int id, Activity activity)
        {
            try
            {
                if (id != activity.Id)
                {
                    return _responseHelper.CreateResponse("activity ID mismatch", null, "fail");
                }

                await _activityRepository.UpdateActivity(activity);

                return _responseHelper.CreateResponse("activity updated successfully", null, "success");
            }
            catch (Exception ex)
            {
                return _responseHelper.CreateResponse($"An error occurred: {ex.Message}", null, "fail");
            }
        }

        // POST: api/Activities
        [HttpPost]
        public async Task<IActionResult> Postactivity(Activity activity)
        {
            try
            {
                await _activityRepository.AddActivity(activity);

                return _responseHelper.CreateResponse("activity added successfully", activity, "success");
            }
            catch (Exception ex)
            {
                return _responseHelper.CreateResponse($"An error occurred: {ex.Message}", null, "fail");
            }
        }

        // DELETE: api/Activities/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Deleteactivity(int id)
        {
            try
            {
                var activityExists = await _activityRepository.ActivityExists(id);
                if (!activityExists)
                {
                    return _responseHelper.CreateResponse("activity not found", null, "fail");
                }

                await _activityRepository.DeleteActivity(id);

                return _responseHelper.CreateResponse("activity deleted successfully", null, "success");
            }
            catch (Exception ex)
            {
                return _responseHelper.CreateResponse($"An error occurred: {ex.Message}", null, "fail");
            }
        }
    }
}
