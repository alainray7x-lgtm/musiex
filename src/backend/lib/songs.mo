import Map "mo:core/Map";
import Time "mo:core/Time";
import Text "mo:core/Text";
import TypesCommon "../types/common";
import TypesSongs "../types/songs";

module {
  public type SongsState = {
    songs : Map.Map<TypesCommon.SongId, TypesSongs.Song>;
    var nextId : TypesCommon.SongId;
    var seeded : Bool;
  };

  public func initState() : SongsState {
    {
      songs = Map.empty<TypesCommon.SongId, TypesSongs.Song>();
      var nextId = 1;
      var seeded = false;
    };
  };

  public func seedDemoSongs(state : SongsState) : () {
    if (state.seeded) return;
    state.seeded := true;

    let demoSongs : [TypesSongs.SongInput] = [
     {
  title = "Shape of You";
  artist = "Ed Sheeran";
  album = "÷ (Divide)";
  duration = 233;
  coverArtUrl = "https://upload.wikimedia.org/wikipedia/en/4/45/Divide_cover.png";
  audioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3";
  lyrics = "The club isn't the best place to find a lover\nSo the bar is where I go\nMe and my friends at the table doing shots\nDrinking fast and then we talk slow...";
},
{
  title = "Blinding Lights";
  artist = "The Weeknd";
  album = "After Hours";
  duration = 200;
  coverArtUrl = "https://upload.wikimedia.org/wikipedia/en/c/c1/The_Weeknd_-_Blinding_Lights.png";
  audioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3";
  lyrics = "I been tryna call\nI've been on my own for long enough\nMaybe you can show me how to love, maybe...";
},
{
  title = "Rolling in the Deep";
  artist = "Adele";
  album = "21";
  duration = 228;
  coverArtUrl = "https://upload.wikimedia.org/wikipedia/en/1/1b/Adele_-_21.png";
  audioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3";
  lyrics = "There's a fire starting in my heart\nReaching a fever pitch and it's bringing me out the dark...";
},
{
  title = "Someone Like You";
  artist = "Adele";
  album = "21";
  duration = 285;
  coverArtUrl = "https://upload.wikimedia.org/wikipedia/en/1/1b/Adele_-_21.png";
  audioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3";
  lyrics = "I heard that you're settled down\nThat you found a girl and you're married now...";
},
{
  title = "Counting Stars";
  artist = "OneRepublic";
  album = "Native";
  duration = 257;
  coverArtUrl = "https://upload.wikimedia.org/wikipedia/en/7/7a/OneRepublic_Native.png";
  audioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3";
  lyrics = "Lately, I've been, I've been losing sleep\nDreaming about the things that we could be...";
},
{
  title = "Havana";
  artist = "Camila Cabello";
  album = "Camila";
  duration = 217;
  coverArtUrl = "https://upload.wikimedia.org/wikipedia/en/9/97/Camila_Cabello_-_Camila.png";
  audioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3";
  lyrics = "Havana, ooh na-na\nHalf of my heart is in Havana, ooh na-na...";
},
{
  title = "Perfect";
  artist = "Ed Sheeran";
  album = "÷ (Divide)";
  duration = 263;
  coverArtUrl = "https://upload.wikimedia.org/wikipedia/en/4/45/Divide_cover.png";
  audioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3";
  lyrics = "I found a love for me\nDarling, just dive right in and follow my lead...";
},
{
  title = "Lose Yourself";
  artist = "Eminem";
  album = "Curtain Call: The Hits";
  duration = 326;
  coverArtUrl = "https://upload.wikimedia.org/wikipedia/en/6/69/Eminem_-_Curtain_Call_The_Hits.jpg";
  audioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3";
  lyrics = "Look, if you had one shot, or one opportunity\nTo seize everything you ever wanted...";
},
{
  title = "Uptown Funk";
  artist = "Mark Ronson ft. Bruno Mars";
  album = "Uptown Special";
  duration = 269;
  coverArtUrl = "https://upload.wikimedia.org/wikipedia/en/a/a6/Mark_Ronson_-_Uptown_Special.png";
  audioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3";
  lyrics = "This hit, that ice cold\nMichelle Pfeiffer, that white gold...";
},
{
  title = "Let Her Go";
  artist = "Passenger";
  album = "All the Little Lights";
  duration = 252;
  coverArtUrl = "https://upload.wikimedia.org/wikipedia/en/5/5e/PassengerAllTheLittleLights.jpg";
  audioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-18.mp3";
  lyrics = "Well you only need the light when it's burning low\nOnly miss the sun when it starts to snow...";
}
      {
        title = "Bohemian Rhapsody";
        artist = "Queen";
        album = "A Night at the Opera";
        duration = 354;
        coverArtUrl = "https://upload.wikimedia.org/wikipedia/en/9/9f/Bohemian_Rhapsody.png";
        audioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
        lyrics = "Is this the real life?\nIs this just fantasy?\nCaught in a landslide\nNo escape from reality\nOpen your eyes\nLook up to the skies and see\nI'm just a poor boy, I need no sympathy\nBecause it's easy come, easy go\nLittle high, little low\nAnyway the wind blows doesn't really matter to me, to me\n\nMama, just killed a man\nPut a gun against his head\nPulled my trigger, now he's dead\nMama, life had just begun\nBut now I've gone and thrown it all away\nMama, ooh\nDidn't mean to make you cry\nIf I'm not back again this time tomorrow\nCarry on, carry on as if nothing really matters\n\nToo late, my time has come\nSends shivers down my spine\nBody's aching all the time\nGoodbye, everybody I've got to go\nGotta leave you all behind and face the truth\nMama, ooh (anyway the wind blows)\nI don't want to die\nI sometimes wish I'd never been born at all";
      },
      {
        title = "Hotel California";
        artist = "Eagles";
        album = "Hotel California";
        duration = 391;
        coverArtUrl = "https://upload.wikimedia.org/wikipedia/en/4/49/Hotelcalifornia.jpg";
        audioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3";
        lyrics = "On a dark desert highway\nCool wind in my hair\nWarm smell of colitas\nRising up through the air\nUp ahead in the distance\nI saw a shimmering light\nMy head grew heavy and my sight grew dim\nI had to stop for the night\n\nThere she stood in the doorway\nI heard the mission bell\nAnd I was thinking to myself\nThis could be heaven or this could be hell\nThen she lit up a candle\nAnd she showed me the way\nThere were voices down the corridor\nI thought I heard them say\n\nWelcome to the Hotel California\nSuch a lovely place (such a lovely place)\nSuch a lovely face\nPlenty of room at the Hotel California\nAny time of year (any time of year)\nYou can find it here\n\nLast thing I remember\nI was running for the door\nI had to find the passage back\nTo the place I was before\nRelax said the night man\nWe are programmed to receive\nYou can check out any time you like\nBut you can never leave";
      },
      {
        title = "Imagine";
        artist = "John Lennon";
        album = "Imagine";
        duration = 187;
        coverArtUrl = "https://upload.wikimedia.org/wikipedia/en/6/6b/John_Lennon_-_Imagine_John_Lennon.jpg";
        audioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3";
        lyrics = "Imagine there's no heaven\nIt's easy if you try\nNo hell below us\nAbove us only sky\nImagine all the people\nLivin' for today\n\nImagine there's no countries\nIt isn't hard to do\nNothing to kill or die for\nAnd no religion too\nImagine all the people\nLivin' life in peace\n\nYou may say I'm a dreamer\nBut I'm not the only one\nI hope someday you'll join us\nAnd the world will be as one\n\nImagine no possessions\nI wonder if you can\nNo need for greed or hunger\nA brotherhood of man\nImagine all the people\nSharing all the world\n\nYou may say I'm a dreamer\nBut I'm not the only one\nI hope someday you'll join us\nAnd the world will live as one";
      },
      {
        title = "Billie Jean";
        artist = "Michael Jackson";
        album = "Thriller";
        duration = 294;
        coverArtUrl = "https://upload.wikimedia.org/wikipedia/en/5/55/Michael_Jackson_-_Thriller.png";
        audioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3";
        lyrics = "She was more like a beauty queen from a movie scene\nI said don't mind, but what do you mean I am the one\nWho will dance on the floor in the round\nShe said I am the one who will dance on the floor in the round\n\nShe told me her name was Billie Jean as she caused a scene\nThen every head turned with eyes that dreamed of being the one\nWho will dance on the floor in the round\n\nBillie Jean is not my lover\nShe's just a girl who claims that I am the one\nBut the kid is not my son\nShe says I am the one\nBut the kid is not my son\n\nFor forty days and for forty nights\nLaw was on her side\nBut who can stand when she's in demand\nHer schemes and plans\nCause we danced on the floor in the round\n\nSo take my strong advice\nJust remember to always think twice\nDo think twice\n\nBillie Jean is not my lover\nShe's just a girl who claims that I am the one\nBut the kid is not my son";
      },
      {
        title = "Smells Like Teen Spirit";
        artist = "Nirvana";
        album = "Nevermind";
        duration = 301;
        coverArtUrl = "https://upload.wikimedia.org/wikipedia/en/b/b7/NirvanaNevermindalbumcover.jpg";
        audioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3";
        lyrics = "Load up on guns, bring your friends\nIt's fun to lose and to pretend\nShe's over-bored and self-assured\nOh no, I know a dirty word\n\nHello, hello, hello, how low\nHello, hello, hello, how low\nHello, hello, hello, how low\nHello, hello, hello\n\nWith the lights out, it's less dangerous\nHere we are now, entertain us\nI feel stupid and contagious\nHere we are now, entertain us\nA mulatto, an albino\nA mosquito, my libido\nYeah, hey, yay\n\nI'm worse at what I do best\nAnd for this gift I feel blessed\nOur little group has always been\nAnd always will until the end\n\nWith the lights out, it's less dangerous\nHere we are now, entertain us\nI feel stupid and contagious\nHere we are now, entertain us\nA mulatto, an albino\nA mosquito, my libido\nYeah, hey, yay";
      },
      {
        title = "Yesterday";
        artist = "The Beatles";
        album = "Help!";
        duration = 125;
        coverArtUrl = "https://upload.wikimedia.org/wikipedia/en/e/e4/The_Beatles_-_Help%21_%28album%29.jpg";
        audioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3";
        lyrics = "Yesterday\nAll my troubles seemed so far away\nNow it looks as though they're here to stay\nOh, I believe in yesterday\n\nSuddenly\nI'm not half the man I used to be\nThere's a shadow hanging over me\nOh, yesterday came suddenly\n\nWhy she had to go\nI don't know, she wouldn't say\nI said something wrong\nNow I long for yesterday\n\nYesterday\nLove was such an easy game to play\nNow I need a place to hide away\nOh, I believe in yesterday\n\nWhy she had to go\nI don't know, she wouldn't say\nI said something wrong\nNow I long for yesterday\n\nYesterday\nLove was such an easy game to play\nNow I need a place to hide away\nOh, I believe in yesterday\nMm mm mm mm mm";
      },
      {
        title = "Stairway to Heaven";
        artist = "Led Zeppelin";
        album = "Led Zeppelin IV";
        duration = 482;
        coverArtUrl = "https://upload.wikimedia.org/wikipedia/en/2/26/Led_Zeppelin_-_Led_Zeppelin_IV.jpg";
        audioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3";
        lyrics = "There's a lady who's sure all that glitters is gold\nAnd she's buying a stairway to heaven\nWhen she gets there she knows, if the stores are all closed\nWith a word she can get what she came for\nOoh, ooh, and she's buying a stairway to heaven\n\nThere's a sign on the wall but she wants to be sure\nCause you know sometimes words have two meanings\nIn a tree by the brook there's a songbird who sings\nSometimes all of our thoughts are misgiven\n\nOoh, it makes me wonder\nOoh, it makes me wonder\n\nAnd it's whispered that soon, if we all call the tune\nThen the piper will lead us to reason\nAnd a new day will dawn for those who stand long\nAnd the forests will echo with laughter\n\nAnd as we wind on down the road\nOur shadows taller than our soul\nThere walks a lady we all know\nWho shines white light and wants to show\nHow everything still turns to gold\nAnd if you listen very hard\nThe tune will come to you at last\nWhen all are one and one is all\nTo be a rock and not to roll";
      },
      {
        title = "What's Going On";
        artist = "Marvin Gaye";
        album = "What's Going On";
        duration = 235;
        coverArtUrl = "https://upload.wikimedia.org/wikipedia/en/3/39/MarvinGayeWhat%27sGoingOnalbumcover.jpg";
        audioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3";
        lyrics = "Mother, mother\nThere's too many of you crying\nBrother, brother, brother\nThere's far too many of you dying\nYou know we've got to find a way\nTo bring some lovin' here today\n\nFather, father\nWe don't need to escalate\nYou see, war is not the answer\nFor only love can conquer hate\nYou know we've got to find a way\nTo bring some lovin' here today\n\nPicket lines and picket signs\nDon't punish me with brutality\nTalk to me\nSo you can see\nOh, what's going on\nWhat's going on\nYeah, what's going on\nAh, what's going on\n\nIn the mean time\nRight on, baby\nRight on\nRight on\n\nFather, father, everybody thinks we're wrong\nOh, but who are they to judge us\nSimply because our hair is long\nOh, you know we've got to find a way\nTo bring some understanding here today";
      },
    ];

    for (input in demoSongs.vals()) {
      ignore addSong(state, input);
    };
  };

  public func addSong(state : SongsState, input : TypesSongs.SongInput) : TypesSongs.Song {
    let id = state.nextId;
    state.nextId := state.nextId + 1;
    let song : TypesSongs.Song = {
      id;
      title = input.title;
      artist = input.artist;
      album = input.album;
      duration = input.duration;
      coverArtUrl = input.coverArtUrl;
      audioUrl = input.audioUrl;
      lyrics = input.lyrics;
      createdAt = Time.now();
    };
    state.songs.add(id, song);
    song;
  };

  public func editSong(state : SongsState, id : TypesCommon.SongId, input : TypesSongs.SongInput) : ?TypesSongs.Song {
    switch (state.songs.get(id)) {
      case (null) { null };
      case (?existing) {
        let updated : TypesSongs.Song = {
          existing with
          title = input.title;
          artist = input.artist;
          album = input.album;
          duration = input.duration;
          coverArtUrl = input.coverArtUrl;
          audioUrl = input.audioUrl;
          lyrics = input.lyrics;
        };
        state.songs.add(id, updated);
        ?updated;
      };
    };
  };

  public func deleteSong(state : SongsState, id : TypesCommon.SongId) : Bool {
    switch (state.songs.get(id)) {
      case (null) { false };
      case (?_) {
        state.songs.remove(id);
        true;
      };
    };
  };

  public func getSong(state : SongsState, id : TypesCommon.SongId) : ?TypesSongs.Song {
    state.songs.get(id);
  };

  public func listSongs(state : SongsState) : [TypesSongs.Song] {
    state.songs.values().toArray();
  };

  public func searchSongs(state : SongsState, searchTerm : Text) : [TypesSongs.Song] {
    let lower = searchTerm.toLower();
    state.songs.values().filter(func(s) {
      s.title.toLower().contains(#text lower) or
      s.artist.toLower().contains(#text lower) or
      s.album.toLower().contains(#text lower)
    }).toArray();
  };

  public func toPublic(song : TypesSongs.Song, tier : TypesCommon.SubscriptionTier) : TypesSongs.SongPublic {
    let lyrics = switch (tier) {
      case (#premium) { song.lyrics };
      case (#free) {
        let full = song.lyrics;
        if (full.size() > 100) {
          Text.fromIter(full.toIter().take(100)) # "...";
        } else {
          full;
        };
      };
    };
    { song with lyrics };
  };
};
