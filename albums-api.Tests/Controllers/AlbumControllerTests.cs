using albums_api.Controllers;
using albums_api.Models;
using Microsoft.AspNetCore.Mvc;
using Xunit;

namespace albums_api.Tests.Controllers
{
    public class AlbumControllerTests
    {
        private readonly AlbumController _controller;

        public AlbumControllerTests()
        {
            _controller = new AlbumController();
        }

        [Fact]
        public void Get_ShouldReturnOkWithAllAlbums()
        {
            // Act
            var result = _controller.Get();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var albums = Assert.IsAssignableFrom<List<Album>>(okResult.Value);
            Assert.NotEmpty(albums);
        }

        [Fact]
        public void GetById_WithValidId_ShouldReturnOkWithAlbum()
        {
            // Arrange
            int validId = 1;

            // Act
            var result = _controller.Get(validId);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var album = Assert.IsType<Album>(okResult.Value);
            Assert.Equal(validId, album.Id);
        }

        [Fact]
        public void GetById_WithInvalidId_ShouldReturnNotFound()
        {
            // Arrange
            int invalidId = 999;

            // Act
            var result = _controller.Get(invalidId);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public void GetById_WithZeroOrNegativeId_ShouldReturnBadRequest()
        {
            // Arrange
            int invalidId = 0;

            // Act
            var result = _controller.Get(invalidId);

            // Assert
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public void SearchByYear_WithValidYear_ShouldReturnOkWithMatchingAlbums()
        {
            // Arrange
            int year = 2020;

            // Act
            var result = _controller.SearchByYear(year);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var albums = Assert.IsAssignableFrom<List<Album>>(okResult.Value);
            Assert.All(albums, a => Assert.Equal(year, a.Year));
        }

        [Fact]
        public void SearchByYear_WithInvalidYear_ShouldReturnBadRequest()
        {
            // Arrange
            int invalidYear = 1800;

            // Act
            var result = _controller.SearchByYear(invalidYear);

            // Assert
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public void Post_WithValidAlbum_ShouldReturnCreatedAtAction()
        {
            // Arrange
            var newAlbum = new Album(0, "Test Album", new Artist("Test Artist", new DateTime(1990, 1, 1), "Test City"), 2024, 15.99, "https://test.com/image.jpg");

            // Act
            var result = _controller.Post(newAlbum);

            // Assert
            var createdResult = Assert.IsType<CreatedAtActionResult>(result);
            var album = Assert.IsType<Album>(createdResult.Value);
            Assert.Equal("Test Album", album.Title);
            Assert.True(album.Id > 0);
        }

        [Fact]
        public void Post_WithNullAlbum_ShouldReturnBadRequest()
        {
            // Act
            var result = _controller.Post(null);

            // Assert
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public void Post_WithMissingTitle_ShouldReturnBadRequest()
        {
            // Arrange
            var invalidAlbum = new Album(0, "", new Artist("Test Artist", new DateTime(1990, 1, 1), "Test City"), 2024, 15.99, "https://test.com/image.jpg");

            // Act
            var result = _controller.Post(invalidAlbum);

            // Assert
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public void Post_WithNullArtist_ShouldReturnBadRequest()
        {
            // Arrange
            var invalidAlbum = new Album(0, "Test Album", null, 2024, 15.99, "https://test.com/image.jpg");

            // Act
            var result = _controller.Post(invalidAlbum);

            // Assert
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public void Put_WithValidIdAndAlbum_ShouldReturnOkWithUpdatedAlbum()
        {
            // Arrange
            int existingId = 1;
            var updatedAlbum = new Album(0, "Updated Album", new Artist("Updated Artist", new DateTime(1990, 1, 1), "Updated City"), 2024, 19.99, "https://updated.com/image.jpg");

            // Act
            var result = _controller.Put(existingId, updatedAlbum);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var album = Assert.IsType<Album>(okResult.Value);
            Assert.Equal(existingId, album.Id);
            Assert.Equal("Updated Album", album.Title);
        }

        [Fact]
        public void Put_WithInvalidId_ShouldReturnNotFound()
        {
            // Arrange
            int invalidId = 999;
            var album = new Album(0, "Test Album", new Artist("Test Artist", new DateTime(1990, 1, 1), "Test City"), 2024, 15.99, "https://test.com/image.jpg");

            // Act
            var result = _controller.Put(invalidId, album);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public void Put_WithZeroOrNegativeId_ShouldReturnBadRequest()
        {
            // Arrange
            int invalidId = 0;
            var album = new Album(0, "Test Album", new Artist("Test Artist", new DateTime(1990, 1, 1), "Test City"), 2024, 15.99, "https://test.com/image.jpg");

            // Act
            var result = _controller.Put(invalidId, album);

            // Assert
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public void Delete_WithValidId_ShouldReturnNoContent()
        {
            // Arrange
            int validId = 1;

            // Act
            var result = _controller.Delete(validId);

            // Assert
            Assert.IsType<NoContentResult>(result);
        }

        [Fact]
        public void Delete_WithInvalidId_ShouldReturnNotFound()
        {
            // Arrange
            int invalidId = 999;

            // Act
            var result = _controller.Delete(invalidId);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public void Delete_WithZeroOrNegativeId_ShouldReturnBadRequest()
        {
            // Arrange
            int invalidId = -1;

            // Act
            var result = _controller.Delete(invalidId);

            // Assert
            Assert.IsType<BadRequestObjectResult>(result);
        }
    }
}