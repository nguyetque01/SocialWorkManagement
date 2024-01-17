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
    public class ActivityCategoriesController : ControllerBase
    {
        private readonly SocialWorkDbContext _context;

        public ActivityCategoriesController(SocialWorkDbContext context)
        {
            _context = context;
        }

        // GET: api/ActivityCategories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ActivityCategory>>> GetActivityCategories()
        {
            return await _context.ActivityCategories.ToListAsync();
        }

        // GET: api/ActivityCategories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ActivityCategory>> GetActivityCategory(int id)
        {
            var activityCategory = await _context.ActivityCategories.FindAsync(id);

            if (activityCategory == null)
            {
                return NotFound();
            }

            return activityCategory;
        }

        // PUT: api/ActivityCategories/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutActivityCategory(int id, ActivityCategory activityCategory)
        {
            if (id != activityCategory.Id)
            {
                return BadRequest();
            }

            _context.Entry(activityCategory).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ActivityCategoryExists(id))
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

        // POST: api/ActivityCategories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ActivityCategory>> PostActivityCategory(ActivityCategory activityCategory)
        {
            _context.ActivityCategories.Add(activityCategory);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetActivityCategory", new { id = activityCategory.Id }, activityCategory);
        }

        // DELETE: api/ActivityCategories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivityCategory(int id)
        {
            var activityCategory = await _context.ActivityCategories.FindAsync(id);
            if (activityCategory == null)
            {
                return NotFound();
            }

            _context.ActivityCategories.Remove(activityCategory);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ActivityCategoryExists(int id)
        {
            return _context.ActivityCategories.Any(e => e.Id == id);
        }
    }
}
