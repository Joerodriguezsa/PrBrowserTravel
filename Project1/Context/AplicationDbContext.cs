using Microsoft.EntityFrameworkCore;
using Project1.Models;

namespace Project1.Context
{
    public class AplicationDbContext : DbContext
    {
        /// <summary>
        /// Db set Vehiculos
        /// </summary>
        public DbSet<Vehiculo> vehiculos { get; set; }
    }
}
