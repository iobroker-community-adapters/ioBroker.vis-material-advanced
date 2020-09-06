/*
    ioBroker.vis vis-material-advanced Widget-Set

    version: "0.5.3"

    Copyright 2020 EdgarM73 edgar.miller@gmail.com
*/
"use strict";

if (vis.editMode) {
    $.extend(true, systemDictionary, {
        "title": {
            "en": "Title",
            "de": "Titel",
            "ru": "Заголовок"
        },
        "subtitle": {
            "en": "Subtitle",
            "de": "Untertitel",
            "ru": "Подзаголовок"
        }
    });
}

// add translations for edit mode
$.extend(
    true,
    systemDictionary, {
    "Instance": {
        "en": "Instance",
        "de": "Instanz",
        "ru": "Инстанция"
    },
    "open": {
        "en": "open",
        "de": "offen",
        "ru": "открыто"
    },
    "tilted": {
        "en": "tilted",
        "de": "gekippt",
        "ru": "приоткрыто"
    },
    "closed": {
        "en": "closed",
        "de": "zu",
        "ru": "закрыто"
    },
    "on": {
        "en": "on",
        "de": "an",
        "ru": "вкл"
    },
    "off": {
        "en": "off",
        "de": "aus",
        "ru": "выкл"
    },
    "motion": {
        "en": "motion",
        "de": "Bewegung",
        "ru": "motion"
    },
    "nomotion": {
        "en": "no motion",
        "de": "Nein",
        "ru": "na"
    },
    "Text-Color": {
        "en": "Text Color",
        "de": "Textfarbe",
        "ru": "na"
    },
    "opac-white": {
        "en": "white opacity",
        "de": "Transparenz Weiss",
        "ru": "na"
    },
    "opac-red": {
        "en": "Red opacity",
        "de": "Transparenz Rot",
        "ru": "na"
    },
    "opac-blue": {
        "en": "blue opacity",
        "de": "Transparenz Blau",
        "ru": "na"
    },
    "opac-purple": {
        "en": "purple opacity",
        "de": "Transparenz Lila",
        "ru": "na"
    },
    "opac-green": {
        "en": "green opacity",
        "de": "Transparenz Grün",
        "ru": "na"
    },
    "opacity-color": {
        "en": "opacity color",
        "de": "Transparenz Farbe",
        "ru": "na"
    },
    "colorizeByValue": {
        "en": "colorize By Value",
        "de": "einfärben durch Wert",
        "ru": "раскрасить по температуре",
        "pt": "colorir por Temp",
        "nl": "inkleuren door temp",
        "fr": "coloriser par température",
        "it": "colorize By Temp",
        "es": "colorear por temperatura",
        "pl": "koloruj według temp",
        "zh-cn": "下面"
    },
    "normal": {
        "en": "normal",
        "de": "normal",
        "ru": "нормальный",
        "pt": "normal",
        "nl": "normaal",
        "fr": "Ordinaire",
        "it": "normale",
        "es": "normal",
        "pl": "normalna",
        "zh-cn": "正常"
    },
    "above": {
        "en": "above",
        "de": "über",
        "ru": "выше",
        "pt": "acima",
        "nl": "bovenstaande",
        "fr": "au dessus",
        "it": "sopra",
        "es": "encima",
        "pl": "powyżej",
        "zh-cn": "以上"
    },
    "value-align": {
        "en": "Text align",
        "de": "Textausrichtung",
        "ru": "Выровнять текст",
        "pt": "Alinhamento de texto",
        "nl": "Tekst uitlijnen",
        "fr": "Aligner le texte",
        "it": "Allineamento del testo",
        "es": "Texto alineado",
        "pl": "Wyrównaj tekst",
        "zh-cn": "文字对齐"
      }
}
);

// this code can be placed directly in vis-material-advanced.html
vis.binds["vis-material-advanced"] = {
    version: "0.3.3",
    showVersion: function () {
        if (vis.binds["vis-material-advanced"].version) {
            console.log('Version vis-material-advanced: ' + vis.binds["vis-material-advanced"].version);
            vis.binds["vis-material-advanced"].version = null;
        }
    },
    tplMdListDoor: function (widgetID, view, data) {
        const srcOpen = data.attr('card-icon-closed');
        const srcClosed = data.attr('card-icon-open');
        const valOpen = _('open');
        const valClosed = _('closed');

        const colorize = data.attr('colorizeByValue');
        const colorOpen = data.attr('color-open');
        const colorClosed = data.attr('opacity-color');


        var $div = $('#' + widgetID);
        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function () {
                vis.binds['vis-material-advanced'].tplMdListDoor(widgetID, view, data);
            }, 100);
        }

        function update(state) {
            var value = (state) ? valOpen : valClosed;
            var src = (state) ? srcOpen : srcClosed;
            $div.find('.mdw-list-value').html(value);
            $div.find('.mdw-list-icon').find('img').attr('src', src);
            if (colorize) {
                if (state) {
                    $div.find('.overlay').css('background-color', colorOpen);
                } else {
                    $div.find('.overlay').css('background-color', colorClosed);
                }
            }
        }

        if (data.oid) {
            // subscribe on updates of value
            vis.states.bind(data.oid + '.val', function (e, newVal, oldVal) {
                update(newVal);
            });

            // set current value
            update(vis.states[data.oid + '.val']);
        }
    },
    tplMdListWindow: function (widgetID, view, data) {
        const srcOpen = data.attr('card-icon-closed');
        const srcClosed = data.attr('card-icon-open');
        const valOpen = _('open');
        const valClosed = _('closed');
        const colorize = data.attr('colorizeByValue');
        const colorOpen = data.attr('color-open');
        const colorClosed = data.attr('opacity-color');

        var $div = $('#' + widgetID);

        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function () {
                vis.binds['vis-material-advanced'].tplMdListWindow(widgetID, view, data);
            }, 100);
        }

        function update(state) {
            var value = (state) ? valOpen : valClosed;
            var src = (state) ? srcOpen : srcClosed;
            $div.find('.mdw-list-value').html(value);
            $div.find('.mdw-list-icon').find('img').attr('src', src);
            if (colorize) {
                if (state) {
                    $div.find('.overlay').css('background-color', colorOpen);
                } else {
                    $div.find('.overlay').css('background-color', colorClosed);
                }
            }
        }

        if (data.oid) {
            // subscribe on updates of value
            vis.states.bind(data.oid + '.val', function (e, newVal, oldVal) {
                update(newVal);
            });

            // set current value
            update(vis.states[data.oid + '.val']);
        }
    },
    tplMdListTemp: function (widgetID, view, data) {
        var $div = $('#' + widgetID);
        const colorize = data.attr('colorizeByValue');
        const low = data.attr('below');
        // const $normal = data.attr('normal');
        const high = data.attr('above');
        const original_class = data.attr('opacity-color');
        const colorLow = data.attr('color-low');
        const colorHigh = data.attr('color-high');

        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function () {
                vis.binds['vis-material-advanced'].tplMdListTemp(widgetID, view, data);
            }, 100);
        }

        // grey out the value in case the last change is more than 24h ago
        var curTime = new Date().getTime();
        var lcTime = vis.states[data.oid + '.lc'];
        var seconds = (curTime - lcTime) / 1000;
        if (seconds > 86400) {
            $div.find('.mdw-list-value').css('opacity', '0.5');
        }

        function update(state) {
            if (typeof state === 'number') {
                $div.find('.mdw-list-value').html(state.toFixed(1) + ' °C');
            }
            if (colorize) {
                if (state <= low) {
                    $div.find('.overlay').css('background-color', colorLow);
                } else if (state >= high) {
                    $div.find('.overlay').css('background-color', colorHigh);
                } else {
                    $div.find('.overlay').css('background-color', original_class);
                }
            }

        }

        if (data.oid) {
            // subscribe on updates of value
            vis.states.bind(data.oid + '.val', function (e, newVal, oldVal) {
                update(newVal);
            });

            // set current value
            update(vis.states[data.oid + '.val']);
        }
    },
    tplMdListHumid: function (widgetID, view, data) {
        var $div = $('#' + widgetID);
        const colorize = data.attr('colorizeByValue');
        const low = data.attr('below');
        // const $normal = data.attr('normal');
        const high = data.attr('above');

        const original_class = data.attr('opacity-color');
        const colorLow = data.attr('color-low');
        const colorHigh = data.attr('color-high');

        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function () {
                vis.binds['vis-material-advanced'].tplMdListHumid(widgetID, view, data);
            }, 100);
        }

        // grey out the value in case the last change is more than 24h ago
        var curTime = new Date().getTime();
        var lcTime = vis.states[data.oid + '.lc'];
        var seconds = (curTime - lcTime) / 1000;
        if (seconds > 86400) {
            $div.find('.mdw-list-value').css('opacity', '0.5');
        }

        function update(state) {
            if (typeof state === 'number') {
                $div.find('.mdw-list-value').html(state.toFixed(1) + ' %');
            }
            if (colorize) {
                if (state <= low) {
                    $div.find('.overlay').css('background-color', colorLow);
                } else if (state >= high) {
                    $div.find('.overlay').css('background-color', colorHigh);
                } else {
                    $div.find('.overlay').css('background-color', original_class);
                }
            }
        }

        if (data.oid) {
            // subscribe on updates of value
            vis.states.bind(data.oid + '.val', function (e, newVal, oldVal) {
                update(newVal);
            });

            // set current value 
            update(vis.states[data.oid + '.val']);
        }
    },
    tplMdListTempHumid: function (widgetID, view, data) {
        var $div = $('#' + widgetID);
        const colorize = data.attr('colorizeByValue');
        const low = data.attr('below');
        // const $normal = data.attr('normal');
        const high = data.attr('above');
        const original_class = data.attr('opacity-color');
        const colorLow = data.attr('color-low');
        const colorHigh = data.attr('color-high');

        console.log('starting debug');
        console.log(data);
        console.log();
        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function () {
                vis.binds['vis-material-advanced'].tplMdListTempHumid(widgetID, view, data);
            }, 100);
        }

        // grey out the value in case the last change is more than 24h ago
        var curTime = new Date().getTime();
        var lcTime = vis.states[data.oid + '.lc'];
        var seconds = (curTime - lcTime) / 1000;
        if (seconds > 86400) {
            $div.find('.mdw-list-value').css('opacity', '0.5');
        }

        function update(state, state2) {
            if (typeof state === 'number') {
                $div.find('.mdw-list-value').html(state.toFixed(1) + ' °C');
                $div.find('.mdw-list-value2').html(state2.toFixed(1) + ' %');
            }
            if (colorize) {
                if (state <= low) {
                    $div.find('.overlay').css('background-color', colorLow);
                } else if (state >= high) {
                    $div.find('.overlay').css('background-color', colorHigh);
                } else {
                    $div.find('.overlay').css('background-color', original_class);
                }
            }

        }

        if (data.oid) {
            // subscribe on updates of value
            vis.states.bind(data.oid + '.val', function (e, newVal, oldVal) {
                update(newVal);
            });

            // set current value
            update(vis.states[data.oid + '.val'], vis.states[data.obj_hum + '.val']);
        }
    },
    tplMdListOccupancy: function (widgetID, view, data) {
        const srcMotion = data.attr('iconMotion');
        const srcNoMotion = data.attr('iconNoMotion');
        const valMotion = _('motion');
        const valNoMotion = _('nomotion');
        const colorize = data.attr('colorizeByValue');
        const motionColor = data.attr('motionColor');
        const original_class = data.attr('opacity-color');

        var $div = $('#' + widgetID);

        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function () {
                vis.binds['vis-material-advanced'].tplMdListOccupancy(widgetID, view, data);
            }, 100);
        }

        // grey out the value in case the last change is more than 24h ago
        var curTime = new Date().getTime();
        var lcTime = vis.states[data.oid + '.lc'];
        var seconds = (curTime - lcTime) / 1000;
        if (seconds > 86400) {
            $div.find('.mdw-list-value').css('opacity', '0.5');
        }

        function update(state) {
            var value = (state) ? valMotion : valNoMotion;
            var src = (state) ? srcMotion : srcNoMotion;
            $div.find('.mdw-list-value').html(value);
            $div.find('.mdw-list-icon').find('img').attr('src', src);
            if (colorize) {
                if (state) {
                    $div.find('.overlay').css('background-color', motionColor);

                } else {
                    $div.find('.overlay').css('background-color', original_class);

                }
            }

        }

        if (data.oid) {
            // subscribe on updates of value
            vis.states.bind(data.oid + '.val', function (e, newVal, oldVal) {
                update(newVal);
            });

            // set current value
            update(vis.states[data.oid + '.val']);
        }
    },
    tplMdListLight: function (widgetID, view, data) {
        const srcOff = data.attr('card-icon-off');
        const srcOn = data.attr('card-icon-on');
        var $div = $('#' + widgetID);

        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function () {
                vis.binds['vis-material-advanced'].tplMdListLight(widgetID, view, data);
            }, 100);
        }

        function update(state) {
            var src = (state) ? srcOn : srcOff;
            var $tmp = $('#' + widgetID + '_checkbox');
            $tmp.prop('checked', state);
            $div.find('.mdw-list-icon').find('img').attr('src', src);
            if (data.attr('readOnly')) {
                if (state) {
                    $div.find('.mdw-list-value').html("on");
                } else {
                    $div.find('.mdw-list-value').html("off");
                }
            }
        }

        if (!vis.editMode) {
            var $this = $('#' + widgetID + '_checkbox');
            $this.change(function () {
                var $this_ = $(this);
                vis.setValue($this_.data('oid'), $this_.prop('checked'));
            });
        }

        if (data.oid) {
            // subscribe on updates of value
            vis.states.bind(data.oid + '.val', function (e, newVal, oldVal) {
                update(newVal);
            });

            // set current value
            update(vis.states[data.oid + '.val']);
        }
    },
    tplMdListLightDim: function (widgetID, view, data) {
        /*  const srcOff = 'widgets/vis-material-advanced/img/light_light_dim_00.png';
         const srcOn = 'widgets/vis-material-advanced/img/light_light_dim_100.png'; */
        var $div = $('#' + widgetID);

        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function () {
                vis.binds['vis-material-advanced'].tplMdListLightDim(widgetID, view, data);
            }, 100);
        }

        function update(state) {

            var src = 'widgets/vis-material-advanced/img/light_light_dim_' + Math.ceil(state / 10) + '0.png';
            $div.find('.mdw-list-icon').find('img').attr('src', src);
            if (data.attr('readOnly')) {

                $div.find('.mdw-list-value').html(state + "%");

            }
        }

        if (data.oid) {
            // subscribe on updates of value
            vis.states.bind(data.oid + '.val', function (e, newVal, oldVal) {
                update(newVal);
            });

            // set current value
            update(vis.states[data.oid + '.val']);
        }
    },
    tplMdListWindowShutter: function (widgetID, view, data) {
        /*   const srcOff = 'widgets/vis-material-advanced/img/light_light_dim_00.png';
          const srcOn = 'widgets/vis-material-advanced/img/light_light_dim_100.png'; */
        var $div = $('#' + widgetID);

        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function () {
                vis.binds['vis-material-advanced'].tplMdListWindowShutter(widgetID, view, data);
            }, 100);
        }

        function update(state) {
            var percent = Math.ceil(state / 10);
            var name;

            console.log("Status: " + state);

            if (data.attr('inverted') == true) {

                name = 10 - parseInt(percent);
                console.log('Inverted -> name: ' + name);
            } else {
                name = percent;
            }

            var src = 'widgets/vis-material-advanced/img/fts_shutter_' + name + '0.png';
            console.log(' name : ' + name + " Icon : " + src);
            $div.find('.mdw-list-icon').find('img').attr('src', src);
            if (data.attr('readOnly')) {

                $div.find('.mdw-list-value').html(state + "%");

            }
        }

        /* if (!vis.editMode) {
            var $this = $('#' + widgetID + '_slider');
            $this.change(function () {
                var $this_ = $(this);
                vis.setValue($this_.data('oid'), $this_.prop('checked'));
            });
        } */

        if (data.oid) {
            // subscribe on updates of value
            vis.states.bind(data.oid + '.val', function (e, newVal, oldVal) {
                update(newVal);
            });

            // set current value
            update(vis.states[data.oid + '.val']);
        }
    },
    tplMdListLightKelvin: function (widgetID, view, data) {
        const srcCold = data.attr('card-icon-coldwhite');
        const srcMedium = data.attr('card-icon-medium');
        const srcWarm = data.attr('card-icon-warmwhite');

        var $div = $('#' + widgetID);
        console.log('LightKelvin called');
        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function () {
                vis.binds['vis-material-advanced'].tplMdListLightKelvin(widgetID, view, data);
            }, 100);
        }

        function update(state) {
            var drittel = (data.attr('max') - data.attr('min')) / 3;
            var medium = parseInt(data.attr('min')) + parseInt(drittel);
            var cold = parseInt(data.attr('max')) - parseInt(drittel);
            var src;
            if (state >= data.attr('min') && state < medium) {
                //  console.log('warmweiss : min -> ' + data.attr('min') + " state -> " + state + " medium ->" + medium);
                src = srcWarm;
            } else if (state >= medium && state < cold) {
                // console.log('medium: min -> ' + data.attr('min') + " state -> " + state + " medium ->" + medium);
                src = srcMedium;
            } else if (state >= cold && state <= data.attr('max')) {
                //console.log('kaltweiss: max -> ' + data.attr('max') + " state -> " + state + " cold ->" + cold);
                src = srcCold;
            } else {
                console.log('Fehler');
                src = 'Fehler';
            }
            $div.find('.mdw-list-icon').find('img').attr('src', src);
            if (data.attr('readOnly')) {

                $div.find('.mdw-list-value').html(state + " K");

            }
        }

        /* if (!vis.editMode) {
            var $this = $('#' + widgetID + '_slider');
            $this.change(function () {
                var $this_ = $(this);
                vis.setValue($this_.data('oid'), $this_.prop('checked'));
            });
        } */

        if (data.oid) {
            // subscribe on updates of value
            vis.states.bind(data.oid + '.val', function (e, newVal, oldVal) {
                update(newVal);
            });

            // set current value
            update(vis.states[data.oid + '.val']);
        }
    },
    tplMdListVolume: function (widgetID, view, data) {
        const srcOff = data.attr('card-icon-low');
        const srcMedium = data.attr('card-icon-medium');
        const srcOn = data.attr('card-icon-high');
        var $div = $('#' + widgetID);

        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function () {
                vis.binds['vis-material-advanced'].tplMdListVolume(widgetID, view, data);
            }, 100);
        }

        function update(state) {

            if (state == 0) {
                $div.find('.mdw-list-icon').find('img').attr('src', srcOff);
            } else if (state >= 80 * data.attr('Max') / 100) {
                $div.find('.mdw-list-icon').find('img').attr('src', srcOn);
            } else {
                $div.find('.mdw-list-icon').find('img').attr('src', srcMedium);
            }
            if (data.attr('readOnly')) {

                $div.find('.mdw-list-value').html(state);

            }
            //var src = 'widgets/vis-material-advanced/img/light_light_dim_' + Math.ceil(state / 10) + '0.png';
            //$div.find('.mdw-list-icon').find('img').attr('src', src);
        }

        /* if (!vis.editMode) {
            var $this = $('#' + widgetID + '_slider');
            $this.change(function () {
                var $this_ = $(this);
                vis.setValue($this_.data('oid'), $this_.prop('checked'));
            });
        } */

        if (data.oid) {
            // subscribe on updates of value
            vis.states.bind(data.oid + '.val', function (e, newVal, oldVal) {
                update(newVal);
            });

            // set current value
            update(vis.states[data.oid + '.val']);
        }
    },
    tplMdListGarage: function (widgetID, view, data) {
        const srcOff = data.attr('card-icon-closed');
        const srcOn = data.attr('card-icon-open');
        var $div = $('#' + widgetID);

        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function () {
                vis.binds['vis-material-advanced'].tplMdListGarage(widgetID, view, data);
            }, 100);
        }

        function update(state) {
            var src = (state) ? srcOn : srcOff;
            var $tmp = $('#' + widgetID + '_checkbox');
            $tmp.prop('checked', state);
            $div.find('.mdw-list-icon').find('img').attr('src', src);
        }

        if (!vis.editMode) {
            var $this = $('#' + widgetID + '_checkbox');
            $this.change(function () {
                var $this_ = $(this);
                vis.setValue($this_.data('oid'), $this_.prop('checked'));
            });
        }

        if (data.oid) {
            // subscribe on updates of value
            vis.states.bind(data.oid + '.val', function (e, newVal, oldVal) {
                update(newVal);
            });

            // set current value
            update(vis.states[data.oid + '.val']);
        }
    },
    tplMdListPressure: function (widgetID, view, data) {
        var $div = $('#' + widgetID);
        const colorize = data.attr('colorizeByValue');
        const original_class = data.attr('opacity-color');
        const low = data.attr('below');
        const high = data.attr('above');

        const colorLow = data.attr('color-low');
        const colorHigh = data.attr('color-high');

        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function () {
                vis.binds['vis-material-advanced'].tplMdListPressure(widgetID, view, data);
            }, 100);
        }

        // grey out the value in case the last change is more than 24h ago
        var curTime = new Date().getTime();
        var lcTime = vis.states[data.oid + '.lc'];
        var seconds = (curTime - lcTime) / 1000;
        if (seconds > 86400) {
            $div.find('.mdw-list-value').css('opacity', '0.5');
        }

        function update(state) {
            if (typeof state === 'number') {
                $div.find('.mdw-list-value').html(state.toFixed(1) + ' hPa');
            }
            //$div.find('.overlay').css('background-color', data.attr('opacity2'));

            if (colorize) {
                if (state <= low) {
                    $div.find('.overlay').css('background-color', colorLow);
                } else if (state >= high) {
                    $div.find('.overlay').css('background-color', colorHigh);
                } else {
                    $div.find('.overlay').css('background-color', original_class);
                }
            }

        }

        if (data.oid) {
            // subscribe on updates of value
            vis.states.bind(data.oid + '.val', function (e, newVal, oldVal) {
                update(newVal);
            });

            // set current value
            update(vis.states[data.oid + '.val']);
        }
    },
    tplMdListBoolean: function (widgetID, view, data) {
        const srcTrue = data.attr('card-icon-true');
        const srcFalse = data.attr('card-icon-false');
        const valTrue = data.attr('true');
        const valFalse = data.attr('false');
        const colorize = data.attr('colorizeByValue');
        const colTrue = data.attr('color-true');
        const colFalse = data.attr('color-false');
        const original_class = data.attr('opacity-color');


        var $div = $('#' + widgetID);
        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function () {
                vis.binds['vis-material-advanced'].tplMdListBoolean(widgetID, view, data);
            }, 100);
        }

        function update(state) {
            var value = (state) ? valTrue : valFalse;
            var src = (state) ? srcTrue : srcFalse;
            $div.find('.mdw-list-value').html(value);
            $div.find('.mdw-list-icon').find('img').attr('src', src);

            if (colorize) {
                if (state) {
                    $div.find('.overlay').css('background-color', colTrue);
                } else if (!state) {
                    $div.find('.overlay').css('background-color', colFalse);
                }
            } else {
                $div.find('.overlay').css('background-color', original_class);
            }

        }

        if (data.oid) {
            // subscribe on updates of value
            vis.states.bind(data.oid + '.val', function (e, newVal, oldVal) {
                update(newVal);
            });

            // set current value
            update(vis.states[data.oid + '.val']);
        }
    },
    tplMdListNumber: function (widgetID, view, data) {
        const valLow = data.attr('low');
        const valHigh = data.attr('high');
        const colorize = data.attr('colorizeByValue');
        const colLow = data.attr('color-low');
        const colHigh = data.attr('color-high');
        const original_class = data.attr('opacity-color');


        var $div = $('#' + widgetID);
        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function () {
                vis.binds['vis-material-advanced'].tplMdListNumber(widgetID, view, data);
            }, 100);
        }

        function update(state) {

            $div.find('.mdw-number-field').html(state);


            if (colorize) {
                if (state <= valLow) {
                    $div.find('.overlay').css('background-color', colLow);
                } else if (state >= valHigh) {
                    $div.find('.overlay').css('background-color', colHigh);
                }
                else {
                    $div.find('.overlay').css('background-color', original_class);
                }
            } else {
                $div.find('.overlay').css('background-color', original_class);
            }

        }

        if (data.oid) {
            // subscribe on updates of value
            vis.states.bind(data.oid + '.val', function (e, newVal, oldVal) {
                update(newVal);
            });

            // set current value
            update(vis.states[data.oid + '.val']);
        }
    },
    tplMdListText: function (widgetID, view, data) {
        const valSearchString = data.attr('searchString');
        const colorize = data.attr('colorizeByValue');
        const colStringFound = data.attr('stringFoundColor');
        const original_class = data.attr('opacity-color');


        var $div = $('#' + widgetID);
        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function () {
                vis.binds['vis-material-advanced'].tplMdListText(widgetID, view, data);
            }, 100);
        }

        function update(state) {

            $div.find('.mdw-text-field').html(state);


            if (colorize) {
                if (state == valSearchString) {
                    $div.find('.overlay').css('background-color', colStringFound);
                }
                else {
                    $div.find('.overlay').css('background-color', original_class);
                }
            } else {
                $div.find('.overlay').css('background-color', original_class);
            }

        }

        if (data.oid) {
            // subscribe on updates of value
            vis.states.bind(data.oid + '.val', function (e, newVal, oldVal) {
                update(newVal);
            });

            // set current value
            update(vis.states[data.oid + '.val']);
        }
    },
    tplMdListValve: function (widgetID, view, data) {
        var $div = $('#' + widgetID);
        const colorize = data.attr('colorizeByValue');
        const low = data.attr('below');
        // const $normal = data.attr('normal');
        const high = data.attr('above');
        const original_class = data.attr('opacity-color');

        const colorMedium = data.attr('color-medium');
        const colorHigh = data.attr('color-high');


        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function () {
                vis.binds['vis-material-advanced'].tplMdListValve(widgetID, view, data);
            }, 100);
        }

        // grey out the value in case the last change is more than 24h ago
        var curTime = new Date().getTime();
        var lcTime = vis.states[data.oid + '.lc'];
        var seconds = (curTime - lcTime) / 1000;
        if (seconds > 86400) {
            $div.find('.mdw-list-value').css('opacity', '0.5');
        }

        function update(state) {
            if (typeof state === 'number') {
                $div.find('.mdw-list-value').html(state.toFixed(1) + ' %');
            }

            if (colorize) {
                if (state <= low) {
                    $div.find('.overlay').css('background-color', original_class);
                } else if (state <= high) {
                    $div.find('.overlay').css('background-color', colorMedium);
                } else {
                    $div.find('.overlay').css('background-color', colorHigh);
                }
            }
            else {
                $div.find('.overlay').css('background-color', original_class);
            }
        }

        if (data.oid) {
            // subscribe on updates of value
            vis.states.bind(data.oid + '.val', function (e, newVal, oldVal) {
                update(newVal);
            });

            // set current value 
            update(vis.states[data.oid + '.val']);
        }
    },
    tplMdListRadio: function (widgetID, view, data) {
        const srcOff = 'widgets/vis-material-advanced/img/light_light_dim_00.png';
        const srcOn = 'widgets/vis-material-advanced/img/light_light_dim_100.png';
        var $div = $('#' + widgetID);

        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function () {
                vis.binds['vis-material-advanced'].tplMdListRadio(widgetID, view, data);
            }, 100);
        }

        function update(state) {
            var src = (state) ? srcOn : srcOff;
            var $tmp = $('#' + widgetID + '_checkbox');
            $tmp.prop('checked', state);
            //$div.find('.mdw-list-icon').find('img').attr('src', data.attr('oid'));
        }

        if (!vis.editMode) {
            var $this = $('#' + widgetID + '_checkbox');
            $this.change(function () {
                var $this_ = $(this);
                vis.setValue($this_.data('oid'), $this_.prop('checked'));
            });
        }

        if (data.oid) {
            // subscribe on updates of value
            vis.states.bind(data.oid + '.val', function (e, newVal, oldVal) {
                update(newVal);
            });

            // set current value
            update(vis.states[data.oid + '.val']);
        }
    },
    tplMdListNew: function (widgetID, view, data) {
        const srcOff = data.attr('card-icon-closed');
        const srcOn = data.attr('card-icon-open');
        var $div = $('#' + widgetID);

        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function () {
                vis.binds['vis-material-advanced'].tplMdListNew(widgetID, view, data);
            }, 100);
        }

        function update(state) {
            var src = (state) ? srcOn : srcOff;
            var $tmp = $('#' + widgetID + '_checkbox');
            $tmp.prop('checked', state);
            $div.find('.vma_picture').find('img').attr('src', src);
            $div.find('.vma_value').html(state.toFixed(1) + ' %');
        }

        if (!vis.editMode) {
            var $this = $('#' + widgetID + '_checkbox');
            $this.change(function () {
                var $this_ = $(this);
                vis.setValue($this_.data('oid'), $this_.prop('checked'));
            });
        }

        if (data.oid) {
            // subscribe on updates of value
            vis.states.bind(data.oid + '.val', function (e, newVal, oldVal) {
                update(newVal);
            });

            // set current value
            update(vis.states[data.oid + '.val']);
        }
        var $this = $('#' + widgetID);
        //console.log($div.find('.vma_outer_div').css('height'));
        var height = $this.innerHeight();
       
        if (height > 42) {
            switch (data.attr('value-vertical')) {
                case 'top': {
                    break;
                }
                case 'center': {
                    var top = height / 2 - 11;
                    $div.find('.vma_vertical_topspacer').css('height', top + "px");
                    break;
                }
                case 'bottom': {
                    var top = height - 11;
                    $div.find('.vma_vertical_topspacer').css('height', top + "px");
                    break;
                }
            }
        }
        const radius = data.attr('border_radius');
        $div.find('.vma_overlay').css('border-radius',radius + "px") ;
        $div.find('.vma_outer_div').css('border-radius',radius + "px");
        $div.find('.vma_inner_container_div').css('border-radius',radius + "px");
       

    },
    tplMdListNew2: function (widgetID, view, data) {
        const srcOff = data.attr('card-icon-closed');
        const srcOn = data.attr('card-icon-open');
        var $div = $('#' + widgetID);

        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function () {
                vis.binds['vis-material-advanced'].tplMdListNew2(widgetID, view, data);
            }, 100);
        }

        function update(state,state2) {
            var src = (state) ? srcOn : srcOff;
            var $tmp = $('#' + widgetID + '_checkbox');
            $tmp.prop('checked', state);
            $div.find('.vma_picture').find('img').attr('src', src);
            $div.find('.vma_value2_1').html(state.toFixed(1) + ' °C');
            $div.find('.vma_value2_2').html(state2.toFixed(1) + ' %');
        }

        if (!vis.editMode) {
            var $this = $('#' + widgetID + '_checkbox');
            $this.change(function () {
                var $this_ = $(this);
                vis.setValue($this_.data('oid'), $this_.prop('checked'));
            });
        }

        if (data.oid) {
            // subscribe on updates of value
            vis.states.bind(data.oid + '.val', function (e, newVal, oldVal) {
                update(newVal);
            });

            // set current value
            update(vis.states[data.oid + '.val'], vis.states[data.oid2 + '.val']);
        }
        var $this = $('#' + widgetID);
        //console.log($div.find('.vma_outer_div').css('height'));
        var height = $this.innerHeight();
       
        if (height > 42) {
            switch (data.attr('value-vertical')) {
                case 'top': {
                    break;
                }
                case 'center': {
                    var top = height / 4 - 5;
                    $div.find('.vma_vertical_topspacer').css('height', top + "px");                    
                    break;
                }
                case 'bottom': {
                    var top = height /2  - 11;
                    $div.find('.vma_vertical_topspacer').css('height', top + "px");
                    break;
                }
            }
        }
        const radius = data.attr('border_radius');
        $div.find('.vma_overlay').css('border-radius',radius + "px") ;
        $div.find('.vma_outer_div').css('border-radius',radius + "px");
        $div.find('.vma_inner_container_div').css('border-radius',radius + "px");
       

    }

};

vis.binds["vis-material-advanced"].showVersion();