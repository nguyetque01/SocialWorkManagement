using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using backend.DTOs;

namespace backend.Repositories
{
    public interface IActivityParticipationRepository
    {
        Task<IEnumerable<ActivityParticipation>> GetAllActivityParticipations();
        Task<ActivityParticipation> GetActivityParticipationById(int id);
        Task AddActivityParticipation(ActivityParticipation ActivityParticipation);
        Task UpdateActivityParticipation(ActivityParticipation ActivityParticipation);
        Task DeleteActivityParticipation(int id);
        Task<bool> ActivityParticipationExists(int id);
        Task<IEnumerable<ActivityParticipationDetailDto>> GetAllActivityParticipationDetails();
        Task<ActivityParticipationDetailDto> GetActivityParticipationDetailById(int id);
        Task<IEnumerable<ActivityParticipationDetailDto>> GetActivityParticipationDetailByStudentId(int studentId);
    }

    public class ActivityParticipationRepository : IActivityParticipationRepository
    {
        private readonly SocialWorkDbContext _context;

        public ActivityParticipationRepository(SocialWorkDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ActivityParticipation>> GetAllActivityParticipations()
        {
            return await _context.ActivityParticipations.ToListAsync();
        }

        public async Task<ActivityParticipation> GetActivityParticipationById(int id)
        {
            return await _context.ActivityParticipations.FindAsync(id);
        }

        public async Task AddActivityParticipation(ActivityParticipation ActivityParticipation)
        {
            _context.ActivityParticipations.Add(ActivityParticipation);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateActivityParticipation(ActivityParticipation ActivityParticipation)
        {
            _context.Entry(ActivityParticipation).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteActivityParticipation(int id)
        {
            var ActivityParticipation = await _context.ActivityParticipations.FindAsync(id);
            if (ActivityParticipation != null)
            {
                _context.ActivityParticipations.Remove(ActivityParticipation);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<bool> ActivityParticipationExists(int id)
        {
            return await _context.ActivityParticipations.AnyAsync(e => e.Id == id);
        }

        public async Task<IEnumerable<ActivityParticipationDetailDto>> GetAllActivityParticipationDetails()
        {
            return await _context.Set<ActivityParticipationDetailDto>()
                                 .FromSqlRaw("EXECUTE GetAllActivityParticipationDetails")
                                 .ToListAsync();
        }

        public async Task<ActivityParticipationDetailDto> GetActivityParticipationDetailById(int id)
        {
            IEnumerable<ActivityParticipationDetailDto> ActivityParticipations = await _context.Set<ActivityParticipationDetailDto>()
                        .FromSqlRaw("EXECUTE GetActivityParticipationDetailsByID @ActivityParticipationID={0}", id)
                        .ToListAsync();
            return ActivityParticipations.FirstOrDefault();
        }

        public async Task<IEnumerable<ActivityParticipationDetailDto>> GetActivityParticipationDetailByStudentId(int studentId)
        {
            return await _context.Set<ActivityParticipationDetailDto>()
                                 .FromSqlRaw("EXECUTE GetActivityParticipationDetailsByStudentID @StudentId={0}", studentId)
                                 .ToListAsync();
        }
    }
}
