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
    public class ActivitySessionsController : ControllerBase
    {
        private readonly SocialWorkDbContext _context;

        public ActivitySessionsController(SocialWorkDbContext context)
        {
            _context = context;
        }

        // GET: api/ActivitySessions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ActivitySession>>> GetActivitySessions()
        {
            return await _context.ActivitySessions.ToListAsync();
        }

        // GET: api/ActivitySessions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ActivitySession>> GetActivitySession(int id)
        {
            var activitySession = await _context.ActivitySessions.FindAsync(id);

            if (activitySession == null)
            {
                return NotFound();
            }

            return activitySession;
        }

        // PUT: api/ActivitySessions/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutActivitySession(int id, ActivitySession activitySession)
        {
            if (id != activitySession.Id)
            {
                return BadRequest();
            }

            _context.Entry(activitySession).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ActivitySessionExists(id))
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

        // POST: api/ActivitySessions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ActivitySession>> PostActivitySession(ActivitySession activitySession)
        {
            _context.ActivitySessions.Add(activitySession);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetActivitySession", new { id = activitySession.Id }, activitySession);
        }

        // DELETE: api/ActivitySessions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivitySession(int id)
        {
            var activitySession = await _context.ActivitySessions.FindAsync(id);
            if (activitySession == null)
            {
                return NotFound();
            }

            _context.ActivitySessions.Remove(activitySession);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ActivitySessionExists(int id)
        {
            return _context.ActivitySessions.Any(e => e.Id == id);
        }
    }
}
