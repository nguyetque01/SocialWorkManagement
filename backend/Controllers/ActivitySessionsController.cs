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
    public class ActivitySessionsController : ControllerBase
    {
        private readonly IActivitySessionRepository _ActivitySessionRepository;
        private readonly ResponseHelper _responseHelper;

        public ActivitySessionsController(IActivitySessionRepository ActivitySessionRepository, ResponseHelper responseHelper)
        {
            _ActivitySessionRepository = ActivitySessionRepository;
            _responseHelper = responseHelper;
        }

        // GET: api/ActivitySessions
        [HttpGet]
        public async Task<IActionResult> GetActivitySessions()
        {
            try
            {
                var ActivitySessions = await _ActivitySessionRepository.GetAllActivitySessions();
                return _responseHelper.CreateResponse("ActivitySessions retrieved successfully", ActivitySessions, "success");
            }
            catch (Exception ex)
            {
                return _responseHelper.CreateResponse($"An error occurred: {ex.Message}", null, "fail");
            }
        }

        // GET: api/ActivitySessions/details
        [HttpGet("details")]
        public async Task<IActionResult> GetAllActivitySessionDetails()
        {
            try
            {
                var ActivitySessionDetails = await _ActivitySessionRepository.GetAllActivitySessionDetails();
                return _responseHelper.CreateResponse("ActivitySession details retrieved successfully", ActivitySessionDetails, "success");
            }
            catch (Exception ex)
            {
                return _responseHelper.CreateResponse($"An error occurred: {ex.Message}", null, "fail");
            }
        }

        // GET: api/ActivitySessions/details/activity/5
        [HttpGet("details/activity/{activityId}")]
        public async Task<IActionResult> GetActivitySessionDetailsByActivityID(int activityId)
        {
            try
            {
                var ActivitySessionDetails = await _ActivitySessionRepository.GetActivitySessionDetailsByActivityID(activityId);
                return _responseHelper.CreateResponse("ActivitySession details retrieved successfully", ActivitySessionDetails, "success");
            }
            catch (Exception ex)
            {
                return _responseHelper.CreateResponse($"An error occurred: {ex.Message}", null, "fail");
            }
        }

        // GET: api/ActivitySessions/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetActivitySession(int id)
        {
            try
            {
                var ActivitySession = await _ActivitySessionRepository.GetActivitySessionById(id);
                if (ActivitySession == null)
                {
                    return _responseHelper.CreateResponse("ActivitySession not found", null, "fail");
                }
                return _responseHelper.CreateResponse("ActivitySession retrieved successfully", ActivitySession, "success");
            }
            catch (Exception ex)
            {
                return _responseHelper.CreateResponse($"An error occurred: {ex.Message}", null, "fail");
            }
        }

        // PUT: api/ActivitySessions/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutActivitySession(int id, ActivitySession ActivitySession)
        {
            try
            {
                if (id != ActivitySession.Id)
                {
                    return _responseHelper.CreateResponse("ActivitySession ID mismatch", null, "fail");
                }

                await _ActivitySessionRepository.UpdateActivitySession(ActivitySession);

                return _responseHelper.CreateResponse("ActivitySession updated successfully", null, "success");
            }
            catch (Exception ex)
            {
                return _responseHelper.CreateResponse($"An error occurred: {ex.Message}", null, "fail");
            }
        }

        // POST: api/ActivitySessions
        [HttpPost]
        public async Task<IActionResult> PostActivitySession(ActivitySession ActivitySession)
        {
            try
            {
                await _ActivitySessionRepository.AddActivitySession(ActivitySession);

                return _responseHelper.CreateResponse("ActivitySession added successfully", ActivitySession, "success");
            }
            catch (Exception ex)
            {
                return _responseHelper.CreateResponse($"An error occurred: {ex.Message}", null, "fail");
            }
        }

        // DELETE: api/ActivitySessions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivitySession(int id)
        {
            try
            {
                var ActivitySessionExists = await _ActivitySessionRepository.ActivitySessionExists(id);
                if (!ActivitySessionExists)
                {
                    return _responseHelper.CreateResponse("ActivitySession not found", null, "fail");
                }

                await _ActivitySessionRepository.DeleteActivitySession(id);

                return _responseHelper.CreateResponse("ActivitySession deleted successfully", null, "success");
            }
            catch (Exception ex)
            {
                return _responseHelper.CreateResponse($"An error occurred: {ex.Message}", null, "fail");
            }
        }
    }
}
