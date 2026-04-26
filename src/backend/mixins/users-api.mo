import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import TypesUsers "../types/users";
import TypesCommon "../types/common";
import UsersLib "../lib/users";

mixin (
  accessControlState : AccessControl.AccessControlState,
  usersState : UsersLib.UsersState,
) {
  // Get caller's profile (null if not yet created)
  public query ({ caller }) func getCallerUserProfile() : async ?TypesUsers.UserProfile {
    UsersLib.getProfile(usersState, caller);
  };

  // Create or update caller's profile
  public shared ({ caller }) func saveCallerUserProfile(name : Text) : async TypesUsers.UserProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to save profile");
    };
    UsersLib.saveProfile(usersState, caller, name);
  };

  // Get any user's profile (admins can view all; users can only view their own)
  public query ({ caller }) func getUserProfile(user : TypesCommon.UserId) : async ?TypesUsers.UserProfile {
    if (not caller.equal(user) and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    UsersLib.getProfile(usersState, user);
  };

  // Upgrade caller's subscription tier to premium
  public shared ({ caller }) func upgradeUserTier() : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to upgrade");
    };
    UsersLib.upgradeToPremium(usersState, caller);
  };

  // Get current caller's subscription tier
  public query ({ caller }) func getUserTier() : async TypesCommon.SubscriptionTier {
    UsersLib.getUserTier(usersState, caller);
  };
};
