using System.Net.Http;
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

        if (data == null || string.IsNullOrWhiteSpace(data.Email))
        {
            var bad = req.CreateResponse(System.Net.HttpStatusCode.BadRequest);
            await bad.WriteStringAsync("Invalid request");
            return bad;
        }

        _logger.LogInformation($"Message from {data.Name} - {data.Email}");

        // =========================
        // RESEND EMAIL API
        // =========================

        var apiKey = Environment.GetEnvironmentVariable("RESEND_API_KEY");

        _logger.LogInformation($"RESEND KEY LOADED: {!string.IsNullOrWhiteSpace(apiKey)}");
        _logger.LogInformation($"RESEND KEY VALUE: {apiKey}");

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

        // =========================
        // RESPONSE
        // =========================

        var response = req.CreateResponse(System.Net.HttpStatusCode.OK);
        await response.WriteStringAsync("Message sent successfully!");

        return response;
    }
}