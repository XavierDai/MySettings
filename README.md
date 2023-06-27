# MySettings

## Basic Data Structure
### 1. Driver Dictionary:
```
{
  entryName1: {val: "...", onOff: true|false},
  entryName2: {val: "...", onOff: true|false},
  ...
}
```
**EntryNames** stand for the targets you might want to modify (e.g. `language`, `seat position`, `AC temperature` and etc.)
- **val** stands for the current value of the entry.
- **onOff** stands for the control over whether the modified data is to be saved or not.

### Subclass:
1. **defaultDriverDictionary:**
   data of the default driver
2. **originalCustomDictionary:**
   original data for users to modify
3. **customizedDictionary:**
   modified data by users
4. **systemDictionary:**
   temporary dictionary currently in use in the system. (When customized process finished or the "custom" driver is switched, systemDictionary will be written into customizedDictionary according to the fine-grained "onOff" values.)

### 2. flowChartTree node:
The following tree is generated by flow chart.
1. Activity tree node:
```
{
  val: "...",
  type: "activity",
  left: null,
  middle: ...,
  right: null,
}
```
- **val** stands for the content of the node (e.g. `Vehicle key detection`)
- **type** Problem determination or normal activity
- **left, middle, right** are three child nodes (or null)

2. Judge tree node
```
{
  val: {
          state: "...",
          leftCondition: "...",
          middleCondition: "...",
          rightCondition: "...",
        },
  type: "judge",
  left: ...,
  middle: ...,
  right: ...,
}
```

- **val.state** stands for the judge statement (e.g. `Driver Memory = `)
- **val.left/middle/rightCondition** stands for the condition on the left/middle/right branch (e.g. `Default_Driver`) if this path does exist.

## Webpage Operation:
1. Pick a driver
2. If the user select "custom", he/she could modify all the settings. Otherwise, he/she could only modify the `External Setting`.
3. Press "Run" button

## Run
### The entire process strictly follows the steps in the flowchart in sequence
- All steps are triggered by Python code step by step.
- Every step calls a function to push on the flow chart shown in the website.
  - Activity nodes move directly to its middle child node (left and right is null)
  - Judge nodes will decide which child to move on according to the statement and real time values.
- Every step accomplish the associated operation.

## Data storage:
- Driver-related data are stored and can be accessed via github.io.
- Images are stored in firebasestorage.googleapis

## Detail:
### Phone Control
<img src="https://github.com/XavierDai/MySettings/blob/main/img/settings.png"/>

This pedal simulates some basic operation buttons on users' phone.
- At the top
<img src="https://github.com/XavierDai/MySettings/blob/main/img/top.png"/>

  1. This panel shows user's avatar and personal welcome word.
  2. The button is an overall control for the phone. If the user turns off this button, all the other button in the phone will be turned off and disabled.

- Middle
<img src="https://github.com/XavierDai/MySettings/blob/main/img/middle2.png"/>

  1. This panel allows users to modify some system configs and driving environment inside the vehicle.

- Bottom
<img src="https://github.com/XavierDai/MySettings/blob/main/img/bottom.png"/>

  1. This panel is full of switches. If a switch is turned on, the modified data of this entry will be saved.

### External Settings
<img src="https://github.com/XavierDai/MySettings/blob/main/img/externalSettings.png"/>

  1. This panel allows users to simulate different weather conditions, which might influence the vehicle mode and behavior.

### Pick a Driver
<img src="https://github.com/XavierDai/MySettings/blob/main/img/pickDriver.png"/>
   
  1. This panel requires users to select a driver.
  2. All the available users are listed here.
  3. When users click on a driver, relevant information will be displayed.

### Internal Settings
<img src="https://github.com/XavierDai/MySettings/blob/main/img/internalSettings.png"/>

  1. This panel allows users to adjust personal settings.
  2. Those changes will be saved only when the corresponding switches (in the phone panel) are turned on.

### Flow Chart
<img src="https://github.com/XavierDai/MySettings/blob/main/img/flowChart.png"/>

  1. This panel shows the current step, previous step and following step(s).
  2. This panel is just for display and cannot be edited directly.

### Terminal
<img src="https://github.com/XavierDai/MySettings/blob/main/img/Terminal.png"/>

  1. This panel simulates a real terminal and displays information users might be interested.
