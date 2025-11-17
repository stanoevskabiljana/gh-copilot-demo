using albums_api.Models;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Text.Json;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace albums_api.Controllers
{
    [Route("albums")]
    [ApiController]
    public class AlbumController : ControllerBase
    {
        private static List<Album> _albums = Album.GetAll();
        private static int _nextId = 7;

        // GET: albums
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_albums);
        }

        // GET api/<AlbumController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid album ID");
            }

            var album = _albums.FirstOrDefault(a => a.Id == id);
            if (album == null)
            {
                return NotFound();
            }
            return Ok(album);
        }

        // GET: albums/search?year=2020
        [HttpGet("search")]
        public IActionResult SearchByYear([FromQuery] int year)
        {
            if (year < 1900 || year > 2100)
            {
                return BadRequest("Invalid year");
            }

            var albums = Album.SearchByYear(year);
            return Ok(albums);
        }

        // POST albums
        [HttpPost]
        public IActionResult Post([FromBody] Album album)
        {
            if (album == null)
            {
                return BadRequest("Album data is required");
            }

            if (string.IsNullOrWhiteSpace(album.Title) || album.Artist == null)
            {
                return BadRequest("Title and Artist are required");
            }

            var newAlbum = album with { Id = _nextId++ };
            _albums.Add(newAlbum);

            return CreatedAtAction(nameof(Get), new { id = newAlbum.Id }, newAlbum);
        }

        // PUT albums/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Album album)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid album ID");
            }

            if (album == null)
            {
                return BadRequest("Album data is required");
            }

            var existingAlbum = _albums.FirstOrDefault(a => a.Id == id);
            if (existingAlbum == null)
            {
                return NotFound();
            }

            var index = _albums.IndexOf(existingAlbum);
            var updatedAlbum = album with { Id = id };
            _albums[index] = updatedAlbum;

            return Ok(updatedAlbum);
        }

        // DELETE albums/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid album ID");
            }

            var album = _albums.FirstOrDefault(a => a.Id == id);
            if (album == null)
            {
                return NotFound();
            }

            _albums.Remove(album);
            return NoContent();
        }

    }
}
