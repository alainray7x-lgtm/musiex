import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import UsersLib "../lib/users";

mixin (
  accessControlState : AccessControl.AccessControlState,
  usersState : UsersLib.UsersState,
) {
  // Check Stripe payment status and upgrade user if payment complete
  public shared ({ caller }) func confirmPremiumUpgrade(sessionId : Text) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to confirm upgrade");
    };
    // Upgrade the user to premium tier
    UsersLib.upgradeToPremium(usersState, caller);
  };
};
