using Microsoft.Data.SqlClient;
using Project1.Conexion;
using Project1.Models;
using System.Data;

namespace Project1.Datos
{
    public class Datos
    {
        Conexionbd cn = new Conexionbd();

        /// <summary>
        /// Retorna listado de vehiculos
        /// </summary>
        /// <returns></returns>
        public async Task<List<Vehiculo>> MostrarVehiculos()
        {
            var lista = new List<Vehiculo>();
            using (var sql = new SqlConnection(cn.cadenaSQL()))
            {
                using (var cmd = new SqlCommand("ValidarVehiculos", sql))
                {
                    await sql.OpenAsync();
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    using (var item = await cmd.ExecuteReaderAsync())
                    {
                        while (await item.ReadAsync())
                        {
                            var vehiculos = new Vehiculo();
                            vehiculos.Id = (int)item["Id"];
                            vehiculos.Referencia = (string)item["referencia"];
                            vehiculos.IdUbicacion = (int)item["IdUbicacion"];
                            vehiculos.Disponible = (bool)item["Disponible"];
                            vehiculos.strDisponible = (bool)item["Disponible"] == true ? "Disponible" : "No Disponible";
                            vehiculos.Ubicacion = (string)item["Ubicacion"];
                            lista.Add(vehiculos);
                        }
                    }
                };
            }
            return lista;
        }

        /// <summary>
        /// Retorna Listado de Ubicaciones
        /// </summary>
        /// <returns></returns>
        public async Task<List<Ubicaciones>> ListadoUbicacion()
        {
            var lista = new List<Ubicaciones>();
            using (var sql = new SqlConnection(cn.cadenaSQL()))
            {
                using (var cmd = new SqlCommand("ListadoUbicaciones", sql))
                {
                    await sql.OpenAsync();
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    using (var item = await cmd.ExecuteReaderAsync())
                    {
                        while (await item.ReadAsync())
                        {
                            var ubicaciones = new Ubicaciones();
                            ubicaciones.Id = (int)item["Id"];
                            ubicaciones.Ubicacion = (string)item["Ubicacion"];
                            ubicaciones.Estado = (bool)item["Estado"];
                            lista.Add(ubicaciones);
                        }
                    }
                };
            }
            return lista;
        }

        /// <summary>
        /// Inserta Ubicacion nueva
        /// </summary>
        /// <param name="ubicacion"></param>
        /// <param name="estado"></param>
        /// <returns></returns>
        public async Task InsertarUbicacion(string ubicacion, bool estado)
        {
            using (var sql = new SqlConnection(cn.cadenaSQL()))
            {
                using (var cmd = new SqlCommand("InsertarUbicacion", sql))
                {
                    await sql.OpenAsync();
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.Add("@Ubicacion", SqlDbType.VarChar, 150).Value = ubicacion;
                    cmd.Parameters.Add("@Estado", SqlDbType.Bit).Value = estado;

                    await cmd.ExecuteNonQueryAsync();
                }
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <param name="estado"></param>
        /// <returns></returns>
        public async Task EditarEstadoUbicacion(int id, bool estado)
        {
            using (var sql = new SqlConnection(cn.cadenaSQL()))
            {
                using (var cmd = new SqlCommand("ActualizarUbicacion", sql))
                {
                    await sql.OpenAsync();
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add("@Id", SqlDbType.Int).Value = id;
                    cmd.Parameters.Add("@Estado", SqlDbType.Bit).Value = estado;

                    await cmd.ExecuteNonQueryAsync();
                }
            }
        }

        /// <summary>
        /// Consulta Solicitudes sobre vehiculos realizadas
        /// </summary>
        /// <param name="idUbicacionRecogida"></param>
        /// <param name="idUbicacionDevolucion"></param>
        /// <returns></returns>
        public async Task<List<Solicitudes>> ConsultarSolicitudes(int idUbicacionRecogida, int idUbicacionDevolucion)
        {
            var lista = new List<Solicitudes>();
            using (var sql = new SqlConnection(cn.cadenaSQL()))
            {
                using (var cmd = new SqlCommand("ListadoEstadoVehiculo", sql))
                {
                    await sql.OpenAsync();
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.Add("@IdUbicacionRecogida", SqlDbType.Int).Value = idUbicacionRecogida;
                    cmd.Parameters.Add("@IdUbicacionDevolucion", SqlDbType.Int).Value = idUbicacionDevolucion;

                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            var solicitud = new Solicitudes();
                            solicitud.Id = reader.GetInt32(reader.GetOrdinal("Id"));
                            solicitud.Referencia = reader.GetString(reader.GetOrdinal("Referencia"));
                            solicitud.UbicacionRecogida = reader.GetString(reader.GetOrdinal("UbicacionRecogida"));
                            solicitud.UbicacionDevolucion = reader.GetString(reader.GetOrdinal("UbicacionDevolucion"));
                            solicitud.Estado = reader.GetBoolean(reader.GetOrdinal("Estado"));
                            solicitud.Disponible = reader.GetBoolean(reader.GetOrdinal("Disponible"));
                            lista.Add(solicitud);
                        }
                    }
                }
            }
            return lista;
        }

        /// <summary>
        /// Inserta un registro nuevo
        /// </summary>
        /// <param name="idVehiculo"></param>
        /// <param name="idUbicacionRecogida"></param>
        /// <param name="idUbicacionDevolucion"></param>
        /// <returns></returns>
        public async Task InsertaEstadoVehiculo(int idVehiculo, int idUbicacionRecogida, int idUbicacionDevolucion)
        {
            using (var sql = new SqlConnection(cn.cadenaSQL()))
            {
                using (var cmd = new SqlCommand("InsertaEstadoVehiculo", sql))
                {
                    await sql.OpenAsync();
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.Add("@IdVehiculo", SqlDbType.Int).Value = idVehiculo;
                    cmd.Parameters.Add("@IdUbicacionRecogida", SqlDbType.Int).Value = idUbicacionRecogida;
                    cmd.Parameters.Add("@IdUbicacionDevolucion", SqlDbType.Int).Value = idUbicacionDevolucion;

                    await cmd.ExecuteNonQueryAsync();
                }
            }
        }

    }
}
