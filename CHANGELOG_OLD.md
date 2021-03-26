
## 1.3.1 (2020-12-28)
* added possibility to show value instead of the subtitle
* fixed a bug with weired slider behaviour, dont know how



## 1.3.0 (2020-11-16)
* released new version


## 1.2.1 (2020-11-16)
* changed position of properties to be alomst same everywhere

## 1.2.0 (2020-11-04)
* added option to round every corner different/not 
* added option to change color of border
* added option for shadow and size of shadow

## 1.1.1 (2020-10-18)
* url wrong in package.json


## 1.1.0 (2020-10-15)
* Travis changes

## 1.0.0 (2020-10-14)
* no changes, upgrading to 1.0

## 0.9.1 (2020-10-13)
* some colorizeByValue options did not work

## 0.9.0 (2020-10-13)
* bugfix for ListNumber and ListText, Icon should never been shown

## 0.8.15 (2020-10-13)
* position of Elements and min - height finally? fixed :)

## 0.8.14 (2020-10-04)
* border-fix due to changes in css

## 0.8.13 (2020-10-03)
* bugfix LightIcon not switching
* bugfix Volume Icon not shown if no object is set

## 0.8.12 (2020-10-01)
* Value font-size can be changed now


## 0.8.11 (2020-09-30)
* bugfix fo rwrong htm lin Shutter Widget, thx Sigi234


## 0.8.10 (2020-09-30)
* rebase to iobroker-ocmmunity-adapter
* added option to center Icon
* added option to have ONLY Title and no subtitle



## 0.8.9 (2020-09-28)
* added dependeny to icons-mfd-svg ( https://github.com/ioBroker/ioBroker.icons-mfd-svg ),so the icons look nicer and no need to deliver them
* some icons are missing there, so local icons are still used as well.
* ! If you do not install the adapter, the icons on the left side in edit vis will stay empty
* new units added to number widget

## 0.8.8 (2020-09-27)
* added Unit to ListNumber


## 0.8.7 (2020-09-27)
* added new widget thermostat, first try


## 0.8.6 (2020-09-27)
* All properties are now without - sign
* bugfix background-color issue, if corners were round there was different color beneath


## 0.8.5 (2020-09-27)
* Also Title can be hidden now
 
## 0.8.4 (2020-09-27)
* added possibility to hide the icon in each widget
* minor bugfixes
* refactoring again


## 0.8.3 (2020-09-26)
* refactoring js
* refactoring html
* added possibility to change Title and Subtitle size
* minor bugfixes

## 0.8.2 (2020-09-14)
* width of title can be changed now overall. add $("html").attr("style","--title-width:20%");  into global javascript. Standard now at 30%
* text-size removed from css. now you can set it again from outside


## 0.8.1 (2020-09-14)
* new version number

s
## 0.8.0 (2020-09-14)
* bugfix for smaller widgets
* new style for switch item
* removed text-align for slider

## 0.8.0-0 (2020-09-11)
* remove test widgets
* release 

## 0.7.0-beta.0 (2020-09-11)
* bugfix new widgets
* All widgets moved to new CSS Style
* rounded widget possible
* should not interfere with other Adapters anymore
  

## 0.6.3 (2020-09-08)
* bugfix valve widget


## 0.6.1
* added two new widgets with complete new css-classes. rounded corner, two value. 

## 0.5.7
* bugfix number widget

## 0.5.6
* type in volume

## 0.5.5
* no icons anymore for text and number

## 0.5.2
* removed (obsolete) class which caused Problems in other widgets
* added possibility to change the icons for the widgets ( except dimmer )

## 0.5.1
* some icons resized
* bugfix: all widgets have now default background-color #121212 but can be changed in settings.
* reorganized the settings to have some common order
* new Number and Text Widget ( similar to boolean )


## 0.5.0
* opacity now flexible
* reorg code

## 0.4.8
* bugfix alter pfade
* neues Valve Widget für Thermostate

## 0.4.3
* neues Boolean widget

## 0.4.2
* keine Änderungen, nur ein Label für Latest repository

## 0.3.5
* opacity kann beim Luftdruck frei geählt werden. Erstmal nur um es testen zu können

## 0.3.4
* Folgende Readonly Widgets: Light,LightDim,LightTemperature,Volume,Shutter

## 0.3.2
* npm ist erstellt, Pull Request für latest Repo gestellt
* volume widget hinzugrfügt
* erste Version vom Garagentor Widget ist erstellt, infos fehlen noch
* migration von vis-material zu vis-material-advanced ist bestätigt 
    Wer es sich traut, hier eine "Anleitung" für den Umzug:

    In vis alle widgets markieren und dann auf widgets exportieren klicken.

    Im Editor öffnen und folgende 2 "Suchen und ersetzen" ausführen:

    suchen: widgets/material
    ersetzen: widgets/vis-material-advanced

    suchen: "widgetSet": "material"
    ersetzen: "widgetSet": "vis-material-advanced"

    wieder importieren in vis.

## 0.1.0
* (EdgarM73) copied all functionality to new git and new Adapter
## 0.0.1
* (EdgarM73) initial release


## 0.1.0
* (EdgarM73) copied all functionality to new git and new Adapter
## 0.0.1
* (EdgarM73) initial release

