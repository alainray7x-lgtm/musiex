import Common "common";

module {
  public type UserProfile = {
    id : Common.UserId;
    name : Text;
    tier : Common.SubscriptionTier;
    createdAt : Common.Timestamp;
  };
};
