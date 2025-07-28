using AutoMapper;
using bodylogbackend.Data;
using bodylogbackend.DTOs;
using bodylogbackend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace bodylogbackend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly BodyLogContext _context;
    private readonly IMapper _mapper;
    public UserController(BodyLogContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<IActionResult> GetUsers()
    {
        var users = await _context.Users.ToListAsync();

        var dtoList = _mapper.Map<List<UserDto>>(users);
        return Ok(dtoList);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUserById(int id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
        {
            return NotFound();
        }

        var dto = _mapper.Map<UserDto>(user);
        return Ok(dto);
    }

    [HttpGet("goalWeight")]
    public async Task<IActionResult> GetMyGoalWeight()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null)
        {
            return Unauthorized("User ID claim not found.");
        }
        var userId = int.Parse(userIdClaim.Value);
        var user = await _context.Users.FindAsync(userId);
        if (user == null)
        {
            return NotFound();
        }
        var dto = _mapper.Map<UserDto>(user);
        return Ok(dto.GoalWeight);
    }

    [Authorize]
    [HttpPut("goalweight")]
    public async Task<IActionResult> UpdateGoalWeight([FromBody] UpdateGoalWeightDto dto)
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? throw new Exception("Missing user ID"));

        var user = await _context.Users.FindAsync(userId);
        if (user == null) return NotFound("User not found");

        user.GoalWeight = dto.GoalWeight;
        await _context.SaveChangesAsync();

        return Ok(new { goalWeight = user.GoalWeight });
    }

    [HttpPost]
    public async Task<IActionResult> CreateUser([FromBody] CreateUserDto createDto)
    {
        if (createDto == null)
        {
            return BadRequest("User cannot be null.");
        }
        var user = _mapper.Map<User>(createDto);
        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        var resultDto = _mapper.Map<UserDto>(user);
        return CreatedAtAction(nameof(GetUserById), new { id = user.Id }, resultDto);
    }
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser(int id, [FromBody] UpdateUserDto updateDto)
    {
        if (updateDto == null)
        {
            return BadRequest("User data is invalid.");
        }

        var existingUser = await _context.Users.FindAsync(id);
        if (existingUser == null)
        {
            return NotFound();
        }

        _mapper.Map(updateDto, existingUser);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
