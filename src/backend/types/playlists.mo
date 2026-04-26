import Common "common";

module {
  public type Playlist = {
    id : Common.PlaylistId;
    owner : Common.UserId;
    name : Text;
    description : Text;
    songIds : [Common.SongId];
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type PlaylistInput = {
    name : Text;
    description : Text;
  };
};
