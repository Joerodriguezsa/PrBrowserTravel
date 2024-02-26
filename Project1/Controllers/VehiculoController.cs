using Microsoft.AspNetCore.Mvc;
using Project1.Datos;
using Project1.Models;

namespace Project1.Controllers
{

    [ApiController]
    [Route("api/vehiculo")]
    public class VehiculoController: ControllerBase
    {

        private readonly ILogger<VehiculoController> _logger;

        public VehiculoController(ILogger<VehiculoController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<List<Vehiculo>>> GetVehiculos()
        {
            var function = new Datos.Datos();
            var lista = await function.MostrarVehiculos();
            return lista;
        }

    }
}
