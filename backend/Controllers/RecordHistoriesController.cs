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
    public class RecordHistoriesController : ControllerBase
    {
        private readonly SocialWorkDbContext _context;

        public RecordHistoriesController(SocialWorkDbContext context)
        {
            _context = context;
        }

        // GET: api/RecordHistories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RecordHistory>>> GetRecordHistories()
        {
            return await _context.RecordHistories.ToListAsync();
        }

        // GET: api/RecordHistories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RecordHistory>> GetRecordHistory(int id)
        {
            var recordHistory = await _context.RecordHistories.FindAsync(id);

            if (recordHistory == null)
            {
                return NotFound();
            }

            return recordHistory;
        }

        // PUT: api/RecordHistories/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRecordHistory(int id, RecordHistory recordHistory)
        {
            if (id != recordHistory.Id)
            {
                return BadRequest();
            }

            _context.Entry(recordHistory).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RecordHistoryExists(id))
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

        // POST: api/RecordHistories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<RecordHistory>> PostRecordHistory(RecordHistory recordHistory)
        {
            _context.RecordHistories.Add(recordHistory);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRecordHistory", new { id = recordHistory.Id }, recordHistory);
        }

        // DELETE: api/RecordHistories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRecordHistory(int id)
        {
            var recordHistory = await _context.RecordHistories.FindAsync(id);
            if (recordHistory == null)
            {
                return NotFound();
            }

            _context.RecordHistories.Remove(recordHistory);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RecordHistoryExists(int id)
        {
            return _context.RecordHistories.Any(e => e.Id == id);
        }
    }
}
