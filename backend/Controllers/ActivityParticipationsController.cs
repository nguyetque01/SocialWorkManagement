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
    public class ActivityParticipationsController : ControllerBase
    {
        private readonly SocialWorkDbContext _context;

        public ActivityParticipationsController(SocialWorkDbContext context)
        {
            _context = context;
        }

        // GET: api/ActivityParticipations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ActivityParticipation>>> GetActivityParticipations()
        {
            return await _context.ActivityParticipations.ToListAsync();
        }

        // GET: api/ActivityParticipations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ActivityParticipation>> GetActivityParticipation(int id)
        {
            var activityParticipation = await _context.ActivityParticipations.FindAsync(id);

            if (activityParticipation == null)
            {
                return NotFound();
            }

            return activityParticipation;
        }

        // PUT: api/ActivityParticipations/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutActivityParticipation(int id, ActivityParticipation activityParticipation)
        {
            if (id != activityParticipation.Id)
            {
                return BadRequest();
            }

            _context.Entry(activityParticipation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ActivityParticipationExists(id))
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

        // POST: api/ActivityParticipations
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ActivityParticipation>> PostActivityParticipation(ActivityParticipation activityParticipation)
        {
            _context.ActivityParticipations.Add(activityParticipation);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetActivityParticipation", new { id = activityParticipation.Id }, activityParticipation);
        }

        // DELETE: api/ActivityParticipations/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivityParticipation(int id)
        {
            var activityParticipation = await _context.ActivityParticipations.FindAsync(id);
            if (activityParticipation == null)
            {
                return NotFound();
            }

            _context.ActivityParticipations.Remove(activityParticipation);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ActivityParticipationExists(int id)
        {
            return _context.ActivityParticipations.Any(e => e.Id == id);
        }
    }
}
