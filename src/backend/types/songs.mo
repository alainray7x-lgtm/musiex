import Common "common";

module {
  public type Song = {
    id : Common.SongId;
    title : Text;
    artist : Text;
    album : Text;
    duration : Nat; // seconds
    coverArtUrl : Text;
    audioUrl : Text;
    lyrics : Text;
    createdAt : Common.Timestamp;
  };

  // Public-facing song without full lyrics (for free users, only teaser)
  public type SongPublic = {
    id : Common.SongId;
    title : Text;
    artist : Text;
    album : Text;
    duration : Nat;
    coverArtUrl : Text;
    audioUrl : Text;
    lyrics : Text; // may be truncated based on caller tier
    createdAt : Common.Timestamp;
  };

  public type SongInput = {
    title : Text;
    artist : Text;
    album : Text;
    duration : Nat;
    coverArtUrl : Text;
    audioUrl : Text;
    lyrics : Text;
  };
};
