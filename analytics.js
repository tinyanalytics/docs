// Loads the TinyAnalytics tracking script on every docs page.
//
// Mintlify has no hook for adding tags to <head>, so the tag is built here
// instead: Mintlify runs any .js file in the content directory on every page.
// The tracker reads its configuration off document.currentScript, which a
// dynamically inserted classic script still sets, so the data-* attributes
// below behave exactly as they would in a hand-written <script> tag.
//
// The `defer` attribute is intentionally dropped: injected scripts are async
// by default, and setting it has no effect.
//
// To keep local previews and preview deployments out of site 221, add their
// hostnames under Settings -> Exclusions in the dashboard rather than
// filtering here.

(function () {
  var SRC = "https://dash.tinyanalytics.io/script.js";

  if (document.querySelector('script[src="' + SRC + '"]')) {
    return;
  }

  var script = document.createElement("script");
  script.src = SRC;
  script.setAttribute("data-site-id", "221");
  script.setAttribute("data-web-vitals", "true");
  script.setAttribute("data-track-errors", "true");

  document.head.appendChild(script);
})();
