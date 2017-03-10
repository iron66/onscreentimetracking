# onscreentimetracking
Simple JS module which track element on screen time

**Usage:**
```javascript
var test = triggerVisability({
        selector: '.target',
        interval: 1000, //ms
        percentOnScreen: 25,
        callback: function (data) {
            console.log(data.counter + '\n' + data.visiablePart);
        }
    });

test();
```
data object contains following:
* data.counter - timer value
* data.visiablePart - visiable part of an element in percents

note:
Supports only vertical axis