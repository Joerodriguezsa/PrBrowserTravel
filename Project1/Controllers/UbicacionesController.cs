using Microsoft.AspNetCore.Mvc;
using Project1.Datos;
using Project1.Models;
using System;
using System.Threading.Tasks;

namespace Project1.Controllers
{
    [ApiController]
    [Route("api/ubicaciones")]
    public class UbicacionesController : ControllerBase
    {
        private readonly ILogger<UbicacionesController> _logger;

        public UbicacionesController(ILogger<UbicacionesController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<List<Ubicaciones>>> GetUbicaciones()
        {
            var function = new Datos.Datos();
            var lista = await function.ListadoUbicacion();
            return lista;
        }

        [HttpPost]
        public async Task<IActionResult> InsertarUbicacion([FromBody] UbicacionRequest request)
        {
            try
            {
                var function = new Datos.Datos();
                await function.InsertarUbicacion(request.Ubicacion, request.Estado);
                return Ok("Ubicación insertada correctamente.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al insertar ubicación.");
                return StatusCode(500, "Error interno del servidor.");
            }
        }

        [HttpPut("{id}/estado")]
        public async Task<IActionResult> EditarEstado(int id, [FromBody] EstadoRequest request)
        {
            try
            {
                var function = new Datos.Datos();
                await function.EditarEstadoUbicacion(id, request.Estado);
                return Ok("Estado de la ubicación actualizado correctamente.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al editar estado de la ubicación.");
                return StatusCode(500, "Error interno del servidor.");
            }
        }
    }

    public class UbicacionRequest
    {
        public string Ubicacion { get; set; }
        public bool Estado { get; set; }
    }

    public class EstadoRequest
    {
        public bool Estado { get; set; }
    }
}
