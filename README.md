# analyrics

## About
This node package is for easily retrieving and analyzing song lyrics. Currently the only metric availalbe is frequency of words in a song. However, the end goal is to discover and visualize all sorts of patterns found in music over the years. 


## Getting Started
This package relies on Genius for the lyrics it analyzes, meaning that you'll have to grab a [Genius API Key](https://docs.genius.com/#/getting-started-h1).

Once you have an API key, go to **lib/config_sample.js** and paste the key inside there. Once this is done, rename **config_sample.js** to **config.js**.

Lastly, require the package in your program as such.
```javascript
var analyrics = require("analyrics");
```

## Usage

### Fetch Song (`analyrics.getSong(searchQuery, callback)`)
This returns a song object with lyrics and word frequency (sorted in descending order). Here's an example.

```javascript
analyrics.getSong("Can't Take My Eyes off You", function(song) {
  console.log(song.lyrics);
  console.log(song.frequency);
});
```

This is the output from the function above:

Song lyrics are stored in a single string
```
You're just too good to be true
Can't take my eyes off of you
You'd be like heaven to touch
I wanna hold you so much
At long last love has arrived
And I thank God I'm alive
You're just too good to be true
Can't take my eyes off of you
...
```

Word frequency is stored in an array
```
[ { w: 'baby', c: 7 },
  { w: 'love', c: 4 },
  { w: 'good', c: 3 },
  { w: 'eyes', c: 3 },
  { w: 'true', c: 3 },
  { w: 'feel', c: 2 },
  { w: 'pretty', c: 2 },
  { w: 'long', c: 1 },
           ...       ]
```

### Fetch Billboard Chart (`analyrics.getBillboard(billboardURL, callback)`)
This returns an array of song objects with the following fields: Rank, Title, Artist, Image URL, Spotify URL (if available). Here is an example.

```javascript
analyrics.getBillboard("http://www.billboard.com/charts/hot-100", function(chart) {
  console.log(chart);
});
```

This is the expected output:
```
[ { rank: 1,
    title: 'Closer',
    artist: 'The Chainsmokers Featuring Halsey',
    image: 'http://www.billboard.com/images/pref_images/q56523k8p5q.jpg',
    spotify: 'http://open.spotify.com/track/7BKLCZ1jbUBVqRi2FVlTVw' },
  { rank: 2,
    title: 'Starboy',
    artist: 'The Weeknd Featuring Daft Punk',
    image: 'http://www.billboard.com/images/pref_images/q59123tine7.jpg',
    spotify: 'http://open.spotify.com/track/2IY7eOUDjw2ArKYxKa2jXc' },
  { rank: 3,
    title: 'Heathens',
    artist: 'twenty one pilots',
    image: 'http://www.billboard.com/images/pref_images/q39056czrzc.jpg',
    spotify: 'http://open.spotify.com/track/6i0V12jOa3mr6uu4WYhUBr' },
  ... ]
```


Billboard charts can be pulled from several URLs, here are some that I've tested

| Chart Name    | URL           | 
| ------------- |:-------------:| 
| Hot 100      | http://www.billboard.com/charts/hot-100 | 
| R&B/Hip-Hop  | http://www.billboard.com/charts/r-b-hip-hop-songs |  
| Year End 2015 (Year End charts start from 2006) | http://www.billboard.com/charts/year-end/2015/hot-100-songs | 
| Greatest 100 All Time | http://www.billboard.com/charts/greatest-hot-100-singles |


## Coming Soon
- Sentiment analysis i.e. how postive/negative lyrics are
- Classifiers for things such as slang, themes, material objects
- Uniqueness of lyrics
- Function to fetch lyrics given an album name


## License
[MIT](https://github.com/kokuls/analyrics/blob/master/LICENSE)

