/* =====================================================================
   PAINTS & POTIONS - Painting Inspiration
   assets/js/app.js

   >>> THE ONLY PART YOU NORMALLY NEED TO EDIT IS THE `topics` OBJECT
   >>> DIRECTLY BELOW. Everything under "THE ENGINE" runs the site and
   >>> can be left alone.
   ===================================================================== */


/* ---------------------------------------------------------------------
   HOW THIS WORKS

   Each KEY in `topics` is the name of a folder inside images/.
   So the key `bubble_tray` means the photos live in:

       images/bubble_tray/

   The site builds everything - the topic cards on the front screen and
   the gallery itself - from this one object. You never edit index.html.

   ---------------------------------------------------------------------
   HOW TO ADD A NEW TOPIC

   1. Make the folder:            images/sun_catcher/
   2. Drop your photos into it.
   3. Add a block here. Mind the comma after the previous block:

          sun_catcher: {
              title: "Sun Catcher",
              subtitle: "✨ Find something that inspires you. ✨",
              images: [
                  "sun-01.jpg",
                  "sun-02.jpg"
              ]
          }

   There is no limit - add a 4th, 5th, 10th topic the same way.

   ---------------------------------------------------------------------
   HOW TO RENAME A TOPIC

   There are two separate names, and they do different jobs:

       bubble_tray   <- the KEY. Must match the folder name exactly.
       "Bubble Tray" <- the TITLE. What customers actually read.

   * To change only what customers see, edit `title`. Nothing else.
   * To change the folder name too, rename the folder in images/ AND
     change the key here so the two still match.

   Keys should be lowercase with underscores and no spaces.

   ---------------------------------------------------------------------
   HOW TO CHANGE THE TITLE          edit `title`
   HOW TO CHANGE THE SUBTITLE       edit `subtitle`

   The subtitle shows under the topic name at the top of its gallery.
   Each topic can have a different one.

   ---------------------------------------------------------------------
   HOW TO ADD IMAGES

   1. Copy the file into that topic's folder, e.g.
          images/petite_heart/my-new-idea.jpg
   2. Add the FILENAME ONLY to that topic's `images` list:
          "my-new-idea.jpg"
   3. Every line needs a comma after it EXCEPT the last one.

   Do not write "images/petite_heart/my-new-idea.jpg" here - just the
   filename. The folder is already known from the key.

   The photos appear in the order you list them. Reorder the lines to
   reorder the gallery.

   ---------------------------------------------------------------------
   HOW TO REMOVE IMAGES

   Delete its line from the `images` list (and tidy up the commas).
   You can delete the actual file too, but you do not have to - if it
   is not listed here, it will not be shown.

   If a listed file is missing or broken, the site quietly skips it.
   Nothing else on the page breaks.

   ---------------------------------------------------------------------
   AN EMPTY TOPIC IS FINE

   images: []

   The card still appears and opens; customers see a tasteful
   "no ideas yet" note instead of an error.
   --------------------------------------------------------------------- */

const topics = {

    // ---------- images/bubble_tray/   (10 images) ----------
    bubble_tray: {
        title: "Bubble Tray",
        subtitle: "✨ Find something that inspires you. ✨",
        images: [
            "05ef8100d41013e2c608bda526802a86.jpg",
            "3551c50915b847944b1e563dc7a2e9f2.jpg",
            "37a19ea7f5cf8ebdacb29317187a6721.jpg",
            "7238795fbd0a9c98c1cb9304065abd00.jpg",
            "7e087b5f4511093619e854c28ce5164e.jpg",
            "94a5fc1623a3ce51bfa68369a99c3ff0.jpg",
            "b4a64f498f6b951455cb6baed27efbc7.jpg",
            "c6bbc91dd0029d3d0a511ace244719b8.jpg",
            "cbd5cc3b568bae7a76648f987d13c75f.jpg",
            "d6c62ae65a28282a1b6be0267b9f21f9.jpg"
        ]
    },

    // ---------- images/clean_slate/   (9 images) ----------
    clean_slate: {
        title: "Clean Slate",
        subtitle: "✨ Find something that inspires you. ✨",
        images: [
            "0be34dc94f1a86920af3da79a647abac.jpg",
            "494348d1d4193e56fc84de5551332672.jpg",
            "8750d0b170d3cdaedc5c8571b04cc44d.jpg",
            "ac9a4102a8ca311c5264fc0ae90d6b40.jpg",
            "d74ab26da09c90b8df470d0bd8096bbc.jpg",
            "e385e1ad77fc869746e2e77301b1907a.jpg",
            "ea7112ff6cf9d4f9ca459a86e237c5d8.jpg",
            "ed853370651d71673e6cbd5e9610f9bd.jpg",
            "f79129e330ccc7e19ab8dceb35c59094.jpg"
        ]
    },

    // ---------- images/petite_heart/   (6 images) ----------
    petite_heart: {
        title: "Petite Heart",
        subtitle: "✨ Find something that inspires you. ✨",
        images: [
            "08f9c7817aa7201b89baa12c12145abf.jpg",
            "32b6ede6b65cc222f5c8595d227d3228.jpg",
            "87fa5995a94a45e45366d00203be1b97.jpg",
            "aa3f782be8b55ff4ef72fe17d1836168.jpg",
            "bb2f9dd8f3f25fb4ddb301a17667a2b8.jpg",
            "d0efcff77b8535e972ae47346a77af0d.jpg"
        ]
    }

};


/* =====================================================================
   THE ENGINE
   You should not need to change anything below this line.
   ===================================================================== */

(function () {
    "use strict";

    /* Short editorial lines dropped between photos so a long gallery
       reads like a magazine rather than a grid. Edit freely. */
    var INTERLUDES = [
        "Six colours and a steady hand is usually plenty."
    ];
    var INTERLUDE_EVERY = 7;   /* drop a line in after every 7th photo */

    var BASE_TITLE = document.title;

    /* ---- elements ----------------------------------------------- */
    var screenTopics  = document.getElementById("screen-topics");
    var screenGallery = document.getElementById("screen-gallery");
    var topicList     = document.getElementById("topic-list");
    var gallery       = document.getElementById("gallery");
    var galTitle      = document.getElementById("gallery-title");
    var galSub        = document.getElementById("gallery-sub");
    var galKicker     = document.getElementById("gallery-kicker");
    var barTitle      = document.getElementById("topbar-title");

    var lb      = document.getElementById("lightbox");
    var lbImg   = document.getElementById("lb-img");
    var lbCount = document.getElementById("lb-count");
    var lbClose = document.getElementById("lb-close");
    var lbPrev  = document.getElementById("lb-prev");
    var lbNext  = document.getElementById("lb-next");

    /* ---- helpers ------------------------------------------------ */

    /* Relative on purpose: works at / and at /pnp-inspo/ alike. */
    function imagePath(key, file) {
        return "images/" + key + "/" + file;
    }

    function pad2(n) {
        return (n < 10 ? "0" : "") + n;
    }

    function countLabel(n) {
        if (n === 0) { return "Coming soon"; }
        return n + (n === 1 ? " idea" : " ideas");
    }


    /* =================================================================
       SCREEN 1 - the topic cards, built from `topics`
       ================================================================= */
    function buildTopicCards() {
        topicList.textContent = "";

        Object.keys(topics).forEach(function (key, i) {
            var topic = topics[key];
            var count = (topic.images || []).length;

            var card = document.createElement("button");
            card.type = "button";
            card.className = "card";
            card.setAttribute("data-topic", key);

            var media = document.createElement("span");
            media.className = "card__media";

            if (count > 0) {
                /* Cropping IS wanted here - the preview is decoration.
                   Inside the gallery, photos keep their true shape. */
                var img = document.createElement("img");
                img.alt = "";
                img.setAttribute("aria-hidden", "true");
                img.loading = "lazy";
                img.decoding = "async";
                img.addEventListener("load", function () {
                    img.classList.add("is-loaded");
                });
                /* A broken preview must not leave a broken-image icon. */
                img.addEventListener("error", function () {
                    if (img.parentNode) { img.parentNode.removeChild(img); }
                    media.classList.add("card__media--blank");
                });
                /* src goes on last, so the listeners above cannot be
                   missed by an image that is already cached. */
                img.src = imagePath(key, topic.images[0]);
                if (img.complete && img.naturalWidth) { img.classList.add("is-loaded"); }
                media.appendChild(img);
            } else {
                media.classList.add("card__media--blank");
            }

            var kicker = document.createElement("span");
            kicker.className = "card__kicker";
            kicker.textContent = "No. " + pad2(i + 1);

            var name = document.createElement("span");
            name.className = "card__name";
            name.textContent = topic.title || key;

            var cnt = document.createElement("span");
            cnt.className = "card__count";
            cnt.textContent = countLabel(count);

            var label = document.createElement("span");
            label.className = "card__label";
            label.appendChild(kicker);
            label.appendChild(name);
            label.appendChild(cnt);

            card.appendChild(media);
            card.appendChild(label);
            topicList.appendChild(card);
        });
    }


    /* =================================================================
       SCREEN 2 - the gallery
       JS only emits a flat list of <figure>s. All of the magazine
       arrangement happens in style.css.
       ================================================================= */
    function buildGallery(key) {
        var topic = topics[key];
        var files = topic.images || [];

        gallery.textContent = "";

        if (files.length === 0) {
            gallery.appendChild(emptyState());
            return;
        }

        files.forEach(function (file, i) {
            var fig = document.createElement("figure");
            fig.className = "shot";

            var btn = document.createElement("button");
            btn.type = "button";
            btn.className = "shot__btn";

            var img = document.createElement("img");
            img.alt = topic.title + " painting idea " + (i + 1) + " of " + files.length;
            /* The first couple are above the fold; the rest wait. */
            img.loading = i < 2 ? "eager" : "lazy";
            img.decoding = "async";

            img.addEventListener("load", function () {
                img.classList.add("is-loaded");
            });

            /* A missing file drops just its own figure, nothing else. */
            img.addEventListener("error", function () {
                if (fig.parentNode) { fig.parentNode.removeChild(fig); }
                if (!gallery.querySelector("figure.shot")) {
                    gallery.textContent = "";
                    gallery.appendChild(emptyState());
                }
            });

            /* src goes on last, so the listeners above cannot be
               missed by an image that is already cached. */
            img.src = imagePath(key, file);
            if (img.complete && img.naturalWidth) { img.classList.add("is-loaded"); }

            btn.appendChild(img);
            fig.appendChild(btn);
            gallery.appendChild(fig);

            /* an editorial breather every so often, but never at the end */
            var isBreak = (i + 1) % INTERLUDE_EVERY === 0 && i + 1 < files.length;
            if (isBreak) {
                var line = document.createElement("p");
                line.className = "interlude";
                line.textContent =
                    INTERLUDES[Math.floor(i / INTERLUDE_EVERY) % INTERLUDES.length];
                gallery.appendChild(line);
            }
        });
    }

    function emptyState() {
        var box = document.createElement("div");
        box.className = "empty";

        var rule = document.createElement("p");
        rule.className = "divider";
        rule.setAttribute("aria-hidden", "true");
        rule.appendChild(document.createElement("i"));

        var title = document.createElement("p");
        title.className = "empty__title";
        title.textContent = "No ideas here yet";

        var text = document.createElement("p");
        text.className = "empty__text";
        text.textContent = "We are still painting this one. Ask at the counter, or try another piece.";

        box.appendChild(rule);
        box.appendChild(title);
        box.appendChild(text);
        return box;
    }


    /* =================================================================
       NAVIGATION - the URL hash is the single source of truth.
       Gives working browser-back, refresh and shareable links,
       without ever leaving index.html.
       ================================================================= */
    var cameFromCover = false;

    function showCover() {
        cameFromCover = false;
        closeLightbox(true);
        screenGallery.hidden = true;
        screenTopics.hidden = false;
        document.title = BASE_TITLE;
    }

    function showTopic(key) {
        var topic = topics[key];

        closeLightbox(true);

        galTitle.textContent  = topic.title || key;
        galSub.textContent    = topic.subtitle || "";
        barTitle.textContent  = topic.title || key;
        galKicker.textContent = countLabel((topic.images || []).length);

        buildGallery(key);

        screenTopics.hidden = true;
        screenGallery.hidden = false;
        document.title = (topic.title || key) + " - " + BASE_TITLE;

        window.scrollTo(0, 0);
        galTitle.focus({ preventScroll: true });
    }

    function route() {
        var key = decodeURIComponent(location.hash.replace(/^#/, ""));
        /* unknown or empty hash just falls back to the cover */
        if (key && Object.prototype.hasOwnProperty.call(topics, key)) {
            showTopic(key);
        } else {
            showCover();
        }
    }

    topicList.addEventListener("click", function (e) {
        var card = e.target.closest(".card");
        if (!card) { return; }
        cameFromCover = true;
        location.hash = "#" + card.getAttribute("data-topic");
    });

    /* every "All Topics" button, header and footer alike */
    document.addEventListener("click", function (e) {
        var back = e.target.closest("[data-back]");
        if (!back) { return; }
        if (cameFromCover) {
            cameFromCover = false;
            history.back();            /* keeps the history tidy */
        } else {
            /* landed straight on a #topic link - just drop the hash */
            history.replaceState(null, "", location.pathname + location.search);
            route();
        }
    });

    window.addEventListener("hashchange", route);


    /* =================================================================
       LIGHTBOX
       ================================================================= */
    var lbItems = [];
    var lbIndex = 0;
    var lbOpen = false;
    var lastFocused = null;
    var savedScrollY = 0;

    gallery.addEventListener("click", function (e) {
        var btn = e.target.closest(".shot__btn");
        if (!btn) { return; }

        var fig = btn.closest("figure.shot");
        var shots = Array.prototype.slice.call(gallery.querySelectorAll("figure.shot"));

        /* Read the live figures, so any that failed and were removed
           can never throw the numbering off. */
        lbItems = shots.map(function (f) {
            var im = f.querySelector("img");
            return { src: im.getAttribute("src"), alt: im.getAttribute("alt") };
        });
        openLightbox(shots.indexOf(fig), btn);
    });

    function openLightbox(index, trigger) {
        if (index < 0 || !lbItems.length) { return; }

        lastFocused = trigger || null;
        lbOpen = true;
        lb.hidden = false;

        /* Lock the page behind the overlay. Pinning the body is the one
           approach that also holds on iOS Safari. */
        savedScrollY = window.scrollY || window.pageYOffset || 0;
        document.body.style.position = "fixed";
        document.body.style.top = "-" + savedScrollY + "px";
        document.body.style.left = "0";
        document.body.style.right = "0";
        document.body.classList.add("is-locked");

        var solo = lbItems.length < 2;
        lbPrev.hidden = solo;
        lbNext.hidden = solo;

        setLightbox(index);
        lbClose.focus();
    }

    function setLightbox(index) {
        /* wrap around at both ends */
        lbIndex = (index + lbItems.length) % lbItems.length;
        var item = lbItems[lbIndex];

        lbImg.classList.remove("is-loaded");
        /* forcing a reflow here lets the fade-in animation replay when
           stepping from one photo to the next */
        void lbImg.offsetWidth;
        lbImg.src = item.src;
        lbImg.alt = item.alt;
        lbCount.textContent = (lbIndex + 1) + " / " + lbItems.length;

        /* already in cache? then no load event is coming */
        if (lbImg.complete) { lbImg.classList.add("is-loaded"); }

        /* make next/prev feel instant */
        [lbIndex + 1, lbIndex - 1].forEach(function (n) {
            var i = (n + lbItems.length) % lbItems.length;
            var pre = new Image();
            pre.src = lbItems[i].src;
        });
    }

    lbImg.addEventListener("load", function () {
        lbImg.classList.add("is-loaded");
    });

    function closeLightbox(silent) {
        if (!lbOpen) { return; }
        lbOpen = false;
        lb.hidden = true;
        lbImg.removeAttribute("src");

        document.body.classList.remove("is-locked");
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        window.scrollTo(0, savedScrollY);

        if (!silent && lastFocused && document.contains(lastFocused)) {
            lastFocused.focus({ preventScroll: true });
        }
        lastFocused = null;
    }

    function stepLightbox(delta) {
        if (lbItems.length > 1) { setLightbox(lbIndex + delta); }
    }

    lbClose.addEventListener("click", function () { closeLightbox(); });
    lbPrev.addEventListener("click", function () { stepLightbox(-1); });
    lbNext.addEventListener("click", function () { stepLightbox(1); });

    /* clicking the backdrop, or the space around the photo, closes it */
    lb.addEventListener("click", function (e) {
        if (e.target.hasAttribute("data-close")) { closeLightbox(); }
    });

    document.addEventListener("keydown", function (e) {
        if (!lbOpen) { return; }

        if (e.key === "Escape") {
            e.preventDefault();
            closeLightbox();
        } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            stepLightbox(-1);
        } else if (e.key === "ArrowRight") {
            e.preventDefault();
            stepLightbox(1);
        } else if (e.key === "Tab") {
            /* keep focus inside the dialog */
            var stops = [lbClose, lbPrev, lbNext].filter(function (el) {
                return !el.hidden;
            });
            var i = stops.indexOf(document.activeElement);
            var next = (i === -1) ? 0 : (e.shiftKey ? i - 1 : i + 1);
            e.preventDefault();
            stops[(next + stops.length) % stops.length].focus();
        }
    });

    /* swipe left / right on touch */
    var touchX = 0, touchY = 0, touching = false;

    lb.addEventListener("touchstart", function (e) {
        if (e.touches.length !== 1) { touching = false; return; }
        touching = true;
        touchX = e.touches[0].clientX;
        touchY = e.touches[0].clientY;
    }, { passive: true });

    lb.addEventListener("touchend", function (e) {
        if (!touching || !e.changedTouches.length) { return; }
        touching = false;
        var dx = e.changedTouches[0].clientX - touchX;
        var dy = e.changedTouches[0].clientY - touchY;
        /* must be clearly sideways, so a scroll or pinch is not hijacked */
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
            stepLightbox(dx < 0 ? 1 : -1);
        }
    }, { passive: true });


    /* =================================================================
       START
       ================================================================= */
    buildTopicCards();
    route();
}());
