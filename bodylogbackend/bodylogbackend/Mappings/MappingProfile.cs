using AutoMapper;
using bodylogbackend.DTOs;
using bodylogbackend.Models;

namespace bodylogbackend.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Measurement, MeasurementDto>();
        CreateMap<User, UserDto>();

        CreateMap<CreateMeasurementDto, Measurement>();
        CreateMap<CreateUserDto, User>();
        CreateMap<UpdateUserDto, User>();
    }
}
