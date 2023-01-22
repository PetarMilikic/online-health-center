﻿using IdentityServer.DTOs;
using IdentityServer.Entities;

namespace IdentityServer.Services.Interfaces
{
    public interface IAuthenticationService
    {
        Task<User?> ValidateUser(UserCredentialsDTO userCredentials);
        Task<AuthenticationModel> CreateAuthenticationModel(User user);
    }
}
