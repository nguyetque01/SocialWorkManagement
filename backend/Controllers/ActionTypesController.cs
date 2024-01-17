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
    public class ActionTypesController : ControllerBase
    {
        private readonly SocialWorkDbContext _context;

        public ActionTypesController(SocialWorkDbContext context)
        {
            _context = context;
        }

        // GET: api/ActionTypes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ActionType>>> GetActionTypes()
        {
            return await _context.ActionTypes.ToListAsync();
        }

        // GET: api/ActionTypes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ActionType>> GetActionType(int id)
        {
            var actionType = await _context.ActionTypes.FindAsync(id);

            if (actionType == null)
            {
                return NotFound();
            }

            return actionType;
        }

        // PUT: api/ActionTypes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutActionType(int id, ActionType actionType)
        {
            if (id != actionType.Id)
            {
                return BadRequest();
            }

            _context.Entry(actionType).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ActionTypeExists(id))
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

        // POST: api/ActionTypes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ActionType>> PostActionType(ActionType actionType)
        {
            _context.ActionTypes.Add(actionType);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetActionType", new { id = actionType.Id }, actionType);
        }

        // DELETE: api/ActionTypes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActionType(int id)
        {
            var actionType = await _context.ActionTypes.FindAsync(id);
            if (actionType == null)
            {
                return NotFound();
            }

            _context.ActionTypes.Remove(actionType);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ActionTypeExists(int id)
        {
            return _context.ActionTypes.Any(e => e.Id == id);
        }
    }
}
