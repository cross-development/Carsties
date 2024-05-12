using MassTransit;
using NotificationService.Hubs;
using NotificationService.Consumers;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSignalR();
builder.Services.AddMassTransit(configs =>
{
    configs.AddConsumersFromNamespaceContaining<AuctionCreatedConsumer>();
    configs.SetEndpointNameFormatter(new KebabCaseEndpointNameFormatter("nt", false));
    configs.UsingRabbitMq((context, cfg) =>
    {
        cfg.UseRetry(retry =>
        {
            retry.Handle<RabbitMqConnectionException>();
            retry.Interval(5, TimeSpan.FromSeconds(10));
        });

        cfg.Host(builder.Configuration["RabbitMq:Host"], "/", host =>
        {
            host.Username(builder.Configuration.GetValue("RabbitMq:Username", "guest"));
            host.Username(builder.Configuration.GetValue("RabbitMq:Password", "guest"));
        });

        cfg.ConfigureEndpoints(context);
    });
});

var app = builder.Build();

app.MapHub<NotificationHub>("/notifications");

app.Run();
