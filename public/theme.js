// Theme: follows the system setting unless the visitor picks light or dark. Loaded as a
// blocking script in <head> so the chosen theme applies before first paint.
(function () {
  var KEY = 'prl-theme';
  var root = document.documentElement;
  var get = function () { try { return localStorage.getItem(KEY); } catch (e) { return null; } };
  var set = function (v) { try { v ? localStorage.setItem(KEY, v) : localStorage.removeItem(KEY); } catch (e) {} };
  var apply = function (v) { if (v === 'light' || v === 'dark') root.setAttribute('data-theme', v); else root.removeAttribute('data-theme'); };
  apply(get());
  var LABEL = { system: 'Theme: system', light: 'Theme: light', dark: 'Theme: dark' };
  var NEXT = { system: 'light', light: 'dark', dark: 'system' };
  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('themebtn');
    if (!btn) return;
    var cur = get() || 'system';
    btn.textContent = LABEL[cur];
    btn.hidden = false;
    btn.addEventListener('click', function () {
      cur = NEXT[cur];
      set(cur === 'system' ? null : cur);
      apply(cur);
      btn.textContent = LABEL[cur];
    });
  });
})();
