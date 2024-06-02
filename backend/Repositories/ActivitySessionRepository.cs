using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using backend.DTOs;

namespace backend.Repositories
{
    public interface IActivitySessionRepository
    {
        Task<IEnumerable<ActivitySession>> GetAllActivitySessions();
        Task<ActivitySession> GetActivitySessionById(int id);
        Task AddActivitySession(ActivitySession ActivitySession);
        Task UpdateActivitySession(ActivitySession ActivitySession);
        Task DeleteActivitySession(int id);
        Task<bool> ActivitySessionExists(int id);
        Task<IEnumerable<ActivitySessionDetailDto>> GetAllActivitySessionDetails();

    }

    public class ActivitySessionRepository : IActivitySessionRepository
    {
        private readonly SocialWorkDbContext _context;

        public ActivitySessionRepository(SocialWorkDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ActivitySessionDetailDto>> GetAllActivitySessionDetails()
        {
            return await _context.Set<ActivitySessionDetailDto>()
                                 .FromSqlRaw("EXECUTE GetAllActivitySessionDetails")
                                 .ToListAsync();
        }

        public async Task<IEnumerable<ActivitySession>> GetAllActivitySessions()
        {
            return await _context.ActivitySessions.ToListAsync();
        }

        public async Task<ActivitySession> GetActivitySessionById(int id)
        {
            return await _context.ActivitySessions.FindAsync(id);
        }

        public async Task AddActivitySession(ActivitySession ActivitySession)
        {
            _context.ActivitySessions.Add(ActivitySession);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateActivitySession(ActivitySession ActivitySession)
        {
            _context.Entry(ActivitySession).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteActivitySession(int id)
        {
            var ActivitySession = await _context.ActivitySessions.FindAsync(id);
            if (ActivitySession != null)
            {
                _context.ActivitySessions.Remove(ActivitySession);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<bool> ActivitySessionExists(int id)
        {
            return await _context.ActivitySessions.AnyAsync(e => e.Id == id);
        }
    }
}
