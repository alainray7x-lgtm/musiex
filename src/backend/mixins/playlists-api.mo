import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import TypesPlaylists "../types/playlists";
import TypesCommon "../types/common";
import PlaylistsLib "../lib/playlists";
import UsersLib "../lib/users";

mixin (
  accessControlState : AccessControl.AccessControlState,
  playlistsState : PlaylistsLib.PlaylistsState,
  usersState : UsersLib.UsersState,
) {
  // Create a new playlist (free users limited to 3)
  public shared ({ caller }) func createPlaylist(input : TypesPlaylists.PlaylistInput) : async TypesPlaylists.Playlist {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to create playlists");
    };
    let tier = UsersLib.getUserTier(usersState, caller);
    let count = PlaylistsLib.countUserPlaylists(playlistsState, caller);
    PlaylistsLib.createPlaylist(playlistsState, caller, input, count, tier);
  };

  // Get a single playlist (owner only)
  public query ({ caller }) func getPlaylist(id : TypesCommon.PlaylistId) : async ?TypesPlaylists.Playlist {
    PlaylistsLib.getPlaylist(playlistsState, id, caller);
  };

  // List all playlists belonging to the caller
  public query ({ caller }) func listMyPlaylists() : async [TypesPlaylists.Playlist] {
    PlaylistsLib.listUserPlaylists(playlistsState, caller);
  };

  // Update playlist name/description
  public shared ({ caller }) func updatePlaylist(id : TypesCommon.PlaylistId, input : TypesPlaylists.PlaylistInput) : async ?TypesPlaylists.Playlist {
    PlaylistsLib.updatePlaylist(playlistsState, id, caller, input);
  };

  // Delete a playlist
  public shared ({ caller }) func deletePlaylist(id : TypesCommon.PlaylistId) : async Bool {
    PlaylistsLib.deletePlaylist(playlistsState, id, caller);
  };

  // Add a song to a playlist
  public shared ({ caller }) func addSongToPlaylist(playlistId : TypesCommon.PlaylistId, songId : TypesCommon.SongId) : async ?TypesPlaylists.Playlist {
    PlaylistsLib.addSongToPlaylist(playlistsState, playlistId, songId, caller);
  };

  // Remove a song from a playlist
  public shared ({ caller }) func removeSongFromPlaylist(playlistId : TypesCommon.PlaylistId, songId : TypesCommon.SongId) : async ?TypesPlaylists.Playlist {
    PlaylistsLib.removeSongFromPlaylist(playlistsState, playlistId, songId, caller);
  };
};
