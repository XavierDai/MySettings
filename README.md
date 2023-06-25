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
   temperary dictionary currently in use in the system. (When customized process finished or the "custom" driver is switched, systemDictionary will be written into customizedDictionary according to the fine-grained "onOff" values.)

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
3. Press "Run" buttom

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
