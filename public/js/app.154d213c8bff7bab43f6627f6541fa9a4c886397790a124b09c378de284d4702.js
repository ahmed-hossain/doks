"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/lazysizes/lazysizes.js
  var require_lazysizes = __commonJS({
    "node_modules/lazysizes/lazysizes.js"(exports, module) {
      (function(window2, factory) {
        var lazySizes2 = factory(window2, window2.document, Date);
        window2.lazySizes = lazySizes2;
        if (typeof module == "object" && module.exports) {
          module.exports = lazySizes2;
        }
      })(
        typeof window != "undefined" ? window : {},
        /**
         * import("./types/global")
         * @typedef { import("./types/lazysizes-config").LazySizesConfigPartial } LazySizesConfigPartial
         */
        function l(window2, document2, Date2) {
          "use strict";
          var lazysizes, lazySizesCfg;
          (function() {
            var prop;
            var lazySizesDefaults = {
              lazyClass: "lazyload",
              loadedClass: "lazyloaded",
              loadingClass: "lazyloading",
              preloadClass: "lazypreload",
              errorClass: "lazyerror",
              //strictClass: 'lazystrict',
              autosizesClass: "lazyautosizes",
              fastLoadedClass: "ls-is-cached",
              iframeLoadMode: 0,
              srcAttr: "data-src",
              srcsetAttr: "data-srcset",
              sizesAttr: "data-sizes",
              //preloadAfterLoad: false,
              minSize: 40,
              customMedia: {},
              init: true,
              expFactor: 1.5,
              hFac: 0.8,
              loadMode: 2,
              loadHidden: true,
              ricTimeout: 0,
              throttleDelay: 125
            };
            lazySizesCfg = window2.lazySizesConfig || window2.lazysizesConfig || {};
            for (prop in lazySizesDefaults) {
              if (!(prop in lazySizesCfg)) {
                lazySizesCfg[prop] = lazySizesDefaults[prop];
              }
            }
          })();
          if (!document2 || !document2.getElementsByClassName) {
            return {
              init: function() {
              },
              /**
               * @type { LazySizesConfigPartial }
               */
              cfg: lazySizesCfg,
              /**
               * @type { true }
               */
              noSupport: true
            };
          }
          var docElem = document2.documentElement;
          var supportPicture = window2.HTMLPictureElement;
          var _addEventListener = "addEventListener";
          var _getAttribute = "getAttribute";
          var addEventListener = window2[_addEventListener].bind(window2);
          var setTimeout2 = window2.setTimeout;
          var requestAnimationFrame = window2.requestAnimationFrame || setTimeout2;
          var requestIdleCallback = window2.requestIdleCallback;
          var regPicture = /^picture$/i;
          var loadEvents = ["load", "error", "lazyincluded", "_lazyloaded"];
          var regClassCache = {};
          var forEach = Array.prototype.forEach;
          var hasClass = function(ele, cls) {
            if (!regClassCache[cls]) {
              regClassCache[cls] = new RegExp("(\\s|^)" + cls + "(\\s|$)");
            }
            return regClassCache[cls].test(ele[_getAttribute]("class") || "") && regClassCache[cls];
          };
          var addClass = function(ele, cls) {
            if (!hasClass(ele, cls)) {
              ele.setAttribute("class", (ele[_getAttribute]("class") || "").trim() + " " + cls);
            }
          };
          var removeClass = function(ele, cls) {
            var reg;
            if (reg = hasClass(ele, cls)) {
              ele.setAttribute("class", (ele[_getAttribute]("class") || "").replace(reg, " "));
            }
          };
          var addRemoveLoadEvents = function(dom, fn, add) {
            var action = add ? _addEventListener : "removeEventListener";
            if (add) {
              addRemoveLoadEvents(dom, fn);
            }
            loadEvents.forEach(function(evt) {
              dom[action](evt, fn);
            });
          };
          var triggerEvent = function(elem, name, detail, noBubbles, noCancelable) {
            var event = document2.createEvent("Event");
            if (!detail) {
              detail = {};
            }
            detail.instance = lazysizes;
            event.initEvent(name, !noBubbles, !noCancelable);
            event.detail = detail;
            elem.dispatchEvent(event);
            return event;
          };
          var updatePolyfill = function(el, full) {
            var polyfill;
            if (!supportPicture && (polyfill = window2.picturefill || lazySizesCfg.pf)) {
              if (full && full.src && !el[_getAttribute]("srcset")) {
                el.setAttribute("srcset", full.src);
              }
              polyfill({ reevaluate: true, elements: [el] });
            } else if (full && full.src) {
              el.src = full.src;
            }
          };
          var getCSS = function(elem, style) {
            return (getComputedStyle(elem, null) || {})[style];
          };
          var getWidth = function(elem, parent, width) {
            width = width || elem.offsetWidth;
            while (width < lazySizesCfg.minSize && parent && !elem._lazysizesWidth) {
              width = parent.offsetWidth;
              parent = parent.parentNode;
            }
            return width;
          };
          var rAF = function() {
            var running, waiting;
            var firstFns = [];
            var secondFns = [];
            var fns = firstFns;
            var run = function() {
              var runFns = fns;
              fns = firstFns.length ? secondFns : firstFns;
              running = true;
              waiting = false;
              while (runFns.length) {
                runFns.shift()();
              }
              running = false;
            };
            var rafBatch = function(fn, queue) {
              if (running && !queue) {
                fn.apply(this, arguments);
              } else {
                fns.push(fn);
                if (!waiting) {
                  waiting = true;
                  (document2.hidden ? setTimeout2 : requestAnimationFrame)(run);
                }
              }
            };
            rafBatch._lsFlush = run;
            return rafBatch;
          }();
          var rAFIt = function(fn, simple) {
            return simple ? function() {
              rAF(fn);
            } : function() {
              var that = this;
              var args = arguments;
              rAF(function() {
                fn.apply(that, args);
              });
            };
          };
          var throttle = function(fn) {
            var running;
            var lastTime = 0;
            var gDelay = lazySizesCfg.throttleDelay;
            var rICTimeout = lazySizesCfg.ricTimeout;
            var run = function() {
              running = false;
              lastTime = Date2.now();
              fn();
            };
            var idleCallback = requestIdleCallback && rICTimeout > 49 ? function() {
              requestIdleCallback(run, { timeout: rICTimeout });
              if (rICTimeout !== lazySizesCfg.ricTimeout) {
                rICTimeout = lazySizesCfg.ricTimeout;
              }
            } : rAFIt(function() {
              setTimeout2(run);
            }, true);
            return function(isPriority) {
              var delay;
              if (isPriority = isPriority === true) {
                rICTimeout = 33;
              }
              if (running) {
                return;
              }
              running = true;
              delay = gDelay - (Date2.now() - lastTime);
              if (delay < 0) {
                delay = 0;
              }
              if (isPriority || delay < 9) {
                idleCallback();
              } else {
                setTimeout2(idleCallback, delay);
              }
            };
          };
          var debounce = function(func) {
            var timeout, timestamp;
            var wait = 99;
            var run = function() {
              timeout = null;
              func();
            };
            var later = function() {
              var last = Date2.now() - timestamp;
              if (last < wait) {
                setTimeout2(later, wait - last);
              } else {
                (requestIdleCallback || run)(run);
              }
            };
            return function() {
              timestamp = Date2.now();
              if (!timeout) {
                timeout = setTimeout2(later, wait);
              }
            };
          };
          var loader = function() {
            var preloadElems, isCompleted, resetPreloadingTimer, loadMode, started;
            var eLvW, elvH, eLtop, eLleft, eLright, eLbottom, isBodyHidden;
            var regImg = /^img$/i;
            var regIframe = /^iframe$/i;
            var supportScroll = "onscroll" in window2 && !/(gle|ing)bot/.test(navigator.userAgent);
            var shrinkExpand = 0;
            var currentExpand = 0;
            var isLoading = 0;
            var lowRuns = -1;
            var resetPreloading = function(e2) {
              isLoading--;
              if (!e2 || isLoading < 0 || !e2.target) {
                isLoading = 0;
              }
            };
            var isVisible = function(elem) {
              if (isBodyHidden == null) {
                isBodyHidden = getCSS(document2.body, "visibility") == "hidden";
              }
              return isBodyHidden || !(getCSS(elem.parentNode, "visibility") == "hidden" && getCSS(elem, "visibility") == "hidden");
            };
            var isNestedVisible = function(elem, elemExpand) {
              var outerRect;
              var parent = elem;
              var visible = isVisible(elem);
              eLtop -= elemExpand;
              eLbottom += elemExpand;
              eLleft -= elemExpand;
              eLright += elemExpand;
              while (visible && (parent = parent.offsetParent) && parent != document2.body && parent != docElem) {
                visible = (getCSS(parent, "opacity") || 1) > 0;
                if (visible && getCSS(parent, "overflow") != "visible") {
                  outerRect = parent.getBoundingClientRect();
                  visible = eLright > outerRect.left && eLleft < outerRect.right && eLbottom > outerRect.top - 1 && eLtop < outerRect.bottom + 1;
                }
              }
              return visible;
            };
            var checkElements = function() {
              var eLlen, i2, rect, autoLoadElem, loadedSomething, elemExpand, elemNegativeExpand, elemExpandVal, beforeExpandVal, defaultExpand, preloadExpand, hFac;
              var lazyloadElems = lazysizes.elements;
              if ((loadMode = lazySizesCfg.loadMode) && isLoading < 8 && (eLlen = lazyloadElems.length)) {
                i2 = 0;
                lowRuns++;
                for (; i2 < eLlen; i2++) {
                  if (!lazyloadElems[i2] || lazyloadElems[i2]._lazyRace) {
                    continue;
                  }
                  if (!supportScroll || lazysizes.prematureUnveil && lazysizes.prematureUnveil(lazyloadElems[i2])) {
                    unveilElement(lazyloadElems[i2]);
                    continue;
                  }
                  if (!(elemExpandVal = lazyloadElems[i2][_getAttribute]("data-expand")) || !(elemExpand = elemExpandVal * 1)) {
                    elemExpand = currentExpand;
                  }
                  if (!defaultExpand) {
                    defaultExpand = !lazySizesCfg.expand || lazySizesCfg.expand < 1 ? docElem.clientHeight > 500 && docElem.clientWidth > 500 ? 500 : 370 : lazySizesCfg.expand;
                    lazysizes._defEx = defaultExpand;
                    preloadExpand = defaultExpand * lazySizesCfg.expFactor;
                    hFac = lazySizesCfg.hFac;
                    isBodyHidden = null;
                    if (currentExpand < preloadExpand && isLoading < 1 && lowRuns > 2 && loadMode > 2 && !document2.hidden) {
                      currentExpand = preloadExpand;
                      lowRuns = 0;
                    } else if (loadMode > 1 && lowRuns > 1 && isLoading < 6) {
                      currentExpand = defaultExpand;
                    } else {
                      currentExpand = shrinkExpand;
                    }
                  }
                  if (beforeExpandVal !== elemExpand) {
                    eLvW = innerWidth + elemExpand * hFac;
                    elvH = innerHeight + elemExpand;
                    elemNegativeExpand = elemExpand * -1;
                    beforeExpandVal = elemExpand;
                  }
                  rect = lazyloadElems[i2].getBoundingClientRect();
                  if ((eLbottom = rect.bottom) >= elemNegativeExpand && (eLtop = rect.top) <= elvH && (eLright = rect.right) >= elemNegativeExpand * hFac && (eLleft = rect.left) <= eLvW && (eLbottom || eLright || eLleft || eLtop) && (lazySizesCfg.loadHidden || isVisible(lazyloadElems[i2])) && (isCompleted && isLoading < 3 && !elemExpandVal && (loadMode < 3 || lowRuns < 4) || isNestedVisible(lazyloadElems[i2], elemExpand))) {
                    unveilElement(lazyloadElems[i2]);
                    loadedSomething = true;
                    if (isLoading > 9) {
                      break;
                    }
                  } else if (!loadedSomething && isCompleted && !autoLoadElem && isLoading < 4 && lowRuns < 4 && loadMode > 2 && (preloadElems[0] || lazySizesCfg.preloadAfterLoad) && (preloadElems[0] || !elemExpandVal && (eLbottom || eLright || eLleft || eLtop || lazyloadElems[i2][_getAttribute](lazySizesCfg.sizesAttr) != "auto"))) {
                    autoLoadElem = preloadElems[0] || lazyloadElems[i2];
                  }
                }
                if (autoLoadElem && !loadedSomething) {
                  unveilElement(autoLoadElem);
                }
              }
            };
            var throttledCheckElements = throttle(checkElements);
            var switchLoadingClass = function(e2) {
              var elem = e2.target;
              if (elem._lazyCache) {
                delete elem._lazyCache;
                return;
              }
              resetPreloading(e2);
              addClass(elem, lazySizesCfg.loadedClass);
              removeClass(elem, lazySizesCfg.loadingClass);
              addRemoveLoadEvents(elem, rafSwitchLoadingClass);
              triggerEvent(elem, "lazyloaded");
            };
            var rafedSwitchLoadingClass = rAFIt(switchLoadingClass);
            var rafSwitchLoadingClass = function(e2) {
              rafedSwitchLoadingClass({ target: e2.target });
            };
            var changeIframeSrc = function(elem, src) {
              var loadMode2 = elem.getAttribute("data-load-mode") || lazySizesCfg.iframeLoadMode;
              if (loadMode2 == 0) {
                elem.contentWindow.location.replace(src);
              } else if (loadMode2 == 1) {
                elem.src = src;
              }
            };
            var handleSources = function(source) {
              var customMedia;
              var sourceSrcset = source[_getAttribute](lazySizesCfg.srcsetAttr);
              if (customMedia = lazySizesCfg.customMedia[source[_getAttribute]("data-media") || source[_getAttribute]("media")]) {
                source.setAttribute("media", customMedia);
              }
              if (sourceSrcset) {
                source.setAttribute("srcset", sourceSrcset);
              }
            };
            var lazyUnveil = rAFIt(function(elem, detail, isAuto, sizes, isImg) {
              var src, srcset, parent, isPicture, event, firesLoad;
              if (!(event = triggerEvent(elem, "lazybeforeunveil", detail)).defaultPrevented) {
                if (sizes) {
                  if (isAuto) {
                    addClass(elem, lazySizesCfg.autosizesClass);
                  } else {
                    elem.setAttribute("sizes", sizes);
                  }
                }
                srcset = elem[_getAttribute](lazySizesCfg.srcsetAttr);
                src = elem[_getAttribute](lazySizesCfg.srcAttr);
                if (isImg) {
                  parent = elem.parentNode;
                  isPicture = parent && regPicture.test(parent.nodeName || "");
                }
                firesLoad = detail.firesLoad || "src" in elem && (srcset || src || isPicture);
                event = { target: elem };
                addClass(elem, lazySizesCfg.loadingClass);
                if (firesLoad) {
                  clearTimeout(resetPreloadingTimer);
                  resetPreloadingTimer = setTimeout2(resetPreloading, 2500);
                  addRemoveLoadEvents(elem, rafSwitchLoadingClass, true);
                }
                if (isPicture) {
                  forEach.call(parent.getElementsByTagName("source"), handleSources);
                }
                if (srcset) {
                  elem.setAttribute("srcset", srcset);
                } else if (src && !isPicture) {
                  if (regIframe.test(elem.nodeName)) {
                    changeIframeSrc(elem, src);
                  } else {
                    elem.src = src;
                  }
                }
                if (isImg && (srcset || isPicture)) {
                  updatePolyfill(elem, { src });
                }
              }
              if (elem._lazyRace) {
                delete elem._lazyRace;
              }
              removeClass(elem, lazySizesCfg.lazyClass);
              rAF(function() {
                var isLoaded = elem.complete && elem.naturalWidth > 1;
                if (!firesLoad || isLoaded) {
                  if (isLoaded) {
                    addClass(elem, lazySizesCfg.fastLoadedClass);
                  }
                  switchLoadingClass(event);
                  elem._lazyCache = true;
                  setTimeout2(function() {
                    if ("_lazyCache" in elem) {
                      delete elem._lazyCache;
                    }
                  }, 9);
                }
                if (elem.loading == "lazy") {
                  isLoading--;
                }
              }, true);
            });
            var unveilElement = function(elem) {
              if (elem._lazyRace) {
                return;
              }
              var detail;
              var isImg = regImg.test(elem.nodeName);
              var sizes = isImg && (elem[_getAttribute](lazySizesCfg.sizesAttr) || elem[_getAttribute]("sizes"));
              var isAuto = sizes == "auto";
              if ((isAuto || !isCompleted) && isImg && (elem[_getAttribute]("src") || elem.srcset) && !elem.complete && !hasClass(elem, lazySizesCfg.errorClass) && hasClass(elem, lazySizesCfg.lazyClass)) {
                return;
              }
              detail = triggerEvent(elem, "lazyunveilread").detail;
              if (isAuto) {
                autoSizer.updateElem(elem, true, elem.offsetWidth);
              }
              elem._lazyRace = true;
              isLoading++;
              lazyUnveil(elem, detail, isAuto, sizes, isImg);
            };
            var afterScroll = debounce(function() {
              lazySizesCfg.loadMode = 3;
              throttledCheckElements();
            });
            var altLoadmodeScrollListner = function() {
              if (lazySizesCfg.loadMode == 3) {
                lazySizesCfg.loadMode = 2;
              }
              afterScroll();
            };
            var onload = function() {
              if (isCompleted) {
                return;
              }
              if (Date2.now() - started < 999) {
                setTimeout2(onload, 999);
                return;
              }
              isCompleted = true;
              lazySizesCfg.loadMode = 3;
              throttledCheckElements();
              addEventListener("scroll", altLoadmodeScrollListner, true);
            };
            return {
              _: function() {
                started = Date2.now();
                lazysizes.elements = document2.getElementsByClassName(lazySizesCfg.lazyClass);
                preloadElems = document2.getElementsByClassName(lazySizesCfg.lazyClass + " " + lazySizesCfg.preloadClass);
                addEventListener("scroll", throttledCheckElements, true);
                addEventListener("resize", throttledCheckElements, true);
                addEventListener("pageshow", function(e2) {
                  if (e2.persisted) {
                    var loadingElements = document2.querySelectorAll("." + lazySizesCfg.loadingClass);
                    if (loadingElements.length && loadingElements.forEach) {
                      requestAnimationFrame(function() {
                        loadingElements.forEach(function(img) {
                          if (img.complete) {
                            unveilElement(img);
                          }
                        });
                      });
                    }
                  }
                });
                if (window2.MutationObserver) {
                  new MutationObserver(throttledCheckElements).observe(docElem, { childList: true, subtree: true, attributes: true });
                } else {
                  docElem[_addEventListener]("DOMNodeInserted", throttledCheckElements, true);
                  docElem[_addEventListener]("DOMAttrModified", throttledCheckElements, true);
                  setInterval(throttledCheckElements, 999);
                }
                addEventListener("hashchange", throttledCheckElements, true);
                ["focus", "mouseover", "click", "load", "transitionend", "animationend"].forEach(function(name) {
                  document2[_addEventListener](name, throttledCheckElements, true);
                });
                if (/d$|^c/.test(document2.readyState)) {
                  onload();
                } else {
                  addEventListener("load", onload);
                  document2[_addEventListener]("DOMContentLoaded", throttledCheckElements);
                  setTimeout2(onload, 2e4);
                }
                if (lazysizes.elements.length) {
                  checkElements();
                  rAF._lsFlush();
                } else {
                  throttledCheckElements();
                }
              },
              checkElems: throttledCheckElements,
              unveil: unveilElement,
              _aLSL: altLoadmodeScrollListner
            };
          }();
          var autoSizer = function() {
            var autosizesElems;
            var sizeElement = rAFIt(function(elem, parent, event, width) {
              var sources, i2, len;
              elem._lazysizesWidth = width;
              width += "px";
              elem.setAttribute("sizes", width);
              if (regPicture.test(parent.nodeName || "")) {
                sources = parent.getElementsByTagName("source");
                for (i2 = 0, len = sources.length; i2 < len; i2++) {
                  sources[i2].setAttribute("sizes", width);
                }
              }
              if (!event.detail.dataAttr) {
                updatePolyfill(elem, event.detail);
              }
            });
            var getSizeElement = function(elem, dataAttr, width) {
              var event;
              var parent = elem.parentNode;
              if (parent) {
                width = getWidth(elem, parent, width);
                event = triggerEvent(elem, "lazybeforesizes", { width, dataAttr: !!dataAttr });
                if (!event.defaultPrevented) {
                  width = event.detail.width;
                  if (width && width !== elem._lazysizesWidth) {
                    sizeElement(elem, parent, event, width);
                  }
                }
              }
            };
            var updateElementsSizes = function() {
              var i2;
              var len = autosizesElems.length;
              if (len) {
                i2 = 0;
                for (; i2 < len; i2++) {
                  getSizeElement(autosizesElems[i2]);
                }
              }
            };
            var debouncedUpdateElementsSizes = debounce(updateElementsSizes);
            return {
              _: function() {
                autosizesElems = document2.getElementsByClassName(lazySizesCfg.autosizesClass);
                addEventListener("resize", debouncedUpdateElementsSizes);
              },
              checkElems: debouncedUpdateElementsSizes,
              updateElem: getSizeElement
            };
          }();
          var init = function() {
            if (!init.i && document2.getElementsByClassName) {
              init.i = true;
              autoSizer._();
              loader._();
            }
          };
          setTimeout2(function() {
            if (lazySizesCfg.init) {
              init();
            }
          });
          lazysizes = {
            /**
             * @type { LazySizesConfigPartial }
             */
            cfg: lazySizesCfg,
            autoSizer,
            loader,
            init,
            uP: updatePolyfill,
            aC: addClass,
            rC: removeClass,
            hC: hasClass,
            fire: triggerEvent,
            gW: getWidth,
            rAF
          };
          return lazysizes;
        }
      );
    }
  });

  // node_modules/lazysizes/plugins/native-loading/ls.native-loading.js
  var require_ls_native_loading = __commonJS({
    "node_modules/lazysizes/plugins/native-loading/ls.native-loading.js"(exports, module) {
      (function(window2, factory) {
        var globalInstall = function() {
          factory(window2.lazySizes);
          window2.removeEventListener("lazyunveilread", globalInstall, true);
        };
        factory = factory.bind(null, window2, window2.document);
        if (typeof module == "object" && module.exports) {
          factory(require_lazysizes());
        } else if (typeof define == "function" && define.amd) {
          define(["lazysizes"], factory);
        } else if (window2.lazySizes) {
          globalInstall();
        } else {
          window2.addEventListener("lazyunveilread", globalInstall, true);
        }
      })(window, function(window2, document2, lazySizes2) {
        "use strict";
        var imgSupport = "loading" in HTMLImageElement.prototype;
        var iframeSupport = "loading" in HTMLIFrameElement.prototype;
        var isConfigSet = false;
        var oldPrematureUnveil = lazySizes2.prematureUnveil;
        var cfg = lazySizes2.cfg;
        var listenerMap = {
          focus: 1,
          mouseover: 1,
          click: 1,
          load: 1,
          transitionend: 1,
          animationend: 1,
          scroll: 1,
          resize: 1
        };
        if (!cfg.nativeLoading) {
          cfg.nativeLoading = {};
        }
        if (!window2.addEventListener || !window2.MutationObserver || !imgSupport && !iframeSupport) {
          return;
        }
        function disableEvents() {
          var loader = lazySizes2.loader;
          var throttledCheckElements = loader.checkElems;
          var removeALSL = function() {
            setTimeout(function() {
              window2.removeEventListener("scroll", loader._aLSL, true);
            }, 1e3);
          };
          var currentListenerMap = typeof cfg.nativeLoading.disableListeners == "object" ? cfg.nativeLoading.disableListeners : listenerMap;
          if (currentListenerMap.scroll) {
            window2.addEventListener("load", removeALSL);
            removeALSL();
            window2.removeEventListener("scroll", throttledCheckElements, true);
          }
          if (currentListenerMap.resize) {
            window2.removeEventListener("resize", throttledCheckElements, true);
          }
          Object.keys(currentListenerMap).forEach(function(name) {
            if (currentListenerMap[name]) {
              document2.removeEventListener(name, throttledCheckElements, true);
            }
          });
        }
        function runConfig() {
          if (isConfigSet) {
            return;
          }
          isConfigSet = true;
          if (imgSupport && iframeSupport && cfg.nativeLoading.disableListeners) {
            if (cfg.nativeLoading.disableListeners === true) {
              cfg.nativeLoading.setLoadingAttribute = true;
            }
            disableEvents();
          }
          if (cfg.nativeLoading.setLoadingAttribute) {
            window2.addEventListener("lazybeforeunveil", function(e2) {
              var element = e2.target;
              if ("loading" in element && !element.getAttribute("loading")) {
                element.setAttribute("loading", "lazy");
              }
            }, true);
          }
        }
        lazySizes2.prematureUnveil = function prematureUnveil(element) {
          if (!isConfigSet) {
            runConfig();
          }
          if ("loading" in element && (cfg.nativeLoading.setLoadingAttribute || element.getAttribute("loading")) && (element.getAttribute("data-sizes") != "auto" || element.offsetWidth)) {
            return true;
          }
          if (oldPrematureUnveil) {
            return oldPrematureUnveil(element);
          }
        };
      });
    }
  });

  // node_modules/quicklink/dist/quicklink.mjs
  function e(e2) {
    return new Promise(function(n2, r2, t2) {
      (t2 = new XMLHttpRequest()).open("GET", e2, t2.withCredentials = true), t2.onload = function() {
        200 === t2.status ? n2() : r2();
      }, t2.send();
    });
  }
  var n;
  var r = (n = document.createElement("link")).relList && n.relList.supports && n.relList.supports("prefetch") ? function(e2) {
    return new Promise(function(n2, r2, t2) {
      (t2 = document.createElement("link")).rel = "prefetch", t2.href = e2, t2.onload = n2, t2.onerror = r2, document.head.appendChild(t2);
    });
  } : e;
  var t = window.requestIdleCallback || function(e2) {
    var n2 = Date.now();
    return setTimeout(function() {
      e2({ didTimeout: false, timeRemaining: function() {
        return Math.max(0, 50 - (Date.now() - n2));
      } });
    }, 1);
  };
  var o = /* @__PURE__ */ new Set();
  var i = /* @__PURE__ */ new Set();
  var c = false;
  function a(e2) {
    if (e2) {
      if (e2.saveData) return new Error("Save-Data is enabled");
      if (/2g/.test(e2.effectiveType)) return new Error("network conditions are poor");
    }
    return true;
  }
  function u(e2) {
    if (e2 || (e2 = {}), window.IntersectionObserver) {
      var n2 = function(e3) {
        e3 = e3 || 1;
        var n3 = [], r3 = 0;
        function t2() {
          r3 < e3 && n3.length > 0 && (n3.shift()(), r3++);
        }
        return [function(e4) {
          n3.push(e4) > 1 || t2();
        }, function() {
          r3--, t2();
        }];
      }(e2.throttle || 1 / 0), r2 = n2[0], a2 = n2[1], u2 = e2.limit || 1 / 0, l = e2.origins || [location.hostname], d = e2.ignores || [], h = e2.delay || 0, p = [], m = e2.timeoutFn || t, w = "function" == typeof e2.hrefFn && e2.hrefFn, g = e2.prerender || false;
      c = e2.prerenderAndPrefetch || false;
      var v = new IntersectionObserver(function(n3) {
        n3.forEach(function(n4) {
          if (n4.isIntersecting) p.push((n4 = n4.target).href), function(e3, n5) {
            n5 ? setTimeout(e3, n5) : e3();
          }(function() {
            -1 !== p.indexOf(n4.href) && (v.unobserve(n4), (c || g) && i.size < 1 ? f(w ? w(n4) : n4.href).catch(function(n5) {
              if (!e2.onError) throw n5;
              e2.onError(n5);
            }) : o.size < u2 && !g && r2(function() {
              s(w ? w(n4) : n4.href, e2.priority).then(a2).catch(function(n5) {
                a2(), e2.onError && e2.onError(n5);
              });
            }));
          }, h);
          else {
            var t2 = p.indexOf((n4 = n4.target).href);
            t2 > -1 && p.splice(t2);
          }
        });
      }, { threshold: e2.threshold || 0 });
      return m(function() {
        (e2.el || document).querySelectorAll("a").forEach(function(e3) {
          l.length && !l.includes(e3.hostname) || function e4(n3, r3) {
            return Array.isArray(r3) ? r3.some(function(r4) {
              return e4(n3, r4);
            }) : (r3.test || r3).call(r3, n3.href, n3);
          }(e3, d) || v.observe(e3);
        });
      }, { timeout: e2.timeout || 2e3 }), function() {
        o.clear(), v.disconnect();
      };
    }
  }
  function s(n2, t2, u2) {
    var s2 = a(navigator.connection);
    return s2 instanceof Error ? Promise.reject(new Error("Cannot prefetch, " + s2.message)) : (i.size > 0 && !c && console.warn("[Warning] You are using both prefetching and prerendering on the same document"), Promise.all([].concat(n2).map(function(n3) {
      if (!o.has(n3)) return o.add(n3), (t2 ? function(n4) {
        return window.fetch ? fetch(n4, { credentials: "include" }) : e(n4);
      } : r)(new URL(n3, location.href).toString());
    })));
  }
  function f(e2, n2) {
    var r2 = a(navigator.connection);
    if (r2 instanceof Error) return Promise.reject(new Error("Cannot prerender, " + r2.message));
    if (!HTMLScriptElement.supports("speculationrules")) return s(e2), Promise.reject(new Error("This browser does not support the speculation rules API. Falling back to prefetch."));
    if (document.querySelector('script[type="speculationrules"]')) return Promise.reject(new Error("Speculation Rules is already defined and cannot be altered."));
    for (var t2 = 0, u2 = [].concat(e2); t2 < u2.length; t2 += 1) {
      var f2 = u2[t2];
      if (window.location.origin !== new URL(f2, window.location.href).origin) return Promise.reject(new Error("Only same origin URLs are allowed: " + f2));
      i.add(f2);
    }
    o.size > 0 && !c && console.warn("[Warning] You are using both prefetching and prerendering on the same document");
    var l = function(e3) {
      var n3 = document.createElement("script");
      n3.type = "speculationrules", n3.text = '{"prerender":[{"source": "list","urls": ["' + Array.from(e3).join('","') + '"]}]}';
      try {
        document.head.appendChild(n3);
      } catch (e4) {
        return e4;
      }
      return true;
    }(i);
    return true === l ? Promise.resolve() : Promise.reject(l);
  }

  // node_modules/@thulite/core/assets/js/core.js
  var import_lazysizes = __toESM(require_lazysizes());
  var import_ls = __toESM(require_ls_native_loading());
  u({
    ignores: [
      /\/api\/?/,
      (uri) => uri.includes(".zip"),
      (uri, elem) => elem.hasAttribute("noprefetch"),
      (uri, elem) => elem.hash && elem.pathname === window.location.pathname
    ]
  });
  import_lazysizes.default.cfg.nativeLoading = {
    setLoadingAttribute: true,
    disableListeners: {
      scroll: true
    }
  };
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vbm9kZV9tb2R1bGVzL2xhenlzaXplcy9sYXp5c2l6ZXMuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2xhenlzaXplcy9wbHVnaW5zL25hdGl2ZS1sb2FkaW5nL2xzLm5hdGl2ZS1sb2FkaW5nLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9xdWlja2xpbmsvZGlzdC9xdWlja2xpbmsubWpzIiwgIi4uL25vZGVfbW9kdWxlcy9AdGh1bGl0ZS9jb3JlL2Fzc2V0cy9qcy9jb3JlLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIoZnVuY3Rpb24od2luZG93LCBmYWN0b3J5KSB7XG5cdHZhciBsYXp5U2l6ZXMgPSBmYWN0b3J5KHdpbmRvdywgd2luZG93LmRvY3VtZW50LCBEYXRlKTtcblx0d2luZG93LmxhenlTaXplcyA9IGxhenlTaXplcztcblx0aWYodHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyl7XG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBsYXp5U2l6ZXM7XG5cdH1cbn0odHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyA/XG4gICAgICB3aW5kb3cgOiB7fSwgXG4vKipcbiAqIGltcG9ydChcIi4vdHlwZXMvZ2xvYmFsXCIpXG4gKiBAdHlwZWRlZiB7IGltcG9ydChcIi4vdHlwZXMvbGF6eXNpemVzLWNvbmZpZ1wiKS5MYXp5U2l6ZXNDb25maWdQYXJ0aWFsIH0gTGF6eVNpemVzQ29uZmlnUGFydGlhbFxuICovXG5mdW5jdGlvbiBsKHdpbmRvdywgZG9jdW1lbnQsIERhdGUpIHsgLy8gUGFzcyBpbiB0aGUgd2luZG93IERhdGUgZnVuY3Rpb24gYWxzbyBmb3IgU1NSIGJlY2F1c2UgdGhlIERhdGUgY2xhc3MgY2FuIGJlIGxvc3Rcblx0J3VzZSBzdHJpY3QnO1xuXHQvKmpzaGludCBlcW51bGw6dHJ1ZSAqL1xuXG5cdHZhciBsYXp5c2l6ZXMsXG5cdFx0LyoqXG5cdFx0ICogQHR5cGUgeyBMYXp5U2l6ZXNDb25maWdQYXJ0aWFsIH1cblx0XHQgKi9cblx0XHRsYXp5U2l6ZXNDZmc7XG5cblx0KGZ1bmN0aW9uKCl7XG5cdFx0dmFyIHByb3A7XG5cblx0XHR2YXIgbGF6eVNpemVzRGVmYXVsdHMgPSB7XG5cdFx0XHRsYXp5Q2xhc3M6ICdsYXp5bG9hZCcsXG5cdFx0XHRsb2FkZWRDbGFzczogJ2xhenlsb2FkZWQnLFxuXHRcdFx0bG9hZGluZ0NsYXNzOiAnbGF6eWxvYWRpbmcnLFxuXHRcdFx0cHJlbG9hZENsYXNzOiAnbGF6eXByZWxvYWQnLFxuXHRcdFx0ZXJyb3JDbGFzczogJ2xhenllcnJvcicsXG5cdFx0XHQvL3N0cmljdENsYXNzOiAnbGF6eXN0cmljdCcsXG5cdFx0XHRhdXRvc2l6ZXNDbGFzczogJ2xhenlhdXRvc2l6ZXMnLFxuXHRcdFx0ZmFzdExvYWRlZENsYXNzOiAnbHMtaXMtY2FjaGVkJyxcblx0XHRcdGlmcmFtZUxvYWRNb2RlOiAwLFxuXHRcdFx0c3JjQXR0cjogJ2RhdGEtc3JjJyxcblx0XHRcdHNyY3NldEF0dHI6ICdkYXRhLXNyY3NldCcsXG5cdFx0XHRzaXplc0F0dHI6ICdkYXRhLXNpemVzJyxcblx0XHRcdC8vcHJlbG9hZEFmdGVyTG9hZDogZmFsc2UsXG5cdFx0XHRtaW5TaXplOiA0MCxcblx0XHRcdGN1c3RvbU1lZGlhOiB7fSxcblx0XHRcdGluaXQ6IHRydWUsXG5cdFx0XHRleHBGYWN0b3I6IDEuNSxcblx0XHRcdGhGYWM6IDAuOCxcblx0XHRcdGxvYWRNb2RlOiAyLFxuXHRcdFx0bG9hZEhpZGRlbjogdHJ1ZSxcblx0XHRcdHJpY1RpbWVvdXQ6IDAsXG5cdFx0XHR0aHJvdHRsZURlbGF5OiAxMjUsXG5cdFx0fTtcblxuXHRcdGxhenlTaXplc0NmZyA9IHdpbmRvdy5sYXp5U2l6ZXNDb25maWcgfHwgd2luZG93LmxhenlzaXplc0NvbmZpZyB8fCB7fTtcblxuXHRcdGZvcihwcm9wIGluIGxhenlTaXplc0RlZmF1bHRzKXtcblx0XHRcdGlmKCEocHJvcCBpbiBsYXp5U2l6ZXNDZmcpKXtcblx0XHRcdFx0bGF6eVNpemVzQ2ZnW3Byb3BdID0gbGF6eVNpemVzRGVmYXVsdHNbcHJvcF07XG5cdFx0XHR9XG5cdFx0fVxuXHR9KSgpO1xuXG5cdGlmICghZG9jdW1lbnQgfHwgIWRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0aW5pdDogZnVuY3Rpb24gKCkge30sXG5cdFx0XHQvKipcblx0XHRcdCAqIEB0eXBlIHsgTGF6eVNpemVzQ29uZmlnUGFydGlhbCB9XG5cdFx0XHQgKi9cblx0XHRcdGNmZzogbGF6eVNpemVzQ2ZnLFxuXHRcdFx0LyoqXG5cdFx0XHQgKiBAdHlwZSB7IHRydWUgfVxuXHRcdFx0ICovXG5cdFx0XHRub1N1cHBvcnQ6IHRydWUsXG5cdFx0fTtcblx0fVxuXG5cdHZhciBkb2NFbGVtID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXG5cdHZhciBzdXBwb3J0UGljdHVyZSA9IHdpbmRvdy5IVE1MUGljdHVyZUVsZW1lbnQ7XG5cblx0dmFyIF9hZGRFdmVudExpc3RlbmVyID0gJ2FkZEV2ZW50TGlzdGVuZXInO1xuXG5cdHZhciBfZ2V0QXR0cmlidXRlID0gJ2dldEF0dHJpYnV0ZSc7XG5cblx0LyoqXG5cdCAqIFVwZGF0ZSB0byBiaW5kIHRvIHdpbmRvdyBiZWNhdXNlICd0aGlzJyBiZWNvbWVzIG51bGwgZHVyaW5nIFNTUlxuXHQgKiBidWlsZHMuXG5cdCAqL1xuXHR2YXIgYWRkRXZlbnRMaXN0ZW5lciA9IHdpbmRvd1tfYWRkRXZlbnRMaXN0ZW5lcl0uYmluZCh3aW5kb3cpO1xuXG5cdHZhciBzZXRUaW1lb3V0ID0gd2luZG93LnNldFRpbWVvdXQ7XG5cblx0dmFyIHJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgc2V0VGltZW91dDtcblxuXHR2YXIgcmVxdWVzdElkbGVDYWxsYmFjayA9IHdpbmRvdy5yZXF1ZXN0SWRsZUNhbGxiYWNrO1xuXG5cdHZhciByZWdQaWN0dXJlID0gL15waWN0dXJlJC9pO1xuXG5cdHZhciBsb2FkRXZlbnRzID0gWydsb2FkJywgJ2Vycm9yJywgJ2xhenlpbmNsdWRlZCcsICdfbGF6eWxvYWRlZCddO1xuXG5cdHZhciByZWdDbGFzc0NhY2hlID0ge307XG5cblx0dmFyIGZvckVhY2ggPSBBcnJheS5wcm90b3R5cGUuZm9yRWFjaDtcblxuXHQvKipcblx0ICogQHBhcmFtIGVsZSB7RWxlbWVudH1cblx0ICogQHBhcmFtIGNscyB7c3RyaW5nfVxuXHQgKi9cblx0dmFyIGhhc0NsYXNzID0gZnVuY3Rpb24oZWxlLCBjbHMpIHtcblx0XHRpZighcmVnQ2xhc3NDYWNoZVtjbHNdKXtcblx0XHRcdHJlZ0NsYXNzQ2FjaGVbY2xzXSA9IG5ldyBSZWdFeHAoJyhcXFxcc3xeKScrY2xzKycoXFxcXHN8JCknKTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlZ0NsYXNzQ2FjaGVbY2xzXS50ZXN0KGVsZVtfZ2V0QXR0cmlidXRlXSgnY2xhc3MnKSB8fCAnJykgJiYgcmVnQ2xhc3NDYWNoZVtjbHNdO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBAcGFyYW0gZWxlIHtFbGVtZW50fVxuXHQgKiBAcGFyYW0gY2xzIHtzdHJpbmd9XG5cdCAqL1xuXHR2YXIgYWRkQ2xhc3MgPSBmdW5jdGlvbihlbGUsIGNscykge1xuXHRcdGlmICghaGFzQ2xhc3MoZWxlLCBjbHMpKXtcblx0XHRcdGVsZS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgKGVsZVtfZ2V0QXR0cmlidXRlXSgnY2xhc3MnKSB8fCAnJykudHJpbSgpICsgJyAnICsgY2xzKTtcblx0XHR9XG5cdH07XG5cblx0LyoqXG5cdCAqIEBwYXJhbSBlbGUge0VsZW1lbnR9XG5cdCAqIEBwYXJhbSBjbHMge3N0cmluZ31cblx0ICovXG5cdHZhciByZW1vdmVDbGFzcyA9IGZ1bmN0aW9uKGVsZSwgY2xzKSB7XG5cdFx0dmFyIHJlZztcblx0XHRpZiAoKHJlZyA9IGhhc0NsYXNzKGVsZSxjbHMpKSkge1xuXHRcdFx0ZWxlLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAoZWxlW19nZXRBdHRyaWJ1dGVdKCdjbGFzcycpIHx8ICcnKS5yZXBsYWNlKHJlZywgJyAnKSk7XG5cdFx0fVxuXHR9O1xuXG5cdHZhciBhZGRSZW1vdmVMb2FkRXZlbnRzID0gZnVuY3Rpb24oZG9tLCBmbiwgYWRkKXtcblx0XHR2YXIgYWN0aW9uID0gYWRkID8gX2FkZEV2ZW50TGlzdGVuZXIgOiAncmVtb3ZlRXZlbnRMaXN0ZW5lcic7XG5cdFx0aWYoYWRkKXtcblx0XHRcdGFkZFJlbW92ZUxvYWRFdmVudHMoZG9tLCBmbik7XG5cdFx0fVxuXHRcdGxvYWRFdmVudHMuZm9yRWFjaChmdW5jdGlvbihldnQpe1xuXHRcdFx0ZG9tW2FjdGlvbl0oZXZ0LCBmbik7XG5cdFx0fSk7XG5cdH07XG5cblx0LyoqXG5cdCAqIEBwYXJhbSBlbGVtIHsgRWxlbWVudCB9XG5cdCAqIEBwYXJhbSBuYW1lIHsgc3RyaW5nIH1cblx0ICogQHBhcmFtIGRldGFpbCB7IGFueSB9XG5cdCAqIEBwYXJhbSBub0J1YmJsZXMgeyBib29sZWFuIH1cblx0ICogQHBhcmFtIG5vQ2FuY2VsYWJsZSB7IGJvb2xlYW4gfVxuXHQgKiBAcmV0dXJucyB7IEN1c3RvbUV2ZW50IH1cblx0ICovXG5cdHZhciB0cmlnZ2VyRXZlbnQgPSBmdW5jdGlvbihlbGVtLCBuYW1lLCBkZXRhaWwsIG5vQnViYmxlcywgbm9DYW5jZWxhYmxlKXtcblx0XHR2YXIgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnRXZlbnQnKTtcblxuXHRcdGlmKCFkZXRhaWwpe1xuXHRcdFx0ZGV0YWlsID0ge307XG5cdFx0fVxuXG5cdFx0ZGV0YWlsLmluc3RhbmNlID0gbGF6eXNpemVzO1xuXG5cdFx0ZXZlbnQuaW5pdEV2ZW50KG5hbWUsICFub0J1YmJsZXMsICFub0NhbmNlbGFibGUpO1xuXG5cdFx0ZXZlbnQuZGV0YWlsID0gZGV0YWlsO1xuXG5cdFx0ZWxlbS5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcblx0XHRyZXR1cm4gZXZlbnQ7XG5cdH07XG5cblx0dmFyIHVwZGF0ZVBvbHlmaWxsID0gZnVuY3Rpb24gKGVsLCBmdWxsKXtcblx0XHR2YXIgcG9seWZpbGw7XG5cdFx0aWYoICFzdXBwb3J0UGljdHVyZSAmJiAoIHBvbHlmaWxsID0gKHdpbmRvdy5waWN0dXJlZmlsbCB8fCBsYXp5U2l6ZXNDZmcucGYpICkgKXtcblx0XHRcdGlmKGZ1bGwgJiYgZnVsbC5zcmMgJiYgIWVsW19nZXRBdHRyaWJ1dGVdKCdzcmNzZXQnKSl7XG5cdFx0XHRcdGVsLnNldEF0dHJpYnV0ZSgnc3Jjc2V0JywgZnVsbC5zcmMpO1xuXHRcdFx0fVxuXHRcdFx0cG9seWZpbGwoe3JlZXZhbHVhdGU6IHRydWUsIGVsZW1lbnRzOiBbZWxdfSk7XG5cdFx0fSBlbHNlIGlmKGZ1bGwgJiYgZnVsbC5zcmMpe1xuXHRcdFx0ZWwuc3JjID0gZnVsbC5zcmM7XG5cdFx0fVxuXHR9O1xuXG5cdHZhciBnZXRDU1MgPSBmdW5jdGlvbiAoZWxlbSwgc3R5bGUpe1xuXHRcdHJldHVybiAoZ2V0Q29tcHV0ZWRTdHlsZShlbGVtLCBudWxsKSB8fCB7fSlbc3R5bGVdO1xuXHR9O1xuXG5cdC8qKlxuXHQgKlxuXHQgKiBAcGFyYW0gZWxlbSB7IEVsZW1lbnQgfVxuXHQgKiBAcGFyYW0gcGFyZW50IHsgRWxlbWVudCB9XG5cdCAqIEBwYXJhbSBbd2lkdGhdIHtudW1iZXJ9XG5cdCAqIEByZXR1cm5zIHtudW1iZXJ9XG5cdCAqL1xuXHR2YXIgZ2V0V2lkdGggPSBmdW5jdGlvbihlbGVtLCBwYXJlbnQsIHdpZHRoKXtcblx0XHR3aWR0aCA9IHdpZHRoIHx8IGVsZW0ub2Zmc2V0V2lkdGg7XG5cblx0XHR3aGlsZSh3aWR0aCA8IGxhenlTaXplc0NmZy5taW5TaXplICYmIHBhcmVudCAmJiAhZWxlbS5fbGF6eXNpemVzV2lkdGgpe1xuXHRcdFx0d2lkdGggPSAgcGFyZW50Lm9mZnNldFdpZHRoO1xuXHRcdFx0cGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGU7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHdpZHRoO1xuXHR9O1xuXG5cdHZhciByQUYgPSAoZnVuY3Rpb24oKXtcblx0XHR2YXIgcnVubmluZywgd2FpdGluZztcblx0XHR2YXIgZmlyc3RGbnMgPSBbXTtcblx0XHR2YXIgc2Vjb25kRm5zID0gW107XG5cdFx0dmFyIGZucyA9IGZpcnN0Rm5zO1xuXG5cdFx0dmFyIHJ1biA9IGZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgcnVuRm5zID0gZm5zO1xuXG5cdFx0XHRmbnMgPSBmaXJzdEZucy5sZW5ndGggPyBzZWNvbmRGbnMgOiBmaXJzdEZucztcblxuXHRcdFx0cnVubmluZyA9IHRydWU7XG5cdFx0XHR3YWl0aW5nID0gZmFsc2U7XG5cblx0XHRcdHdoaWxlKHJ1bkZucy5sZW5ndGgpe1xuXHRcdFx0XHRydW5GbnMuc2hpZnQoKSgpO1xuXHRcdFx0fVxuXG5cdFx0XHRydW5uaW5nID0gZmFsc2U7XG5cdFx0fTtcblxuXHRcdHZhciByYWZCYXRjaCA9IGZ1bmN0aW9uKGZuLCBxdWV1ZSl7XG5cdFx0XHRpZihydW5uaW5nICYmICFxdWV1ZSl7XG5cdFx0XHRcdGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmbnMucHVzaChmbik7XG5cblx0XHRcdFx0aWYoIXdhaXRpbmcpe1xuXHRcdFx0XHRcdHdhaXRpbmcgPSB0cnVlO1xuXHRcdFx0XHRcdChkb2N1bWVudC5oaWRkZW4gPyBzZXRUaW1lb3V0IDogcmVxdWVzdEFuaW1hdGlvbkZyYW1lKShydW4pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHJhZkJhdGNoLl9sc0ZsdXNoID0gcnVuO1xuXG5cdFx0cmV0dXJuIHJhZkJhdGNoO1xuXHR9KSgpO1xuXG5cdHZhciByQUZJdCA9IGZ1bmN0aW9uKGZuLCBzaW1wbGUpe1xuXHRcdHJldHVybiBzaW1wbGUgP1xuXHRcdFx0ZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJBRihmbik7XG5cdFx0XHR9IDpcblx0XHRcdGZ1bmN0aW9uKCl7XG5cdFx0XHRcdHZhciB0aGF0ID0gdGhpcztcblx0XHRcdFx0dmFyIGFyZ3MgPSBhcmd1bWVudHM7XG5cdFx0XHRcdHJBRihmdW5jdGlvbigpe1xuXHRcdFx0XHRcdGZuLmFwcGx5KHRoYXQsIGFyZ3MpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHQ7XG5cdH07XG5cblx0dmFyIHRocm90dGxlID0gZnVuY3Rpb24oZm4pe1xuXHRcdHZhciBydW5uaW5nO1xuXHRcdHZhciBsYXN0VGltZSA9IDA7XG5cdFx0dmFyIGdEZWxheSA9IGxhenlTaXplc0NmZy50aHJvdHRsZURlbGF5O1xuXHRcdHZhciBySUNUaW1lb3V0ID0gbGF6eVNpemVzQ2ZnLnJpY1RpbWVvdXQ7XG5cdFx0dmFyIHJ1biA9IGZ1bmN0aW9uKCl7XG5cdFx0XHRydW5uaW5nID0gZmFsc2U7XG5cdFx0XHRsYXN0VGltZSA9IERhdGUubm93KCk7XG5cdFx0XHRmbigpO1xuXHRcdH07XG5cdFx0dmFyIGlkbGVDYWxsYmFjayA9IHJlcXVlc3RJZGxlQ2FsbGJhY2sgJiYgcklDVGltZW91dCA+IDQ5ID9cblx0XHRcdGZ1bmN0aW9uKCl7XG5cdFx0XHRcdHJlcXVlc3RJZGxlQ2FsbGJhY2socnVuLCB7dGltZW91dDogcklDVGltZW91dH0pO1xuXG5cdFx0XHRcdGlmKHJJQ1RpbWVvdXQgIT09IGxhenlTaXplc0NmZy5yaWNUaW1lb3V0KXtcblx0XHRcdFx0XHRySUNUaW1lb3V0ID0gbGF6eVNpemVzQ2ZnLnJpY1RpbWVvdXQ7XG5cdFx0XHRcdH1cblx0XHRcdH0gOlxuXHRcdFx0ckFGSXQoZnVuY3Rpb24oKXtcblx0XHRcdFx0c2V0VGltZW91dChydW4pO1xuXHRcdFx0fSwgdHJ1ZSlcblx0XHQ7XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24oaXNQcmlvcml0eSl7XG5cdFx0XHR2YXIgZGVsYXk7XG5cblx0XHRcdGlmKChpc1ByaW9yaXR5ID0gaXNQcmlvcml0eSA9PT0gdHJ1ZSkpe1xuXHRcdFx0XHRySUNUaW1lb3V0ID0gMzM7XG5cdFx0XHR9XG5cblx0XHRcdGlmKHJ1bm5pbmcpe1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHJ1bm5pbmcgPSAgdHJ1ZTtcblxuXHRcdFx0ZGVsYXkgPSBnRGVsYXkgLSAoRGF0ZS5ub3coKSAtIGxhc3RUaW1lKTtcblxuXHRcdFx0aWYoZGVsYXkgPCAwKXtcblx0XHRcdFx0ZGVsYXkgPSAwO1xuXHRcdFx0fVxuXG5cdFx0XHRpZihpc1ByaW9yaXR5IHx8IGRlbGF5IDwgOSl7XG5cdFx0XHRcdGlkbGVDYWxsYmFjaygpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0c2V0VGltZW91dChpZGxlQ2FsbGJhY2ssIGRlbGF5KTtcblx0XHRcdH1cblx0XHR9O1xuXHR9O1xuXG5cdC8vYmFzZWQgb24gaHR0cDovL21vZGVybmphdmFzY3JpcHQuYmxvZ3Nwb3QuZGUvMjAxMy8wOC9idWlsZGluZy1iZXR0ZXItZGVib3VuY2UuaHRtbFxuXHR2YXIgZGVib3VuY2UgPSBmdW5jdGlvbihmdW5jKSB7XG5cdFx0dmFyIHRpbWVvdXQsIHRpbWVzdGFtcDtcblx0XHR2YXIgd2FpdCA9IDk5O1xuXHRcdHZhciBydW4gPSBmdW5jdGlvbigpe1xuXHRcdFx0dGltZW91dCA9IG51bGw7XG5cdFx0XHRmdW5jKCk7XG5cdFx0fTtcblx0XHR2YXIgbGF0ZXIgPSBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBsYXN0ID0gRGF0ZS5ub3coKSAtIHRpbWVzdGFtcDtcblxuXHRcdFx0aWYgKGxhc3QgPCB3YWl0KSB7XG5cdFx0XHRcdHNldFRpbWVvdXQobGF0ZXIsIHdhaXQgLSBsYXN0KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdChyZXF1ZXN0SWRsZUNhbGxiYWNrIHx8IHJ1bikocnVuKTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHRcdFx0dGltZXN0YW1wID0gRGF0ZS5ub3coKTtcblxuXHRcdFx0aWYgKCF0aW1lb3V0KSB7XG5cdFx0XHRcdHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcblx0XHRcdH1cblx0XHR9O1xuXHR9O1xuXG5cdHZhciBsb2FkZXIgPSAoZnVuY3Rpb24oKXtcblx0XHR2YXIgcHJlbG9hZEVsZW1zLCBpc0NvbXBsZXRlZCwgcmVzZXRQcmVsb2FkaW5nVGltZXIsIGxvYWRNb2RlLCBzdGFydGVkO1xuXG5cdFx0dmFyIGVMdlcsIGVsdkgsIGVMdG9wLCBlTGxlZnQsIGVMcmlnaHQsIGVMYm90dG9tLCBpc0JvZHlIaWRkZW47XG5cblx0XHR2YXIgcmVnSW1nID0gL15pbWckL2k7XG5cdFx0dmFyIHJlZ0lmcmFtZSA9IC9eaWZyYW1lJC9pO1xuXG5cdFx0dmFyIHN1cHBvcnRTY3JvbGwgPSAoJ29uc2Nyb2xsJyBpbiB3aW5kb3cpICYmICEoLyhnbGV8aW5nKWJvdC8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSk7XG5cblx0XHR2YXIgc2hyaW5rRXhwYW5kID0gMDtcblx0XHR2YXIgY3VycmVudEV4cGFuZCA9IDA7XG5cblx0XHR2YXIgaXNMb2FkaW5nID0gMDtcblx0XHR2YXIgbG93UnVucyA9IC0xO1xuXG5cdFx0dmFyIHJlc2V0UHJlbG9hZGluZyA9IGZ1bmN0aW9uKGUpe1xuXHRcdFx0aXNMb2FkaW5nLS07XG5cdFx0XHRpZighZSB8fCBpc0xvYWRpbmcgPCAwIHx8ICFlLnRhcmdldCl7XG5cdFx0XHRcdGlzTG9hZGluZyA9IDA7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHZhciBpc1Zpc2libGUgPSBmdW5jdGlvbiAoZWxlbSkge1xuXHRcdFx0aWYgKGlzQm9keUhpZGRlbiA9PSBudWxsKSB7XG5cdFx0XHRcdGlzQm9keUhpZGRlbiA9IGdldENTUyhkb2N1bWVudC5ib2R5LCAndmlzaWJpbGl0eScpID09ICdoaWRkZW4nO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gaXNCb2R5SGlkZGVuIHx8ICEoZ2V0Q1NTKGVsZW0ucGFyZW50Tm9kZSwgJ3Zpc2liaWxpdHknKSA9PSAnaGlkZGVuJyAmJiBnZXRDU1MoZWxlbSwgJ3Zpc2liaWxpdHknKSA9PSAnaGlkZGVuJyk7XG5cdFx0fTtcblxuXHRcdHZhciBpc05lc3RlZFZpc2libGUgPSBmdW5jdGlvbihlbGVtLCBlbGVtRXhwYW5kKXtcblx0XHRcdHZhciBvdXRlclJlY3Q7XG5cdFx0XHR2YXIgcGFyZW50ID0gZWxlbTtcblx0XHRcdHZhciB2aXNpYmxlID0gaXNWaXNpYmxlKGVsZW0pO1xuXG5cdFx0XHRlTHRvcCAtPSBlbGVtRXhwYW5kO1xuXHRcdFx0ZUxib3R0b20gKz0gZWxlbUV4cGFuZDtcblx0XHRcdGVMbGVmdCAtPSBlbGVtRXhwYW5kO1xuXHRcdFx0ZUxyaWdodCArPSBlbGVtRXhwYW5kO1xuXG5cdFx0XHR3aGlsZSh2aXNpYmxlICYmIChwYXJlbnQgPSBwYXJlbnQub2Zmc2V0UGFyZW50KSAmJiBwYXJlbnQgIT0gZG9jdW1lbnQuYm9keSAmJiBwYXJlbnQgIT0gZG9jRWxlbSl7XG5cdFx0XHRcdHZpc2libGUgPSAoKGdldENTUyhwYXJlbnQsICdvcGFjaXR5JykgfHwgMSkgPiAwKTtcblxuXHRcdFx0XHRpZih2aXNpYmxlICYmIGdldENTUyhwYXJlbnQsICdvdmVyZmxvdycpICE9ICd2aXNpYmxlJyl7XG5cdFx0XHRcdFx0b3V0ZXJSZWN0ID0gcGFyZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXHRcdFx0XHRcdHZpc2libGUgPSBlTHJpZ2h0ID4gb3V0ZXJSZWN0LmxlZnQgJiZcblx0XHRcdFx0XHRcdGVMbGVmdCA8IG91dGVyUmVjdC5yaWdodCAmJlxuXHRcdFx0XHRcdFx0ZUxib3R0b20gPiBvdXRlclJlY3QudG9wIC0gMSAmJlxuXHRcdFx0XHRcdFx0ZUx0b3AgPCBvdXRlclJlY3QuYm90dG9tICsgMVxuXHRcdFx0XHRcdDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdmlzaWJsZTtcblx0XHR9O1xuXG5cdFx0dmFyIGNoZWNrRWxlbWVudHMgPSBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBlTGxlbiwgaSwgcmVjdCwgYXV0b0xvYWRFbGVtLCBsb2FkZWRTb21ldGhpbmcsIGVsZW1FeHBhbmQsIGVsZW1OZWdhdGl2ZUV4cGFuZCwgZWxlbUV4cGFuZFZhbCxcblx0XHRcdFx0YmVmb3JlRXhwYW5kVmFsLCBkZWZhdWx0RXhwYW5kLCBwcmVsb2FkRXhwYW5kLCBoRmFjO1xuXHRcdFx0dmFyIGxhenlsb2FkRWxlbXMgPSBsYXp5c2l6ZXMuZWxlbWVudHM7XG5cblx0XHRcdGlmKChsb2FkTW9kZSA9IGxhenlTaXplc0NmZy5sb2FkTW9kZSkgJiYgaXNMb2FkaW5nIDwgOCAmJiAoZUxsZW4gPSBsYXp5bG9hZEVsZW1zLmxlbmd0aCkpe1xuXG5cdFx0XHRcdGkgPSAwO1xuXG5cdFx0XHRcdGxvd1J1bnMrKztcblxuXHRcdFx0XHRmb3IoOyBpIDwgZUxsZW47IGkrKyl7XG5cblx0XHRcdFx0XHRpZighbGF6eWxvYWRFbGVtc1tpXSB8fCBsYXp5bG9hZEVsZW1zW2ldLl9sYXp5UmFjZSl7Y29udGludWU7fVxuXG5cdFx0XHRcdFx0aWYoIXN1cHBvcnRTY3JvbGwgfHwgKGxhenlzaXplcy5wcmVtYXR1cmVVbnZlaWwgJiYgbGF6eXNpemVzLnByZW1hdHVyZVVudmVpbChsYXp5bG9hZEVsZW1zW2ldKSkpe3VudmVpbEVsZW1lbnQobGF6eWxvYWRFbGVtc1tpXSk7Y29udGludWU7fVxuXG5cdFx0XHRcdFx0aWYoIShlbGVtRXhwYW5kVmFsID0gbGF6eWxvYWRFbGVtc1tpXVtfZ2V0QXR0cmlidXRlXSgnZGF0YS1leHBhbmQnKSkgfHwgIShlbGVtRXhwYW5kID0gZWxlbUV4cGFuZFZhbCAqIDEpKXtcblx0XHRcdFx0XHRcdGVsZW1FeHBhbmQgPSBjdXJyZW50RXhwYW5kO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmICghZGVmYXVsdEV4cGFuZCkge1xuXHRcdFx0XHRcdFx0ZGVmYXVsdEV4cGFuZCA9ICghbGF6eVNpemVzQ2ZnLmV4cGFuZCB8fCBsYXp5U2l6ZXNDZmcuZXhwYW5kIDwgMSkgP1xuXHRcdFx0XHRcdFx0XHRkb2NFbGVtLmNsaWVudEhlaWdodCA+IDUwMCAmJiBkb2NFbGVtLmNsaWVudFdpZHRoID4gNTAwID8gNTAwIDogMzcwIDpcblx0XHRcdFx0XHRcdFx0bGF6eVNpemVzQ2ZnLmV4cGFuZDtcblxuXHRcdFx0XHRcdFx0bGF6eXNpemVzLl9kZWZFeCA9IGRlZmF1bHRFeHBhbmQ7XG5cblx0XHRcdFx0XHRcdHByZWxvYWRFeHBhbmQgPSBkZWZhdWx0RXhwYW5kICogbGF6eVNpemVzQ2ZnLmV4cEZhY3Rvcjtcblx0XHRcdFx0XHRcdGhGYWMgPSBsYXp5U2l6ZXNDZmcuaEZhYztcblx0XHRcdFx0XHRcdGlzQm9keUhpZGRlbiA9IG51bGw7XG5cblx0XHRcdFx0XHRcdGlmKGN1cnJlbnRFeHBhbmQgPCBwcmVsb2FkRXhwYW5kICYmIGlzTG9hZGluZyA8IDEgJiYgbG93UnVucyA+IDIgJiYgbG9hZE1vZGUgPiAyICYmICFkb2N1bWVudC5oaWRkZW4pe1xuXHRcdFx0XHRcdFx0XHRjdXJyZW50RXhwYW5kID0gcHJlbG9hZEV4cGFuZDtcblx0XHRcdFx0XHRcdFx0bG93UnVucyA9IDA7XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYobG9hZE1vZGUgPiAxICYmIGxvd1J1bnMgPiAxICYmIGlzTG9hZGluZyA8IDYpe1xuXHRcdFx0XHRcdFx0XHRjdXJyZW50RXhwYW5kID0gZGVmYXVsdEV4cGFuZDtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGN1cnJlbnRFeHBhbmQgPSBzaHJpbmtFeHBhbmQ7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYoYmVmb3JlRXhwYW5kVmFsICE9PSBlbGVtRXhwYW5kKXtcblx0XHRcdFx0XHRcdGVMdlcgPSBpbm5lcldpZHRoICsgKGVsZW1FeHBhbmQgKiBoRmFjKTtcblx0XHRcdFx0XHRcdGVsdkggPSBpbm5lckhlaWdodCArIGVsZW1FeHBhbmQ7XG5cdFx0XHRcdFx0XHRlbGVtTmVnYXRpdmVFeHBhbmQgPSBlbGVtRXhwYW5kICogLTE7XG5cdFx0XHRcdFx0XHRiZWZvcmVFeHBhbmRWYWwgPSBlbGVtRXhwYW5kO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJlY3QgPSBsYXp5bG9hZEVsZW1zW2ldLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG5cdFx0XHRcdFx0aWYgKChlTGJvdHRvbSA9IHJlY3QuYm90dG9tKSA+PSBlbGVtTmVnYXRpdmVFeHBhbmQgJiZcblx0XHRcdFx0XHRcdChlTHRvcCA9IHJlY3QudG9wKSA8PSBlbHZIICYmXG5cdFx0XHRcdFx0XHQoZUxyaWdodCA9IHJlY3QucmlnaHQpID49IGVsZW1OZWdhdGl2ZUV4cGFuZCAqIGhGYWMgJiZcblx0XHRcdFx0XHRcdChlTGxlZnQgPSByZWN0LmxlZnQpIDw9IGVMdlcgJiZcblx0XHRcdFx0XHRcdChlTGJvdHRvbSB8fCBlTHJpZ2h0IHx8IGVMbGVmdCB8fCBlTHRvcCkgJiZcblx0XHRcdFx0XHRcdChsYXp5U2l6ZXNDZmcubG9hZEhpZGRlbiB8fCBpc1Zpc2libGUobGF6eWxvYWRFbGVtc1tpXSkpICYmXG5cdFx0XHRcdFx0XHQoKGlzQ29tcGxldGVkICYmIGlzTG9hZGluZyA8IDMgJiYgIWVsZW1FeHBhbmRWYWwgJiYgKGxvYWRNb2RlIDwgMyB8fCBsb3dSdW5zIDwgNCkpIHx8IGlzTmVzdGVkVmlzaWJsZShsYXp5bG9hZEVsZW1zW2ldLCBlbGVtRXhwYW5kKSkpe1xuXHRcdFx0XHRcdFx0dW52ZWlsRWxlbWVudChsYXp5bG9hZEVsZW1zW2ldKTtcblx0XHRcdFx0XHRcdGxvYWRlZFNvbWV0aGluZyA9IHRydWU7XG5cdFx0XHRcdFx0XHRpZihpc0xvYWRpbmcgPiA5KXticmVhazt9XG5cdFx0XHRcdFx0fSBlbHNlIGlmKCFsb2FkZWRTb21ldGhpbmcgJiYgaXNDb21wbGV0ZWQgJiYgIWF1dG9Mb2FkRWxlbSAmJlxuXHRcdFx0XHRcdFx0aXNMb2FkaW5nIDwgNCAmJiBsb3dSdW5zIDwgNCAmJiBsb2FkTW9kZSA+IDIgJiZcblx0XHRcdFx0XHRcdChwcmVsb2FkRWxlbXNbMF0gfHwgbGF6eVNpemVzQ2ZnLnByZWxvYWRBZnRlckxvYWQpICYmXG5cdFx0XHRcdFx0XHQocHJlbG9hZEVsZW1zWzBdIHx8ICghZWxlbUV4cGFuZFZhbCAmJiAoKGVMYm90dG9tIHx8IGVMcmlnaHQgfHwgZUxsZWZ0IHx8IGVMdG9wKSB8fCBsYXp5bG9hZEVsZW1zW2ldW19nZXRBdHRyaWJ1dGVdKGxhenlTaXplc0NmZy5zaXplc0F0dHIpICE9ICdhdXRvJykpKSl7XG5cdFx0XHRcdFx0XHRhdXRvTG9hZEVsZW0gPSBwcmVsb2FkRWxlbXNbMF0gfHwgbGF6eWxvYWRFbGVtc1tpXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZihhdXRvTG9hZEVsZW0gJiYgIWxvYWRlZFNvbWV0aGluZyl7XG5cdFx0XHRcdFx0dW52ZWlsRWxlbWVudChhdXRvTG9hZEVsZW0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHZhciB0aHJvdHRsZWRDaGVja0VsZW1lbnRzID0gdGhyb3R0bGUoY2hlY2tFbGVtZW50cyk7XG5cblx0XHR2YXIgc3dpdGNoTG9hZGluZ0NsYXNzID0gZnVuY3Rpb24oZSl7XG5cdFx0XHR2YXIgZWxlbSA9IGUudGFyZ2V0O1xuXG5cdFx0XHRpZiAoZWxlbS5fbGF6eUNhY2hlKSB7XG5cdFx0XHRcdGRlbGV0ZSBlbGVtLl9sYXp5Q2FjaGU7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0cmVzZXRQcmVsb2FkaW5nKGUpO1xuXHRcdFx0YWRkQ2xhc3MoZWxlbSwgbGF6eVNpemVzQ2ZnLmxvYWRlZENsYXNzKTtcblx0XHRcdHJlbW92ZUNsYXNzKGVsZW0sIGxhenlTaXplc0NmZy5sb2FkaW5nQ2xhc3MpO1xuXHRcdFx0YWRkUmVtb3ZlTG9hZEV2ZW50cyhlbGVtLCByYWZTd2l0Y2hMb2FkaW5nQ2xhc3MpO1xuXHRcdFx0dHJpZ2dlckV2ZW50KGVsZW0sICdsYXp5bG9hZGVkJyk7XG5cdFx0fTtcblx0XHR2YXIgcmFmZWRTd2l0Y2hMb2FkaW5nQ2xhc3MgPSByQUZJdChzd2l0Y2hMb2FkaW5nQ2xhc3MpO1xuXHRcdHZhciByYWZTd2l0Y2hMb2FkaW5nQ2xhc3MgPSBmdW5jdGlvbihlKXtcblx0XHRcdHJhZmVkU3dpdGNoTG9hZGluZ0NsYXNzKHt0YXJnZXQ6IGUudGFyZ2V0fSk7XG5cdFx0fTtcblxuXHRcdHZhciBjaGFuZ2VJZnJhbWVTcmMgPSBmdW5jdGlvbihlbGVtLCBzcmMpe1xuXHRcdFx0dmFyIGxvYWRNb2RlID0gZWxlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtbG9hZC1tb2RlJykgfHwgbGF6eVNpemVzQ2ZnLmlmcmFtZUxvYWRNb2RlO1xuXG5cdFx0XHQvLyBsb2FkTW9kZSBjYW4gYmUgYWxzbyBhIHN0cmluZyFcblx0XHRcdGlmIChsb2FkTW9kZSA9PSAwKSB7XG5cdFx0XHRcdGVsZW0uY29udGVudFdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKHNyYyk7XG5cdFx0XHR9IGVsc2UgaWYgKGxvYWRNb2RlID09IDEpIHtcblx0XHRcdFx0ZWxlbS5zcmMgPSBzcmM7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHZhciBoYW5kbGVTb3VyY2VzID0gZnVuY3Rpb24oc291cmNlKXtcblx0XHRcdHZhciBjdXN0b21NZWRpYTtcblxuXHRcdFx0dmFyIHNvdXJjZVNyY3NldCA9IHNvdXJjZVtfZ2V0QXR0cmlidXRlXShsYXp5U2l6ZXNDZmcuc3Jjc2V0QXR0cik7XG5cblx0XHRcdGlmKCAoY3VzdG9tTWVkaWEgPSBsYXp5U2l6ZXNDZmcuY3VzdG9tTWVkaWFbc291cmNlW19nZXRBdHRyaWJ1dGVdKCdkYXRhLW1lZGlhJykgfHwgc291cmNlW19nZXRBdHRyaWJ1dGVdKCdtZWRpYScpXSkgKXtcblx0XHRcdFx0c291cmNlLnNldEF0dHJpYnV0ZSgnbWVkaWEnLCBjdXN0b21NZWRpYSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmKHNvdXJjZVNyY3NldCl7XG5cdFx0XHRcdHNvdXJjZS5zZXRBdHRyaWJ1dGUoJ3NyY3NldCcsIHNvdXJjZVNyY3NldCk7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHZhciBsYXp5VW52ZWlsID0gckFGSXQoZnVuY3Rpb24gKGVsZW0sIGRldGFpbCwgaXNBdXRvLCBzaXplcywgaXNJbWcpe1xuXHRcdFx0dmFyIHNyYywgc3Jjc2V0LCBwYXJlbnQsIGlzUGljdHVyZSwgZXZlbnQsIGZpcmVzTG9hZDtcblxuXHRcdFx0aWYoIShldmVudCA9IHRyaWdnZXJFdmVudChlbGVtLCAnbGF6eWJlZm9yZXVudmVpbCcsIGRldGFpbCkpLmRlZmF1bHRQcmV2ZW50ZWQpe1xuXG5cdFx0XHRcdGlmKHNpemVzKXtcblx0XHRcdFx0XHRpZihpc0F1dG8pe1xuXHRcdFx0XHRcdFx0YWRkQ2xhc3MoZWxlbSwgbGF6eVNpemVzQ2ZnLmF1dG9zaXplc0NsYXNzKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0ZWxlbS5zZXRBdHRyaWJ1dGUoJ3NpemVzJywgc2l6ZXMpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHNyY3NldCA9IGVsZW1bX2dldEF0dHJpYnV0ZV0obGF6eVNpemVzQ2ZnLnNyY3NldEF0dHIpO1xuXHRcdFx0XHRzcmMgPSBlbGVtW19nZXRBdHRyaWJ1dGVdKGxhenlTaXplc0NmZy5zcmNBdHRyKTtcblxuXHRcdFx0XHRpZihpc0ltZykge1xuXHRcdFx0XHRcdHBhcmVudCA9IGVsZW0ucGFyZW50Tm9kZTtcblx0XHRcdFx0XHRpc1BpY3R1cmUgPSBwYXJlbnQgJiYgcmVnUGljdHVyZS50ZXN0KHBhcmVudC5ub2RlTmFtZSB8fCAnJyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRmaXJlc0xvYWQgPSBkZXRhaWwuZmlyZXNMb2FkIHx8ICgoJ3NyYycgaW4gZWxlbSkgJiYgKHNyY3NldCB8fCBzcmMgfHwgaXNQaWN0dXJlKSk7XG5cblx0XHRcdFx0ZXZlbnQgPSB7dGFyZ2V0OiBlbGVtfTtcblxuXHRcdFx0XHRhZGRDbGFzcyhlbGVtLCBsYXp5U2l6ZXNDZmcubG9hZGluZ0NsYXNzKTtcblxuXHRcdFx0XHRpZihmaXJlc0xvYWQpe1xuXHRcdFx0XHRcdGNsZWFyVGltZW91dChyZXNldFByZWxvYWRpbmdUaW1lcik7XG5cdFx0XHRcdFx0cmVzZXRQcmVsb2FkaW5nVGltZXIgPSBzZXRUaW1lb3V0KHJlc2V0UHJlbG9hZGluZywgMjUwMCk7XG5cdFx0XHRcdFx0YWRkUmVtb3ZlTG9hZEV2ZW50cyhlbGVtLCByYWZTd2l0Y2hMb2FkaW5nQ2xhc3MsIHRydWUpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYoaXNQaWN0dXJlKXtcblx0XHRcdFx0XHRmb3JFYWNoLmNhbGwocGFyZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzb3VyY2UnKSwgaGFuZGxlU291cmNlcyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZihzcmNzZXQpe1xuXHRcdFx0XHRcdGVsZW0uc2V0QXR0cmlidXRlKCdzcmNzZXQnLCBzcmNzZXQpO1xuXHRcdFx0XHR9IGVsc2UgaWYoc3JjICYmICFpc1BpY3R1cmUpe1xuXHRcdFx0XHRcdGlmKHJlZ0lmcmFtZS50ZXN0KGVsZW0ubm9kZU5hbWUpKXtcblx0XHRcdFx0XHRcdGNoYW5nZUlmcmFtZVNyYyhlbGVtLCBzcmMpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRlbGVtLnNyYyA9IHNyYztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZihpc0ltZyAmJiAoc3Jjc2V0IHx8IGlzUGljdHVyZSkpe1xuXHRcdFx0XHRcdHVwZGF0ZVBvbHlmaWxsKGVsZW0sIHtzcmM6IHNyY30pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmKGVsZW0uX2xhenlSYWNlKXtcblx0XHRcdFx0ZGVsZXRlIGVsZW0uX2xhenlSYWNlO1xuXHRcdFx0fVxuXHRcdFx0cmVtb3ZlQ2xhc3MoZWxlbSwgbGF6eVNpemVzQ2ZnLmxhenlDbGFzcyk7XG5cblx0XHRcdHJBRihmdW5jdGlvbigpe1xuXHRcdFx0XHQvLyBQYXJ0IG9mIHRoaXMgY2FuIGJlIHJlbW92ZWQgYXMgc29vbiBhcyB0aGlzIGZpeCBpcyBvbGRlcjogaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NzczMSAoMjAxNSlcblx0XHRcdFx0dmFyIGlzTG9hZGVkID0gZWxlbS5jb21wbGV0ZSAmJiBlbGVtLm5hdHVyYWxXaWR0aCA+IDE7XG5cblx0XHRcdFx0aWYoICFmaXJlc0xvYWQgfHwgaXNMb2FkZWQpe1xuXHRcdFx0XHRcdGlmIChpc0xvYWRlZCkge1xuXHRcdFx0XHRcdFx0YWRkQ2xhc3MoZWxlbSwgbGF6eVNpemVzQ2ZnLmZhc3RMb2FkZWRDbGFzcyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHN3aXRjaExvYWRpbmdDbGFzcyhldmVudCk7XG5cdFx0XHRcdFx0ZWxlbS5fbGF6eUNhY2hlID0gdHJ1ZTtcblx0XHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0XHRpZiAoJ19sYXp5Q2FjaGUnIGluIGVsZW0pIHtcblx0XHRcdFx0XHRcdFx0ZGVsZXRlIGVsZW0uX2xhenlDYWNoZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LCA5KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoZWxlbS5sb2FkaW5nID09ICdsYXp5Jykge1xuXHRcdFx0XHRcdGlzTG9hZGluZy0tO1xuXHRcdFx0XHR9XG5cdFx0XHR9LCB0cnVlKTtcblx0XHR9KTtcblxuXHRcdC8qKlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIGVsZW0geyBFbGVtZW50IH1cblx0XHQgKi9cblx0XHR2YXIgdW52ZWlsRWxlbWVudCA9IGZ1bmN0aW9uIChlbGVtKXtcblx0XHRcdGlmIChlbGVtLl9sYXp5UmFjZSkge3JldHVybjt9XG5cdFx0XHR2YXIgZGV0YWlsO1xuXG5cdFx0XHR2YXIgaXNJbWcgPSByZWdJbWcudGVzdChlbGVtLm5vZGVOYW1lKTtcblxuXHRcdFx0Ly9hbGxvdyB1c2luZyBzaXplcz1cImF1dG9cIiwgYnV0IGRvbid0IHVzZS4gaXQncyBpbnZhbGlkLiBVc2UgZGF0YS1zaXplcz1cImF1dG9cIiBvciBhIHZhbGlkIHZhbHVlIGZvciBzaXplcyBpbnN0ZWFkIChpLmUuOiBzaXplcz1cIjgwdndcIilcblx0XHRcdHZhciBzaXplcyA9IGlzSW1nICYmIChlbGVtW19nZXRBdHRyaWJ1dGVdKGxhenlTaXplc0NmZy5zaXplc0F0dHIpIHx8IGVsZW1bX2dldEF0dHJpYnV0ZV0oJ3NpemVzJykpO1xuXHRcdFx0dmFyIGlzQXV0byA9IHNpemVzID09ICdhdXRvJztcblxuXHRcdFx0aWYoIChpc0F1dG8gfHwgIWlzQ29tcGxldGVkKSAmJiBpc0ltZyAmJiAoZWxlbVtfZ2V0QXR0cmlidXRlXSgnc3JjJykgfHwgZWxlbS5zcmNzZXQpICYmICFlbGVtLmNvbXBsZXRlICYmICFoYXNDbGFzcyhlbGVtLCBsYXp5U2l6ZXNDZmcuZXJyb3JDbGFzcykgJiYgaGFzQ2xhc3MoZWxlbSwgbGF6eVNpemVzQ2ZnLmxhenlDbGFzcykpe3JldHVybjt9XG5cblx0XHRcdGRldGFpbCA9IHRyaWdnZXJFdmVudChlbGVtLCAnbGF6eXVudmVpbHJlYWQnKS5kZXRhaWw7XG5cblx0XHRcdGlmKGlzQXV0byl7XG5cdFx0XHRcdCBhdXRvU2l6ZXIudXBkYXRlRWxlbShlbGVtLCB0cnVlLCBlbGVtLm9mZnNldFdpZHRoKTtcblx0XHRcdH1cblxuXHRcdFx0ZWxlbS5fbGF6eVJhY2UgPSB0cnVlO1xuXHRcdFx0aXNMb2FkaW5nKys7XG5cblx0XHRcdGxhenlVbnZlaWwoZWxlbSwgZGV0YWlsLCBpc0F1dG8sIHNpemVzLCBpc0ltZyk7XG5cdFx0fTtcblxuXHRcdHZhciBhZnRlclNjcm9sbCA9IGRlYm91bmNlKGZ1bmN0aW9uKCl7XG5cdFx0XHRsYXp5U2l6ZXNDZmcubG9hZE1vZGUgPSAzO1xuXHRcdFx0dGhyb3R0bGVkQ2hlY2tFbGVtZW50cygpO1xuXHRcdH0pO1xuXG5cdFx0dmFyIGFsdExvYWRtb2RlU2Nyb2xsTGlzdG5lciA9IGZ1bmN0aW9uKCl7XG5cdFx0XHRpZihsYXp5U2l6ZXNDZmcubG9hZE1vZGUgPT0gMyl7XG5cdFx0XHRcdGxhenlTaXplc0NmZy5sb2FkTW9kZSA9IDI7XG5cdFx0XHR9XG5cdFx0XHRhZnRlclNjcm9sbCgpO1xuXHRcdH07XG5cblx0XHR2YXIgb25sb2FkID0gZnVuY3Rpb24oKXtcblx0XHRcdGlmKGlzQ29tcGxldGVkKXtyZXR1cm47fVxuXHRcdFx0aWYoRGF0ZS5ub3coKSAtIHN0YXJ0ZWQgPCA5OTkpe1xuXHRcdFx0XHRzZXRUaW1lb3V0KG9ubG9hZCwgOTk5KTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cblx0XHRcdGlzQ29tcGxldGVkID0gdHJ1ZTtcblxuXHRcdFx0bGF6eVNpemVzQ2ZnLmxvYWRNb2RlID0gMztcblxuXHRcdFx0dGhyb3R0bGVkQ2hlY2tFbGVtZW50cygpO1xuXG5cdFx0XHRhZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBhbHRMb2FkbW9kZVNjcm9sbExpc3RuZXIsIHRydWUpO1xuXHRcdH07XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0XzogZnVuY3Rpb24oKXtcblx0XHRcdFx0c3RhcnRlZCA9IERhdGUubm93KCk7XG5cblx0XHRcdFx0bGF6eXNpemVzLmVsZW1lbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShsYXp5U2l6ZXNDZmcubGF6eUNsYXNzKTtcblx0XHRcdFx0cHJlbG9hZEVsZW1zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShsYXp5U2l6ZXNDZmcubGF6eUNsYXNzICsgJyAnICsgbGF6eVNpemVzQ2ZnLnByZWxvYWRDbGFzcyk7XG5cblx0XHRcdFx0YWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhyb3R0bGVkQ2hlY2tFbGVtZW50cywgdHJ1ZSk7XG5cblx0XHRcdFx0YWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhyb3R0bGVkQ2hlY2tFbGVtZW50cywgdHJ1ZSk7XG5cblx0XHRcdFx0YWRkRXZlbnRMaXN0ZW5lcigncGFnZXNob3cnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdGlmIChlLnBlcnNpc3RlZCkge1xuXHRcdFx0XHRcdFx0dmFyIGxvYWRpbmdFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy4nICsgbGF6eVNpemVzQ2ZnLmxvYWRpbmdDbGFzcyk7XG5cblx0XHRcdFx0XHRcdGlmIChsb2FkaW5nRWxlbWVudHMubGVuZ3RoICYmIGxvYWRpbmdFbGVtZW50cy5mb3JFYWNoKSB7XG5cdFx0XHRcdFx0XHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRcdFx0bG9hZGluZ0VsZW1lbnRzLmZvckVhY2goIGZ1bmN0aW9uIChpbWcpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChpbWcuY29tcGxldGUpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dW52ZWlsRWxlbWVudChpbWcpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGlmKHdpbmRvdy5NdXRhdGlvbk9ic2VydmVyKXtcblx0XHRcdFx0XHRuZXcgTXV0YXRpb25PYnNlcnZlciggdGhyb3R0bGVkQ2hlY2tFbGVtZW50cyApLm9ic2VydmUoIGRvY0VsZW0sIHtjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWUsIGF0dHJpYnV0ZXM6IHRydWV9ICk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0ZG9jRWxlbVtfYWRkRXZlbnRMaXN0ZW5lcl0oJ0RPTU5vZGVJbnNlcnRlZCcsIHRocm90dGxlZENoZWNrRWxlbWVudHMsIHRydWUpO1xuXHRcdFx0XHRcdGRvY0VsZW1bX2FkZEV2ZW50TGlzdGVuZXJdKCdET01BdHRyTW9kaWZpZWQnLCB0aHJvdHRsZWRDaGVja0VsZW1lbnRzLCB0cnVlKTtcblx0XHRcdFx0XHRzZXRJbnRlcnZhbCh0aHJvdHRsZWRDaGVja0VsZW1lbnRzLCA5OTkpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIHRocm90dGxlZENoZWNrRWxlbWVudHMsIHRydWUpO1xuXG5cdFx0XHRcdC8vLCAnZnVsbHNjcmVlbmNoYW5nZSdcblx0XHRcdFx0Wydmb2N1cycsICdtb3VzZW92ZXInLCAnY2xpY2snLCAnbG9hZCcsICd0cmFuc2l0aW9uZW5kJywgJ2FuaW1hdGlvbmVuZCddLmZvckVhY2goZnVuY3Rpb24obmFtZSl7XG5cdFx0XHRcdFx0ZG9jdW1lbnRbX2FkZEV2ZW50TGlzdGVuZXJdKG5hbWUsIHRocm90dGxlZENoZWNrRWxlbWVudHMsIHRydWUpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRpZigoL2QkfF5jLy50ZXN0KGRvY3VtZW50LnJlYWR5U3RhdGUpKSl7XG5cdFx0XHRcdFx0b25sb2FkKCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0YWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIG9ubG9hZCk7XG5cdFx0XHRcdFx0ZG9jdW1lbnRbX2FkZEV2ZW50TGlzdGVuZXJdKCdET01Db250ZW50TG9hZGVkJywgdGhyb3R0bGVkQ2hlY2tFbGVtZW50cyk7XG5cdFx0XHRcdFx0c2V0VGltZW91dChvbmxvYWQsIDIwMDAwKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmKGxhenlzaXplcy5lbGVtZW50cy5sZW5ndGgpe1xuXHRcdFx0XHRcdGNoZWNrRWxlbWVudHMoKTtcblx0XHRcdFx0XHRyQUYuX2xzRmx1c2goKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aHJvdHRsZWRDaGVja0VsZW1lbnRzKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRjaGVja0VsZW1zOiB0aHJvdHRsZWRDaGVja0VsZW1lbnRzLFxuXHRcdFx0dW52ZWlsOiB1bnZlaWxFbGVtZW50LFxuXHRcdFx0X2FMU0w6IGFsdExvYWRtb2RlU2Nyb2xsTGlzdG5lcixcblx0XHR9O1xuXHR9KSgpO1xuXG5cblx0dmFyIGF1dG9TaXplciA9IChmdW5jdGlvbigpe1xuXHRcdHZhciBhdXRvc2l6ZXNFbGVtcztcblxuXHRcdHZhciBzaXplRWxlbWVudCA9IHJBRkl0KGZ1bmN0aW9uKGVsZW0sIHBhcmVudCwgZXZlbnQsIHdpZHRoKXtcblx0XHRcdHZhciBzb3VyY2VzLCBpLCBsZW47XG5cdFx0XHRlbGVtLl9sYXp5c2l6ZXNXaWR0aCA9IHdpZHRoO1xuXHRcdFx0d2lkdGggKz0gJ3B4JztcblxuXHRcdFx0ZWxlbS5zZXRBdHRyaWJ1dGUoJ3NpemVzJywgd2lkdGgpO1xuXG5cdFx0XHRpZihyZWdQaWN0dXJlLnRlc3QocGFyZW50Lm5vZGVOYW1lIHx8ICcnKSl7XG5cdFx0XHRcdHNvdXJjZXMgPSBwYXJlbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NvdXJjZScpO1xuXHRcdFx0XHRmb3IoaSA9IDAsIGxlbiA9IHNvdXJjZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspe1xuXHRcdFx0XHRcdHNvdXJjZXNbaV0uc2V0QXR0cmlidXRlKCdzaXplcycsIHdpZHRoKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZighZXZlbnQuZGV0YWlsLmRhdGFBdHRyKXtcblx0XHRcdFx0dXBkYXRlUG9seWZpbGwoZWxlbSwgZXZlbnQuZGV0YWlsKTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHQvKipcblx0XHQgKlxuXHRcdCAqIEBwYXJhbSBlbGVtIHtFbGVtZW50fVxuXHRcdCAqIEBwYXJhbSBkYXRhQXR0clxuXHRcdCAqIEBwYXJhbSBbd2lkdGhdIHsgbnVtYmVyIH1cblx0XHQgKi9cblx0XHR2YXIgZ2V0U2l6ZUVsZW1lbnQgPSBmdW5jdGlvbiAoZWxlbSwgZGF0YUF0dHIsIHdpZHRoKXtcblx0XHRcdHZhciBldmVudDtcblx0XHRcdHZhciBwYXJlbnQgPSBlbGVtLnBhcmVudE5vZGU7XG5cblx0XHRcdGlmKHBhcmVudCl7XG5cdFx0XHRcdHdpZHRoID0gZ2V0V2lkdGgoZWxlbSwgcGFyZW50LCB3aWR0aCk7XG5cdFx0XHRcdGV2ZW50ID0gdHJpZ2dlckV2ZW50KGVsZW0sICdsYXp5YmVmb3Jlc2l6ZXMnLCB7d2lkdGg6IHdpZHRoLCBkYXRhQXR0cjogISFkYXRhQXR0cn0pO1xuXG5cdFx0XHRcdGlmKCFldmVudC5kZWZhdWx0UHJldmVudGVkKXtcblx0XHRcdFx0XHR3aWR0aCA9IGV2ZW50LmRldGFpbC53aWR0aDtcblxuXHRcdFx0XHRcdGlmKHdpZHRoICYmIHdpZHRoICE9PSBlbGVtLl9sYXp5c2l6ZXNXaWR0aCl7XG5cdFx0XHRcdFx0XHRzaXplRWxlbWVudChlbGVtLCBwYXJlbnQsIGV2ZW50LCB3aWR0aCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHZhciB1cGRhdGVFbGVtZW50c1NpemVzID0gZnVuY3Rpb24oKXtcblx0XHRcdHZhciBpO1xuXHRcdFx0dmFyIGxlbiA9IGF1dG9zaXplc0VsZW1zLmxlbmd0aDtcblx0XHRcdGlmKGxlbil7XG5cdFx0XHRcdGkgPSAwO1xuXG5cdFx0XHRcdGZvcig7IGkgPCBsZW47IGkrKyl7XG5cdFx0XHRcdFx0Z2V0U2l6ZUVsZW1lbnQoYXV0b3NpemVzRWxlbXNbaV0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHZhciBkZWJvdW5jZWRVcGRhdGVFbGVtZW50c1NpemVzID0gZGVib3VuY2UodXBkYXRlRWxlbWVudHNTaXplcyk7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0XzogZnVuY3Rpb24oKXtcblx0XHRcdFx0YXV0b3NpemVzRWxlbXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGxhenlTaXplc0NmZy5hdXRvc2l6ZXNDbGFzcyk7XG5cdFx0XHRcdGFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGRlYm91bmNlZFVwZGF0ZUVsZW1lbnRzU2l6ZXMpO1xuXHRcdFx0fSxcblx0XHRcdGNoZWNrRWxlbXM6IGRlYm91bmNlZFVwZGF0ZUVsZW1lbnRzU2l6ZXMsXG5cdFx0XHR1cGRhdGVFbGVtOiBnZXRTaXplRWxlbWVudFxuXHRcdH07XG5cdH0pKCk7XG5cblx0dmFyIGluaXQgPSBmdW5jdGlvbigpe1xuXHRcdGlmKCFpbml0LmkgJiYgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSl7XG5cdFx0XHRpbml0LmkgPSB0cnVlO1xuXHRcdFx0YXV0b1NpemVyLl8oKTtcblx0XHRcdGxvYWRlci5fKCk7XG5cdFx0fVxuXHR9O1xuXG5cdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRpZihsYXp5U2l6ZXNDZmcuaW5pdCl7XG5cdFx0XHRpbml0KCk7XG5cdFx0fVxuXHR9KTtcblxuXHRsYXp5c2l6ZXMgPSB7XG5cdFx0LyoqXG5cdFx0ICogQHR5cGUgeyBMYXp5U2l6ZXNDb25maWdQYXJ0aWFsIH1cblx0XHQgKi9cblx0XHRjZmc6IGxhenlTaXplc0NmZyxcblx0XHRhdXRvU2l6ZXI6IGF1dG9TaXplcixcblx0XHRsb2FkZXI6IGxvYWRlcixcblx0XHRpbml0OiBpbml0LFxuXHRcdHVQOiB1cGRhdGVQb2x5ZmlsbCxcblx0XHRhQzogYWRkQ2xhc3MsXG5cdFx0ckM6IHJlbW92ZUNsYXNzLFxuXHRcdGhDOiBoYXNDbGFzcyxcblx0XHRmaXJlOiB0cmlnZ2VyRXZlbnQsXG5cdFx0Z1c6IGdldFdpZHRoLFxuXHRcdHJBRjogckFGLFxuXHR9O1xuXG5cdHJldHVybiBsYXp5c2l6ZXM7XG59XG4pKTtcbiIsICIoZnVuY3Rpb24od2luZG93LCBmYWN0b3J5KSB7XG5cdHZhciBnbG9iYWxJbnN0YWxsID0gZnVuY3Rpb24oKXtcblx0XHRmYWN0b3J5KHdpbmRvdy5sYXp5U2l6ZXMpO1xuXHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdsYXp5dW52ZWlscmVhZCcsIGdsb2JhbEluc3RhbGwsIHRydWUpO1xuXHR9O1xuXG5cdGZhY3RvcnkgPSBmYWN0b3J5LmJpbmQobnVsbCwgd2luZG93LCB3aW5kb3cuZG9jdW1lbnQpO1xuXG5cdGlmKHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpe1xuXHRcdGZhY3RvcnkocmVxdWlyZSgnbGF6eXNpemVzJykpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0ZGVmaW5lKFsnbGF6eXNpemVzJ10sIGZhY3RvcnkpO1xuXHR9IGVsc2UgaWYod2luZG93LmxhenlTaXplcykge1xuXHRcdGdsb2JhbEluc3RhbGwoKTtcblx0fSBlbHNlIHtcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbGF6eXVudmVpbHJlYWQnLCBnbG9iYWxJbnN0YWxsLCB0cnVlKTtcblx0fVxufSh3aW5kb3csIGZ1bmN0aW9uKHdpbmRvdywgZG9jdW1lbnQsIGxhenlTaXplcykge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIGltZ1N1cHBvcnQgPSAnbG9hZGluZycgaW4gSFRNTEltYWdlRWxlbWVudC5wcm90b3R5cGU7XG5cdHZhciBpZnJhbWVTdXBwb3J0ID0gJ2xvYWRpbmcnIGluIEhUTUxJRnJhbWVFbGVtZW50LnByb3RvdHlwZTtcblx0dmFyIGlzQ29uZmlnU2V0ID0gZmFsc2U7XG5cdHZhciBvbGRQcmVtYXR1cmVVbnZlaWwgPSBsYXp5U2l6ZXMucHJlbWF0dXJlVW52ZWlsO1xuXHR2YXIgY2ZnID0gbGF6eVNpemVzLmNmZztcblx0dmFyIGxpc3RlbmVyTWFwID0ge1xuXHRcdGZvY3VzOiAxLFxuXHRcdG1vdXNlb3ZlcjogMSxcblx0XHRjbGljazogMSxcblx0XHRsb2FkOiAxLFxuXHRcdHRyYW5zaXRpb25lbmQ6IDEsXG5cdFx0YW5pbWF0aW9uZW5kOiAxLFxuXHRcdHNjcm9sbDogMSxcblx0XHRyZXNpemU6IDEsXG5cdH07XG5cblx0aWYgKCFjZmcubmF0aXZlTG9hZGluZykge1xuXHRcdGNmZy5uYXRpdmVMb2FkaW5nID0ge307XG5cdH1cblxuXHRpZiAoIXdpbmRvdy5hZGRFdmVudExpc3RlbmVyIHx8ICF3aW5kb3cuTXV0YXRpb25PYnNlcnZlciB8fCAoIWltZ1N1cHBvcnQgJiYgIWlmcmFtZVN1cHBvcnQpKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0ZnVuY3Rpb24gZGlzYWJsZUV2ZW50cygpIHtcblx0XHR2YXIgbG9hZGVyID0gbGF6eVNpemVzLmxvYWRlcjtcblx0XHR2YXIgdGhyb3R0bGVkQ2hlY2tFbGVtZW50cyA9IGxvYWRlci5jaGVja0VsZW1zO1xuXHRcdHZhciByZW1vdmVBTFNMID0gZnVuY3Rpb24oKXtcblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGxvYWRlci5fYUxTTCwgdHJ1ZSk7XG5cdFx0XHR9LCAxMDAwKTtcblx0XHR9O1xuXHRcdHZhciBjdXJyZW50TGlzdGVuZXJNYXAgPSB0eXBlb2YgY2ZnLm5hdGl2ZUxvYWRpbmcuZGlzYWJsZUxpc3RlbmVycyA9PSAnb2JqZWN0JyA/XG5cdFx0XHRjZmcubmF0aXZlTG9hZGluZy5kaXNhYmxlTGlzdGVuZXJzIDpcblx0XHRcdGxpc3RlbmVyTWFwO1xuXG5cdFx0aWYgKGN1cnJlbnRMaXN0ZW5lck1hcC5zY3JvbGwpIHtcblx0XHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgcmVtb3ZlQUxTTCk7XG5cdFx0XHRyZW1vdmVBTFNMKCk7XG5cblx0XHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aHJvdHRsZWRDaGVja0VsZW1lbnRzLCB0cnVlKTtcblx0XHR9XG5cblx0XHRpZiAoY3VycmVudExpc3RlbmVyTWFwLnJlc2l6ZSkge1xuXHRcdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRocm90dGxlZENoZWNrRWxlbWVudHMsIHRydWUpO1xuXHRcdH1cblxuXHRcdE9iamVjdC5rZXlzKGN1cnJlbnRMaXN0ZW5lck1hcCkuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XG5cdFx0XHRpZiAoY3VycmVudExpc3RlbmVyTWFwW25hbWVdKSB7XG5cdFx0XHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIobmFtZSwgdGhyb3R0bGVkQ2hlY2tFbGVtZW50cywgdHJ1ZSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRmdW5jdGlvbiBydW5Db25maWcoKSB7XG5cdFx0aWYgKGlzQ29uZmlnU2V0KSB7cmV0dXJuO31cblx0XHRpc0NvbmZpZ1NldCA9IHRydWU7XG5cblx0XHRpZiAoaW1nU3VwcG9ydCAmJiBpZnJhbWVTdXBwb3J0ICYmIGNmZy5uYXRpdmVMb2FkaW5nLmRpc2FibGVMaXN0ZW5lcnMpIHtcblx0XHRcdGlmIChjZmcubmF0aXZlTG9hZGluZy5kaXNhYmxlTGlzdGVuZXJzID09PSB0cnVlKSB7XG5cdFx0XHRcdGNmZy5uYXRpdmVMb2FkaW5nLnNldExvYWRpbmdBdHRyaWJ1dGUgPSB0cnVlO1xuXHRcdFx0fVxuXG5cdFx0XHRkaXNhYmxlRXZlbnRzKCk7XG5cdFx0fVxuXG5cdFx0aWYgKGNmZy5uYXRpdmVMb2FkaW5nLnNldExvYWRpbmdBdHRyaWJ1dGUpIHtcblx0XHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsYXp5YmVmb3JldW52ZWlsJywgZnVuY3Rpb24oZSl7XG5cdFx0XHRcdHZhciBlbGVtZW50ID0gZS50YXJnZXQ7XG5cblx0XHRcdFx0aWYgKCdsb2FkaW5nJyBpbiBlbGVtZW50ICYmICFlbGVtZW50LmdldEF0dHJpYnV0ZSgnbG9hZGluZycpKSB7XG5cdFx0XHRcdFx0ZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2xvYWRpbmcnLCAnbGF6eScpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LCB0cnVlKTtcblx0XHR9XG5cdH1cblxuXHRsYXp5U2l6ZXMucHJlbWF0dXJlVW52ZWlsID0gZnVuY3Rpb24gcHJlbWF0dXJlVW52ZWlsKGVsZW1lbnQpIHtcblxuXHRcdGlmICghaXNDb25maWdTZXQpIHtcblx0XHRcdHJ1bkNvbmZpZygpO1xuXHRcdH1cblxuXHRcdGlmICgnbG9hZGluZycgaW4gZWxlbWVudCAmJlxuXHRcdFx0KGNmZy5uYXRpdmVMb2FkaW5nLnNldExvYWRpbmdBdHRyaWJ1dGUgfHwgZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2xvYWRpbmcnKSkgJiZcblx0XHRcdChlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1zaXplcycpICE9ICdhdXRvJyB8fCBlbGVtZW50Lm9mZnNldFdpZHRoKSkge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0aWYgKG9sZFByZW1hdHVyZVVudmVpbCkge1xuXHRcdFx0cmV0dXJuIG9sZFByZW1hdHVyZVVudmVpbChlbGVtZW50KTtcblx0XHR9XG5cdH07XG5cbn0pKTtcbiIsICJmdW5jdGlvbiBlKGUpe3JldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihuLHIsdCl7KHQ9bmV3IFhNTEh0dHBSZXF1ZXN0KS5vcGVuKFwiR0VUXCIsZSx0LndpdGhDcmVkZW50aWFscz0hMCksdC5vbmxvYWQ9ZnVuY3Rpb24oKXsyMDA9PT10LnN0YXR1cz9uKCk6cigpfSx0LnNlbmQoKX0pfXZhciBuLHI9KG49ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIikpLnJlbExpc3QmJm4ucmVsTGlzdC5zdXBwb3J0cyYmbi5yZWxMaXN0LnN1cHBvcnRzKFwicHJlZmV0Y2hcIik/ZnVuY3Rpb24oZSl7cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKG4scix0KXsodD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKSkucmVsPVwicHJlZmV0Y2hcIix0LmhyZWY9ZSx0Lm9ubG9hZD1uLHQub25lcnJvcj1yLGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQodCl9KX06ZSx0PXdpbmRvdy5yZXF1ZXN0SWRsZUNhbGxiYWNrfHxmdW5jdGlvbihlKXt2YXIgbj1EYXRlLm5vdygpO3JldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7ZSh7ZGlkVGltZW91dDohMSx0aW1lUmVtYWluaW5nOmZ1bmN0aW9uKCl7cmV0dXJuIE1hdGgubWF4KDAsNTAtKERhdGUubm93KCktbikpfX0pfSwxKX0sbz1uZXcgU2V0LGk9bmV3IFNldCxjPSExO2Z1bmN0aW9uIGEoZSl7aWYoZSl7aWYoZS5zYXZlRGF0YSlyZXR1cm4gbmV3IEVycm9yKFwiU2F2ZS1EYXRhIGlzIGVuYWJsZWRcIik7aWYoLzJnLy50ZXN0KGUuZWZmZWN0aXZlVHlwZSkpcmV0dXJuIG5ldyBFcnJvcihcIm5ldHdvcmsgY29uZGl0aW9ucyBhcmUgcG9vclwiKX1yZXR1cm4hMH1mdW5jdGlvbiB1KGUpe2lmKGV8fChlPXt9KSx3aW5kb3cuSW50ZXJzZWN0aW9uT2JzZXJ2ZXIpe3ZhciBuPWZ1bmN0aW9uKGUpe2U9ZXx8MTt2YXIgbj1bXSxyPTA7ZnVuY3Rpb24gdCgpe3I8ZSYmbi5sZW5ndGg+MCYmKG4uc2hpZnQoKSgpLHIrKyl9cmV0dXJuW2Z1bmN0aW9uKGUpe24ucHVzaChlKT4xfHx0KCl9LGZ1bmN0aW9uKCl7ci0tLHQoKX1dfShlLnRocm90dGxlfHwxLzApLHI9blswXSxhPW5bMV0sdT1lLmxpbWl0fHwxLzAsbD1lLm9yaWdpbnN8fFtsb2NhdGlvbi5ob3N0bmFtZV0sZD1lLmlnbm9yZXN8fFtdLGg9ZS5kZWxheXx8MCxwPVtdLG09ZS50aW1lb3V0Rm58fHQsdz1cImZ1bmN0aW9uXCI9PXR5cGVvZiBlLmhyZWZGbiYmZS5ocmVmRm4sZz1lLnByZXJlbmRlcnx8ITE7Yz1lLnByZXJlbmRlckFuZFByZWZldGNofHwhMTt2YXIgdj1uZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24obil7bi5mb3JFYWNoKGZ1bmN0aW9uKG4pe2lmKG4uaXNJbnRlcnNlY3RpbmcpcC5wdXNoKChuPW4udGFyZ2V0KS5ocmVmKSxmdW5jdGlvbihlLG4pe24/c2V0VGltZW91dChlLG4pOmUoKX0oZnVuY3Rpb24oKXstMSE9PXAuaW5kZXhPZihuLmhyZWYpJiYodi51bm9ic2VydmUobiksKGN8fGcpJiZpLnNpemU8MT9mKHc/dyhuKTpuLmhyZWYpLmNhdGNoKGZ1bmN0aW9uKG4pe2lmKCFlLm9uRXJyb3IpdGhyb3cgbjtlLm9uRXJyb3Iobil9KTpvLnNpemU8dSYmIWcmJnIoZnVuY3Rpb24oKXtzKHc/dyhuKTpuLmhyZWYsZS5wcmlvcml0eSkudGhlbihhKS5jYXRjaChmdW5jdGlvbihuKXthKCksZS5vbkVycm9yJiZlLm9uRXJyb3Iobil9KX0pKX0saCk7ZWxzZXt2YXIgdD1wLmluZGV4T2YoKG49bi50YXJnZXQpLmhyZWYpO3Q+LTEmJnAuc3BsaWNlKHQpfX0pfSx7dGhyZXNob2xkOmUudGhyZXNob2xkfHwwfSk7cmV0dXJuIG0oZnVuY3Rpb24oKXsoZS5lbHx8ZG9jdW1lbnQpLnF1ZXJ5U2VsZWN0b3JBbGwoXCJhXCIpLmZvckVhY2goZnVuY3Rpb24oZSl7bC5sZW5ndGgmJiFsLmluY2x1ZGVzKGUuaG9zdG5hbWUpfHxmdW5jdGlvbiBlKG4scil7cmV0dXJuIEFycmF5LmlzQXJyYXkocik/ci5zb21lKGZ1bmN0aW9uKHIpe3JldHVybiBlKG4scil9KTooci50ZXN0fHxyKS5jYWxsKHIsbi5ocmVmLG4pfShlLGQpfHx2Lm9ic2VydmUoZSl9KX0se3RpbWVvdXQ6ZS50aW1lb3V0fHwyZTN9KSxmdW5jdGlvbigpe28uY2xlYXIoKSx2LmRpc2Nvbm5lY3QoKX19fWZ1bmN0aW9uIHMobix0LHUpe3ZhciBzPWEobmF2aWdhdG9yLmNvbm5lY3Rpb24pO3JldHVybiBzIGluc3RhbmNlb2YgRXJyb3I/UHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiQ2Fubm90IHByZWZldGNoLCBcIitzLm1lc3NhZ2UpKTooaS5zaXplPjAmJiFjJiZjb25zb2xlLndhcm4oXCJbV2FybmluZ10gWW91IGFyZSB1c2luZyBib3RoIHByZWZldGNoaW5nIGFuZCBwcmVyZW5kZXJpbmcgb24gdGhlIHNhbWUgZG9jdW1lbnRcIiksUHJvbWlzZS5hbGwoW10uY29uY2F0KG4pLm1hcChmdW5jdGlvbihuKXtpZighby5oYXMobikpcmV0dXJuIG8uYWRkKG4pLCh0P2Z1bmN0aW9uKG4pe3JldHVybiB3aW5kb3cuZmV0Y2g/ZmV0Y2gobix7Y3JlZGVudGlhbHM6XCJpbmNsdWRlXCJ9KTplKG4pfTpyKShuZXcgVVJMKG4sbG9jYXRpb24uaHJlZikudG9TdHJpbmcoKSl9KSkpfWZ1bmN0aW9uIGYoZSxuKXt2YXIgcj1hKG5hdmlnYXRvci5jb25uZWN0aW9uKTtpZihyIGluc3RhbmNlb2YgRXJyb3IpcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIkNhbm5vdCBwcmVyZW5kZXIsIFwiK3IubWVzc2FnZSkpO2lmKCFIVE1MU2NyaXB0RWxlbWVudC5zdXBwb3J0cyhcInNwZWN1bGF0aW9ucnVsZXNcIikpcmV0dXJuIHMoZSksUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiVGhpcyBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgdGhlIHNwZWN1bGF0aW9uIHJ1bGVzIEFQSS4gRmFsbGluZyBiYWNrIHRvIHByZWZldGNoLlwiKSk7aWYoZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignc2NyaXB0W3R5cGU9XCJzcGVjdWxhdGlvbnJ1bGVzXCJdJykpcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIlNwZWN1bGF0aW9uIFJ1bGVzIGlzIGFscmVhZHkgZGVmaW5lZCBhbmQgY2Fubm90IGJlIGFsdGVyZWQuXCIpKTtmb3IodmFyIHQ9MCx1PVtdLmNvbmNhdChlKTt0PHUubGVuZ3RoO3QrPTEpe3ZhciBmPXVbdF07aWYod2luZG93LmxvY2F0aW9uLm9yaWdpbiE9PW5ldyBVUkwoZix3aW5kb3cubG9jYXRpb24uaHJlZikub3JpZ2luKXJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJPbmx5IHNhbWUgb3JpZ2luIFVSTHMgYXJlIGFsbG93ZWQ6IFwiK2YpKTtpLmFkZChmKX1vLnNpemU+MCYmIWMmJmNvbnNvbGUud2FybihcIltXYXJuaW5nXSBZb3UgYXJlIHVzaW5nIGJvdGggcHJlZmV0Y2hpbmcgYW5kIHByZXJlbmRlcmluZyBvbiB0aGUgc2FtZSBkb2N1bWVudFwiKTt2YXIgbD1mdW5jdGlvbihlKXt2YXIgbj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO24udHlwZT1cInNwZWN1bGF0aW9ucnVsZXNcIixuLnRleHQ9J3tcInByZXJlbmRlclwiOlt7XCJzb3VyY2VcIjogXCJsaXN0XCIsXCJ1cmxzXCI6IFtcIicrQXJyYXkuZnJvbShlKS5qb2luKCdcIixcIicpKydcIl19XX0nO3RyeXtkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKG4pfWNhdGNoKGUpe3JldHVybiBlfXJldHVybiEwfShpKTtyZXR1cm4hMD09PWw/UHJvbWlzZS5yZXNvbHZlKCk6UHJvbWlzZS5yZWplY3QobCl9ZXhwb3J0e3UgYXMgbGlzdGVuLHMgYXMgcHJlZmV0Y2gsZiBhcyBwcmVyZW5kZXJ9O1xuIiwgIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9Hb29nbGVDaHJvbWVMYWJzL3F1aWNrbGlua1xyXG5pbXBvcnQgeyBsaXN0ZW4gfSBmcm9tICdxdWlja2xpbmsvZGlzdC9xdWlja2xpbmsubWpzJztcclxubGlzdGVuKHtcclxuICAgIGlnbm9yZXM6IFtcclxuICAgICAgICAvXFwvYXBpXFwvPy8sXHJcbiAgICAgICAgdXJpID0+IHVyaS5pbmNsdWRlcygnLnppcCcpLFxyXG4gICAgICAgICh1cmksIGVsZW0pID0+IGVsZW0uaGFzQXR0cmlidXRlKCdub3ByZWZldGNoJyksXHJcbiAgICAgICAgKHVyaSwgZWxlbSkgPT4gZWxlbS5oYXNoICYmIGVsZW0ucGF0aG5hbWUgPT09IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSxcclxuICAgIF1cclxufSk7XHJcblxyXG4vLyBodHRwczovL2dpdGh1Yi5jb20vYUZhcmthcy9sYXp5c2l6ZXMvdHJlZS9naC1wYWdlcy9wbHVnaW5zL25hdGl2ZS1sb2FkaW5nXHJcbmltcG9ydCBsYXp5U2l6ZXMgZnJvbSAnbGF6eXNpemVzJztcclxuaW1wb3J0ICdsYXp5c2l6ZXMvcGx1Z2lucy9uYXRpdmUtbG9hZGluZy9scy5uYXRpdmUtbG9hZGluZyc7XHJcblxyXG5sYXp5U2l6ZXMuY2ZnLm5hdGl2ZUxvYWRpbmcgPSB7XHJcbiAgICBzZXRMb2FkaW5nQXR0cmlidXRlOiB0cnVlLFxyXG4gICAgZGlzYWJsZUxpc3RlbmVyczoge1xyXG4gICAgICAgIHNjcm9sbDogdHJ1ZVxyXG4gICAgfVxyXG59O1xyXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQSxPQUFDLFNBQVNBLFNBQVEsU0FBUztBQUMxQixZQUFJQyxhQUFZLFFBQVFELFNBQVFBLFFBQU8sVUFBVSxJQUFJO0FBQ3JELFFBQUFBLFFBQU8sWUFBWUM7QUFDbkIsWUFBRyxPQUFPLFVBQVUsWUFBWSxPQUFPLFNBQVE7QUFDOUMsaUJBQU8sVUFBVUE7QUFBQSxRQUNsQjtBQUFBLE1BQ0Q7QUFBQSxRQUFFLE9BQU8sVUFBVSxjQUNiLFNBQVMsQ0FBQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFLaEIsU0FBUyxFQUFFRCxTQUFRRSxXQUFVQyxPQUFNO0FBQ2xDO0FBR0EsY0FBSSxXQUlIO0FBRUQsV0FBQyxXQUFVO0FBQ1YsZ0JBQUk7QUFFSixnQkFBSSxvQkFBb0I7QUFBQSxjQUN2QixXQUFXO0FBQUEsY0FDWCxhQUFhO0FBQUEsY0FDYixjQUFjO0FBQUEsY0FDZCxjQUFjO0FBQUEsY0FDZCxZQUFZO0FBQUE7QUFBQSxjQUVaLGdCQUFnQjtBQUFBLGNBQ2hCLGlCQUFpQjtBQUFBLGNBQ2pCLGdCQUFnQjtBQUFBLGNBQ2hCLFNBQVM7QUFBQSxjQUNULFlBQVk7QUFBQSxjQUNaLFdBQVc7QUFBQTtBQUFBLGNBRVgsU0FBUztBQUFBLGNBQ1QsYUFBYSxDQUFDO0FBQUEsY0FDZCxNQUFNO0FBQUEsY0FDTixXQUFXO0FBQUEsY0FDWCxNQUFNO0FBQUEsY0FDTixVQUFVO0FBQUEsY0FDVixZQUFZO0FBQUEsY0FDWixZQUFZO0FBQUEsY0FDWixlQUFlO0FBQUEsWUFDaEI7QUFFQSwyQkFBZUgsUUFBTyxtQkFBbUJBLFFBQU8sbUJBQW1CLENBQUM7QUFFcEUsaUJBQUksUUFBUSxtQkFBa0I7QUFDN0Isa0JBQUcsRUFBRSxRQUFRLGVBQWM7QUFDMUIsNkJBQWEsSUFBSSxJQUFJ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LE1BQUM7QUFBQyxhQUFNO0FBQUEsSUFBRSxFQUFFLENBQUM7QUFBRSxXQUFNLFNBQUssSUFBRSxRQUFRLFFBQVEsSUFBRSxRQUFRLE9BQU8sQ0FBQztBQUFBLEVBQUM7OztBQ1kxNkcseUJBQXNCO0FBQ3RCLGtCQUFPO0FBWFAsSUFBTztBQUFBLElBQ0gsU0FBUztBQUFBLE1BQ0w7QUFBQSxNQUNBLFNBQU8sSUFBSSxTQUFTLE1BQU07QUFBQSxNQUMxQixDQUFDLEtBQUssU0FBUyxLQUFLLGFBQWEsWUFBWTtBQUFBLE1BQzdDLENBQUMsS0FBSyxTQUFTLEtBQUssUUFBUSxLQUFLLGFBQWEsT0FBTyxTQUFTO0FBQUEsSUFDbEU7QUFBQSxFQUNKLENBQUM7QUFNRCxtQkFBQVEsUUFBVSxJQUFJLGdCQUFnQjtBQUFBLElBQzFCLHFCQUFxQjtBQUFBLElBQ3JCLGtCQUFrQjtBQUFBLE1BQ2QsUUFBUTtBQUFBLElBQ1o7QUFBQSxFQUNKOyIsCiAgIm5hbWVzIjogWyJ3aW5kb3ciLCAibGF6eVNpemVzIiwgImRvY3VtZW50IiwgIkRhdGUiLCAic2V0VGltZW91dCIsICJlIiwgImkiLCAibG9hZE1vZGUiLCAid2luZG93IiwgImRvY3VtZW50IiwgImxhenlTaXplcyIsICJlIiwgImUiLCAibiIsICJyIiwgInQiLCAiYSIsICJ1IiwgInMiLCAiZiIsICJsYXp5U2l6ZXMiXQp9Cg==
