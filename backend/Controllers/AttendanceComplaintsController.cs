using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttendanceComplaintsController : ControllerBase
    {
        private readonly SocialWorkDbContext _context;

        public AttendanceComplaintsController(SocialWorkDbContext context)
        {
            _context = context;
        }

        // GET: api/AttendanceComplaints
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AttendanceComplaint>>> GetAttendanceComplaints()
        {
            return await _context.AttendanceComplaints.ToListAsync();
        }

        // GET: api/AttendanceComplaints/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AttendanceComplaint>> GetAttendanceComplaint(int id)
        {
            var attendanceComplaint = await _context.AttendanceComplaints.FindAsync(id);

            if (attendanceComplaint == null)
            {
                return NotFound();
            }

            return attendanceComplaint;
        }

        // PUT: api/AttendanceComplaints/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAttendanceComplaint(int id, AttendanceComplaint attendanceComplaint)
        {
            if (id != attendanceComplaint.Id)
            {
                return BadRequest();
            }

            _context.Entry(attendanceComplaint).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AttendanceComplaintExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/AttendanceComplaints
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<AttendanceComplaint>> PostAttendanceComplaint(AttendanceComplaint attendanceComplaint)
        {
            _context.AttendanceComplaints.Add(attendanceComplaint);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAttendanceComplaint", new { id = attendanceComplaint.Id }, attendanceComplaint);
        }

        // DELETE: api/AttendanceComplaints/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAttendanceComplaint(int id)
        {
            var attendanceComplaint = await _context.AttendanceComplaints.FindAsync(id);
            if (attendanceComplaint == null)
            {
                return NotFound();
            }

            _context.AttendanceComplaints.Remove(attendanceComplaint);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AttendanceComplaintExists(int id)
        {
            return _context.AttendanceComplaints.Any(e => e.Id == id);
        }
    }
}
