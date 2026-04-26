module {
  public type UserId = Principal;
  public type SongId = Nat;
  public type PlaylistId = Nat;
  public type Timestamp = Int;

  public type SubscriptionTier = {
    #free;
    #premium;
  };
};
