# pnp-inspo

A painting-inspiration gallery for **Paints & Potions** art café.

One QR code, one web page. A customer scans it, picks the piece they're painting, and scrolls
through a magazine-style collection of design ideas for that exact shape.

Live at: <https://tharinduwijayasekara.github.io/pnp-inspo/>

Plain HTML, CSS and JavaScript. No npm, no build step, no server, no database.

---

## How it fits together

```
pnp-inspo/
├── index.html              the whole site - every screen lives in here
├── assets/
│   ├── css/style.css       all styling, including the magazine layout
│   └── js/app.js           the topic list  <-- you edit this one
├── images/
│   ├── bubble_tray/        one folder per topic
│   ├── clean_slate/
│   └── petite_heart/
├── logo/
│   ├── pnp-main-logo.jpg   the original master file
│   └── pnp-logo-web.jpg    the small version the site actually loads
└── README.md
```

There is only ever **one** page. Choosing a topic swaps the screen in place — it does not load a
new URL. See *How the navigation works* below.

---

## Adding a topic

Everything is driven by one object near the top of **`assets/js/app.js`**, called `topics`.
Open that file and you'll find it under the big comment block.

```js
const topics = {

    bubble_tray: {
        title: "Bubble Tray",
        subtitle: "Find something you’d love to paint.",
        images: [
            "05ef8100d41013e2c608bda526802a86.jpg",
            "3551c50915b847944b1e563dc7a2e9f2.jpg"
        ]
    }

};
```

To add a fourth topic:

1. Create the folder — `images/sun_catcher/`
2. Put the photos in it.
3. Add a block to `topics`. **Don't forget the comma after the previous block.**

```js
    petite_heart: {
        ...
    },                          <-- comma goes here

    sun_catcher: {
        title: "Sun Catcher",
        subtitle: "Find something you'd love to paint.",
        images: [
            "sun-01.jpg",
            "sun-02.jpg"
        ]
    }
```

That's it. The card on the front screen and the whole gallery are built automatically.
You never touch `index.html`.

---

## Adding images

Drop the file into the topic's folder:

```
images/
    petite_heart/
        heart-01.jpg
        heart-02.jpg
        heart-03.jpg     <-- new
```

Then add **just the filename** to that topic's `images` list in `app.js`:

```js
    petite_heart: {
        title: "Petite Heart",
        subtitle: "Find something you'd love to paint.",
        images: [
            "heart-01.jpg",
            "heart-02.jpg",
            "heart-03.jpg"      <-- new. No comma, it's the last one.
        ]
    }
```

Rules of thumb:

- Filename only. Not `images/petite_heart/heart-03.jpg` — the folder is already known.
- Every line needs a comma **except the last one**.
- Photos appear in the order you list them. Reorder the lines to reorder the gallery.
- To remove one, delete its line (and tidy the commas). You can leave the actual file on disk;
  if it isn't listed, it isn't shown.
- If a listed file is missing or broken, the site quietly skips it. Nothing else breaks.
- An empty list (`images: []`) is fine — the card still opens and shows a "no ideas yet" note.

### A note on photo size

Keep photos around **800–1200px on the longest edge** and under ~200KB each. Customers are on
phone data in the café. The current photos are 736px wide and 24–169KB, which is a good target.

Photos keep their natural shape in the gallery — portrait, landscape and square all work, and
nothing is cropped. Only the small preview on the front screen is cropped, and that's decoration.

---

## Renaming topics

There are two names and they do different jobs:

| | | |
|---|---|---|
| `bubble_tray` | the **key** | must match the folder name in `images/` exactly |
| `"Bubble Tray"` | the **title** | what customers actually read |

- **To change only what customers see:** edit `title`. Nothing else. The folder stays as it is.
- **To rename the folder too:** rename it in `images/`, then change the key in `app.js` to match.

Keys should be lowercase with underscores, no spaces (`sun_catcher`, not `Sun Catcher`).

---

## How the navigation works

There is one public URL and one HTML file.

- On arrival the customer sees the cover and the topic cards.
- Tapping a card hides the cover and shows that topic's gallery. **No page reload.**
- The address bar picks up a tag like `#bubble_tray`. That's optional polish — it makes
  Back work, makes Refresh reopen the same topic, and makes links shareable.
- "← All Topics" returns to the cover.
- Tapping a photo opens it full screen. Close with the ×, by tapping outside it, or with `Esc`.
  Arrow keys, the on-screen arrows and swiping move between photos.

Your QR code should point at the plain URL with no `#` on the end.

---

## Testing it locally

Double-clicking `index.html` mostly works, but browsers are fussy about local files. The reliable
way needs no installs beyond Python, which most machines already have:

```bash
cd pnp-inspo
python -m http.server 8000
```

Then open <http://localhost:8000/>

**Better still**, run the server from the folder *above* `pnp-inspo`:

```bash
cd ..
python -m http.server 8000
```

and open <http://localhost:8000/pnp-inspo/>

That second one matches exactly how GitHub Pages will serve the site, so it's the one that would
catch a broken path before your customers do.

Press `Ctrl+C` to stop the server.

---

## Publishing to GitHub Pages

1. Push this folder to a GitHub repository named **`pnp-inspo`**.
2. On GitHub, go to **Settings → Pages**.
3. Under *Build and deployment*, set **Source** to **Deploy from a branch**.
4. Choose branch **`main`** and folder **`/ (root)`**. Save.
5. Wait a minute, then visit `https://tharinduwijayasekara.github.io/pnp-inspo/`.

Every path in the site is relative, so it works correctly under `/pnp-inspo/` without any config.

The empty `.nojekyll` file tells GitHub to publish the files exactly as they are. Leave it there.

After any edit: commit, push, wait a minute, then refresh. If you don't see the change, do a hard
refresh (`Ctrl+Shift+R`, or `Cmd+Shift+R` on a Mac).

---

## If you ever replace the logo

`logo/pnp-main-logo.jpg` is the master — a 1.3MB CMYK print file. Browsers can't use that
efficiently, so the site loads `logo/pnp-logo-web.jpg` instead (53KB, sRGB, 1000px wide).

If you swap the master in, regenerate the web copy once:

```bash
python -c "import io;from PIL import Image,ImageCms;im=Image.open('logo/pnp-main-logo.jpg');p=im.info.get('icc_profile');im=ImageCms.profileToProfile(im,ImageCms.ImageCmsProfile(io.BytesIO(p)),ImageCms.createProfile('sRGB'),outputMode='RGB') if p else im.convert('RGB');im=im.resize((1000,round(im.height*1000/im.width)),Image.LANCZOS);c=Image.new('RGB',im.size);c.putdata(list(im.getdata()));c.save('logo/pnp-logo-web.jpg','JPEG',quality=82,optimize=True)"
```

(Needs Pillow: `pip install Pillow`.) If the brand colour changes, update `--plum` and `--cream`
at the top of `assets/css/style.css` to match.
