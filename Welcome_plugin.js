class ControlEntity{
  constructor(value,onOff){
    this.value = value;
    this.onOff = onOff;
  }
}

const plugin = ({ widgets, simulator, vehicle }) => {
  var txt = readTextFile("http://127.0.0.1:5500/ident.txt");
  var allDriverDictionary = analysisTxt(txt);
  var defaultDriverDictionary = allDriverDictionary["Default_Driver"]

  console.log(defaultDriverDictionary["seatPosition"]);
  var systemDictionary = {};
  // live args
  var selectedDriverName = null;
  var isPersonal = false;
  var OutsideTemperature = 20;
  var rainIntensity = null;

  // auto save
  var welcomeWord = null;
  var language = null;
  var UIInterface = null;
  var USMetricUnit = null;
  var interiorLight = null;
  var parkingBeepLevel = null;
  var musicURI = null;
  var ADASBeepLevel = null;

  // with a on/off switch
  var seatPosition = new ControlEntity(0,"on");
  var mirrorLeftTilt = null;
  var mirrorLeftPan = null;
  var mirrorRightTilt = null;
  var mirrorRightPan = null;
  var ACAirFlowLevel = null;
  var ACTemperature = null;
  var ACTemperatureIfHot = null;
  var ACTemperatureIfCold = null;
  var SteeringWheelWarm = null;
  var SeatHeatLevel = null;
  var SeatVentilation = null;
  var AutoHoldIsOn = null;
  var SteeringMode = null;
  var BrakingMode = null;
  var PowerMode = null;
  var driveMode = null;

  function fixedDriverPicked(pickedDriverName){
    systemDictionary = allDriverDictionary[pickedDriverName];
    console.log(systemDictionary);
  }

  var afterTempJudge = {
    val: "Set AC Air Flow",
    type: "activity",
    left: null,
    right: null,
    middle: {
      val: "Set ADAS warning beep level",
      type: "activity",
      left: null,
      right: null,
      middle: null,
    },
  }
  var personalTree = {
    val: "Personalized Welcome Word",
    type: "activity",
    left: null,
    right: null,
    middle: {
      val: "Personalized UI Interface",
      type: "activity",
      left: null,
      right: null,
      middle: {
        val: "Set Prefer Language",
        type: "activity",
        left: null,
        right: null,
        middle: {
          val: "Set US/Metric Units",
          type: "activity",
          left: null,
          right: null,
          middle: {
            val: "Set Interior Light",
            type: "activity",
            left: null,
            right: null,
            middle: {
              val: "Set Parking Warning Beep Level",
              type: "activity",
              left: null,
              right: null,
              middle: {
                val: "Turn On Preferred Music",
                type: "activity",
                left: null,
                right: null,
                middle: {
                  val: "Set Seat Position",
                  type: "activity",
                  left: null,
                  right: null,
                  middle: {
                    val: "Set AutoHold",
                    type: "activity",
                    left: null,
                    right: null,
                    middle: {
                      val: "Set Mirror Status",
                      type: "activity",
                      left: null,
                      right: null,
                      middle: {
                        val: "Set Steering Mode",
                        type: "activity",
                        left: null,
                        right: null,
                        middle: {
                          val: "Set Braking Mode",
                          type: "activity",
                          left: null,
                          right: null,
                          middle: {
                            val: "Set Power Mode",
                            type: "activity",
                            left: null,
                            right: null,
                            middle: {
                              val: "Get Outside Temperature",
                              type: "activity",
                              left: null,
                              right: null,
                              middle: {
                                val: {
                                  state: "temp < 9",
                                  leftCondition: "Yes",
                                  middleCondition: "No",
                                  rightCondition: null,
                                },
                                type: "judge",
                                left:  {
                                  val: "Turn on & Set AC",
                                  type: "activity",
                                  left: null,
                                  right: null,
                                  middle: {
                                    val: "Turn on Seat Heat",
                                    type: "activity",
                                    left: null,
                                    right: null,
                                    middle: {
                                      val: "Turn Steering Wheel Warm",
                                      type: "activity",
                                      left: null,
                                      right: null,
                                      middle: afterTempJudge,
                                    },
                                  },
                                },
                                right: null,
                                middle:  {
                                  val: {
                                    state: "temp > 25",
                                    leftCondition: "Yes",
                                    middleCondition: "No",
                                    rightCondition: null,
                                  },
                                  type: "judge",
                                  left: {
                                    val: "Turn on & Set AC",
                                    type: "activity",
                                    left: null,
                                    right: null,
                                    middle: {
                                      val: "Turn On Seat Ventilation",
                                      type: "activity",
                                      left: null,
                                      right: null,
                                      middle: afterTempJudge,
                                    },
                                  },
                                  right: null,
                                  middle: afterTempJudge,
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  }
  const tt = {
    val: "Vehicle Key Detection",
    type: "activity",
    left: null,
    right: null,
    middle: {
      val: "Driver Identification",
      type: "activity",
      left: null,
      right: null,
      middle: {
        val: "Check Memory Data",
        type: "activity",
        left: null,
        right: null,
        middle: {
          val: {
            state: "Driver Memory",
            leftCondition: "Yilong Dai",
            middleCondition: "Kyrie Irving",
            rightCondition: "default",
          },
          type: "judge",
          left: {
            val: "Pull Driver Yilong Dai",
            type: "activity",
            left: null,
            right: null,
            middle: personalTree,
          },
          right: {
            val: "Default Driver",
            type: "activity",
            left: null,
            right: null,
            middle: {
              val: "Default Setting",
              type: "activity",
              left: null,
              right: null,
              middle: null,
            },
          },
          middle: {
            val: "Pull Driver Kyrie Irving",
            type: "activity",
            left: null,
            right: null,
            middle: personalTree,
          },
        },
      },
    },
  };
  var curTree = tt;
  
  
  // widget for setting1
  const personalSettingModule = document.createElement("div");
  personalSettingModule.setAttribute(
    "style",
    `height: 100%; width: calc(100% - 10px);margin-left:10px;`
  );
  personalSettingModule.innerHTML = `
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
                .phone-container::-webkit-scrollbar{
                    width:8px;
                    height:40px;
                }
            
                .phone-container::-webkit-scrollbar-thumb{
                    -webkit-box-shadow:inset 0 0 5px rgba(0,0,0,0.1);
                    border-radius:15px;
                    background:rgba(0,0,0,0.1);
                }
                .phone-container::-webkit-scrollbar-thumb:hover{
                    background:rgba(0,0,0,0.2);
                }
                .phone-container::-webkit-scrollbar-track{
                    -webkit-box-shadow:inset 0 0 0px rgba(0,0,0,0.0);
                    border-radius:5px;
                    background:rgba(0,0,0,0.0);
                }
                .phone-container::-webkit-scrollbar-track:hover{

                    background:rgba(0,0,0,0.1);
                }
                .form-check-input:hover{
                    cursor:pointer;
                }
                .top-phone-box:after{
                    content: "";
                    display: block;
                    clear:both;

                }
                .setting-table{
                    font-size:5vw;
                }
                .setting-h1{
                    font-size:8vw
                }
                .setting-h3{
                    font-size:6vw
                }
            </style>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
        </head>

        <body>
        <div style="background-color:#F1F1F1;border:8px solid black;border-radius:35px;height:100%;overflow-y:hidden">
        <div id="top-phone-box"style="height：15%">
            <h1 class="setting-h1" style="margin-left:20px;margin-top:5px;">
                Settings:
            </h1>
            <div style="background-color:white;border-radius:20px;margin-left:10px;margin-right:15px;margin-top:5px">
            <table class = "table setting-table">
            <tbody>
                <tr>
  
                    <td>
                            <div class="container">
                                <div class="row row-cols-auto">
                                    <div class="col">
                                        <div id="avatar" style="margin-top:5px;width:7vh;height:7vh;border-radius:3.5vh 3.5vh 3.5vh 3.5vh;background-size:7vh 7vh;background-image:url(https://firebasestorage.googleapis.com/v0/b/digital-auto.appspot.com/o/media%2FDrowsiness_2.png?alt=media&token=c085c451-ec32-4579-b3bf-1b77108f1c81);">
                                        </div>
                                    </div>
                                    <div class="col">
                                        <span style="font-size:6vw">
                                            Hi, 
                                        </span>
                                        <span id="driver-name-span" style="font-size:6vw">
                                            Driver!
                                        </span>
                                        </br>
                                        <span id="driver-name-bottom-span" style="font-size:4vw">
                                            welcome
                                        </span>
                                    </div>
                                    
                                </div>
                            </div>
                    </td>
                </tr>
                <tr>
                    <td>
                            <span class="float-start" style="margin-left:8px">
                                Enable Personal Settings:
                            </span>
                            <div class="form-switch clearfix">
                            <input class="form-check-input float-end" type="checkbox" role="switch"  id="on-off-button" checked>
                    </td>
                </tr>
             
                

            </tbody>
        </table>
        </div>
        </div>
        

        <div class="phone-container" style="height:calc(78% - 25px);overflow-y:auto;margin-top:5px;margin-bottom:15px;">
            


            <h3 class="setting-h3" style="margin-left:20px;">Alter your Screen</h3>
            <div style="background-color:white;border-radius:10px;margin-left:10px;margin-right:10px;margin-top:5px">
            <table class = "table setting-table">
                <tbody>
                    <tr>
      
                        <td>
                                <span class="float-start" style="margin-left:8px">
                                    Welcome Word
                                </span>
                                <div class="form-switch clearfix">
                                    <input class="form-check-input float-end setting-checkbox-child" type="checkbox" role="switch" id="welcomeWordCheck">
                                </div>
                        </td>
                    </tr>
                    <tr>
              
                        <td>
                        <div class="row g-3 align-items-center">
                                <div class="col-7">
                                    <span class="float-start" style="margin-left:8px">
                                    Language
                                    </span>
                                </div>
                                <div class="col-5">
                                    <select class="form-select float-end setting-checkbox-child" id="LanguageSelect">
                                        <option id="optionChinese" value="Chinese">Chinese</option>
                                        <option id="optionEnglish" value="English">English</option>
                                        <option id="optionGerman" value="German">German</option>
                                        <option id="optionSpanish" value="Spanish">Spanish</option>
                                    </select>
                                </div>
                                
                        </div>
                                
                               
                        </td>
                    </tr>
                    <tr>
             
                        <td>
                        <div class="row g-3 align-items-center">
                            <div class="col-7">
                                <span class="float-start" style="margin-left:8px">
                                    UI Interface
                                </span>
                               
                            </div>
                            <div class="col-5">
                                <select class="form-select float-end setting-checkbox-child" id="UIStyleSelect">
                                    <option id="optionGrey" value="Grey">grey</option>
                                    <option id="optionPink" value="Pink">pink</option>
                                    <option id="optionBlue" value="Blue">blue</option>
                                    <option id="optionGreen" value="Green">green</option>
                                </select>
                            </div>
                        </div>
                        </td>
                    </tr>
                    <tr>
             
                        <td>
                            <div class="row g-3 align-items-center">
                                    <div class="col-7">
                                        <span class="float-start" style="margin-left:8px">
                                        US/Metric Units
                                        </span>
                                    </div>
                                    <div class="col-5">
                                        <select class="form-select float-end setting-checkbox-child" id="UnitSelect">
                                            <option id="optionUS" value="US">US</option>
                                            <option id="optionMetric" value="Metric">Metric</option>
                                            
                                        </select>
                                    </div>
                                    
                            </div>
                            
                        </td>
                    </tr>

                </tbody>
            </table>
            </div>



            <h3 class="setting-h3"  style="margin-left:20px;">Alter your Environment</h3>
            <div style="background-color:white;border-radius:10px;margin-left:10px;margin-right:10px;margin-top:5px">
            <table class = "table setting-table">
                <tbody>
                    <tr>
      
                        <td>
                            <div class="row g-3 align-items-center">
                                <div class="col-7">
                                    <span class="float-start" style="margin-left:8px">
                                        Interior Light
                                    </span>
                                </div>
                                <div class="col-5">
                                    <div class="form-switch clearfix">
                                
                                        <input type="color" class="form-control form-control-color float-end setting-checkbox-child" id="InteriorLightColor" value="#563d7c" title="Choose your color">
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
              
                        <td>
                            <div class="row g-3 align-items-center">
                                <div class="col-8">
                                    <span class="float-start" style="margin-left:8px">
                                        Parking Beep Level
                                    </span>
                                </div>
                                <div class="col-4">
                                    <select class="form-select float-end setting-checkbox-child" id="ParkingBeepLevelSelect">
                                        <option id="optionParkingLow" value="Low">Low</option>
                                        <option id="optionParkingMedium" value="Medium">Medium</option>
                                        <option id="optionParkingHigh" value="High">High</option>
                                    </select>
                                </div>
                            
                            </div>
                        </td>
                    </tr>
                    <tr>
             
                        <td>
                            <div class="row g-3 align-items-center">
                                <div class="col-6">
                                    <span class="float-start" style="margin-left:8px">
                                        Preferred Music
                                    </span>
                                </div>
                                <div class="col-6">
                                    <select class="form-select float-end setting-checkbox-child" id="PreferredMusicSelect">
                                        <option id="optionRunaway" value="Runaway">Runaway</option>
                                        <option id="optionClosedOnSunday" value="ClosedOnSunday">Closed on Sunday</option>
                                        <option id="optionYikes" value="Yikes">Yikes</option>
                                        <option id="optionGhostTown" value="GhostTown">Ghost Town</option>
                                    </select>
                                </div>
                            
                            </div>
                               
                                    
                        </td>
                    </tr>
                    <tr>
             
                    <td>
                        <div class="row g-3 align-items-center">
                            <div class="col-8">
                                <span class="float-start" style="margin-left:8px">
                                    ADAS beep level
                                </span>
                            </div>
                            <div class="col-4">
                                <select class="form-select float-end setting-checkbox-child" id="ADASBeepLevelSelect">
                                    <option id="optionADASLow" value="Low">Low</option>
                                    <option id="optionADASMedium" value="Medium">Medium</option>
                                    <option id="optionADASHigh" value="High">High</option>
                                </select>
                            </div>
                        
                        </div>
                           
                    </td>
                </tr>
                </tbody>
            </table>
            </div>




            <h3 class="setting-h3" style="margin-left:20px;">Save changes listed below?</h3>
            <div style="background-color:white;border-radius:10px;margin-left:10px;margin-right:10px;margin-top:5px">
            <table class = "table setting-table">
                <tbody>
                    <tr>
      
                        <td>
                                <span class="float-start" style="margin-left:8px">
                                Seat Position
                                </span>
                                <div class="form-switch clearfix">
                                    <input class="form-check-input float-end setting-checkbox-child" type="checkbox" role="switch" id="SeatPositionCheck">
                                </div>
                        </td>
                    </tr>
                    <tr>
              
                        <td>
                                <span class="float-start" style="margin-left:8px">
                                AC temperature
                                </span>
                                <div class="form-switch clearfix">
                                    <input class="form-check-input float-end setting-checkbox-child" type="checkbox" role="switch" id="ACTemperatureCheck">
                                </div>
                        </td>
                    </tr>
                    <tr>
             
                        <td>

                                <span class="float-start" style="margin-left:8px">
                                AC Air Flow Level 
                                    </span>
                                    <div class="form-switch clearfix">
                                        <input class="form-check-input float-end setting-checkbox-child" type="checkbox" role="switch" id="ACAirFlowLevelCheck">
                                    </div>
                        </td>
                    </tr>
                    <tr>
             
                    <td>

                            <span class="float-start" style="margin-left:8px">
                            Steering Wheel Warm
                                </span>
                                <div class="form-switch clearfix">
                                    <input class="form-check-input float-end setting-checkbox-child" type="checkbox" role="switch" id="SteeringWheelWarmCheck">
                                </div>
                    </td>
                     </tr>
                     <tr>
             
                    <td>

                            <span class="float-start" style="margin-left:8px">
                            Seat Heat Level
                                </span>
                                <div class="form-switch clearfix">
                                    <input class="form-check-input float-end setting-checkbox-child" type="checkbox" role="switch" id="SeatHeatLevelCheck">
                                </div>
                    </td>
                     </tr>
                     <tr>
             
                    <td>

                            <span class="float-start" style="margin-left:8px">
                            Seat Ventilation
                                </span>
                                <div class="form-switch clearfix">
                                    <input class="form-check-input float-end setting-checkbox-child" type="checkbox" role="switch" id="SeatVentilationCheck">
                                </div>
                    </td>
                     </tr>
                </tbody>
            </table>
            </div>




            <h3 class="setting-h3" style="margin-left:20px;">Driving</h3>
            <div style="background-color:white;border-radius:10px;margin-left:10px;margin-right:10px;margin-top:5px">
            <table class = "table setting-table">
                <tbody>
                    <tr>
      
                        <td>
                                <span class="float-start" style="margin-left:8px">
                                    AutoHold
                                </span>
                                <div class="form-switch clearfix">
                                    <input class="form-check-input float-end setting-checkbox-child" type="checkbox" role="switch" id="AutoHoldCheck">
                                </div>
                        </td>
                    </tr>
                    <tr>
              
                        <td>
                                <span class="float-start" style="margin-left:8px">
                                    Mirror Status
                                </span>
                                <div class="form-switch clearfix">
                                    <input class="form-check-input float-end setting-checkbox-child" type="checkbox" role="switch" id="MirrorStatusCheck">
                                </div>
                        </td>
                    </tr>
                    <tr>
             
                        <td>

                                <span class="float-start" style="margin-left:8px">
                                    Steering Mode
                                    </span>
                                    <div class="form-switch clearfix">
                                        <input class="form-check-input float-end setting-checkbox-child" type="checkbox" role="switch" id="SteeringModeCheck">
                                    </div>
                        </td>
                    </tr>
                    <tr>
             
                    <td>

                            <span class="float-start" style="margin-left:8px">
                            Braking Mode
                                </span>
                                <div class="form-switch clearfix">
                                    <input class="form-check-input float-end setting-checkbox-child" type="checkbox" role="switch" id="BrakingModeCheck">
                                </div>
                    </td>
                     </tr>
                     <tr>
             
                    <td>

                            <span class="float-start" style="margin-left:8px">
                            Power Mode
                                </span>
                                <div class="form-switch clearfix">
                                    <input class="form-check-input float-end setting-checkbox-child" type="checkbox" role="switch" id="PowerModeCheck">
                                </div>
                    </td>
                     </tr>
                     
                </tbody>
            </table>
            </div>





        </div>
        </div>


            <script src=https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.7/dist/umd/popper.min.js" integrity="sha384-zYPOMqeu1DAVkHiLqWBUTcbYfZ8osu1Nd6Z89ify25QV9guujx43ITvfi12/QExE" crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script>
        </body>    
        `;


        
  // Accessing the on/off button
  var onOffButton = personalSettingModule.querySelector("#on-off-button");

  var welcomeWordCheck =
    personalSettingModule.querySelector("#welcomeWordCheck");

  var ParkingWarningBeepLevelCheck = personalSettingModule.querySelector(
    "#ParkingWarningBeepLevelCheck"
  );
  var PreferredMusicCheck = personalSettingModule.querySelector(
    "#PreferredMusicCheck"
  );
  var SeatPositionCheck =
    personalSettingModule.querySelector("#SeatPositionCheck");
  var AutoHoldCheck = personalSettingModule.querySelector("#AutoHoldCheck");
  var MirrorStatusCheck =
    personalSettingModule.querySelector("#MirrorStatusCheck");
  var SteeringModeCheck =
    personalSettingModule.querySelector("#SteeringModeCheck");
  var BrakingModeCheck =
    personalSettingModule.querySelector("#BrakingModeCheck");
  var PowerModeCheck = personalSettingModule.querySelector("#PowerModeCheck");
  var ACTemperatureCheck = personalSettingModule.querySelector(
    "#ACTemperatureCheck"
  );
  var ACAirFlowLevelCheck = personalSettingModule.querySelector(
    "#ACAirFlowLevelCheck"
  );
  var SteeringWheelWarmCheck = personalSettingModule.querySelector(
    "#SteeringWheelWarmCheck"
  );
  var SeatHeatLevelCheck = personalSettingModule.querySelector(
    "#SeatHeatLevelCheck"
  );
  var SeatVentilationCheck = personalSettingModule.querySelector(
    "#SeatVentilationCheck"
  );
  var LanguageSelect = personalSettingModule.querySelector("#LanguageSelect");
  var UnitSelect = personalSettingModule.querySelector("#UnitSelect");

  var UIStyleSelect = personalSettingModule.querySelector("#UIStyleSelect");
  var InteriorLightColor = personalSettingModule.querySelector("#InteriorLightColor");
  var PreferredMusicSelect = personalSettingModule.querySelector("#PreferredMusicSelect");
  var ParkingBeepLevelSelect = personalSettingModule.querySelector("#ParkingBeepLevelSelect");
  var ADASBeepLevelSelect = personalSettingModule.querySelector("#ADASBeepLevelSelect");
  // Event listener for the on/off button click
  onOffButton.addEventListener("click", function (event) {
    var isOn = event.target.checked;
    console.log("On/Off:", isOn);
    let childrenList = personalSettingModule.querySelectorAll(
      ".setting-checkbox-child"
    );
    if (isOn == true) {
      for (let item of childrenList) {
        if (item.getAttribute("disabled")) {
          item.removeAttribute("disabled");
        }
      }
    } else {
      for (let item of childrenList) {
        item.setAttribute("disabled", "disabled");
      }
    }
  });

  welcomeWordCheck.addEventListener("click", function (event) {
    var isOn = event.target.checked;
    console.log("On/Off:", isOn);
  });


  SeatPositionCheck.addEventListener("click", function (event) {
    seatPosition.onOff = event.target.checked;
    console.log("On/Off:", seatPosition.onOff);
  });
  AutoHoldCheck.addEventListener("click", function (event) {
    var isOn = event.target.checked;
    console.log("On/Off:", isOn);
  });
  MirrorStatusCheck.addEventListener("click", function (event) {
    var isOn = event.target.checked;
    console.log("On/Off:", isOn);
  });
  SteeringModeCheck.addEventListener("click", function (event) {
    var isOn = event.target.checked;
    console.log("On/Off:", isOn);
  });
  BrakingModeCheck.addEventListener("click", function (event) {
    var isOn = event.target.checked;
    console.log("On/Off:", isOn);
  });
  PowerModeCheck.addEventListener("click", function (event) {
    var isOn = event.target.checked;
    console.log("On/Off:", isOn);
  });
  ACAirFlowLevelCheck.addEventListener("click", function (event) {
    var isOn = event.target.checked;
    console.log("On/Off:", isOn);
  });
  ACTemperatureCheck.addEventListener("click", function (event) {
    var isOn = event.target.checked;
    console.log("On/Off:", isOn);
  });
  SteeringWheelWarmCheck.addEventListener("click", function (event) {
    var isOn = event.target.checked;
    console.log("On/Off:", isOn);
  });
  SeatHeatLevelCheck.addEventListener("click", function (event) {
    var isOn = event.target.checked;
    console.log("On/Off:", isOn);
  });

  SeatVentilationCheck.addEventListener("click", function (event) {
    var isOn = event.target.checked;
    console.log("On/Off:", isOn);
  });

  LanguageSelect.onchange = function(){
    language = this.value;
    console.log("language：",this.value);
  }

  UIStyleSelect.onchange = function(){
    UIInterface = this.value;
    console.log("Selected UI style：",this.value);
  }

  UnitSelect.onchange = function(){
    USMetricUnit = this.value;
    console.log("Selected Unit:",this.value);
  }

  PreferredMusicSelect.onchange = function(){
    musicURI = this.value;
    console.log("Selected Unit:",this.value);
  }

  InteriorLightColor.onchange = function(){
    console.log("color：",this.value);
  }

  ParkingBeepLevelSelect.onchange = function(){
    parkingBeepLevel = this.value;
    console.log("Parking Beep Level：",this.value);
  }

  ADASBeepLevelSelect.onchange = function(){
    ADASBeepLevel = this.value;
    console.log("ADAS Beep Level：",this.value);
  }


  





  widgets.register("Setting1", (box) => {
    box.injectNode(personalSettingModule);
  });


  
  const flowChartModule = document.createElement("div");
  flowChartModule.innerHTML = `
    <head>
    <title>Tree Diagram</title>
    <style>
      
      
    .judge{
        width:10vw;
        height:10vw;
        -webkit-clip-path:polygon(0px 50%,50% 0px,100% 50%,50% 100%,0px 50%);
    }
    
      .topNode{
        height:13%;
        width:26%;
        position:absolute;
        left: calc(50% - 13%);
        top:10%;
        background-color:#71D5FF;
        display:flex;
        align-items:center;
        justify-content:center;
        text-align:center;
        border-radius: 3vw;
        border: 1px solid gray;
        font-size:4vw;
    }
      .middleNode {
        height:13%;
        width:26%;
          position:absolute;
          left: calc(50% - 13%);
          top:43.5%;
          background-color:#00A2E8;
          display:flex;
          align-items:center;
          justify-content:center;
          text-align:center;
          border-radius: 3vw;
          border: 1px solid gray;
          box-shadow:0px 0px 3px 3px #aaa;
          font-size:4vw ;
      }
      .bottomNode {
        height:13%;
        width:26%;
          position:absolute;
          left: calc(50% - 13%);
          top:75%;
          background-color:#71D5FF;
          display:flex;
          align-items:center;
          justify-content:center;
          text-align:center;
          border-radius: 3vw;
          border: 1px solid gray;
          font-size:4vw ;
      }
      .bottomLeftNode {
        height:13%;
        width:26%;
          position:absolute;
          left: calc(20% - 13%);
          top:75%;
          background-color:#71D5FF;
          display:flex;
          align-items:center;
          justify-content:center;
          text-align:center;
          border-radius: 3vw;
          border: 1px solid gray;
          font-size:4vw ;
      }
      .bottomRightNode {
        height:13%;
        width:26%;
          position:absolute;
          left: calc(80% - 13%);
          top:75%;
          background-color:#71D5FF;
          display:flex;
          align-items:center;
          justify-content:center;
          text-align:center;
          border-radius: 3vw;
          border: 1px solid gray;
          font-size:4vw ;
      }
    .stateSpan {
        position:absolute;
        left: 57%;
        top: 40%;
        font-size:4vw ;
    }
    .leftConditionSpan {
        position:absolute;
        left: 23%;
        top: 52%;
        font-size:4vw ;
    }
    .rightConditionSpan{
        position:absolute;
        left: 65%;
        top: 50%;
        font-size:4vw ;
    }
    
    .middleConditionSpan{
        position:absolute;
        left: 52%;
        top: 60%;
        font-size:4vw ;
    }
    .start{
        height:10vw;
        width:10vw;
        position:absolute;
        left: calc(50% - 5vw);
        border-radius:5vw 5vw 5vw 5vw;
        background-color:grey;
    }
    .end {
        height:10vw;
        width:10vw;
        left: calc(50% - 5vw);
          background-color:grey;
          text-align:center;
          border-radius:5vw 5vw 5vw 5vw;
          font-size:80% ;
      }

    </style>
  </head>
  <body>
  
      <div id="flowChart" style="position: block;">
        <div class="middleNode start">
        </div>
      </div>

    </body> 
    `;

  
  var drawFlag = true;


  var previousVal = null;
  var previousType = null;
  var moveDirection = null;
  function drawTree(tree) {
    var space = flowChartModule.querySelector("#flowChart");
    var html = "";
    var link = "";
    if (tree.left == null) {
      if (tree.right == null) {
        link =
          "https://firebasestorage.googleapis.com/v0/b/digital-auto.appspot.com/o/media%2Fmiddle.png?alt=media&token=40a862dc-6df5-40f2-aced-61906d9a2577";
      } else {
        link =
          "https://firebasestorage.googleapis.com/v0/b/digital-auto.appspot.com/o/media%2F3.png?alt=media&token=da075ded-47a1-45ac-a8b4-b3d5f1b59032";
      }
    } else {
      if (tree.right == null) {
        link =
          "https://firebasestorage.googleapis.com/v0/b/digital-auto.appspot.com/o/media%2Fleft.png?alt=media&token=d40ffc11-0602-41d4-b449-94221e7bc83d";
      } else {
        link =
          "https://firebasestorage.googleapis.com/v0/b/digital-auto.appspot.com/o/media%2Fall.png?alt=media&token=74576bf0-adf5-4a70-bfbb-8c97870ea4f0";
      }
    }
    html +=
      `
        <div style="height: 100%;width:100%;background-image:url(` +
      link +
      `);background-size: 100%;background-repeat:no-repeat;border-width:1px;border-color:#000">
        `;
    if (tree.type == "activity") {
      html +=
        `
            <div class="middleNode">
            ` +
        tree.val +
        `
            </div>
            `;
    } else if (tree.type == "judge") {
      html +=
        `
            <div class="middleNode judge">
            </div>
            <div class="stateSpan">
            ` +
        tree.val.state +
        `
            </div>
            <div class = "leftConditionSpan">
            ` +
        tree.val.leftCondition +
        `
            </div>
            <div class = "middleConditionSpan">
            ` +
        tree.val.middleCondition +
        `
            </div>
            <div class = "rightConditionSpan">
            ` +
        tree.val.rightCondition +
        `
            </div>
            `;
    }

    if (previousVal != null) {
      if (previousType == "activity") {
        html +=
          `
                <div class="topNode">
                ` +
          previousVal +
          `
                </div>
                `;
      } else if (previousType == "judge") {
        html += `
                <div class="topNode judge">
                </div>
                `;
      }
    } else {
      html += `
            <div class="topNode start">
            </div>
            `;
    }

    if (tree.left != null) {
      if (tree.left.type == "activity") {
        html +=
          `
                <div class="bottomLeftNode">
                ` +
          tree.left.val +
          `
                </div>
                `;
      } else if (tree.left.type == "judge") {
        html += `
                <div class="bottomLeftNode judge">
                </div>
                `;
      }
    }
    if (tree.right != null) {
      if (tree.right.type == "activity") {
        html +=
          `
                <div class="bottomRightNode">
                ` +
          tree.right.val +
          `
                </div>
                `;
      } else if (tree.right.type == "judge") {
        html +=
          `
                <div class="bottomRightNode judge">
                ` +
          tree.right.val +
          `
                </div>
                `;
      }
    }
    if (tree.middle != null) {
      if (tree.middle.type == "activity") {
        html +=
          `
                <div class="bottomNode">
                ` +
          tree.middle.val +
          `
                </div>
                `;
      } else if (tree.middle.type == "judge") {
        html += `
                <div class="bottomNode judge">
                </div>
                `;
      }
    } else {
      drawFlag = false;
      html += `
            <div class="bottomNode end">
            </div>
            `;
    }
    html += `          </div>`;
    space.innerHTML = html;
    previousVal = tree.val;
    previousType = tree.type;
    // if (drawFlag) {
    //   setTimeout(function () {
    //     drawTree(tree.middle);
    //   }, 2000);
    // } else 
    if(!drawFlag){
      setTimeout(function () {
        var space = flowChartModule.querySelector("#flowChart");
        var html = "";
        var link =
          "https://firebasestorage.googleapis.com/v0/b/digital-auto.appspot.com/o/media%2Fend.png?alt=media&token=a2233dd0-1012-412d-965e-9c8c46c7dfc4";
        html +=
          `
                <div style="height: 100%;width:100%;background-image:url(` +
          link +
          `);background-size: 100%;background-repeat:no-repeat;border-width:1px;border-color:#000">
                `;
        html += `
                <div class="middleNode end">
                </div>
                `;
        if (tree.val != null) {
          if (tree.type == "activity") {
            html +=
              `
                        <div class="topNode">
                        ` +
              tree.val +
              `
                        </div>
                        `;
          } else if (tree.type == "judge") {
            html += `
                        <div class="topNode judge">
                        </div>
                        `;
          }
        } else {
          html += `
                    <div class="start">
                    </div>
                    `;
        }
        html += `          </div>`;
        space.innerHTML = html;
        previousVal = null;
        previousType = null;
        drawFlag = true;
      }, 2000);
    }
  }

  function getDirection(val){
    if(val.state == "Driver Memory"){
        if(selectedDriverName == val.leftCondition){
            isPersonal = true;
            return "left";
        }else if(selectedDriverName == val.middleCondition){
            isPersonal = true;
            return "middle";
        }
        isPersonal = false;
        return "right";
    }else if (val.state == "temp < 9"){
        if(OutsideTemperature < 9){
          return "left";
        }else{
          return "middle";
        }
    }else if (val.state == "temp > 25"){
        if (OutsideTemperature > 25){
          return "left";
        }else{
          return "middle";
        }
    }
    return null;
  }

  widgets.register("FlowChart", (box) => {
    box.injectNode(flowChartModule);
  });

  // widget for externalSetting
  const bigBoxModule = document.createElement("div");
  bigBoxModule.setAttribute("style", `height: 100%; width: 100%;`);
  bigBoxModule.innerHTML = `
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
             <style>
                .driver-name{
                    font-size:1.5vw;
                }
                .driver-description{
                    font-size:1.5vw;
                }
                .driver-card-h5{
                    font-size:2vw;
                }
                .list-group-item:hover{
                    cursor:pointer;
                }
                input[type="range"] {

                -webkit-box-shadow: 0 0.5px 0 0px #424242, 0 1px 0 #060607 inset, 0px 2px 10px 0px black inset, 1px 0px 2px rgba(0, 0, 0, 0.4) inset, 0 0px 1px rgba(0, 0, 0, 0.6) inset;

                margin-top: 2px;

                background-color: #272728;

                border-radius: 15px;

             
                -webkit-appearance: none;

                height:10px;

            }

            input[type="range"]::-webkit-slider-thumb {

                -webkit-appearance: none;

                cursor: default;


                height: 17.5px;

                width: 17.5px;

                transform: translateY(-4px);

                background: none repeat scroll 0 0 #777;

                border-radius: 15px;

                -webkit-box-shadow: 0 -1px 1px black inset;

            }
            </style>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
        </head>

        <body>
            <div>
                

                <div style="height:65%;">   
               
                  <div class="toast-container position-fixed bottom-50 end-50 p-3">
                    <div id="liveToast" class="toast show fade" role="alert" aria-live="assertive" aria-atomic="true">
                      <div class="toast-header">
                        <strong class="me-auto" style="font-size:2vw;">Tips!</strong>
                        <small>now</small>
                        <button type="button" id="closeAlert" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                      </div>
                      <div class="toast-body" style="font-size:2vw;">
                        Please select a driver first!
                      </div>
                    </div>
                  </div>
                
                    
                  <div style="width:90%;height:100%;border:1px solid black;">
                    <div id="welcomeWord">

                    </div>
                    <div id="UI" style ="width:40px;height:40px;border:1px solid black">
                    </div>
                    <div id="language">

                    </div>
                    <div id="music">

                    </div>
                    <div id="units">

                    </div>
                    <div id="steeringWheelWarmImage" style="display:none;width:7vh;height:7vh;background-size:7vh 7vh;background-image:url(https://firebasestorage.googleapis.com/v0/b/digital-auto.appspot.com/o/media%2Fsteer_warm.png?alt=media&token=6fc318d0-c9c4-4c77-8f5a-daf7ae6fe84c);">

                    </div>
                    <div id="powerImage" style="display:none;width:7vh;height:7vh;background-size:7vh 7vh;background-image:url(https://firebasestorage.googleapis.com/v0/b/digital-auto.appspot.com/o/media%2Fpower.png?alt=media&token=71d28680-67c3-480d-8576-38081e688b03);">

                    </div>

                    <div id="autoHoldImage" style="display:none;width:7vh;height:7vh;background-size:7vh 7vh;background-image:url(https://firebasestorage.googleapis.com/v0/b/digital-auto.appspot.com/o/media%2Fautohold2.png?alt=media&token=fb01db01-c525-4af8-9440-f3a330994d04);">

                    </div>
                    <div id="steeringImage" style="display:none;width:7vh;height:7vh;background-size:7vh 7vh;background-image:url(https://firebasestorage.googleapis.com/v0/b/digital-auto.appspot.com/o/media%2FESP.png?alt=media&token=34c1f5fb-9132-46e7-abb7-3898f507b923);">

                    </div>
                    <div id="brakingImage" style="display:none;width:7vh;height:7vh;background-size:7vh 7vh;background-image:url(https://firebasestorage.googleapis.com/v0/b/digital-auto.appspot.com/o/media%2Fautohold.png?alt=media&token=b3905c3c-089a-44fe-b3b7-b609f827785a);">

                    </div>

                    <div id="SeatHeatImage" style="display:none;width:7vh;height:7vh;background-size:7vh 7vh;background-image:url(https://firebasestorage.googleapis.com/v0/b/digital-auto.appspot.com/o/media%2Fseat_heat.png?alt=media&token=8ce653bc-23d9-4840-8bd6-f785de555dac);">

                    </div>
                    
                    <div id="SeatVentilationImage" style="display:none;width:7vh;height:7vh;background-size:7vh 7vh;background-image:url(https://firebasestorage.googleapis.com/v0/b/digital-auto.appspot.com/o/media%2Fseat_ventilation.png?alt=media&token=1ae63e59-21af-48aa-a2c1-f398dfcac9a2);">

                    </div>
                    <div id="warmACImage" style="display:none;width:7vh;height:7vh;background-size:7vh 7vh;background-image:url(https://firebasestorage.googleapis.com/v0/b/digital-auto.appspot.com/o/media%2Fheat.png?alt=media&token=e7a4c8df-df29-4146-b7ca-cf178e56691a);">

                    </div>
                    <div id="coolACImage" style="display:none;width:7vh;height:7vh;background-size:7vh 7vh;background-image:url(https://firebasestorage.googleapis.com/v0/b/digital-auto.appspot.com/o/media%2Fcold2.png?alt=media&token=c33bb747-e29f-423b-9624-d536a0998ba4);">

                    </div>


                  </div>

                </div>
                <div class="row" style="height:35%;width:100%;overflow-y:auto;margin-top:1%;">
                    <div class="col" >
                        <div class="card" style="margin-left:10px;margin-right:10px;margin-top:5px;">
                            <h5 class="card-header">External Setting</h5>

    
             
                            <div class="row">
                                <label class="col-sm-4 col-form-label col-form-label">Rain Intensity</label>
                                <div class="col-sm-7" style="background-color:#CAECF4;border-radius:5px;">
                                    <label for="rainRange" class="form-label">Scope: 0% ~ 100%</label>
                                    </br>
                                    Current:<span id="rainRangeDisplay" style="text-decoration:underline;">
                                        50
                                    </span>%
                                    </br>
                                    <input type="range" class="form-range" min="0" max="100" id="rainRange">
                                </div>
                            </div>
                            </br>
                            <div class="row">
                                <label class="col-sm-4 col-form-label col-form-label">Outside Temperature</label>
                                <div class="col-sm-7" style="background-color:#FFBE7D;border-radius:5px;">
                                    <label for="rainRange" class="form-label">Scope: -50°C ~ +50°C</label>
                                    </br>
                                    Current:<span id="temperatureRangeDisplay" style="text-decoration:underline;">
                                        50
                                    </span>°C
                                    </br>
                                    <input type="range" class="form-range" min="-50" max="50" id="temperatureRange">
                                </div>
                            </div>

                        </div>
                    </div>
                    

                    <div class="col" style="height:100%;overflow-y:auto;">
                    <table class = "table setting-table ">
                    <tbody>
                        <tr>
          
                            <td>
                                <div class="row g-3 align-items-center">
                                    <div class="col-7">
                                        <span class="float-start" style="margin-left:8px">
                                            Seat Position:&nbsp;
                                        </span>
                                        <span id="seatPositionRangeDisplay" style="text-decoration:underline;">
                                            ` + defaultDriverDictionary["seatPosition"] + `
                                        </span>
                                    </div>
                                    <div class="col-5">
                                        <input type="range" class="form-range float-end" min="-50" max="50" id="SeatPositionRange" value="`+ defaultDriverDictionary["seatPosition"] +`">
                                    </div>
                                    
                                </div>
                                  
                            </td>
                        </tr>
                        <tr>
                  
                            <td>
                                    <div class="row g-3 align-items-center">
                                        <div class="col-7">
                                            <span class="float-start" style="margin-left:8px">
                                                AC temperature if cold:&nbsp;
                                            </span>
                                            <span id="ACTemperatureIfColdRangeDisplay" style="text-decoration:underline;">
                                                50
                                            </span>°C
                                        </div>
                                        <div class="col-5">
                                            <input type="range" class="form-range float-end" min="-50" max="50" id="ACTemperatureIfColdRange">
                                        </div>
                                    </div>
                            </td>
                        </tr>
                        <tr>
                  
                            <td>
                                    <div class="row g-3 align-items-center">
                                        <div class="col-7">
                                            <span class="float-start" style="margin-left:8px">
                                                AC temperature if hot:&nbsp;
                                            </span>
                                            <span id="ACTemperatureIfHotRangeDisplay" style="text-decoration:underline;">
                                                50
                                            </span>°C
                                        </div>
                                        <div class="col-5">
                                            <input type="range" class="form-range float-end" min="-50" max="50" id="ACTemperatureIfHotRange">
                                        </div>
                                    </div>
                            </td>
                        </tr>
                        <tr>
                 
                            <td>
    
                                <div class="row g-3 align-items-center">
                                    <div class="col-7">
                                        <span class="float-start" style="margin-left:8px">
                                            AC Air Flow Level:&nbsp;
                                        </span>
                                        <span id="ACAirFlowLevelRangeDisplay" style="text-decoration:underline;">
                                            50
                                        </span>°C
                                    </div>
                                    <div class="col-5">
                                        <input type="range" class="form-range float-end" min="-50" max="50" id="ACAirFlowLevelRange">
                                    </div>
                                </div>
                                   
                            </td>
                        </tr>
                        <tr>
                 
                        <td>
                            <div class="row g-3 align-items-center">
                                <div class="col-7">
                                    <span class="float-start" style="margin-left:8px">
                                        Steering Wheel Warm:&nbsp;
                                    </span>
                                    <span id="SteeringWheelWarmRangeDisplay" style="text-decoration:underline;">
                                        50
                                    </span>°C
                                </div>
                                <div class="col-5">
                                    <input type="range" class="form-range float-end" min="-50" max="50" id="SteeringWheelWarmRange">
                                </div>
                            </div>
                            
                        </td>
                         </tr>
                         <tr>
                 
                        <td>
                                <div class="row g-3 align-items-center">
                                    <div class="col-7">
                                        <span class="float-start" style="margin-left:8px">
                                            Seat Heat Level:&nbsp;
                                        </span>
                                        <span id="SeatHeatLevelRangeDisplay" style="text-decoration:underline;">
                                            50
                                        </span>°C
                                    </div>
                                    <div class="col-5">
                                        <input type="range" class="form-range float-end" min="-50" max="50" id="SeatHeatLevelRange">
                                    </div>
                                </div>
                        </td>
                         </tr>
                         <tr>
                 
                        <td>
                            <div class="row g-3 align-items-center">
                                <div class="col-7">
                                    <span class="float-start" style="margin-left:8px">
                                        Seat Ventilation:&nbsp;
                                    </span>
                                    <span id="SeatVentilationRangeDisplay" style="text-decoration:underline;">
                                        50
                                    </span>°C
                                </div>
                                <div class="col-5">
                                    <input type="range" class="form-range float-end" min="-50" max="50" id="SeatVentilationRange">
                                </div>
                            </div>
                        </td>
                         </tr>
                         <tr>
          
                         <td>
                                 <span class="float-start" style="margin-left:8px">
                                     AutoHold
                                 </span>
                                 <div class="form-switch clearfix">
                                     <input class="form-check-input float-end " type="checkbox" role="switch" id="AutoHoldControl">
                                 </div>
                         </td>
                     </tr>
                     <tr>
               
                         <td>
                                <div class="row g-3 align-items-center">
                                  <div class="col-7">
                                      <span class="float-start" style="margin-left:8px">
                                        mirrorLeftTilt:&nbsp;
                                      </span>
                                      <span id="mirrorLeftTiltRangeDisplay" style="text-decoration:underline;">
                                          50
                                      </span>
                                  </div>
                                  <div class="col-5">
                                      <input type="range" class="form-range float-end" min="-50" max="50" id="mirrorLeftTiltRange">
                                  </div>
                              </div>
                              </td>
                              </tr>
                              <tr>
                      
                             <td>
                              <div class="row g-3 align-items-center">
                                <div class="col-7">
                                    <span class="float-start" style="margin-left:8px">
                                      mirrorLeftPan:&nbsp;
                                    </span>
                                    <span id="mirrorLeftPanRangeDisplay" style="text-decoration:underline;">
                                        50
                                    </span>
                                </div>
                                <div class="col-5">
                                    <input type="range" class="form-range float-end" min="-50" max="50" id="mirrorLeftPanRange">
                                </div>
                            </div>
                            </td>
                            </tr>
                            <tr>
                    
                           <td>
                            <div class="row g-3 align-items-center">
                                <div class="col-7">
                                    <span class="float-start" style="margin-left:8px">
                                        mirrorRightTilt:&nbsp;
                                    </span>
                                    <span id="mirrorRightTiltRangeDisplay" style="text-decoration:underline;">
                                        50
                                    </span>
                                </div>
                                <div class="col-5">
                                    <input type="range" class="form-range float-end" min="-50" max="50" id="mirrorRightTiltRange">
                                </div>
                            </div>
                            </td>
                         </tr>
                         <tr>
                 
                        <td>
                            <div class="row g-3 align-items-center">
                                <div class="col-7">
                                    <span class="float-start" style="margin-left:8px">
                                    mirrorRightPan:&nbsp;
                                    </span>
                                    <span id="mirrorRightPanRangeDisplay" style="text-decoration:underline;">
                                        50
                                    </span>
                                </div>
                                <div class="col-5">
                                    <input type="range" class="form-range float-end" min="-50" max="50" id="mirrorRightPanRange">
                                </div>
                            </div>
                         </td>
                     </tr>
                     <tr>
              
                         <td>
 
                                 <span class="float-start" style="margin-left:8px">
                                     Steering Mode
                                     </span>
                                     <div class="form-switch clearfix">
                                         <input class="form-check-input float-end setting-checkbox-child" type="checkbox" role="switch" id="SteeringModeControl">
                                     </div>
                         </td>
                     </tr>
                     <tr>
              
                     <td>
 
                             <span class="float-start" style="margin-left:8px">
                             Braking Mode
                                 </span>
                                 <div class="form-switch clearfix">
                                     <input class="form-check-input float-end setting-checkbox-child" type="checkbox" role="switch" id="BrakingModeControl">
                                 </div>
                     </td>
                      </tr>
                      <tr>
              
                     <td>
 
                             <span class="float-start" style="margin-left:8px">
                             Power Mode
                                 </span>
                                 <div class="form-switch clearfix">
                                     <input class="form-check-input float-end setting-checkbox-child" type="checkbox" role="switch" id="PowerModeControl">
                                 </div>
                     </td>
                      </tr>




                    </tbody>
                </table>
            

                    </div>

                    
                    <div class="col">
                         <div id="pickDriver" class="card" style="margin-left:10px;margin-right:10px;margin-top:10px;border:3px solid red;box-shadow:0px 0px 4px 4px red;">
                            <h5 class="card-header driver-card-h5">Pick a driver</h5>
                            <div class="card-body">
                                <div id="multipleUsersDiv"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
            <script src=https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.7/dist/umd/popper.min.js" integrity="sha384-zYPOMqeu1DAVkHiLqWBUTcbYfZ8osu1Nd6Z89ify25QV9guujx43ITvfi12/QExE" crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script>
        </body>   
    `;

  // var RainIntensityRange = bigBoxModule.querySelector('#rainRange');
  // RainIntensityRange.addEventListener('click',function(event){})
  var RainIntensityRange2 = bigBoxModule.querySelector("#rainRange");
  RainIntensityRange2.addEventListener("click", function (event) {
    rainIntensity = event.target.value;
    console.log("rainIntensity:", rainIntensity);
    bigBoxModule.querySelector("#rainRangeDisplay").innerHTML = rainIntensity;
  });

  var temperatureRange2 = bigBoxModule.querySelector("#temperatureRange");
  temperatureRange2.addEventListener("click", function (event) {
    OutsideTemperature = event.target.value;
    console.log("OutsideTemperature:", OutsideTemperature);
    bigBoxModule.querySelector("#temperatureRangeDisplay").innerHTML =
      OutsideTemperature;
  });

  var SeatPositionRange = bigBoxModule.querySelector("#SeatPositionRange");
  SeatPositionRange.addEventListener("click", function (event) {
    seatPosition.value = event.target.value;
    console.log("Seat Position:", seatPosition.value);
    bigBoxModule.querySelector("#seatPositionRangeDisplay").innerHTML =
    seatPosition.value;
  });

  var ACTemperatureIfHotRange = bigBoxModule.querySelector("#ACTemperatureIfHotRange");
  ACTemperatureIfHotRange.addEventListener("click", function (event) {
    ACTemperatureIfHot = event.target.value;
    console.log("AC Temperature IfHot:", ACTemperatureIfHot);
    bigBoxModule.querySelector("#ACTemperatureIfHotRangeDisplay").innerHTML =
        ACTemperatureIfHot;    
  });

  var ACTemperatureIfColdRange = bigBoxModule.querySelector("#ACTemperatureIfColdRange");
  ACTemperatureIfColdRange.addEventListener("click", function (event) {
    ACTemperatureIfCold = event.target.value;
    console.log("AC Temperature IfCold:", ACTemperatureIfCold);
    bigBoxModule.querySelector("#ACTemperatureIfColdRangeDisplay").innerHTML =
        ACTemperatureIfCold;    
  });

  var ACAirFlowLevelRange = bigBoxModule.querySelector("#ACAirFlowLevelRange");
  ACAirFlowLevelRange.addEventListener("click", function (event) {
    ACAirFlowLevel = event.target.value;
    console.log("AC Air Flow Level:",ACAirFlowLevel);
    bigBoxModule.querySelector("#ACAirFlowLevelRangeDisplay").innerHTML =
        ACAirFlowLevel;
  });
  var SteeringWheelWarmRange = bigBoxModule.querySelector("#SteeringWheelWarmRange");
  SteeringWheelWarmRange.addEventListener("click", function (event) {
    SteeringWheelWarm = event.target.value;
    console.log("Steering Wheel Warm:", SteeringWheelWarm);
    bigBoxModule.querySelector("#SteeringWheelWarmRangeDisplay").innerHTML =
        SteeringWheelWarm;
  });

  var SeatHeatLevelRange = bigBoxModule.querySelector("#SeatHeatLevelRange");
  SeatHeatLevelRange.addEventListener("click", function (event) {
    SeatHeatLevel = event.target.value;
    console.log("Seat Heat Level:", SeatHeatLevel);
    bigBoxModule.querySelecto("#SeatHeatLevelRangeDisplay").innerHTML =
    SeatHeatLevel;
  });

  var SeatVentilationRange = bigBoxModule.querySelector("#SeatVentilationRange");
  SeatVentilationRange.addEventListener("click", function (event) {
    SeatVentilation = event.target.value;
    console.log("Sea tVentilation:", SeatVentilation);
    bigBoxModule.querySelector("#SeatVentilationRangeDisplay").innerHTML =
    SeatVentilation;
  });

  var mirrorLeftTiltRange = bigBoxModule.querySelector("#mirrorLeftTiltRange");
  mirrorLeftTiltRange.addEventListener("click", function (event) {
    mirrorLeftTilt = event.target.value;
    console.log("mirrorLeftTilt:", mirrorLeftTilt);
    bigBoxModule.querySelector("#mirrorLeftTiltRangeDisplay").innerHTML =
    mirrorLeftTilt;
  });

  var mirrorLeftPanRange = bigBoxModule.querySelector("#mirrorLeftPanRange");
  mirrorLeftPanRange.addEventListener("click", function (event) {
    mirrorLeftPan = event.target.value;
    console.log("mirrorLeftPan:", mirrorLeftPan);
    bigBoxModule.querySelector("#mirrorLeftPanRangeDisplay").innerHTML =
    mirrorLeftPan;
  });

  var mirrorRightTiltRange = bigBoxModule.querySelector("#mirrorRightTiltRange");
  mirrorRightTiltRange.addEventListener("click", function (event) {
    mirrorRightTilt = event.target.value;
    console.log("mirrorRightTilt:", mirrorRightTilt);
    bigBoxModule.querySelector("#mirrorRightTiltRangeDisplay").innerHTML =
    mirrorRightTilt;
  });

  var mirrorRightPanRange = bigBoxModule.querySelector("#mirrorRightPanRange");
  mirrorRightPanRange.addEventListener("click", function (event) {
    mirrorRightPan = event.target.value;
    console.log("mirrorRightPan:", mirrorRightPan);
    bigBoxModule.querySelector("#mirrorRightPanRangeDisplay").innerHTML =
    mirrorRightPan;
  });








  var AutoHoldControl = bigBoxModule.querySelector("#AutoHoldControl");
  
  var SteeringModeControl = bigBoxModule.querySelector("#SteeringModeControl");
  var BrakingModeControl = bigBoxModule.querySelector("#BrakingModeControl");
  var PowerModeControl = bigBoxModule.querySelector("#PowerModeControl");

  var closeAlert = bigBoxModule.querySelector("#closeAlert");
  var alertDiv = bigBoxModule.querySelector("#liveToast");
  closeAlert.addEventListener("click", function (event) {
    alertDiv.setAttribute("class","toast");
  });


  AutoHoldControl.addEventListener("click", function (event) {
    AutoHoldIsOn = event.target.checked;
    console.log("On/Off:", AutoHoldIsOn);
  });

  SteeringModeControl.addEventListener("click", function (event) {
    SteeringMode = event.target.checked;
    console.log("On/Off:", SteeringMode);
  });
  BrakingModeControl.addEventListener("click", function (event) {
    BrakingMode = event.target.checked;
    console.log("On/Off:", BrakingMode);
  });
  PowerModeControl.addEventListener("click", function (event) {
    PowerMode = event.target.checked;
    console.log("On/Off:", PowerMode);
  });


  var personDic = {
    Person1: ["Yilong_Dai", "Me"],
    Person2: ["Kyrie_Irving", "NBA all star"],
    Person3: ["Driver by you", "Customize your own"],
  };

  var usrAvatar = personalSettingModule.querySelector("#avatar");

  var driverName = personalSettingModule.querySelector("#driver-name-span");

  var driverWelcome = personalSettingModule.querySelector(
    "#driver-name-bottom-span"
  );

  var html = "";
  html += `<div class="row">
                <div class="col-6">
                    <div class="list-group driver-name" id="list-tab" role="tablist">`;
  for (var key in personDic) {
    html +=
      '<a class="list-group-item list-group-item-action " id="' +
      key +
      '" data-bs-toggle="list" role="tab" aria-controls="' +
      personDic[key][1] +
      'Content">' +
      personDic[key][0] +
      "</a>";
  }
  html += `
        </div>
                </div>
            <div class="col-6">
                <div class="tab-content driver-description" id="nav-tabContent">
    `;
  for (var key in personDic) {
    html +=
      '<div class="tab-pane fade " id="' +
      key +
      'Content" role="tabpanel" aria-labelledby="' +
      key +
      '">' +
      personDic[key][1] +
      "</div>";
  }
  html += `
    </div>
            </div>
          </div>
    `;
  bigBoxModule.querySelector("#multipleUsersDiv").innerHTML = html;

  var previousTab = null;
  var previousContent = null;
  for (var key in personDic) {
    bigBoxModule.querySelector("#" + key).addEventListener("click", function (event) {
        console.log(this.id);
        bigBoxModule.querySelector("#pickDriver").style.border="1px solid #CCCCCC";
        bigBoxModule.querySelector("#pickDriver").style.boxShadow = "0px 0px 0px 0px";
        alertDiv.setAttribute("class","toast");
        fixedDriverPicked(personDic[this.id][0]);
        if (previousTab != null) {
          previousTab.setAttribute(
            "class",
            "list-group-item list-group-item-action"
          );
          previousContent.setAttribute("class", "tab-pane fade");
        }
        previousTab = bigBoxModule.querySelector("#" + this.id);
        previousContent = bigBoxModule.querySelector("#" + this.id + "Content");
        previousTab.setAttribute(
          "class",
          "list-group-item list-group-item-action active"
        );
        previousContent.setAttribute("class", "tab-pane fade show active");
        driverName.innerHTML = personDic[this.id][0];
        driverWelcome.innerHTML = personDic[this.id][1];
        selectedDriverName = personDic[this.id][0];
      });
    console.log(key);
  }

  var dividing = false;
  function nextStep(){
      if(!dividing){
        if(curTree.type == "activity"){
            drawTree(curTree);
            curTree = curTree.middle;
        }else if (curTree.type == "judge"){
            moveDirection = getDirection(curTree.val);
            dividing = true;
            drawTree(curTree);
            
        }
    }else{
        dividing = false;
        if(moveDirection == "left"){ 
          curTree = curTree.left;
          drawTree(curTree);
        }else if(moveDirection == "middle"){
          curTree = curTree.middle;
            drawTree(curTree);
        }else if(moveDirection == "right"){
          curTree = curTree.right;
            drawTree(curTree);
        }

        if(curTree.type == "judge"){
          moveDirection = getDirection(curTree.val);
          dividing = true;
          console.log(moveDirection)
        }else{
          curTree = curTree.middle;
        }
        
    }
  }

  


  simulator(
    "Vehicle.Cabin.Seat.Row1.Pos1.Position",
    "get",
    async () => {
      return seatPosition.value;
    }
  );
  simulator(
    "Vehicle.Cabin.Lights.Spotlight.Row1.IsLeftOn",
    "get",
    async () => {
      return interiorLight;
    }
  );
  simulator(
    "Vehicle.Cabin.Infotainment.Media.Played.URI",
    "get",
    async () => {
      return musicURI;
    }
  );
  simulator(
    "Vehicle.Body.Mirrors.Left.Tilt",
    "get",
    async () => {
      return mirrorLeftTilt;
    }
  );
  simulator(
    "Vehicle.Body.Mirrors.Left.Pan",
    "get",
    async () => {
      return mirrorLeftPan;
    }
  );
  simulator(
    "Vehicle.Body.Mirrors.Right.Tilt",
    "get",
    async () => {
      return mirrorRightTilt;
    }
  );
  simulator(
    "Vehicle.Body.Mirrors.Right.Pan",
    "get",
    async () => {
      return mirrorRightPan;
    }
  );


    
  widgets.register("BigBox", (box) => {
    box.injectNode(bigBoxModule);
  });

  return{
    nextStepPY : function(){
        nextStep();
        return "return";
    },
    isPersonalPY : function(){
        return isPersonal;
    },
    selectDriver:function(){

      nextStep();
      setTimeout(function () {
        nextStep();
      }, 2000);
      setTimeout(function () {
        nextStep();
      }, 4000);
      setTimeout(function () {
        nextStep();
      }, 6000);
      setTimeout(function () {
        nextStep(); 
      }, 8000);
      
 
      if (isPersonal == false){
        setTimeout(function () {
          nextStep();
        }, 10000);
      }
      return [true,isPersonal];
    },
    setWelcome:function(){
      if(welcomeWord != null){
        bigBoxModule.querySelector("#welcomeWord").innerHTML = welcomeWord;
      }
    },
    setPersonalizedWelcomeWord:function(){
      if(welcomeWord != null){
        bigBoxModule.querySelector("#welcomeWord").innerHTML = welcomeWord;
      }
    },
    setPersonalizedUIInterface:function(){
      if(UIInterface != null){
        bigBoxModule.querySelector("#UI").style.background = UIInterface;
      }
    },
    setPreferLanguage:function(){
      if(language != null){
        bigBoxModule.querySelector("#language").innerHTML = language;
      }
    },
    setUSMetricUnits:function(){
      if(USMetricUnit != null){
        bigBoxModule.querySelector("#units").innerHTML = USMetricUnit;
      }
    },
    setInteriorLight:function(){
        return interiorLight;
    },
    setParkingWarningBeepLevel:function(){

    },
    turnOnPreferredMusic:function(){
      if(musicURI!= null){
        bigBoxModule.querySelector("#music").innerHTML = musicURI;
      }
        return musicURI;
    },
    setSeatPosition:function(){
        return seatPosition.value;
    },
    setAutoHold:function(){
        if(AutoHoldIsOn){
          bigBoxModule.querySelector("#autoHoldImage").style.display = "block";
        }
    },
    setMirrorStatus:function(){

    },
    setSteeringMode:function(){
      if(SteeringMode){
        bigBoxModule.querySelector("#steeringImage").style.display = "block";
      }
    },
    setBrakingMode:function(){
      if(BrakingMode){
        bigBoxModule.querySelector("#brakingImage").style.display = "block";
      }
    },
    setPowerMode:function(){
      if(PowerMode){
        bigBoxModule.querySelector("#powerImage").style.display = "block";
      }
    },
    getOutsideTemperature:function(){
      return OutsideTemperature;
    },
    turnOnSetAC:function(ACMode){
      if(ACMode == "warm AC"){
        bigBoxModule.querySelector("#warmACImage").style.display = "block";
      }else if(ACMode = "cool AC"){
        bigBoxModule.querySelector("#coolACImage").style.display = "block";
      }
      console.log(ACMode);
    },
    turnOnSeatHeat:function(){
      if(SeatHeatLevel > 0){
        bigBoxModule.querySelector("#SeatHeatImage").style.display = "block";
      }
    },
    turnSteeringWheelWarm:function(){
      if(SteeringWheelWarm> 0){
        bigBoxModule.querySelector("#SteeringWheelWarmImage").style.display = "block";
      }
    },
    turnOnSeatVentilation:function(){
      if(SeatVentilation> 0){
        bigBoxModule.querySelector("#SeatVentilationImage").style.display = "block";
      }
    },
    setACAirFlow:function(){

    },
    setADASWarningBeepLevel:function(){

    },


    refresh:function(){
        selectedDriverName = "";
        curTree = tt;
        drawFlag = true;
        dividing = false;
        previousVal = null;
        previousType = null;
        moveDirection = null;
        isPersonal = false;
    }

  }

  
};

function readTextFile(fileName) {
  var rawFile = new XMLHttpRequest();
  var infoList = [];
  rawFile.open("GET", fileName, false);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        var allText = rawFile.responseText.toString();
        // alert(allText);
        infoList = allText.split("\r\n");
      }
    }
  };
  rawFile.send(null);
  return infoList;
}

function analysisTxt(txt){
  console.log("analysis")

  let dictionaryInfo = {};
  let dictionaryDriver = {}
  let identInfo = null;
  let identName = null;
  let key;
  let value;

  for (var i=0; i < txt.length; i++){
    identInfo = txt[i].split("#");
    identName = identInfo.shift().split(":")[1]
    for(var j=0; j<identInfo.length;j++){
      key = identInfo[j].split(":")[0];
      value = identInfo[j].split(":")[1];
      dictionaryInfo[key] = value;
    }
    dictionaryDriver[identName] = dictionaryInfo;
    dictionaryInfo = {};
  }

  console.log(dictionaryDriver);
  return dictionaryDriver;
}


export default plugin;
