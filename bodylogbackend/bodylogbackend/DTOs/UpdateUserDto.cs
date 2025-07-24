namespace bodylogbackend.DTOs;

public class UpdateUserDto
{
    public string Email { get; set; }
    public float GoalWeight { get; set; }
    public string PasswordHash { get; set; }
}
