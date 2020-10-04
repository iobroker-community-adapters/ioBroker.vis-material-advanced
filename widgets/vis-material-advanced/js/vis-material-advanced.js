/*
    ioBroker.vis vis-material-advanced Widget-Set

    version: \"0.8.1"

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
    "opacityColor": {
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
    "valueAlign": {
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
      },
      "BoxStyle": {
          "en": "Design of widget",
          "de": "Widget Design",
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
    version: "0.6.5",
    showVersion: function () {
        if (vis.binds["vis-material-advanced"].version) {
            console.log('Version vis-material-advanced: ' + vis.binds["vis-material-advanced"].version);
            vis.binds["vis-material-advanced"].version = null;
        }
    },
    tplMdListVal: function (widgetID, view, data, val_type) {
        var $div = $('#' + widgetID);
        
        const border = data.attr('border');

        const colorize = data.attr('colorizeByValue');
        
        const low = data.attr('below');        
        const high = data.attr('above');
        const colorLow = data.attr('color-low');
        const colorHigh = data.attr('color-high');

        const original_class = data.attr('opacityColor');
        var type;

        type = getPostFix(val_type);
        
        setBorderAndOpacColor(border, $div, original_class);
        
        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function () {
                vis.binds['vis-material-advanced'].tplMdListVal(widgetID, view, data,val_type);
            }, 100);
        }

        // grey out the value in case the last change is more than 24h ago
        grayOutWhenInactive(data, $div);

        function update(state) {
            if (typeof state === 'number') {
                $div.find('.vma_value').html(state.toFixed(1) + type);
            }
            if (colorize) {
                if (state <= low) {
                    $div.find('.vma_overlay').css('background-color', colorLow);
                } else if (state >= high) {
                    $div.find('.vma_overlay').css('background-color', colorHigh);
                } else {
                    $div.find('.vma_overlay').css('background-color', original_class);
                }
            }
            else
            {
                $div.find('.vma_overlay').css('background-color', original_class);
            }

        }

        if (data.oid) {
            // subscribe on updates of value
            vis.states.bind(data.oid + '.val', function (e, newVal, oldVal) {
                update(newVal);
            });
            $div.find('.vma_overlay').css('background-color', original_class);
            // set current value
            update(vis.states[data.oid + '.val']);
        }

        setPositionSingle($('#' + widgetID), data, $div);
        hideIconInWidget(data, $div);
    },
    tplMdListTempHumid: function (widgetID, view, data,type1,type2) {
        const icon = data.attr('cardIcon');
       
        var $div = $('#' + widgetID);

        const original_class = data.attr('opacityColor');
        const border = data.attr('border');

        const valtype1 = getPostFix(type1);
        const valtype2 = getPostFix(type2);


        setBorderAndOpacColor(border, $div, original_class);

        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function () {
                vis.binds['vis-material-advanced'].tplMdListTempHumid(widgetID, view, data,type1,type2);
            }, 100);
        }

        function update(state,state2) { 
            $div.find('.vma_picture').find('img').attr('src', icon);
            $div.find('.vma_value2_1').html(state.toFixed(1) + valtype1);
            $div.find('.vma_value2_2').html(state2.toFixed(1) + valtype2);
        }

 
        if (data.oid) {
            // subscribe on updates of value
            vis.states.bind(data.oid + '.val', function (e, newVal, oldVal) {
                update(newVal);
            });

            // set current value
            update(vis.states[data.oid + '.val'], vis.states[data.oid2 + '.val']);
        }
        
        
        setPosition($('#' + widgetID), data, $div);
        hideIconInWidget(data, $div);
    },
    tplMdListThermostat: function (widgetID, view, data,type1) {
        const icon = data.attr('cardIcon');
       
        var $div = $('#' + widgetID);

        const original_class = data.attr('opacityColor');
        const border = data.attr('border');

        const valtype1 = getPostFix(type1);
       


        setBorderAndOpacColor(border, $div, original_class);

        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function () {
                vis.binds['vis-material-advanced'].tplMdListThermostat(widgetID, view, data,type1);
            }, 100);
        }

        function update(state) { 
            $div.find('.vma_picture').find('img').attr('src', icon);
           
            if (data.attr('readOnly')) {

                $div.find('.vma_value').html(state + valtype1);              

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
        
        
        setPositionSingle($('#' + widgetID), data, $div);
        hideIconInWidget(data, $div);
    },
    tplMdListLight: function (widgetID, view, data) {
        const srcOff = data.attr('cardIconOff');
        const srcOn = data.attr('cardIconOn');
        const border = data.attr('border');

        const colorize = data.attr('colorizeByValue');
        const onColor = data.attr('lightOnColor');
        
        const original_class = data.attr('opacityColor');

        var $div = $('#' + widgetID);

        setBorderAndOpacColor(border, $div, original_class);


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
            $div.find('.vma_picture').find('img').attr('src', src);
           
            if (data.attr('readOnly')) {
                if (state) {
                    $div.find('.vma_value').html("on");
                } else {
                    $div.find('.vma_value').html("off");
                }
            }
            if (colorize) {
                if (state) {
                    $div.find('.vma_overlay').css('background-color', onColor);
                }
                else
                {
                    $div.find('.vma_overlay').css('background-color', original_class);
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
        setPositionSingle($('#' + widgetID), data, $div);        
        hideIconInWidget(data, $div);
    },
    tplMdListLightDim: function (widgetID, view, data) {
        const border = data.attr('border');

        const colorize = data.attr('colorizeByValue');
        const onColor = data.attr('lightOnColor');
        
        const original_class = data.attr('opacityColor');

        var $div = $('#' + widgetID);

        setBorderAndOpacColor(border, $div, original_class);

        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function () {
                vis.binds['vis-material-advanced'].tplMdListLightDim(widgetID, view, data);
            }, 100);
        }

        function update(state) {

            var src = '/icons-mfd-svg/light_light_dim_' + Math.ceil(state / 10) + '0.svg';
            $div.find('.vma_picture').find('img').attr('src', src);
            if (data.attr('readOnly')) {

                $div.find('.vma_value').html(state + " %");

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
        setPositionSingle($('#' + widgetID), data, $div);    
        hideIconInWidget(data, $div);    
    },
    tplMdListWindowShutter: function (widgetID, view, data) {
        const border = data.attr('border');
        const original_class = data.attr('opacityColor');

        var $div = $('#' + widgetID);
        setBorderAndOpacColor(border, $div, original_class);

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

            var src = '/icons-mfd-svg/fts_shutter_' + name + '0.svg';
            if ( name == 0 )
            {
                var src = '/icons-mfd-svg/fts_window_2w.svg';
            }
            // console.log(' name : ' + name + " Icon : " + src);
            $div.find('.vma_picture').find('img').attr('src', src);
            if (data.attr('readOnly')) {

                $div.find('.vma_value').html(state + "%");

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

        setPositionSingle($('#' + widgetID), data, $div);  
        hideIconInWidget(data, $div);   
    },
    tplMdListLightKelvin: function (widgetID, view, data) {
        const srcCold = data.attr('cardIcon-coldwhite');
        const srcMedium = data.attr('cardIcon-medium');
        const srcWarm = data.attr('cardIcon-warmwhite');
        
        const border = data.attr('border');
        const original_class = data.attr('opacityColor');

        var $div = $('#' + widgetID);
        setBorderAndOpacColor(border, $div, original_class);

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
                 src = srcWarm;
            } else if (state >= medium && state < cold) {
                src = srcMedium;
            } else if (state >= cold && state <= data.attr('max')) {
                src = srcCold;
            } else {
                console.log('Fehler');
                src = 'Fehler';
            }
            $div.find('.vma_picture').find('img').attr('src', src);
            if (data.attr('readOnly')) {

                $div.find('.vma_value').html(state + " K");

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
        setPositionSingle($('#' + widgetID), data, $div);    
        hideIconInWidget(data, $div);    
    },
    tplMdListVolume: function (widgetID, view, data) {
        const srcOff = data.attr('cardIcon-low');
        const srcMedium = data.attr('cardIcon-medium');
        const srcOn = data.attr('cardIcon-high');
       
        const border = data.attr('border');
        const original_class = data.attr('opacityColor');

        var $div = $('#' + widgetID);
        setBorderAndOpacColor(border, $div, original_class);


        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function () {
                vis.binds['vis-material-advanced'].tplMdListVolume(widgetID, view, data);
            }, 100);
        }

        function update(state) {

            if (state == 0) {
                $div.find('.vma_picture').find('img').attr('src', srcOff);
            } else if (state >= 80 * data.attr('Max') / 100) {
                $div.find('.vma_picture').find('img').attr('src', srcOn);
            } else {
                $div.find('.vma_picture').find('img').attr('src', srcMedium);
            }
            if (data.attr('readOnly')) {

                $div.find('.vma_value').html(state);

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
        else
        {
            $div.find('.vma_picture').find('img').attr('src', srcOff);
        }
        setPositionSingle($('#' + widgetID), data, $div);      
        hideIconInWidget(data, $div);  
    },
    tplMdListGarage: function (widgetID, view, data) {
        const srcOff = data.attr('cardIconClosed');
        const srcOn = data.attr('cardIconOpen');
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
        setPositionSingle($('#' + widgetID), data, $div);
        hideIconInWidget(data, $div);
    },
    tplMdListPressure: function (widgetID, view, data) {
        var $div = $('#' + widgetID);
        const colorize = data.attr('colorizeByValue');
        const original_class = data.attr('opacityColor');
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
        setPositionSingle($('#' + widgetID), data, $div);
        hideIconInWidget(data, $div);
    },
    tplMdListBoolean: function (widgetID, view, data) {
        const srcTrue = data.attr('cardIconTrue');
        const srcFalse = data.attr('cardIconFalse');
        const valTrue = data.attr('true');
        const valFalse = data.attr('false');
        const colorize = data.attr('colorizeByValue');
        const colTrue = data.attr('color-true');
        const colFalse = data.attr('color-false');
      
        const border = data.attr('border');
        const original_class = data.attr('opacityColor');

        var $div = $('#' + widgetID);
        setBorderAndOpacColor(border, $div, original_class);

        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function () {
                vis.binds['vis-material-advanced'].tplMdListBoolean(widgetID, view, data);
            }, 100);
        }

        function update(state) {
            var value = (state) ? valTrue : valFalse;
            var src = (state) ? srcTrue : srcFalse;
            $div.find('.vma_value').html(value);
            $div.find('.vma_picture').find('img').attr('src', src);

            if (colorize) {
                if (state) {
                    $div.find('.vma_overlay').css('background-color', colTrue);
                } else if (!state) {
                    $div.find('.vma_overlay').css('background-color', colFalse);
                }
            } else {
                $div.find('.vma_overlay').css('background-color', original_class);
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

        setPositionSingle($('#' + widgetID), data, $div);
        hideIconInWidget(data, $div);
    },
    tplMdListNumber: function (widgetID, view, data) {
        const valLow = data.attr('low');
        const valHigh = data.attr('high');
        const colorize = data.attr('colorizeByValue');
        const colLow = data.attr('color-low');
        const colHigh = data.attr('color-high');
       
        const border = data.attr('border');
        const original_class = data.attr('opacityColor');

        var $div = $('#' + widgetID);
        setBorderAndOpacColor(border, $div, original_class);

        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function () {
                vis.binds['vis-material-advanced'].tplMdListNumber(widgetID, view, data);
            }, 100);
        }

        function update(state) {

            if ( data.unit != "" )
            {
                var unit = getPostFix(data.unit.trim());
                $div.find('.vma_value').html(state+ ' '+ unit);
            }
            else {
                $div.find('.vma_value').html(state);
            }


            if (colorize) {
                if (state <= valLow) {
                    $div.find('.vma_overlay').css('background-color', colLow);
                } else if (state >= valHigh) {
                    $div.find('.vma_overlay').css('background-color', colHigh);
                }
                else {
                    $div.find('.vma_overlay').css('background-color', original_class);
                }
            } else {
                $div.find('.vma_overlay').css('background-color', original_class);
            }

            hideIconInWidget(data, $div);

        }

        if (data.oid) {
            // subscribe on updates of value
            vis.states.bind(data.oid + '.val', function (e, newVal, oldVal) {
                update(newVal);
            });

            // set current value
            update(vis.states[data.oid + '.val']);
        }
        setPositionSingle($('#' + widgetID), data, $div);     
    },
    tplMdListText: function (widgetID, view, data) {
        const valSearchString = data.attr('searchString');
        const colorize = data.attr('colorizeByValue');
        const colStringFound = data.attr('stringFoundColor');
        
        const border = data.attr('border');
        const original_class = data.attr('opacityColor');

        var $div = $('#' + widgetID);
        setBorderAndOpacColor(border, $div, original_class);

        
        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function () {
                vis.binds['vis-material-advanced'].tplMdListText(widgetID, view, data);
            }, 100);
        }

        function update(state) {

            $div.find('.vma_value').html(state);


            if (colorize) {
                if (state == valSearchString) {
                    $div.find('.vma_overlay').css('background-color', colStringFound);
                }
                else {
                    $div.find('.vma_overlay').css('background-color', original_class);
                }
            } else {
                $div.find('.vma_overlay').css('background-color', original_class);
            }
            hideIconInWidget(data, $div);
        }

        if (data.oid) {
            // subscribe on updates of value
            vis.states.bind(data.oid + '.val', function (e, newVal, oldVal) {
                update(newVal);
            });

            // set current value
            update(vis.states[data.oid + '.val']);
        }
        setPositionSingle($('#' + widgetID), data, $div);     
    },
    tplMdListValve: function (widgetID, view, data) {
      
        const colorize = data.attr('colorizeByValue');
        const low = data.attr('below');
        // const $normal = data.attr('normal');
        const high = data.attr('above');
      
        const colorMedium = data.attr('color-medium');
        const colorHigh = data.attr('color-high');
      
        const border = data.attr('border');
        const original_class = data.attr('opacityColor');

        var $div = $('#' + widgetID);
        setBorderAndOpacColor(border, $div, original_class);


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
            $div.find('.vma_value').css('opacity', '0.5');
        }
        

        function update(state) {
            if (typeof state === 'number') {
                $div.find('.vma_value').html(state.toFixed(1) + ' %');
            }

            if (colorize) {
                if (state <= low) {
                    $div.find('.vma_overlay').css('background-color', original_class);
                } else if (state <= high) {
                    $div.find('.vma_overlay').css('background-color', colorMedium);
                } else {
                    $div.find('.vma_overlay').css('background-color', colorHigh);
                }
            }
            else {
                $div.find('.vma_overlay').css('background-color', original_class);
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
        setPositionSingle($('#' + widgetID), data, $div);  
        hideIconInWidget(data, $div);  
    },
    tplMdListRadio: function (widgetID, view, data) {       
        //const src = data.attr('cardIcon');
        const border = data.attr('border');

        const colorize = data.attr('colorizeByValue');
        const onColor = data.attr('lightOnColor');
        
        const original_class = data.attr('opacityColor');

        var $div = $('#' + widgetID);

        setBorderAndOpacColor(border, $div, original_class);


        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function () {
                vis.binds['vis-material-advanced'].tplMdListRadio(widgetID, view, data);
            }, 100);
        }

        function update(state) {
          //  var src = (state) ? srcOn : srcOff;
            var $tmp = $('#' + widgetID + '_checkbox');
            $tmp.prop('checked', state);
          //  $div.find('.vma-picture').find('img').attr('src', src);
           
            if (data.attr('readOnly')) {
                if (state) {
                    $div.find('.vma_value').html("on");
                } else {
                    $div.find('.vma_value').html("off");
                }
            }
            if (colorize) {
                if (state) {
                    $div.find('.vma_overlay').css('background-color', onColor);
                }
                else
                {
                    $div.find('.vma_overlay').css('background-color', original_class);
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
        setPositionSingle($('#' + widgetID), data, $div);   
        hideIconInWidget(data, $div);     
    },
    tplMdListOpenClose: function (widgetID, view, data) {
        const srcClosed = data.attr('cardIconClosed');
        const srcOpen = data.attr('cardIconOpen');  
        const valOpen = _('open');
        const valClosed = _('closed');
        
        const border = data.attr('border');      
        
        const colorize = data.attr('colorizeByValue');
        const opacity = data.attr('opacityColor'); 

        var $div = $('#' + widgetID);

        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function () {
                vis.binds['vis-material-advanced'].tplMdListOpenClose(widgetID, view, data);
            }, 100);
        }

        $div.find('.vma_overlay').css('background-color', opacity);

        function update(state) {
            var value = (state) ? valOpen : valClosed;
            var src = (state) ? srcOpen : srcClosed;
            var color= (state) ? data.attr('colorOpen') : opacity;
                        
            $div.find('.vma_picture').find('img').attr('src', src);            
            $div.find('.vma_value').html(value);

            if ( colorize)
            {
                $div.find('.vma_overlay').css('background-color', color);
            }
            else {
                $div.find('.vma_overlay').css('background-color', opacity);
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

            if ( border )
            {
                $div.find('.vma_inner_container_div').css('border','1px solid white' );
            }
            $div.find('.vma_overlay').css('background-color', opacity);
    
            // set current value
            update(vis.states[data.oid + '.val']);
        }
       setPositionSingle($('#' + widgetID), data, $div);
       hideIconInWidget(data, $div);
     
    },
    tplMdListOccupancy: function (widgetID, view, data) {
        const srcClosed = data.attr('iconNoMotion');
        const srcOpen = data.attr('iconMotion');  
        const valMotion = _('motion');
        const valNoMotion = _('nomotion');
        
        const valOpen = _('open');
        const valClosed = _('closed');
        
        const border = data.attr('border');      
        
        const colorize = data.attr('colorizeByValue');
        const motionColor = data.attr('motionColor')
        const opacity = data.attr('opacityColor'); 

        var $div = $('#' + widgetID);

        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function () {
                vis.binds['vis-material-advanced'].tplMdListOccupancy(widgetID, view, data);
            }, 100);
        }

        $div.find('.vma_overlay').css('background-color', opacity);

        function update(state) {
            var value = (state) ? valMotion : valNoMotion;
            var src = (state) ? srcOpen : srcClosed;
            var color= (state) ? data.attr('colorOpen') : opacity;
                        
            $div.find('.vma_picture').find('img').attr('src', src);            
            $div.find('.vma_value').html(value);

            if ( colorize)
            {
                if ( state )
                {
                $div.find('.vma_overlay').css('background-color', motionColor);
                }
                else
                {
                    $div.find('.vma_overlay').css('background-color', opacity);    
                }
            }
            else {
                $div.find('.vma_overlay').css('background-color', opacity);
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

            if ( border )
            {
                $div.find('.vma_inner_container_div').css('border','1px solid white' );
            }
            $div.find('.vma_overlay').css('background-color', opacity);
    
            // set current value
            update(vis.states[data.oid + '.val']);
        }
        setPositionSingle($('#' + widgetID), data, $div);
        hideIconInWidget(data, $div);

      
       

    },
    tplMdListNew: function (widgetID, view, data) {
        const srcOff = data.attr('cardIconClosed');
        const srcOn = data.attr('cardIconOpen');        
        const colorize = data.attr('colorizeByValue');
        const opacity = data.attr('opacityColor'); 
        var $div = $('#' + widgetID);

        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function () {
                vis.binds['vis-material-advanced'].tplMdListNew(widgetID, view, data);
            }, 100);
        }

        $div.find('.vma_overlay').css('background-color', opacity);

        function update(state) {
            var src = (state) ? srcOn : srcOff;
            var $tmp = $('#' + widgetID + '_checkbox');
            $tmp.prop('checked', state);
            $div.find('.vma_picture').find('img').attr('src', src);
            $div.find('.vma_value').html(state.toFixed(1) + ' %');

            if (colorize) {
                if (state <= valLow) {
                    $div.find('.overlay').css('background-color', colLow);
                } else if (state >= valHigh) {
                    $div.find('.overlay').css('background-color', colHigh);
                }
                else {
                    $div.find('.overlay').css('background-color', original_class);
                }
            }
            else {
                $div.find('.vma_overlay').css('background-color', opacity);
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
        setPositionSingle($('#' + widgetID), data, $div);
        hideIconInWidget(data, $div);

        
       

    },
    tplMdListNewDuo: function (widgetID, view, data) {
        const icon = data.attr('cardIcon');
       
        var $div = $('#' + widgetID);

        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function () {
                vis.binds['vis-material-advanced'].tplMdListNewDuo(widgetID, view, data);
            }, 100);
        }

        function update(state,state2) {
         
         
         
            $div.find('.vma_picture').find('img').attr('src', icon);
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
        
        
        
        setPosition($('#' + widgetID), data, $div);
        hideIconInWidget(data, $div);
       
        console.log('');
    },
    tplMdListRegenRadarDWD: function (widgetID,view,data) {
        var $div = $('#' + widgetID);
        if (!$div.length) {
            return setTimeout(function () {
                vis.binds['vis-material-advanced'].tplMdListRegenRadarDWD(widgetID, view, data);
            }, 100);
        }
        function update(state) {
            $div.find('.vma_value').html(state);
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
    tplMdListDiv: function (widgetID, view, data) {
        const srcOff = data.attr('cardIconClosed');
        const srcOn = data.attr('cardIconOpen');        
        const colorize = data.attr('colorizeByValue');
        const opacity = data.attr('opacityColor'); 
        var $div = $('#' + widgetID);

        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function () {
                vis.binds['vis-material-advanced'].tplMdListDiv(widgetID, view, data);
            }, 100);
        }

        $div.find('.vma_overlay').css('background-color', opacity);
       // $(' script ').find('tplMaListDiv').attr('data-vis-attrs11','susi/text;');
        function update(state) {
            // var src = (state) ? srcOn : srcOff;
            // var $tmp = $('#' + widgetID + '_checkbox');
            // $tmp.prop('checked', state);
            // $div.find('.vma_picture').find('img').attr('src', src);
            $div.find('.vma_value').html(state+ ' %');

            // if (colorize) {
            //     if (state <= valLow) {
            //         $div.find('.overlay').css('background-color', colLow);
            //     } else if (state >= valHigh) {
            //         $div.find('.overlay').css('background-color', colHigh);
            //     }
            //     else {
            //         $div.find('.overlay').css('background-color', original_class);
            //     }
            // }
            // else {
            //     $div.find('.vma_overlay').css('background-color', opacity);
            // }
        }

        
        if (!vis.editMode) {
            var $this = $('#' + widgetID + '_checkbox');
            $this.change(function () {
                var $this_ = $(this);
                vis.setValue($this_.data('oid'), $this_.prop('checked'));
            });
            $div.click(function() {
                var $this_ = $(this);
                vis.setValue($this_.data('oid'),'sieben');
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
        setPositionSingle($('#' + widgetID), data, $div);
        hideIconInWidget(data, $div);
        
       

    }
    


};

vis.binds["vis-material-advanced"].showVersion();



function hideIconInWidget(data, $div) {

    if ( data.attr('showIcon')  && data.attr('showTitle') ) {
        // show Icon AND show Title Container
        $div.find('.vma_picture').removeAttr('hidden');
        $div.find('.vma_title_subtitle_id').removeAttr('hidden');
       
        $div.find('.vma_title_subtitle_id').addClass('vma_title_subtitle_container');
        $div.find('.vma_title_subtitle_id').removeClass('vma_title_subtitle_container_without_icon');
       
        $div.find('.vma_value_id').removeClass('vma_value_container_without_icon');
        $div.find('.vma_value_id').removeClass('vma_value_container_without_icon_and_title');
        $div.find('.vma_value_id').removeClass('vma_value_container_without_title');
        $div.find('.vma_value_id').addClass('vma_value_container');
    }
    else if ( !data.attr('showIcon') && data.attr('showTitle') ) {
        // hide Icon AND show Title Container
        $div.find('.vma_picture').attr('hidden', true);
        $div.find('.vma_title_subtitle_id').removeAttr('hidden');
        
        $div.find('.vma_title_subtitle_id').removeClass('vma_title_subtitle_container');
        $div.find('.vma_title_subtitle_id').addClass('vma_title_subtitle_container_without_icon');
                
        $div.find('.vma_value_id').addClass('vma_value_container_without_icon');
        $div.find('.vma_value_id').removeClass('vma_value_container_without_icon_and_title');
        $div.find('.vma_value_id').removeClass('vma_value_container_without_title');
        $div.find('.vma_value_id').removeClass('vma_value_container');
    }
    else if (data.attr('showIcon') && ! data.attr('showTitle') ) {
        // show Icon AND hide Title Container
        $div.find('.vma_picture').removeAttr('hidden');
        $div.find('.vma_title_subtitle_id').attr('hidden',true);
        
        $div.find('.vma_title_subtitle_id').addClass('vma_hidden');
        $div.find('.vma_title_subtitle_id').removeClass('vma_title_subtitle_container_without_icon');

        
        $div.find('.vma_value_id').removeClass('vma_value_container_without_icon');
        $div.find('.vma_value_id').removeClass('vma_value_container_without_icon_and_title');
        $div.find('.vma_value_id').addClass('vma_value_container_without_title');
        $div.find('.vma_value_id').removeClass('vma_value_container');
    }
    else if ( ! data.attr('showIcon') && ! data.attr('showTitle') ) {
        // hide Icon AND hide Title Container
        $div.find('.vma_picture').attr('hidden',true);
        $div.find('.vma_title_subtitle_id').attr('hidden',true);
        
        $div.find('.vma_title_subtitle_id').addClass('vma_hidden');
        $div.find('.vma_title_subtitle_id').removeClass('vma_title_subtitle_container_without_icon');

        
        $div.find('.vma_value_id').removeClass('vma_value_container_without_icon');
        $div.find('.vma_value_id').addClass('vma_value_container_without_icon_and_title');
        $div.find('.vma_value_id').removeClass('vma_value_container_without_title');
        $div.find('.vma_value_id').removeClass('vma_value_container');
    }
    if ( data.showIcon ) {
        var currentTextSize =  parseInt($div.find('.vma_title').css('font-size'));
        if ( currentTextSize <= 16 )
        {
            $div.find('.vma_outer_div').css('min-height','30px');
            $div.find('.vma_inner_container_div').css('min-height','30px');
            $div.find('.vms_title').css('min-height','19px');
            $div.find('.vma_only_title').css('min-height','19px');
        }
    }
}

function grayOutWhenInactive(data, $div) {
    var curTime = new Date().getTime();
    var lcTime = vis.states[data.oid + '.lc'];
    var seconds = (curTime - lcTime) / 1000;
    if (seconds > 86400) {
        $div.find('.vma_overlay').css('opacity', '0.5');
    }
}

function setBorderAndOpacColor(border, $div, original_class) {
    if (border) {
        $div.find('.vma_inner_container_div').css('border', '1px solid white');
    }

    $div.find('.vma_overlay').css('background-color', original_class);
}

function getPostFix(val_type) {
    var type;
    switch (val_type) {
        case 'temp': 
        case 'Celsius': {
            type = ' °C';
            break;
        }
        case 'Fahrenheit': {
            type = ' °F';
            break;
        }
        case 'humid': 
        case 'valve': 
        case 'percent': {
            type = ' %';
            break;
        }
        case 'pressure': {
            type = ' hPa';
            break;
        }
        default: {
            type = val_type;
        }
    }
    return type;
}

function setRadius(data, $div) {
    const radius = data.attr('borderRadius');
    $div.find('.vma_overlay').css('border-radius', radius + "px");
    $div.find('.vma_outer_div').css('border-radius', radius + "px");
    $div.find('.vma_inner_container_div').css('border-radius', radius + "px");
    return true;
}

function setPositionSingle($this, data, $div) {   
    //console.log($div.find('.vma_outer_div').css('height'));
    var height = $this.innerHeight();
    const value_height = $div.find('.vma_value').height();
    const empty_space = height - value_height;
    var top = 0;

    if (height > 42) {
        switch (data.attr('valueVertical')) {
            case 'top': {
                top = 4;
                break;
            }
            case 'center': {
                top = empty_space / 2 ;
                break;
            }
            case 'bottom': {
                top = empty_space - 4;                          
                break;
            }
        }
    }
    $div.find('.vma_value').css('padding-top', top + "px");
    if ( data.onlyTitle )
    {
        $div.find('.vma_only_title').css('padding-top', top + "px");
        
    }
    if ( data.centerIcon )
    {
        $div.find('.vma_picture').css('padding-top', top - 14 + "px");        
    }
    if ( ( data.onlyTitle || ! data.showTitle) && ! data.showIcon )
    {
        document.documentElement.style.setProperty('--min-height-50','30px');
        document.documentElement.style.setProperty('--min-height-46','28px');
        document.documentElement.style.setProperty('--min-height-29','19px');
        document.documentElement.style.setProperty('--min-height-24','16px');
        document.documentElement.style.setProperty('--min-height-19','13px');
        // $div.find('.vma_inner_container_div').css('min-height', '30px');        
        // $div.find('.vma_title_subtitle_container').css('min-height', '30px');         
        // $div.find('.vma_title_subtitle_container_without_icon').css('min-height', '30px');        
        // $div.find('.vma_value_container_without_icon').css('min-height', '30px');        
        // $div.find('.vma_value_container_without_icon_and_title').css('min-height', '30px');        
        // $div.find('.vma_value_container_without_icon_and_title').css('min-height', '30px');        
    }
    setRadius(data,$div);
    return true;
}

function setPosition($this, data, $div) {
    var height = $this.innerHeight();
    
    const value_height2 = $div.find('.vma_value2_1').outerHeight(true) + $div.find('.vma_value2_2').outerHeight(true);
    
    const empty_space = height - value_height2;

    var top = 0;

    if (empty_space >= 0) {
        switch (data.attr('valueVertical')) {
            case 'top': {
                top = 4;
                break;
            }
            case 'center': {
                top = empty_space / 2 ;
                break;
            }
            case 'bottom': {
                top = empty_space - 4;                
                break;
            }
        }
    }
    $div.find('.vma_value2_1').css('padding-top', top + "px");
    setRadius(data,$div);
    return true;
}

// function genTitleContainer($title,$subtitle,$text_color,$title_size,$subtitle_size)
// {
//     let divList = [];
//     divList.push =  '<div class="vma_title_subtitle_container" style="color:'+ $text_color +'; "></div>';
//     divList.push = '<div  class="vma_title" style="font-size: '+$title_size +';">';
//     divList.push = $title;
//     divList.push = '</div><div  class="vma_subtitle" style=" color: '+$text_color+';font-size: '+$subtitle_size+' ">';
//     divList.push = $subtitle +'</div></div>';
//     return {widget: divList.join('')}
// }