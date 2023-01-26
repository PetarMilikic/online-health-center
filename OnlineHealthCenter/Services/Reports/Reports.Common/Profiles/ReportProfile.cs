﻿using AutoMapper;
using Reports.Common.DTOs;
using Reports.Common.Entities;

namespace Reports.Common.Profiles
{
    public class ReportProfile : Profile
    {
        public ReportProfile()
        {
            CreateMap<CreateReportDTO, Report>()
                .ForMember(
                    dest => dest.Id, 
                    opt => opt.MapFrom(src => Guid.NewGuid())
                );

            CreateMap<Report, ReportDTO>();
        }
    }
}
