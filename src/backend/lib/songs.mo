import Map "mo:core/Map";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import TypesCommon "../types/common";
import TypesSongs "../types/songs";

module {
  public type SongsState = {
    // Note: If using the standard base library Map, it's usually functional.
    // If you want a mutable collection, consider HashMap.
    songs : Map.Map<TypesCommon.SongId, TypesSongs.Song>;
    var nextId : TypesCommon.SongId;
    var seeded : Bool;
  };

  public func initState() : SongsState {
    {
      songs = Map.empty<TypesCommon.SongId, TypesSongs.Song>();
      nextId = 1; // Removed 'var' - just assigning value
      seeded = false; // Removed 'var' - just assigning value
    };
  };

  public func seedDemoSongs(state : SongsState) : () {
    if (state.seeded) return;
    state.seeded := true;

    let demoSongs : [TypesSongs.SongInput] = [
      {
        title = "Bohemian Rhapsody";
        artist = "Queen";
        album = "A Night at the Opera";
        duration = 354;
        coverArtUrl = "https://upload.wikimedia.org/wikipedia/en/9/9f/Bohemian_Rhapsody.png";
        audioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
        lyrics = "Is this the real life?\nIs this just fantasy?..."; 
      },
      // ... rest of your songs
    ];

    for (input in demoSongs.vals()) {
      ignore addSong(state, input);
    };
  };

  public func addSong(state : SongsState, input : TypesSongs.SongInput) : TypesSongs.Song {
    let id = state.nextId;
    state.nextId := state.nextId + 1;
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
    // If using mo:core Map (Functional), you must reassign the map
    state.songs := Map.put(state.songs, id, song); 
    song;
  };

  public func editSong(state : SongsState, id : TypesCommon.SongId, input : TypesSongs.SongInput) : ?TypesSongs.Song {
    switch (Map.get(state.songs, id)) {
      case (null) { null };
      case (?existing) {
        let updated : TypesSongs.Song = {
          existing with
          title = input.title;
          artist = input.artist;
          album = input.album;
          duration = input.duration;
          coverArtUrl = input.coverArtUrl;
          audioUrl = input.audioUrl;
          lyrics = input.lyrics;
        };
        state.songs := Map.put(state.songs, id, updated);
        ?updated;
      };
    };
  };

  public func deleteSong(state : SongsState, id : TypesCommon.SongId) : Bool {
    let (newMap, removedValue) = Map.remove(state.songs, id);
    state.songs := newMap;
    switch (removedValue) {
      case (null) { false };
      case (?_) { true };
    };
  };

  public func getSong(state : SongsState, id : TypesCommon.SongId) : ?TypesSongs.Song {
    Map.get(state.songs, id);
  };

  public func listSongs(state : SongsState) : [TypesSongs.Song] {
    Iter.toArray(state.songs.values());
  };

  public func searchSongs(state : SongsState, searchTerm : Text) : [TypesSongs.Song] {
    let lowerSearch = Text.toLower(searchTerm);
    let allSongs = state.songs.values();
    
    Iter.toArray(Iter.filter<TypesSongs.Song>(allSongs, func(s) {
      Text.contains(Text.toLower(s.title), #text lowerSearch) or
      Text.contains(Text.toLower(s.artist), #text lowerSearch) or
      Text.contains(Text.toLower(s.album), #text lowerSearch)
    }));
  };

  public func toPublic(song : TypesSongs.Song, tier : TypesCommon.SubscriptionTier) : TypesSongs.SongPublic {
    let lyrics = switch (tier) {
      case (#premium) { song.lyrics };
      case (#free) {
        if (song.lyrics.size() > 100) {
          // Take first 100 chars and append ellipsis
          Text.fromIter(Iter.take<Char>(song.lyrics.chars(), 100)) # "...";
        } else {
          song.lyrics;
        };
      };
    };
    {
      id = song.id;
      title = song.title;
      artist = song.artist;
      album = song.album;
      duration = song.duration;
      coverArtUrl = song.coverArtUrl;
      audioUrl = song.audioUrl;
      lyrics = lyrics;
      createdAt = song.createdAt;
    };
  };
};
