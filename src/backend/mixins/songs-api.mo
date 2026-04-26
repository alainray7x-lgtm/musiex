import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import TypesSongs "../types/songs";
import TypesCommon "../types/common";
import SongsLib "../lib/songs";
import UsersLib "../lib/users";

mixin (
  accessControlState : AccessControl.AccessControlState,
  songsState : SongsLib.SongsState,
  usersState : UsersLib.UsersState,
) {
  // Admin: add a new song
  public shared ({ caller }) func addSong(input : TypesSongs.SongInput) : async TypesSongs.Song {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can add songs");
    };
    SongsLib.addSong(songsState, input);
  };

  // Admin: edit an existing song
  public shared ({ caller }) func editSong(id : TypesCommon.SongId, input : TypesSongs.SongInput) : async ?TypesSongs.Song {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can edit songs");
    };
    SongsLib.editSong(songsState, id, input);
  };

  // Admin: delete a song
  public shared ({ caller }) func deleteSong(id : TypesCommon.SongId) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can delete songs");
    };
    SongsLib.deleteSong(songsState, id);
  };

  // Browse all songs (lyrics gated by tier)
  public query ({ caller }) func listSongs() : async [TypesSongs.SongPublic] {
    let tier = UsersLib.getUserTier(usersState, caller);
    let all = SongsLib.listSongs(songsState);
    all.map<TypesSongs.Song, TypesSongs.SongPublic>(func(s) { SongsLib.toPublic(s, tier) });
  };

  // Search songs by title/artist/album
  public query ({ caller }) func searchSongs(searchTerm : Text) : async [TypesSongs.SongPublic] {
    let tier = UsersLib.getUserTier(usersState, caller);
    let results = SongsLib.searchSongs(songsState, searchTerm);
    results.map<TypesSongs.Song, TypesSongs.SongPublic>(func(s) { SongsLib.toPublic(s, tier) });
  };

  // Get a single song by ID (lyrics gated by tier)
  public query ({ caller }) func getSong(id : TypesCommon.SongId) : async ?TypesSongs.SongPublic {
    let tier = UsersLib.getUserTier(usersState, caller);
    switch (SongsLib.getSong(songsState, id)) {
      case (null) { null };
      case (?song) { ?SongsLib.toPublic(song, tier) };
    };
  };
};
