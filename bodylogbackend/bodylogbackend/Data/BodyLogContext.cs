using bodylogbackend.Models;
using Microsoft.EntityFrameworkCore;
namespace bodylogbackend.Data;

public class BodyLogContext : DbContext
{
    public BodyLogContext(DbContextOptions<BodyLogContext> options)
        : base(options)
    {
    }
    public DbSet<User> Users { get; set; }
    public DbSet<Measurement> Measurements { get; set; }
}
