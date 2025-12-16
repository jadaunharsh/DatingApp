using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class MembersController(AppDbContext context) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<AppUser>>> GetMembers() // localhost:5001/api/members
        {
            var members = await context.Users.ToListAsync();
            return members;
        }

        [Authorize]
        [HttpGet("{id}")]
        public ActionResult<AppUser> GetMember(string id)   // localhost:5001/api/members/bob-id
        {
            var member = context.Users.Find(id);
            if(member == null)
                return NotFound();
            return member;
        }
    }
}
