using System.Net.Http;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Json;
using System.Threading.Tasks;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace ContactFunctionApp;

public class Contact
{
    private readonly ILogger _logger;
    private static readonly HttpClient _http = new HttpClient();

    public Contact(ILoggerFactory loggerFactory)
    {
        _logger = loggerFactory.CreateLogger<Contact>();
    }

    [Function("Contact")]
    public async Task<HttpResponseData> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "post")] HttpRequestData req)
    {
        // =========================
        // READ BODY (FIXED WAY)
        // =========================

        var data = await req.ReadFromJsonAsync<ContactRequest>();

        if (data == null)
        {
            var bad = req.CreateResponse(System.Net.HttpStatusCode.BadRequest);
            await bad.WriteStringAsync("Invalid request.");
            return bad;
        }

        var validationContext = new ValidationContext(data);
        var validationResults = new List<ValidationResult>();

        if (!Validator.TryValidateObject(data, validationContext, validationResults, true))
        {
            var bad = req.CreateResponse(System.Net.HttpStatusCode.BadRequest);

            await bad.WriteAsJsonAsync(new
            {
                errors = validationResults.Select(v => v.ErrorMessage)
            });

            return bad;
        }

        _logger.LogInformation($"Message from {data.Name} - {data.Email}");

        // =========================
        // RESEND EMAIL API
        // =========================

        var apiKey = Environment.GetEnvironmentVariable("RESEND_API_KEY");

        if (string.IsNullOrWhiteSpace(apiKey))
        {
            _logger.LogError("RESEND_API_KEY is missing.");

            var error = req.CreateResponse(System.Net.HttpStatusCode.InternalServerError);
            await error.WriteStringAsync("Server configuration error.");

            return error;
        }

        _logger.LogInformation("RESEND_API_KEY successfully loaded.");

        var emailPayload = new
        {
            from = "Portfolio Contact <onboarding@resend.dev>",
            to = new[] { "samuel.s.jarvis@gmail.com" },
            subject = $"New Contact Form Message from {data.Name}",
            html = $@"
                <h2>New Contact Form Message</h2>
                <p><strong>Name:</strong> {data.Name}</p>
                <p><strong>Email:</strong> {data.Email}</p>
                <p><strong>Message:</strong><br/>{data.Message}</p>"
        };

        var request = new HttpRequestMessage(
            HttpMethod.Post,
            "https://api.resend.com/emails"
        );

        request.Headers.Add("Authorization", $"Bearer {apiKey}");
        request.Content = JsonContent.Create(emailPayload);

        var responseResend = await _http.SendAsync(request);

        var responseBody = await responseResend.Content.ReadAsStringAsync();
        _logger.LogInformation($"RESEND STATUS: {responseResend.StatusCode}");
        _logger.LogInformation($"RESEND RESPONSE: {responseBody}");

        if (!responseResend.IsSuccessStatusCode)
        {
            _logger.LogError("Failed to send email: {Response}", responseBody);

            var error = req.CreateResponse(System.Net.HttpStatusCode.BadGateway);
            await error.WriteStringAsync("Failed to send email.");

            return error;
        }

        // =========================
        // RESPONSE
        // =========================

        var response = req.CreateResponse(System.Net.HttpStatusCode.OK);
        await response.WriteStringAsync("Message sent successfully!");

        return response;
    }
}