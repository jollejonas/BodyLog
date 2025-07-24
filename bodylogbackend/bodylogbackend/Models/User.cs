namespace bodylogbackend.Models;

public class User
{
    public int Id { get; set; }
    public string Email { get; set; }
    public string PasswordHash { get; set; }
    public List<Measurement> Measurements { get; set; }
    public float GoalWeight { get; set; }
}
