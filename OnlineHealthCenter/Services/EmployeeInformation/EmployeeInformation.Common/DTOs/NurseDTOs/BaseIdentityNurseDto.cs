﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeInformation.Common.DTOs.NurseDTOs
{
    public class BaseIdentityNurseDto : BaseNurseDto
    {
        public Guid Id { get; set; }
    }
}