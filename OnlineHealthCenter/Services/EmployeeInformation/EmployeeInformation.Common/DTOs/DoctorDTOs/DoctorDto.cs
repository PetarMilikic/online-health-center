﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeInformation.Common.DTOs.DoctorDTOs
{
    public class DoctorDto : BaseIdentityDoctorDto
    {
        public decimal Mark { get; set; }
    }
}
