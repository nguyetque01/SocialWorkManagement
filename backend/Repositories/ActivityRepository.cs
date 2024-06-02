using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using backend.DTOs;

namespace backend.Repositories
{
    public interface IActivityRepository
    {
        Task<IEnumerable<Activity>> GetAllActivities();
        Task<Activity> GetActivityById(int id);
        Task AddActivity(Activity Activity);
        Task UpdateActivity(Activity Activity);
        Task DeleteActivity(int id);
        Task<bool> ActivityExists(int id);
        Task<IEnumerable<ActivityDetailDto>> GetAllActivityDetails();
        Task<ActivityDetailDto> GetActivityDetailById(int id); 

    }

    public class ActivityRepository : IActivityRepository
    {
        private readonly SocialWorkDbContext _context;

        public ActivityRepository(SocialWorkDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Activity>> GetAllActivities()
        {
            return await _context.Activities.ToListAsync();
        }

        public async Task<Activity> GetActivityById(int id)
        {
            return await _context.Activities.FindAsync(id);
        }

        public async Task AddActivity(Activity activity)
        {
            _context.Activities.Add(activity);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateActivity(Activity activity)
        {
            _context.Entry(activity).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteActivity(int id)
        {
            var activity = await _context.Activities.FindAsync(id);
            if (activity != null)
            {
                _context.Activities.Remove(activity);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<bool> ActivityExists(int id)
        {
            return await _context.Activities.AnyAsync(e => e.Id == id);
        }

        public async Task<IEnumerable<ActivityDetailDto>> GetAllActivityDetails()
        {
            return await _context.Set<ActivityDetailDto>()
                                 .FromSqlRaw("EXECUTE GetAllActivityDetails")
                                 .ToListAsync();
        }
        public async Task<ActivityDetailDto> GetActivityDetailById(int id)
        {
            IEnumerable<ActivityDetailDto> activities = await _context.Set<ActivityDetailDto>()
                        .FromSqlRaw("EXECUTE GetActivityDetailsByID @ActivityID={0}", id)
                        .ToListAsync();
            return activities.FirstOrDefault();
        }
    }
}
