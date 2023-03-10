#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["Services/Appointments/Appointments.API/Appointments.API.csproj", "Services/Appointments/Appointments.API/"]
COPY ["Services/Appointments/Appointments.Infrastructure/Appointments.Infrastructure.csproj", "Services/Appointments/Appointments.Infrastructure/"]
COPY ["Services/Appointments/Appointments.Application/Appointments.Application.csproj", "Services/Appointments/Appointments.Application/"]
COPY ["Services/Appointments/Appointments.Domain/Appointments.Domain.csproj", "Services/Appointments/Appointments.Domain/"]
RUN dotnet restore "Services/Appointments/Appointments.API/Appointments.API.csproj"
COPY . .
WORKDIR "/src/Services/Appointments/Appointments.API"
RUN dotnet build "Appointments.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Appointments.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Appointments.API.dll"]