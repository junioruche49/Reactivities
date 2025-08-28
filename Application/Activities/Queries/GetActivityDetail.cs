using System;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Queries;

public class GetActivityDetail
{
    public class Query(string Id) : IRequest<Result<Activity>>
    {
        public string Id { get; set; } = Id;
    }

    public class Handler(AppDbContext context) : IRequestHandler<Query, Result<Activity>>
    {
        public async Task<Result<Activity>> Handle(Query request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities.FindAsync([request.Id], cancellationToken);
            if (activity is null) return Result<Activity>.Failure("Activity not found", 404);
            return Result<Activity>.Success(activity);
        }
    }
}
