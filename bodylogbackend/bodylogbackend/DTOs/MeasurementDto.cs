namespace bodylogbackend.DTOs;

public class MeasurementDto
{
    public int Id { get; set; }
    public string Date { get; set; }
    public float Weight { get; set; }
    public float? Waist { get; set; }
    public float? Chest { get; set; }
    public float? Thigh { get; set; }
    public int UserID { get; set; }
}
