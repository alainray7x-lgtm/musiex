import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import Stripe "mo:caffeineai-stripe/stripe";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import Runtime "mo:core/Runtime";
import SongsLib "lib/songs";
import PlaylistsLib "lib/playlists";
import UsersLib "lib/users";
import SongsApi "mixins/songs-api";
import PlaylistsApi "mixins/playlists-api";
import UsersApi "mixins/users-api";
import PremiumApi "mixins/premium-api";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let songsState = SongsLib.initState();
  let playlistsState = PlaylistsLib.initState();
  let usersState = UsersLib.initState();

  // Seed demo songs on first deploy (idempotent — checks seeded flag)
  SongsLib.seedDemoSongs(songsState);

  include SongsApi(accessControlState, songsState, usersState);
  include PlaylistsApi(accessControlState, playlistsState, usersState);
  include UsersApi(accessControlState, usersState);
  include PremiumApi(accessControlState, usersState);

  // Stripe configuration state
  var stripeConfiguration : ?Stripe.StripeConfiguration = null;

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can configure Stripe");
    };
    stripeConfiguration := ?config;
  };

  public query func isStripeConfigured() : async Bool {
    stripeConfiguration != null;
  };

  public shared ({ caller }) func createCheckoutSession(successUrl : Text, cancelUrl : Text) : async Text {
    let config = switch (stripeConfiguration) {
      case (null) { Runtime.trap("Stripe not configured") };
      case (?c) { c };
    };
    let items : [Stripe.ShoppingItem] = [{
      currency = "usd";
      productName = "Premium Subscription";
      productDescription = "Unlimited access to all songs and lyrics";
      priceInCents = 999;
      quantity = 1;
    }];
    await Stripe.createCheckoutSession(config, caller, items, successUrl, cancelUrl, transform);
  };

  public func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    let config = switch (stripeConfiguration) {
      case (null) { Runtime.trap("Stripe not configured") };
      case (?c) { c };
    };
    await Stripe.getSessionStatus(config, sessionId, transform);
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };
};
