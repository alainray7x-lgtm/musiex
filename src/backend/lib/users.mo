import Map "mo:core/Map";
import Time "mo:core/Time";
import TypesCommon "../types/common";
import TypesUsers "../types/users";

module {
  public type UsersState = {
    profiles : Map.Map<TypesCommon.UserId, TypesUsers.UserProfile>;
  };

  public func initState() : UsersState {
    {
      profiles = Map.empty<TypesCommon.UserId, TypesUsers.UserProfile>();
    };
  };

  public func getOrCreateProfile(state : UsersState, caller : TypesCommon.UserId, name : Text) : TypesUsers.UserProfile {
    switch (state.profiles.get(caller)) {
      case (?existing) { existing };
      case (null) {
        let profile : TypesUsers.UserProfile = {
          id = caller;
          name;
          tier = #free;
          createdAt = Time.now();
        };
        state.profiles.add(caller, profile);
        profile;
      };
    };
  };

  public func getProfile(state : UsersState, userId : TypesCommon.UserId) : ?TypesUsers.UserProfile {
    state.profiles.get(userId);
  };

  public func saveProfile(state : UsersState, caller : TypesCommon.UserId, name : Text) : TypesUsers.UserProfile {
    switch (state.profiles.get(caller)) {
      case (?existing) {
        let updated : TypesUsers.UserProfile = { existing with name };
        state.profiles.add(caller, updated);
        updated;
      };
      case (null) {
        let profile : TypesUsers.UserProfile = {
          id = caller;
          name;
          tier = #free;
          createdAt = Time.now();
        };
        state.profiles.add(caller, profile);
        profile;
      };
    };
  };

  public func upgradeToPremium(state : UsersState, userId : TypesCommon.UserId) : Bool {
    switch (state.profiles.get(userId)) {
      case (null) { false };
      case (?existing) {
        let updated : TypesUsers.UserProfile = { existing with tier = #premium };
        state.profiles.add(userId, updated);
        true;
      };
    };
  };

  public func getUserTier(state : UsersState, userId : TypesCommon.UserId) : TypesCommon.SubscriptionTier {
    switch (state.profiles.get(userId)) {
      case (null) { #free };
      case (?profile) { profile.tier };
    };
  };
};
