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
    public class statusesController : ControllerBase
    {
        private readonly IStatusRepository _statusRepository;
        private readonly ResponseHelper _responseHelper;

        public statusesController(IStatusRepository statusRepository, ResponseHelper responseHelper)
        {
            _statusRepository = statusRepository;
            _responseHelper = responseHelper;
        }

        // GET: api/statuses
        [HttpGet]
        public async Task<IActionResult> GetStatuses()
        {
            try
            {
                var statuses = await _statusRepository.GetAllStatuses();
                return _responseHelper.CreateResponse("statuses retrieved successfully", statuses, "success");
            }
            catch (Exception ex)
            {
                return _responseHelper.CreateResponse($"An error occurred: {ex.Message}", null, "fail");
            }
        }

        // GET: api/statuses/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Getstatus(int id)
        {
            try
            {
                var status = await _statusRepository.GetStatusById(id);
                if (status == null)
                {
                    return _responseHelper.CreateResponse("status not found", null, "fail");
                }
                return _responseHelper.CreateResponse("status retrieved successfully", status, "success");
            }
            catch (Exception ex)
            {
                return _responseHelper.CreateResponse($"An error occurred: {ex.Message}", null, "fail");
            }
        }

        // PUT: api/statuses/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Putstatus(int id, Status status)
        {
            try
            {
                if (id != status.Id)
                {
                    return _responseHelper.CreateResponse("status ID mismatch", null, "fail");
                }

                await _statusRepository.UpdateStatus(status);

                return _responseHelper.CreateResponse("status updated successfully", null, "success");
            }
            catch (Exception ex)
            {
                return _responseHelper.CreateResponse($"An error occurred: {ex.Message}", null, "fail");
            }
        }

        // POST: api/statuses
        [HttpPost]
        public async Task<IActionResult> Poststatus(Status status)
        {
            try
            {
                await _statusRepository.AddStatus(status);

                return _responseHelper.CreateResponse("status added successfully", status, "success");
            }
            catch (Exception ex)
            {
                return _responseHelper.CreateResponse($"An error occurred: {ex.Message}", null, "fail");
            }
        }

        // DELETE: api/statuses/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Deletestatus(int id)
        {
            try
            {
                var statusExists = await _statusRepository.StatusExists(id);
                if (!statusExists)
                {
                    return _responseHelper.CreateResponse("status not found", null, "fail");
                }

                await _statusRepository.DeleteStatus(id);

                return _responseHelper.CreateResponse("status deleted successfully", null, "success");
            }
            catch (Exception ex)
            {
                return _responseHelper.CreateResponse($"An error occurred: {ex.Message}", null, "fail");
            }
        }
    }
}
