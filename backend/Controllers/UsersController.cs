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
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly ResponseHelper _responseHelper;

        public UsersController(IUserRepository userRepository, ResponseHelper responseHelper)
        {
            _userRepository = userRepository;
            _responseHelper = responseHelper;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            try
            {
                var users = await _userRepository.GetAllUsers();
                return _responseHelper.CreateResponse("Users retrieved successfully", users, "success");
            }
            catch (Exception ex)
            {
                return _responseHelper.CreateResponse($"An error occurred: {ex.Message}", null, "fail");
            }
        }

        // GET: api/Users/details
        [HttpGet("details")]
        public async Task<IActionResult> GetAllUserDetails()
        {
            try
            {
                var userDetails = await _userRepository.GetAllUserDetails();
                return _responseHelper.CreateResponse("User details retrieved successfully", userDetails, "success");
            }
            catch (Exception ex)
            {
                return _responseHelper.CreateResponse($"An error occurred: {ex.Message}", null, "fail");
            }
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            try
            {
                var user = await _userRepository.GetUserById(id);
                if (user == null)
                {
                    return _responseHelper.CreateResponse("User not found", null, "fail");
                }
                return _responseHelper.CreateResponse("User retrieved successfully", user, "success");
            }
            catch (Exception ex)
            {
                return _responseHelper.CreateResponse($"An error occurred: {ex.Message}", null, "fail");
            }
        }

        // PUT: api/Users/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            try
            {
                if (id != user.Id)
                {
                    return _responseHelper.CreateResponse("User ID mismatch", null, "fail");
                }

                await _userRepository.UpdateUser(user);

                return _responseHelper.CreateResponse("User updated successfully", null, "success");
            }
            catch (Exception ex)
            {
                return _responseHelper.CreateResponse($"An error occurred: {ex.Message}", null, "fail");
            }
        }

        // POST: api/Users
        [HttpPost]
        public async Task<IActionResult> PostUser(User user)
        {
            try
            {
                await _userRepository.AddUser(user);

                return _responseHelper.CreateResponse("User added successfully", user, "success");
            }
            catch (Exception ex)
            {
                return _responseHelper.CreateResponse($"An error occurred: {ex.Message}", null, "fail");
            }
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            try
            {
                var userExists = await _userRepository.UserExists(id);
                if (!userExists)
                {
                    return _responseHelper.CreateResponse("User not found", null, "fail");
                }

                await _userRepository.DeleteUser(id);

                return _responseHelper.CreateResponse("User deleted successfully", null, "success");
            }
            catch (Exception ex)
            {
                return _responseHelper.CreateResponse($"An error occurred: {ex.Message}", null, "fail");
            }
        }
    }
}
