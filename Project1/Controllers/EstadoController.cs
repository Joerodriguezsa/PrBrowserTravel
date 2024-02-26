using Microsoft.AspNetCore.Mvc;
using Project1.Models;

namespace Project1.Controllers
{

    [ApiController]
    [Route("api/estado")]
    public class EstadoController : ControllerBase
    {

        private readonly ILogger<EstadoController> _logger;

        public EstadoController(ILogger<EstadoController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<List<Solicitudes>>> GetSolicitudes(int idUbicacionRecogida = 0, int idUbicacionDevolucion = 0)
        {
            var function = new Datos.Datos();
            var lista = await function.ConsultarSolicitudes(idUbicacionRecogida, idUbicacionDevolucion);
            return lista;
        }

        [HttpPost]
        public async Task<IActionResult> InsertaEstadoVehiculo([FromBody] EstadoVehiculoRequest request)
        {
            try
            {
                var function = new Datos.Datos();
                await function.InsertaEstadoVehiculo(request.IdVehiculo, request.IdUbicacionRecogida, request.IdUbicacionDevolucion);
                return Ok("Estado del vehículo insertado correctamente.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al insertar estado del vehículo.");
                return StatusCode(500, "Error interno del servidor.");
            }
        }
    }

    public class EstadoVehiculoRequest
    {
        public int IdVehiculo { get; set; }
        public int IdUbicacionRecogida { get; set; }
        public int IdUbicacionDevolucion { get; set; }
    }

}
