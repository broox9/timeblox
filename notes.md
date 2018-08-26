 # Performance Training

## `Network`
__Bandwidth__
[easy to add] what you can shove down the pipe

__Latency__
[the hard part] the physical constraints because of distance, etc
- the fastest fiber connection from NY to SF roundtrip is 48ms for example
- `ping 104.245.32.151` (a location in SF), nowhere near 48ms
- `traceroute 104.245.32.151` shows the hops, which are many which slows things down


__1) DNS Resolution__ (lookup) for an IP
can be 20-100ms depending on where it is
- Browser cache
- OS cache
- Router cache
- ISP dns cache
- Recursive search (very expensive)

[chrome://histograms/DNS](chrome://histograms/DNS)

[chrome://dns](chrome://dns)


__2) TCP Connection__
Start with 1.5 roundtrips.
- Sends SYN Pack to server -> (latency 1)
- <- SYN ACK acknowledgement (latency 2)
- ACK -> acknowledgment of acknowledgment (latency 3)

For any 1 domain most browsers do 6-8 connections once this is established for http 1.1

- TCP slow-start (make sure we’ve go the bandwidth before trying to use it)
- 10x TCP Segments at (14600 bytes / 14Kb) <-
- ACK ->
- <- 20x TCP (20kb)
- 20x ACK -> (or restart to 10 if packet loss: wifi suffers the most packet loss, not mobile)

HTTP2 throttles EVERYTHING down if there is packet loss as opposed to http 1 which would only throttle that one connection.

- Req #2 can reuse the same connection

__3) SSL Negotiation__
2 roundtrips
- ClientHello ->
- <- ServerHello, Certificate, ServerDone
- ClientKeyExchange, etc ->
- <- ChangeCiperSpec Finished -

#4 Request for File
#4b TTFB (Time To First Byte - a result of the DNS/TCP steps)
We can add headers to get server timing for servers, fastly, etc to measure this with RUM, GA etc

Latency Helpers
- CDNs
- “Keep Alive” keeps the TCP connection window open, instead of doing multiple files on 1 connection.
- Proper Caching
    - Memory Cache (Browser), specific to a page
    - Disk Cache, for files on disk
    - _How long is it valid?_
        - `Cache-control:  max-age=31536000 / no-cache` (gives a max age and has preference, needs busting)
            - `No-cache` doesn’t mean not caching, it means you must revalidate (do a check/request to make sure it’s the same)
            - `Must-revalidate` means you don’t revalidate, it means use it if it’s younger than max age
        - `Expires:` provides an expiration date
    - _How do it confirms it’s still fresh?_
        - “Last-Modified”: Date/time
        - “Etag”: version identifier
- Resource Hints
    ```js
    header(‘Link’, /css/path ...)
    ```
    or
    ```html
    <link rel=“preload” … />
    ```
    or
    ```js
    function preload(url) { … create link element with preload, etc)
    ```

    - *DNS-PREFETCH* (does the DNS lookup ahead of time for a page coming next) supported everywhere
    - *DNS-PRECONNECT* (does DNS, TCP, SSL, can use with prefetch also) 
        - Only really benefits for a different domain than the one being used
    - *PRELOAD* gets an asset (web fonts are great for this, JS bundles, CSS bundles, etc). Puts it in memory cache so it must be used on the current page, no next page or iframes. Very high priority.  Good for SPA’s
    - *PREFETCH* is like preload but in disk cache so it’s for the next page. 
    - *(DEPRECATED PRE-RENDER due to abuse)*

----

## `Browser`

### `Render Pipeline`
#### 1) __HTML__
the most important thing. DOM/CSSOM are done in parallel.  Using JS to change something in either re-runs the whole process

- __DOM__ - tree with comments included, in parallel with CSSOM
- __CSSOM__ - (render blocking)
    - Browser will try to be smart about which styles it loads based on media attributes
    - best practice is to load the critical stuff as quickly as possible
- __JS__ - can manipulate DOM/CSSOM, Parser blocking (DOM/CSSOM).  If it arrives first, even if it’s listed later, it will block parsing.
    - (Me) it’s best then to have the critical CSS in the head or local
    - [http://slowfil.es](http://slowfil.es) is a way to test with slow files
    - ASYNC attribute loads in parallel, but doesn’t stop parsing.
    - DEFER just delays all JS execution until the very end

__2) Render Tree__ - Only what gets displayed


__3) Layout__
- Geometry only! But changing something that affects geometry, sometimes even requesting!
- [Will-change](https://developer.mozilla.org/en-US/docs/Web/CSS/will-change) CSS property, the browser will try to put things in it’s own layer, etc to 

__4) Paint__  - colors, etc

__(1-4) => Critical Rendering Path__
- do not try to do the critial css styles on your own!
- usually optimize initial render of what's above the fold and lazy--load the rest

### `Images`

images account for 49% of the downloaded resources on the internet.
- Raster - png, jpg, gif, pixel data
  - __png__ (png-24 more than png-8) is lossless but heavier than jpg.
  - __gif__ just sucks.  It's lossless but with a 256 palette. doesn't compress well. only advantage is animated images.
  - __mp4 video__ can replace gif (in Safari right now)
  - __WebP__ in Blink browsers (Chrome, Opera) uses Brotly Compression
  - [__SQIP__](https://github.com/technopagan/sqip) to blur a low quality image, load it and replace it with the high quality
- Vector - svg, text data, compresses well, doesn't scale for complicated 
images

__Meta Data__ (plenty of meta-data viewers online)
- [http://www.verexif.com/en/index.php](http://www.verexif.com/en/index.php)
- `ImageOptim` is a manual meta-data stripper
- `ImageAlpha` for pngs adjusting the alpha
- `JPEGmini` meant to run on the server
- `SVGO` the SVG Optimizer (example the Priceline)
  - `SVG OMG` by Jake Archibald is a UI on top of that (using service workers of course)

__Decoding Images__
- Image editor encodes and image and browsers have to decode it.  This can take time. Try to keep them as close to the render size as possible
- _Memory Footprint_ - decoded images are stored in memory. Every pixel of an image stores 4 bytes.
>H x W x 4
>
>1300px x 1024px  x 4 bytes => 5.1Mb in memory even though it's a 20kb image.
- _JPEG Decoding Specifically_ - YUV to RGB. (Compressing Chroma (color) bu not Luma (light)). Basically don't adjust the light which is where our eyes process images, but the colors our eyes care less about. 4:4:4 to 4:2:0 is 62.5% - 75% savings
  - IE decied to do GPU decoding twice to save memory
  - Blink Browsers does this with a meta-viewport tag with a width rule
  - Quality Settings are different for everything (Photoshop vs Pixelmator vs CDN's etc)

__Responsive Images__
- let the browser make the choice

density descriptor
```html
<img src="cat.jpg" alt="cat" srcset="cat.jpg, cat-2x.jpg 2x">
```

widths to use.
```html
<img src="cat.jpg" alt="cat" srcset="cat-160.jpg 160w, cat-320.jpg 320w">
```

sizes to used a different points and how wide in viewport units they should be.
```html
<img
  src="cat.jpg" alt="cat"
  srcset="cat-160.jpg 160w, cat-320.jpg 320w"
  sizes="(max-width: 480px) 100vw, (max-width: 900px) 33vw, 254px"
/>
```

- you make the choice

can serve different images, change orientation, put media attributes in etc.
```html
<picture>
  <source type="image/webp" srcset="logo.webp">
  <source type="image/svg+xml" srcset="logo.xml">
  <img src="logo.png" alt="ACME Corp">
</picture>
```

----

## [WebPageTest](https://webpagetest.org)
the dude wrote no docs, but someone wrote a book.  It's super free. Login is nice. but the
[Wiki](https://sites.google.com/a/webpagetest.org/docs/using-webpagetest/scripting)

- Try to test with  an underpowered CPU use `/?throttle_cpu=<Float downmultiplier>` ex. or just use a mid-teir or low powered device (like the Moto G3 or Alcatel 1)

- medianMetric `/?mediaMetric=Start%20Render` to give it the metric you want to use to measure

- Scripting, Request Blocking, Auth, SPOF (Single Point of Failure), Custom Metrics are available

- Site Cost [What does my site cost?](http:///whatdoesmysitecost.com)

__Waterfall View__
- Purple: Latency
- Yellow: Redirects
- Pink: JS execution
- Red: Webfonts
- green line: render

HTTP2 looks more like stepped columns more than HTTP which looks more like a waterfall

__Line Charts__
- Bright Green Line Down: Start Render
- Light Green Line: RUM First Paint
- Pink Line Down: Dom Content Loaded
- Purple Line Down: Onload
- Yellow Line Down: DOM interactive
- Blue Line Down:  Document Complete
- Red: Browser interaction probably blocked
- Green: Interaction probably okay
- CPU Utilization / BandWidth / Browser Main Thread

__FilmStrip__
- create video, change the snapshot frequency

----
## `Chrome DevTools`
- CMD + Option + J - open dev tools
- CMD + P - search
- CMD + Shift + P - search devtool functions
- ex. (fn) local overrides - edit locally (helps in prod) ex. with "font-display" CSS prop.

__Performance Panel__ - (CMD + Shift + E)
- Red Dots: Long Running Tasks
- User Timining [Performance API](https://developer.mozilla.org/en-US/docs/Web/API/Performance/timing)
```js
performance.mark('typeahead')
performance.getEntriesByName('typeahead')
var typeaheadTime = performance.getEntriesByName('typeahead') - performance.mark('navigationStart')
```

- Script Streamer thread - the async/defer loading (which happens in a different thread)
- RequestIdle
- Flame Chart (navs with WASD)

----

## `JS & SPA's`
because the CPU is the bottleneck now not bandwidth

__Andy & Bill's Law__

whatever Andy (Andy groves of Intel), Bill (Bill Gates of Microsoft) takes. No matter how fast a chip we make that we think we will never need the power of, We seem to use it and require it anyway.

(TradeOff) These days we shift a lot of the work to the client. First Load is slower, heavier, and uses more CPU, however you get faster DOM changes and subsequent loads

### The Main Thread
The browser tries to offload to other threads to do work, like the `Script Streamer` thread or using `Web Worker` threads.  The event loop coordinates all of this.

```js
// Event Loop - stack, event table, event queue. Empting a queue is one `tick`
const first = () => {
/** adds console.log to the event table.  it gets added tot he event queue after 0ms which will run once the current call stack is done */
    setTimeout(() => {
        console.log('Priceline')
    }, 0) 
}

const second = () => console.log('Negotiator')
// requestIdleCallback() just goes to the event queue, it doesn't wait in the table
second()
```

- `Scheduling` - the Event Loop also schedules style changes, flow reCalc, paint & paint for animation and pulls this onto the main thread.

- `Tasks` (anything from the event queue, like a setTimeout, setInterval, user input, etc) get pulled on to the main thread too.  [Long tasks](https://w3c.github.io/longtasks/) >= 50ms on the main thread

- Jank vs. [`requestAnimationFrame()`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) - gives us more control over the tasks scheduling when doing animation.  the browser has to paint something every frame. It requests something to happen at the start of the next animation frame. /* Do this on the next frame before doing other stuff */. Long running tasks can still push this our.

```js
/* only changes to orange because this task must complete
before moving on and repainting.
*/
button.addEventListener('click', () => {
    item.style.color = 'red';
    item.style.color = 'blue';
    item.style.color = 'green';
    item.style.color = 'orange';
})
```

*but this does cause style recalculation with `getOffsetHeight` because it must be accurate and get that work now before the loop finishes*
```js
button.addEventListener('click', (e) => {
    e.target.classList.add('active')
    e.target.getOffsetHeight()
});
```

*batch writes before the work must need to be done for perf.*
```js
button.addEventListener('click', () => {
    item.style.width = '500px';
    item.style.margin = '10px';
})
```

### `The Virtual DOM`
☝️ tries to intelligently batch/schedule all the changes like above 

- Avoid Reconciliation as much as possible. When you change 1 thing, React will try to figure out the fallout of that change.  This *can* be expensive. React Fiber (^16.0.0) prioritizes tasks ahd makes smark assumptions.

- React DevTools is good at showing what is updating.

__React Assumptions__
- changing an element type discards it's children
- Unique keys can be used to hint when nodes are the same
    - if a component is updated, React assumes all its descendants need to be updated too, so it doesn't reconcile, it just does it.
    -if a component does not need to be updated, it continues crawling the children
- PureComponents - shallow props/state comparison