
namespace albums_api.Models
{
    public record Album(int Id, string Title, Artist Artist, int Year, double Price, string Image_url)
    {
        public static List<Album> GetAll()
        {
            var albums = new List<Album>(){
            new Album(1, "You, Me and an App Id", new Artist("Daprize", new DateTime(1990, 5, 15), "Seattle, WA"), 2020, 10.99, "https://aka.ms/albums-daprlogo"),
            new Album(2, "Seven Revision Army", new Artist("The Blue-Green Stripes", new DateTime(1985, 3, 20), "Detroit, MI"), 2021, 13.99, "https://aka.ms/albums-containerappslogo"),
            new Album(3, "Scale It Up", new Artist("KEDA Club", new DateTime(1992, 8, 10), "Austin, TX"), 2022, 13.99, "https://aka.ms/albums-kedalogo"),
            new Album(4, "Lost in Translation", new Artist("MegaDNS", new DateTime(1988, 11, 25), "Portland, OR"), 2023, 12.99,"https://aka.ms/albums-envoylogo"),
            new Album(5, "Lock Down Your Love", new Artist("V is for VNET", new DateTime(1995, 2, 14), "San Francisco, CA"), 2024, 12.99, "https://aka.ms/albums-vnetlogo"),
            new Album(6, "Sweet Container O' Mine", new Artist("Guns N Probeses", new DateTime(1987, 7, 6), "Los Angeles, CA"), 2025, 14.99, "https://aka.ms/albums-containerappslogo")
         };

            return albums;
        }

        internal static Album? GetById(int id)
        {
            var albums = GetAll();
            return albums.FirstOrDefault(a => a.Id == id);
        }

        internal static List<Album> SearchByYear(int year)
        {
            var albums = GetAll();
            return albums.Where(a => a.Year == year).ToList();
        }
    }
}
