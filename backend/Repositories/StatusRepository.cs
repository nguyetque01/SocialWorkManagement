using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using backend.DTOs;

namespace backend.Repositories
{
    public interface IStatusRepository
    {
        Task<IEnumerable<Status>> GetAllStatuses();
        Task<Status> GetStatusById(int id);
        Task AddStatus(Status status);
        Task UpdateStatus(Status status);
        Task DeleteStatus(int id);
        Task<bool> StatusExists(int id);
    }

    public class StatusRepository : IStatusRepository
    {
        private readonly SocialWorkDbContext _context;

        public StatusRepository(SocialWorkDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Status>> GetAllStatuses()
        {
            return await _context.Statuses.ToListAsync();
        }

        public async Task<Status> GetStatusById(int id)
        {
            return await _context.Statuses.FindAsync(id);
        }

        public async Task AddStatus(Status status)
        {
            _context.Statuses.Add(status);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateStatus(Status status)
        {
            _context.Entry(status).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteStatus(int id)
        {
            var status = await _context.Statuses.FindAsync(id);
            if (status != null)
            {
                _context.Statuses.Remove(status);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<bool> StatusExists(int id)
        {
            return await _context.Statuses.AnyAsync(e => e.Id == id);
        }
    }
}
