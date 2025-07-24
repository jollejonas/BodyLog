namespace bodylogbackend.DTOs;

public class CreateMeasurementDto
{
    public DateTime Date { get; set; }
    public float Weight { get; set; }
    public float? Waist { get; set; }
    public float? Chest { get; set; }
    public float? Thigh { get; set; }
    public int UserID { get; set; }
}
