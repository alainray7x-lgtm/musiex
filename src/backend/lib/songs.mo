import Map "mo:core/Map";
import Time "mo:core/Time";
import Text "mo:core/Text";
import TypesCommon "../types/common";
import TypesSongs "../types/songs";

module {
  public type SongsState = {
    songs : Map.Map<TypesCommon.SongId, TypesSongs.Song>;
    var nextId : TypesCommon.SongId;
    var seeded : Bool;
  };

  public func initState() : SongsState {
    {
      songs = Map.empty<TypesCommon.SongId, TypesSongs.Song>();
      var nextId = 1;
      var seeded = false;
    };
  };

  public func seedDemoSongs(state : SongsState) : () {
    if (state.seeded) return;
    state.seeded := true;

    let demoSongs : [TypesSongs.SongInput] = [
      // EXISTING (shortened lyrics for safety)
      {
        title = "Bohemian Rhapsody";
        artist = "Queen";
        album = "A Night at the Opera";
        duration = 354;
        coverArtUrl = "";
        audioUrl = "";
        lyrics = "Is this the real life?...";
      },
      {
        title = "Hotel California";
        artist = "Eagles";
        album = "Hotel California";
        duration = 391;
        coverArtUrl = "";
        audioUrl = "";
        lyrics = "On a dark desert highway...";
      },

      // NEW SONGS
      {
        title = "Shape of You";
        artist = "Ed Sheeran";
        album = "Divide";
        duration = 233;
        coverArtUrl = "";
        audioUrl = "";
        lyrics = "The club isn't the best place...";
      },
      {
        title = "Blinding Lights";
        artist = "The Weeknd";
        album = "After Hours";
        duration = 200;
        coverArtUrl = "";
        audioUrl = "";
        lyrics = "I been tryna call...";
      },
      {
        title = "Rolling in the Deep";
        artist = "Adele";
        album = "21";
        duration = 228;
        coverArtUrl = "";
        audioUrl = "";
        lyrics = "There's a fire starting...";
      },
      {
        title = "Counting Stars";
        artist = "OneRepublic";
        album = "Native";
        duration = 257;
        coverArtUrl = "";
        audioUrl = "";
        lyrics = "Lately I've been losing sleep...";
      },
      {
        title = "Havana";
        artist = "Camila Cabello";
        album = "Camila";
        duration = 217;
        coverArtUrl = "";
        audioUrl = "";
        lyrics = "Havana ooh na-na...";
      },
      {
        title = "Perfect";
        artist = "Ed Sheeran";
        album = "Divide";
        duration = 263;
        coverArtUrl = "";
        audioUrl = "";
        lyrics = "I found a love for me...";
      },
      {
        title = "Lose Yourself";
        artist = "Eminem";
        album = "Curtain Call";
        duration = 326;
        coverArtUrl = "";
        audioUrl = "";
        lyrics = "Look, if you had one shot...";
      },
      {
        title = "Uptown Funk";
        artist = "Mark Ronson ft. Bruno Mars";
        album = "Uptown Special";
        duration = 269;
        coverArtUrl = "";
        audioUrl = "";
        lyrics = "This hit, that ice cold...";
      },
      {
        title = "Let Her Go";
        artist = "Passenger";
        album = "All the Little Lights";
        duration = 252;
        coverArtUrl = "";
        audioUrl = "";
        lyrics = "Well you only need the light...";
      }
    ];

    for (input in demoSongs.vals()) {
      ignore addSong(state, input);
    };
  };

  public func addSong(
    state : SongsState,
    input : TypesSongs.SongInput
  ) : TypesSongs.Song {
    let id = state.nextId;
    state.nextId += 1;

    let song : TypesSongs.Song = {
      id;
      title = input.title;
      artist = input.artist;
      album = input.album;
      duration = input.duration;
      coverArtUrl = input.coverArtUrl;
      audioUrl = input.audioUrl;
      lyrics = input.lyrics;
      createdAt = Time.now();
    };

    state.songs.add(id, song);
    song;
  };

  public func getSong(
    state : SongsState,
    id : TypesCommon.SongId
  ) : ?TypesSongs.Song {
    state.songs.get(id);
  };

  public func listSongs(state : SongsState) : [TypesSongs.Song] {
    state.songs.values().toArray();
  };

  public func searchSongs(
    state : SongsState,
    searchTerm : Text
  ) : [TypesSongs.Song] {
    let lower = searchTerm.toLower();
    state.songs
      .values()
      .filter(func(s) {
        s.title.toLower().contains(#text lower) or
        s.artist.toLower().contains(#text lower) or
        s.album.toLower().contains(#text lower)
      })
      .toArray();
  };
};
