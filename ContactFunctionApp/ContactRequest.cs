using System.ComponentModel.DataAnnotations;

public class ContactRequest
{
    [Required]
    [StringLength(50, MinimumLength = 2)]
    public string Name { get; set; } = string.Empty;
    [Required]
    [StringLength(100, MinimumLength = 2)]
    public string Email { get; set; } = string.Empty;
    [Required]
    [StringLength(1000, MinimumLength = 2)]
    public string Message { get; set; } = string.Empty;
}