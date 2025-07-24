namespace bodylogbackend.DTOs;

public class CreateUserDto
{
    public string Email { get; set; }
    public string PasswordHash { get; set; }
    public float GoalWeight { get; set; }
}
