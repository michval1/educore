FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

COPY EduCore.sln ./
COPY src/EduCore.Api/EduCore.Api.csproj src/EduCore.Api/
COPY src/EduCore.Application/EduCore.Application.csproj src/EduCore.Application/
COPY src/EduCore.Domain/EduCore.Domain.csproj src/EduCore.Domain/
COPY src/EduCore.Infrastructure/EduCore.Infrastructure.csproj src/EduCore.Infrastructure/
COPY tests/EduCore.Domain.Tests/EduCore.Domain.Tests.csproj tests/EduCore.Domain.Tests/
COPY tests/EduCore.Api.Tests/EduCore.Api.Tests.csproj tests/EduCore.Api.Tests/
RUN dotnet restore

COPY . .
RUN dotnet publish src/EduCore.Api/EduCore.Api.csproj -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app/publish .

EXPOSE 8080
ENTRYPOINT ["dotnet", "EduCore.Api.dll"]
