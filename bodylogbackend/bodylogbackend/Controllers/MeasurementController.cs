using AutoMapper;
using bodylogbackend.Data;
using bodylogbackend.DTOs;
using bodylogbackend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace bodylogbackend.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class MeasurementController : ControllerBase
    {
        private readonly BodyLogContext _context;
        private readonly IMapper _mapper;

        public MeasurementController(BodyLogContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetMeasurements()
        {
            var measurements = await _context.Measurements.ToListAsync();

            var dtoList = _mapper.Map<List<MeasurementDto>>(measurements);

            return Ok(dtoList);
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetMeasurementsByUser(int userId)
        {
            var measurements = await _context.Measurements
                .Where(m => m.UserID == userId)
                .ToListAsync();
            if (measurements == null || !measurements.Any())
            {
                return NotFound();
            }

            var dtoList = _mapper.Map<List<MeasurementDto>>(measurements);

            return Ok(dtoList);
        }

        [HttpPost]
        public async Task<IActionResult> CreateMeasurement([FromBody] CreateMeasurementDto dto)
        {
            if (dto == null)
            {
                return BadRequest("Measurement cannot be null.");
            }

            var measurement = _mapper.Map<Measurement>(dto);

            _context.Measurements.Add(measurement);
            await _context.SaveChangesAsync();

            var resultDto = _mapper.Map<MeasurementDto>(measurement);

            return CreatedAtAction(nameof(GetMeasurementsByUser), new { userId = measurement.UserID }, resultDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMeasurement(int id, [FromBody] Measurement measurement)
        {
            if (measurement == null || measurement.Id != id)
            {
                return BadRequest("Measurement data is invalid.");
            }
            var existingMeasurement = await _context.Measurements.FindAsync(id);
            if (existingMeasurement == null)
            {
                return NotFound();
            }
            existingMeasurement.Weight = measurement.Weight;
            existingMeasurement.Waist = measurement.Waist;
            existingMeasurement.Chest = measurement.Chest;
            existingMeasurement.Thigh = measurement.Thigh;
            _context.Measurements.Update(existingMeasurement);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
