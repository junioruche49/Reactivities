using System;
using Application.Core;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class DeleteActivity
{
    public class Command(string Id) : IRequest<Result<Unit>>
    {
        public string Id { get; set; } = Id;
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities.FindAsync([request.Id], cancellationToken);
            if (activity is null) return Result<Unit>.Failure("Activity not found", 404);

            context.Remove(activity);

            var result = await context.SaveChangesAsync(cancellationToken) > 0;
            if (!result) return Result<Unit>.Failure("Failed to delete the activity", 404);
            return Result<Unit>.Success(Unit.Value);
        }
    }
}
