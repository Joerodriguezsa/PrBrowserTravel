namespace Project1.Models
{
    public class Solicitudes
    {
        public int Id { get; set; }
        public string Referencia { get; set; }
        public string UbicacionRecogida { get; set; }
        public string UbicacionDevolucion { get; set; }
        public bool Estado { get; set; }
        public bool Disponible { get; set; }

    }
}
