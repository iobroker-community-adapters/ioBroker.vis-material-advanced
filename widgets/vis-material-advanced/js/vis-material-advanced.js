/*
    ioBroker.vis vis-material-advanced Widget-Set

    version: "0.3.3"

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
        "colorizeByTemp": {
            "en": "colorize By Temp",
            "de": "einfärben durch Temp",
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
        }
    }
);

// this code can be placed directly in vis-material-advanced.html
vis.binds["vis-material-advanced"] = {
    version: "0.3.3",
    showVersion: function() {
        if (vis.binds["vis-material-advanced"].version) {
            console.log('Version vis-material-advanced: ' + vis.binds["vis-material-advanced"].version);
            vis.binds["vis-material-advanced"].version = null;
        }
    },
    tplMdListDoor: function(widgetID, view, data) {
        const srcOpen = 'widgets/vis-material-advanced/img/fts_door_open.png';
        const srcClosed = 'widgets/vis-material-advanced/img/fts_door.png';
        const valOpen = _('open');
        const valClosed = _('closed');

        var $div = $('#' + widgetID);
        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function() {
                vis.binds['vis-material-advanced'].tplMdListDoor(widgetID, view, data);
            }, 100);
        }

        function update(state) {
            var value = (state) ? valOpen : valClosed;
            var src = (state) ? srcOpen : srcClosed;
            $div.find('.md-list-value').html(value);
            $div.find('.md-list-icon').find('img').attr('src', src);
        }

        if (data.oid) {
            // subscribe on updates of value
            vis.states.bind(data.oid + '.val', function(e, newVal, oldVal) {
                update(newVal);
            });

            // set current value
            update(vis.states[data.oid + '.val']);
        }
    },
    tplMdListWindow: function(widgetID, view, data) {
        const srcOpen = 'widgets/vis-material-advanced/img/fts_window_2w_open.png';
        const srcClosed = 'widgets/vis-material-advanced/img/fts_window_2w.png';
        const valOpen = _('open');
        const valClosed = _('closed');
        var $div = $('#' + widgetID);

        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function() {
                vis.binds['vis-material-advanced'].tplMdListWindow(widgetID, view, data);
            }, 100);
        }

        function update(state) {
            var value = (state) ? valOpen : valClosed;
            var src = (state) ? srcOpen : srcClosed;
            $div.find('.md-list-value').html(value);
            $div.find('.md-list-icon').find('img').attr('src', src);
        }

        if (data.oid) {
            // subscribe on updates of value
            vis.states.bind(data.oid + '.val', function(e, newVal, oldVal) {
                update(newVal);
            });

            // set current value
            update(vis.states[data.oid + '.val']);
        }
    },
    tplMdListTemp: function(widgetID, view, data) {
        var $div = $('#' + widgetID);
        const $colorize = data.attr('colorizeByTemp');
        const $low = data.attr('below');
        // const $normal = data.attr('normal');
        const $high = data.attr('above');
        const $original_class = data.attr('opacity-color');

        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function() {
                vis.binds['vis-material-advanced'].tplMdListTemp(widgetID, view, data);
            }, 100);
        }

        // grey out the value in case the last change is more than 24h ago
        var curTime = new Date().getTime();
        var lcTime = vis.states[data.oid + '.lc'];
        var seconds = (curTime - lcTime) / 1000;
        if (seconds > 86400) {
            $div.find('.md-list-value').css('opacity', '0.5');
        }

        function update(state) {
            if (typeof state === 'number') {
                $div.find('.md-list-value').html(state.toFixed(1) + ' °C');
            }
            if ($colorize == true) {
                if (state <= $low) {
                    console.log('Temperatur ist niedrig ');
                    $div.find('.overlay').removeClass('opac-white opac-green opac-purple opac-red opac-blue opac-below opac-above').addClass('opac-below');
                } else if (state >= $high) {
                    console.log('Temperatur ist hoch');
                    $div.find('.overlay').removeClass('opac-white opac-green opac-purple opac-red opac-blue opac-below opac-above').addClass('opac-above');
                } else {
                    $div.find('.overlay').removeClass('opac-white opac-green opac-purple opac-red opac-blue opac-below opac-above').addClass($original_class);
                }
            }

        }

        if (data.oid) {
            // subscribe on updates of value
            vis.states.bind(data.oid + '.val', function(e, newVal, oldVal) {
                update(newVal);
            });

            // set current value
            update(vis.states[data.oid + '.val']);
        }
    },
    tplMdListHumid: function(widgetID, view, data) {
        var $div = $('#' + widgetID);
        const $colorize = data.attr('colorizeByTemp');
        const $low = data.attr('below');
        // const $normal = data.attr('normal');
        const $high = data.attr('above');
        const $original_class = data.attr('opacity-color');
        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function() {
                vis.binds['vis-material-advanced'].tplMdListHumid(widgetID, view, data);
            }, 100);
        }

        // grey out the value in case the last change is more than 24h ago
        var curTime = new Date().getTime();
        var lcTime = vis.states[data.oid + '.lc'];
        var seconds = (curTime - lcTime) / 1000;
        if (seconds > 86400) {
            $div.find('.md-list-value').css('opacity', '0.5');
        }

        function update(state) {
            if (typeof state === 'number') {
                $div.find('.md-list-value').html(state.toFixed(1) + ' %');
            }
            if ($colorize == true) {
                if (state <= $low) {
                    console.log('Temperatur ist niedrig ');
                    $div.find('.overlay').removeClass('opac-white opac-green opac-purple opac-red opac-blue opac-below opac-above').addClass('opac-below');
                } else if (state >= $high) {
                    console.log('Temperatur ist hoch');
                    $div.find('.overlay').removeClass('opac-white opac-green opac-purple opac-red opac-blue opac-below opac-above').addClass('opac-above');
                } else {
                    $div.find('.overlay').removeClass('opac-white opac-green opac-purple opac-red opac-blue opac-below opac-above').addClass($original_class);
                }
            }
        }

        if (data.oid) {
            // subscribe on updates of value
            vis.states.bind(data.oid + '.val', function(e, newVal, oldVal) {
                update(newVal);
            });

            // set current value 
            update(vis.states[data.oid + '.val']);
        }
    },
    tplMdListOccupancy: function(widgetID, view, data) {
        const srcMotion = data.attr('iconMotion');
        const srcNoMotion = data.attr('iconNoMotion');
        const valMotion = _('motion');
        const valNoMotion = _('nomotion');
        const $colorize = data.attr('colorizeByValue');
        const $motionColor = data.attr('motionColor');
        const $original_class = data.attr('opacity-color');

        var $div = $('#' + widgetID);

        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function() {
                vis.binds['vis-material-advanced'].tplMdListOccupancy(widgetID, view, data);
            }, 100);
        }

        // grey out the value in case the last change is more than 24h ago
        var curTime = new Date().getTime();
        var lcTime = vis.states[data.oid + '.lc'];
        var seconds = (curTime - lcTime) / 1000;
        if (seconds > 86400) {
            $div.find('.md-list-value').css('opacity', '0.5');
        }

        function update(state) {
            var value = (state) ? valMotion : valNoMotion;
            var src = (state) ? srcMotion : srcNoMotion;
            $div.find('.md-list-value').html(value);
            $div.find('.md-list-icon').find('img').attr('src', src);
            if ($colorize == true) {
                if (state == true) {
                    $div.find('.vis-widget-body').css('background-color', $motionColor);
                } else {
                    $div.find('.vis-widget-body').css('background-color', '');
                    //$div.find('.overlay').removeClass('opac-white opac-green opac-purple opac-red opac-blue opac-below opac-above').addClass($original_class);
                }
            }

        }

        if (data.oid) {
            // subscribe on updates of value
            vis.states.bind(data.oid + '.val', function(e, newVal, oldVal) {
                update(newVal);
            });

            // set current value
            update(vis.states[data.oid + '.val']);
        }
    },
    tplMdListLight: function(widgetID, view, data) {
        const srcOff = 'widgets/material/img/light_light_dim_00.png';
        const srcOn = 'widgets/material/img/light_light_dim_100.png';
        var $div = $('#' + widgetID);

        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function() {
                vis.binds['vis-material-advanced'].tplMdListLight(widgetID, view, data);
            }, 100);
        }

        function update(state) {
            var src = (state) ? srcOn : srcOff;
            var $tmp = $('#' + widgetID + '_button');
            $tmp.prop('checked', state);
            //  $div.find('.md-list-icon').find('img').attr('src', src);
        }

        if (!vis.editMode) {
            var $this = $('#' + widgetID + '_checkbox');
            $this.change(function() {
                var $this_ = $(this);
                vis.setValue($this_.data('oid'), $this_.prop('checked'));
            });
        }

        if (data.oid) {
            // subscribe on updates of value
            vis.states.bind(data.oid + '.val', function(e, newVal, oldVal) {
                update(newVal);
            });

            // set current value
            update(vis.states[data.oid + '.val']);
        }
    },
    tplMdListLightDim: function(widgetID, view, data) {
        const srcOff = 'widgets/material/img/light_light_dim_00.png';
        const srcOn = 'widgets/material/img/light_light_dim_100.png';
        var $div = $('#' + widgetID);

        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function() {
                vis.binds['vis-material-advanced'].tplMdListLightDim(widgetID, view, data);
            }, 100);
        }

        function update(state) {

            var src = 'widgets/material/img/light_light_dim_' + Math.ceil(state / 10) + '0.png';
            $div.find('.md-list-icon').find('img').attr('src', src);
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
            vis.states.bind(data.oid + '.val', function(e, newVal, oldVal) {
                update(newVal);
            });

            // set current value
            update(vis.states[data.oid + '.val']);
        }
    },
    tplMdListWindowShutter: function(widgetID, view, data) {
        const srcOff = 'widgets/vis-material-advanced/img/light_light_dim_00.png';
        const srcOn = 'widgets/vis-material-advanced/img/light_light_dim_100.png';
        var $div = $('#' + widgetID);

        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function() {
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
            $div.find('.md-list-icon').find('img').attr('src', src);
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
            vis.states.bind(data.oid + '.val', function(e, newVal, oldVal) {
                update(newVal);
            });

            // set current value
            update(vis.states[data.oid + '.val']);
        }
    },
    tplMdListLightKelvin: function(widgetID, view, data) {
        const srcCold = 'widgets/vis-material-advanced/img/fts_kelvin_kaltweiss.png';
        const srcMedium = 'widgets/vis-material-advanced/img/fts_kelvin_mittel.png';
        const srcWarm = 'widgets/vis-material-advanced/img/fts_kelvin_warmweiss.png';

        var $div = $('#' + widgetID);
        console.log('LightKelvin called');
        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function() {
                vis.binds['vis-material-advanced'].tplMdListLightKelvin(widgetID, view, data);
            }, 100);
        }

        function update(state) {
            var drittel = (data.attr('max') - data.attr('min')) / 3;
            var medium = parseInt(data.attr('min')) + parseInt(drittel);
            var cold = parseInt(data.attr('max')) - parseInt(drittel);
            var src;
            if (state >= data.attr('min') && state < medium) {
                console.log('warmweiss : min -> ' + data.attr('min') + " state -> " + state + " medium ->" + medium);
                src = srcWarm;
            } else if (state >= medium && state < cold) {
                console.log('medium: min -> ' + data.attr('min') + " state -> " + state + " medium ->" + medium);
                src = srcMedium;
            } else if (state >= cold && state <= data.attr('max')) {
                console.log('kaltweiss: max -> ' + data.attr('max') + " state -> " + state + " cold ->" + cold);
                src = srcCold;
            } else {
                console.log('Fehler');
                src = 'Fehler';
            }
            $div.find('.md-list-icon').find('img').attr('src', src);
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
            vis.states.bind(data.oid + '.val', function(e, newVal, oldVal) {
                update(newVal);
            });

            // set current value
            update(vis.states[data.oid + '.val']);
        }
    },
    tplMdListVolume: function(widgetID, view, data) {
        const srcOff = 'widgets/vis-material-advanced/img/volume-low.png';
        const srcMedium = 'widgets/vis-material-advanced/img/volume-medium.png';
        const srcOn = 'widgets/vis-material-advanced/img/volume-high.png';
        var $div = $('#' + widgetID);

        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function() {
                vis.binds['vis-material-advanced'].tplMdListVolume(widgetID, view, data);
            }, 100);
        }

        function update(state) {

            if (state == 0) {
                $div.find('.md-list-icon').find('img').attr('src', srcOff);
            } else if (state >= 80 * data.attr('Max') / 100) {
                $div.find('.md-list-icon').find('img').attr('src', srcOn);
            } else {
                $div.find('.md-list-icon').find('img').attr('src', srcMedium);
            }
            //var src = 'widgets/material/img/light_light_dim_' + Math.ceil(state / 10) + '0.png';
            //$div.find('.md-list-icon').find('img').attr('src', src);
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
            vis.states.bind(data.oid + '.val', function(e, newVal, oldVal) {
                update(newVal);
            });

            // set current value
            update(vis.states[data.oid + '.val']);
        }
    },
    tplMdListGarage: function(widgetID, view, data) {
        const srcOff = 'widgets/material/img/garage.png';
        const srcOn = 'widgets/material/img/garage-open.png';
        var $div = $('#' + widgetID);

        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function() {
                vis.binds['vis-material-advanced'].tplMdListGarage(widgetID, view, data);
            }, 100);
        }

        function update(state) {
            var src = (state) ? srcOn : srcOff;
            var $tmp = $('#' + widgetID + '_checkbox');
            $tmp.prop('checked', state);
            $div.find('.md-list-icon').find('img').attr('src', src);
        }

        if (!vis.editMode) {
            var $this = $('#' + widgetID + '_checkbox');
            $this.change(function() {
                var $this_ = $(this);
                vis.setValue($this_.data('oid'), $this_.prop('checked'));
            });
        }

        if (data.oid) {
            // subscribe on updates of value
            vis.states.bind(data.oid + '.val', function(e, newVal, oldVal) {
                update(newVal);
            });

            // set current value
            update(vis.states[data.oid + '.val']);
        }
    },
    tplMdListPressure: function(widgetID, view, data) {
        var $div = $('#' + widgetID);
        const $colorize = data.attr('colorizeByTemp');
        const $low = data.attr('below');
        // const $normal = data.attr('normal');
        const $high = data.attr('above');
        const $original_class = data.attr('opacity-color');

        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function() {
                vis.binds['vis-material-advanced'].tplMdListPressure(widgetID, view, data);
            }, 100);
        }

        // grey out the value in case the last change is more than 24h ago
        var curTime = new Date().getTime();
        var lcTime = vis.states[data.oid + '.lc'];
        var seconds = (curTime - lcTime) / 1000;
        if (seconds > 86400) {
            $div.find('.md-list-value').css('opacity', '0.5');
        }

        function update(state) {
            if (typeof state === 'number') {
                $div.find('.md-list-value').html(state.toFixed(1) + ' hPa');
            }
            if ($colorize == true) {
                if (state <= $low) {
                    console.log('Temperatur ist niedrig ');
                    $div.find('.overlay').removeClass('opac-white opac-green opac-purple opac-red opac-blue opac-below opac-above').addClass('opac-below');
                } else if (state >= $high) {
                    console.log('Temperatur ist hoch');
                    $div.find('.overlay').removeClass('opac-white opac-green opac-purple opac-red opac-blue opac-below opac-above').addClass('opac-above');
                } else {
                    $div.find('.overlay').removeClass('opac-white opac-green opac-purple opac-red opac-blue opac-below opac-above').addClass($original_class);
                }
            }

        }

        if (data.oid) {
            // subscribe on updates of value
            vis.states.bind(data.oid + '.val', function(e, newVal, oldVal) {
                update(newVal);
            });

            // set current value
            update(vis.states[data.oid + '.val']);
        }
    },
    tplMdListRadio: function(widgetID, view, data) {
        const srcOff = 'widgets/material/img/light_light_dim_00.png';
        const srcOn = 'widgets/material/img/light_light_dim_100.png';
        var $div = $('#' + widgetID);

        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function() {
                vis.binds['vis-material-advanced'].tplMdListRadio(widgetID, view, data);
            }, 100);
        }

        function update(state) {
            var src = (state) ? srcOn : srcOff;
            var $tmp = $('#' + widgetID + '_checkbox');
            $tmp.prop('checked', state);
            $div.find('.md-list-icon').find('img').attr('src', src);
        }

        if (!vis.editMode) {
            var $this = $('#' + widgetID + '_checkbox');
            $this.change(function() {
                var $this_ = $(this);
                vis.setValue($this_.data('oid'), $this_.prop('checked'));
            });
        }

        if (data.oid) {
            // subscribe on updates of value
            vis.states.bind(data.oid + '.val', function(e, newVal, oldVal) {
                update(newVal);
            });

            // set current value
            update(vis.states[data.oid + '.val']);
        }
    }

};

vis.binds["vis-material-advanced"].showVersion();