using albums_api.Models;
using Xunit;

namespace albums_api.Tests.Models
{
    public class AlbumTests
    {
        [Fact]
        public void GetAll_ShouldReturn6Albums()
        {
            // Act
            var albums = Album.GetAll();

            // Assert
            Assert.NotNull(albums);
            Assert.Equal(6, albums.Count);
        }

        [Fact]
        public void GetAll_ShouldReturnAlbumsWithArtistData()
        {
            // Act
            var albums = Album.GetAll();

            // Assert
            Assert.All(albums, album =>
            {
                Assert.NotNull(album.Artist);
                Assert.NotNull(album.Artist.Name);
                Assert.NotEqual(default(DateTime), album.Artist.Birthdate);
                Assert.NotNull(album.Artist.BirthPlace);
            });
        }

        [Fact]
        public void GetById_WithValidId_ShouldReturnAlbum()
        {
            // Arrange
            int validId = 1;

            // Act
            var album = Album.GetById(validId);

            // Assert
            Assert.NotNull(album);
            Assert.Equal(validId, album.Id);
            Assert.Equal("You, Me and an App Id", album.Title);
        }

        [Fact]
        public void GetById_WithInvalidId_ShouldReturnNull()
        {
            // Arrange
            int invalidId = 999;

            // Act
            var album = Album.GetById(invalidId);

            // Assert
            Assert.Null(album);
        }

        [Fact]
        public void SearchByYear_WithValidYear_ShouldReturnMatchingAlbums()
        {
            // Arrange
            int year = 2020;

            // Act
            var albums = Album.SearchByYear(year);

            // Assert
            Assert.NotNull(albums);
            Assert.Single(albums);
            Assert.Equal(year, albums[0].Year);
        }

        [Fact]
        public void SearchByYear_WithNoMatches_ShouldReturnEmptyList()
        {
            // Arrange
            int year = 1999;

            // Act
            var albums = Album.SearchByYear(year);

            // Assert
            Assert.NotNull(albums);
            Assert.Empty(albums);
        }
    }
}