// Unobtrusive scripting adapter for React
(function(document, window, m) {
  var CLASS_NAME_ATTR = 'data-mithril-class';
  var PROPS_ATTR = 'data-mithril-props';

  // jQuery is optional. Use it to support legacy browsers.
  var $ = (typeof jQuery !== 'undefined') && jQuery;

  var findMithrilDOMNodes = function() {
    var SELECTOR = '[' + CLASS_NAME_ATTR + ']';
    if ($) {
      return $(SELECTOR);
    } else {
      return document.querySelectorAll(SELECTOR);
    }
  };

  var mountComponents = function() {
    var nodes = findMithrilDOMNodes();
    for (var i = 0; i < nodes.length; ++i) {
      var node = nodes[i];
      var className = node.getAttribute(CLASS_NAME_ATTR);
      // Assume className is simple and can be found at top-level (window).
      // Fallback to eval to handle cases
      var constructor = window[className] || eval.call(window, className);
      var propsJson = node.getAttribute(PROPS_ATTR);
      var props = propsJson && JSON.parse(propsJson);
      // insert props in to module
      constructor.properties = props;
      m.module(node, constructor);
    }
  };

  // Rails CSRF protection

  var CSRFtoken = '';

  var setUpCSRF = function() {
    if ($) {
      CSRFparam = $("[name=csrf-param]").attr("content");
      CSRFtoken = $("[name=csrf-token]").attr("content");
    } else {
      var el;

      if (el = document.querySelector("[name=csrf-param]"))
        CSRFparam = el.getAttribute("content");
      if (el = document.querySelector("[name=csrf-token]"))
        CSRFtoken = el.getAttribute("content");
    }

    if (CSRFparam && CSRFtoken && !m.requestWithoutCSRFProtection) {
      m.requestWithoutCSRFProtection = m.request;
      m.request = function(options) {
        var config = options.config;

        if (options.method && !/^(GET|HEAD)$/i.test(options.method)) {
          options.config = function(xhr) {
            xhr.setRequestHeader('X-CSRF-Token', CSRFtoken);
            config && config(xhr);
          };
        }
        m.requestWithoutCSRFProtection(options);
      };
    }
  };

  var initMithrilUJS = function() {
    setUpCSRF();
    mountComponents();
  };

  // Register page load & unload events
  if ($) {
    $(initMithrilUJS);
  } else {
    document.addEventListener('DOMContentLoaded', initMithrilUJS);
  }

  // Turbolinks specified events
  if (typeof Turbolinks !== 'undefined') {
    var handleEvent;
    if ($) {
      handleEvent = function(eventName, callback) {
        $(document).on(eventName, callback);
      }
    } else {
      handleEvent = function(eventName, callback) {
        document.addEventListener(eventName, callback);
      }
    }
    handleEvent('page:change', initMithrilUJS);
  }
})(document, window, m);
