import Map "mo:core/Map";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";
import TypesCommon "../types/common";
import TypesPlaylists "../types/playlists";

module {
  public type PlaylistsState = {
    playlists : Map.Map<TypesCommon.PlaylistId, TypesPlaylists.Playlist>;
    var nextId : TypesCommon.PlaylistId;
  };

  public func initState() : PlaylistsState {
    {
      playlists = Map.empty<TypesCommon.PlaylistId, TypesPlaylists.Playlist>();
      var nextId = 1;
    };
  };

  public func createPlaylist(
    state : PlaylistsState,
    owner : TypesCommon.UserId,
    input : TypesPlaylists.PlaylistInput,
    ownerPlaylistCount : Nat,
    tier : TypesCommon.SubscriptionTier,
  ) : TypesPlaylists.Playlist {
    switch (tier) {
      case (#free) {
        if (ownerPlaylistCount >= 3) {
          Runtime.trap("Free users can create at most 3 playlists. Upgrade to premium for unlimited playlists.");
        };
      };
      case (#premium) {};
    };
    let id = state.nextId;
    state.nextId := state.nextId + 1;
    let now = Time.now();
    let playlist : TypesPlaylists.Playlist = {
      id;
      owner;
      name = input.name;
      description = input.description;
      songIds = [];
      createdAt = now;
      updatedAt = now;
    };
    state.playlists.add(id, playlist);
    playlist;
  };

  public func getPlaylist(state : PlaylistsState, id : TypesCommon.PlaylistId, caller : TypesCommon.UserId) : ?TypesPlaylists.Playlist {
    switch (state.playlists.get(id)) {
      case (null) { null };
      case (?playlist) {
        if (playlist.owner.equal(caller)) { ?playlist } else { null };
      };
    };
  };

  public func listUserPlaylists(state : PlaylistsState, owner : TypesCommon.UserId) : [TypesPlaylists.Playlist] {
    state.playlists.values().filter(func(p) { p.owner.equal(owner) }).toArray();
  };

  public func updatePlaylist(
    state : PlaylistsState,
    id : TypesCommon.PlaylistId,
    caller : TypesCommon.UserId,
    input : TypesPlaylists.PlaylistInput,
  ) : ?TypesPlaylists.Playlist {
    switch (state.playlists.get(id)) {
      case (null) { null };
      case (?playlist) {
        if (not playlist.owner.equal(caller)) { return null };
        let updated : TypesPlaylists.Playlist = {
          playlist with
          name = input.name;
          description = input.description;
          updatedAt = Time.now();
        };
        state.playlists.add(id, updated);
        ?updated;
      };
    };
  };

  public func deletePlaylist(state : PlaylistsState, id : TypesCommon.PlaylistId, caller : TypesCommon.UserId) : Bool {
    switch (state.playlists.get(id)) {
      case (null) { false };
      case (?playlist) {
        if (not playlist.owner.equal(caller)) { return false };
        state.playlists.remove(id);
        true;
      };
    };
  };

  public func addSongToPlaylist(
    state : PlaylistsState,
    playlistId : TypesCommon.PlaylistId,
    songId : TypesCommon.SongId,
    caller : TypesCommon.UserId,
  ) : ?TypesPlaylists.Playlist {
    switch (state.playlists.get(playlistId)) {
      case (null) { null };
      case (?playlist) {
        if (not playlist.owner.equal(caller)) { return null };
        // Avoid duplicates
        let alreadyIn = playlist.songIds.any(func(s) { Nat.equal(s, songId) });
        if (alreadyIn) { return ?playlist };
        let updated : TypesPlaylists.Playlist = {
          playlist with
          songIds = playlist.songIds.concat([songId]);
          updatedAt = Time.now();
        };
        state.playlists.add(playlistId, updated);
        ?updated;
      };
    };
  };

  public func removeSongFromPlaylist(
    state : PlaylistsState,
    playlistId : TypesCommon.PlaylistId,
    songId : TypesCommon.SongId,
    caller : TypesCommon.UserId,
  ) : ?TypesPlaylists.Playlist {
    switch (state.playlists.get(playlistId)) {
      case (null) { null };
      case (?playlist) {
        if (not playlist.owner.equal(caller)) { return null };
        let updated : TypesPlaylists.Playlist = {
          playlist with
          songIds = playlist.songIds.filter(func(s) { not Nat.equal(s, songId) });
          updatedAt = Time.now();
        };
        state.playlists.add(playlistId, updated);
        ?updated;
      };
    };
  };

  public func countUserPlaylists(state : PlaylistsState, owner : TypesCommon.UserId) : Nat {
    state.playlists.values().filter(func(p) { p.owner.equal(owner) }).size();
  };
};
