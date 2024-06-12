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
    public class ActivityParticipationsController : ControllerBase
    {
        private readonly IActivityParticipationRepository _ActivityParticipationRepository;
        private readonly ResponseHelper _responseHelper;

        public ActivityParticipationsController(IActivityParticipationRepository ActivityParticipationRepository, ResponseHelper responseHelper)
        {
            _ActivityParticipationRepository = ActivityParticipationRepository;
            _responseHelper = responseHelper;
        }

        // GET: api/ActivityParticipations
        [HttpGet]
        public async Task<IActionResult> GetActivityParticipations()
        {
            try
            {
                var ActivityParticipations = await _ActivityParticipationRepository.GetAllActivityParticipations();
                return _responseHelper.CreateResponse("ActivityParticipations retrieved successfully", ActivityParticipations, "success");
            }
            catch (Exception ex)
            {
                return _responseHelper.CreateResponse($"An error occurred: {ex.Message}", null, "fail");
            }
        }

        // GET: api/ActivityParticipations/details
        [HttpGet("details")]
        public async Task<IActionResult> GetAllActivityParticipationDetails()
        {
            try
            {
                var ActivityParticipationDetails = await _ActivityParticipationRepository.GetAllActivityParticipationDetails();
                return _responseHelper.CreateResponse("ActivityParticipation details retrieved successfully", ActivityParticipationDetails, "success");
            }
            catch (Exception ex)
            {
                return _responseHelper.CreateResponse($"An error occurred: {ex.Message}", null, "fail");
            }
        }

        // GET: api/ActivityParticipations/details/student/5
        [HttpGet("details/student/{studentId}")]
        public async Task<IActionResult> GetActivityParticipationDetailsByStudentId(int studentId)
        {
            try
            {
                var ActivityParticipationDetails = await _ActivityParticipationRepository.GetActivityParticipationDetailByStudentId(studentId);
                return _responseHelper.CreateResponse("ActivityParticipationDetails details retrieved successfully", ActivityParticipationDetails, "success");
            }
            catch (Exception ex)
            {
                return _responseHelper.CreateResponse($"An error occurred: {ex.Message}", null, "fail");
            }
        }

        // GET: api/ActivityParticipations/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetActivityParticipation(int id)
        {
            try
            {
                var ActivityParticipation = await _ActivityParticipationRepository.GetActivityParticipationById(id);
                if (ActivityParticipation == null)
                {
                    return _responseHelper.CreateResponse("ActivityParticipation not found", null, "fail");
                }
                return _responseHelper.CreateResponse("ActivityParticipation retrieved successfully", ActivityParticipation, "success");
            }
            catch (Exception ex)
            {
                return _responseHelper.CreateResponse($"An error occurred: {ex.Message}", null, "fail");
            }
        }

        // GET: api/ActivityParticipations/details/5
        [HttpGet("details/{id}")]
        public async Task<IActionResult> GetActivityParticipationDetail(int id)
        {
            try
            {
                var ActivityParticipationDetail = await _ActivityParticipationRepository.GetActivityParticipationDetailById(id);
                if (ActivityParticipationDetail == null)
                {
                    return _responseHelper.CreateResponse("ActivityParticipation detail not found", null, "fail");
                }
                return _responseHelper.CreateResponse("ActivityParticipation detail retrieved successfully", ActivityParticipationDetail, "success");
            }
            catch (Exception ex)
            {
                return _responseHelper.CreateResponse($"An error occurred: {ex.Message}", null, "fail");
            }
        }

        // PUT: api/ActivityParticipations/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutActivityParticipation(int id, ActivityParticipation ActivityParticipation)
        {
            try
            {
                if (id != ActivityParticipation.Id)
                {
                    return _responseHelper.CreateResponse("ActivityParticipation ID mismatch", null, "fail");
                }

                await _ActivityParticipationRepository.UpdateActivityParticipation(ActivityParticipation);

                return _responseHelper.CreateResponse("ActivityParticipation updated successfully", null, "success");
            }
            catch (Exception ex)
            {
                return _responseHelper.CreateResponse($"An error occurred: {ex.Message}", null, "fail");
            }
        }

        // POST: api/ActivityParticipations
        [HttpPost]
        public async Task<IActionResult> PostActivityParticipation(ActivityParticipation ActivityParticipation)
        {
            try
            {
                await _ActivityParticipationRepository.AddActivityParticipation(ActivityParticipation);

                return _responseHelper.CreateResponse("ActivityParticipation added successfully", ActivityParticipation, "success");
            }
            catch (Exception ex)
            {
                return _responseHelper.CreateResponse($"An error occurred: {ex.Message}", null, "fail");
            }
        }

        // DELETE: api/ActivityParticipations/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivityParticipation(int id)
        {
            try
            {
                var ActivityParticipationExists = await _ActivityParticipationRepository.ActivityParticipationExists(id);
                if (!ActivityParticipationExists)
                {
                    return _responseHelper.CreateResponse("ActivityParticipation not found", null, "fail");
                }

                await _ActivityParticipationRepository.DeleteActivityParticipation(id);

                return _responseHelper.CreateResponse("ActivityParticipation deleted successfully", null, "success");
            }
            catch (Exception ex)
            {
                return _responseHelper.CreateResponse($"An error occurred: {ex.Message}", null, "fail");
            }
        }
    }
}
