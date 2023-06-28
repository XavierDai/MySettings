import SignalWithMedia from "http://127.0.0.1:5500/SignalWithMedia.js";
const plugin = ({ widgets, simulator, vehicle }) => {
  var txt = readTextFile("http://127.0.0.1:5500/ident.txt");
  var allDriverDictionary = analysisTxt(txt);
  var defaultDriverDictionary = pasteToNewDictionary(
    allDriverDictionary["Default_Driver"]
  );
  var originalCustomDictionary = pasteToNewDictionary(
    allDriverDictionary["custom"]
  );
  var customizedDictionary = pasteToNewDictionary(originalCustomDictionary);
  var systemDictionary = pasteToNewDictionary(defaultDriverDictionary);
  console.log(originalCustomDictionary);
  // live args
  var selectedDriverName = null;
  var isPersonal = false;
  var OutsideTemperature = 20;
  var rainIntensity = null;
  var previousSelectedDriverName = null;

  // auto save
  // var welcomeWord = null;
  // var language = null;
  // var UIInterface = null;
  // var USMetricUnit = null;
  var interiorLight = null;
  // var parkingBeepLevel = null;
  // var musicURI = null;
  // var ADASBeepLevel = null;

  // with a on/off switch
  // var mirrorLeftTilt = null;
  // var mirrorLeftPan = null;
  // var mirrorRightTilt = null;
  // var mirrorRightPan = null;
  // var ACAirFlowLevel = null;
  // var ACTemperature = null;
  // var ACTemperatureIfHot = null;
  // var ACTemperatureIfCold = null;
  // var SteeringWheelWarm = null;
  // var SeatHeatLevel = null;
  // var SeatVentilation = null;
  var AutoHoldIsOn = null;
  var SteeringMode = null;
  var BrakingMode = null;
  var PowerMode = null;

  var driveMode = null;

  var signalList = [
    "Cabin.Door.Row1.Left.IsOpen",
    "Vehicle.Cabin.Seat.Row1.Pos1.Height",
  ];

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
  };
  var personalTree = {
    val: "Set Seat Position",
    type: "activity",
    type: "activity",
    left: null,
    right: null,
    middle: {
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
                                left: {
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
                                middle: {
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
  };
  const flowChartTree = {
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
            leftCondition: "custom",
            middleCondition: "Kyrie_Irving",
            rightCondition: "Default_Driver",
          },
          type: "judge",
          left: {
            val: "Customize Your Own Driver",
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
  var curTree = flowChartTree;

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
                                Enable MySettings:
                            </span>
                            <div class="form-switch clearfix">
                            <input class="form-check-input float-end driver-input-child" type="checkbox" role="switch"  id="on-off-button" checked>
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
                                    <input class="form-check-input driver-input-child float-end setting-checkbox-child" type="checkbox" role="switch" id="welcomeWordCheck">
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
                                    <select class="form-select float-end setting-checkbox-child driver-input-child" id="LanguageSelect">
                                        <option id="Chinese" value="Chinese">Chinese</option>
                                        <option id="English" value="English">English</option>
                                        <option id="German" value="German">German</option>
                                        <option id="Spanish" value="Spanish">Spanish</option>
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
                                <select class="form-select float-end setting-checkbox-child driver-input-child" id="UIStyleSelect">
                                    <option id="grey" value="Grey">grey</option>
                                    <option id="pink" value="Pink">pink</option>
                                    <option id="blue" value="Blue">blue</option>
                                    <option id="green" value="Green">green</option>
                                    <option id="black" value="Black">black</option>
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
                                        <select class="form-select float-end setting-checkbox-child driver-input-child" id="UnitSelect">
                                          <option id="Metric" value="Metric">Metric</option>
                                            <option id="US" value="US">US</option>
                                            
                                            
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
                                
                                        <input type="color" class="form-control form-control-color float-end setting-checkbox-child driver-input-child" id="InteriorLightColor" value="#563d7c" title="Choose your color">
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
                                    <select class="form-select float-end setting-checkbox-child driver-input-child" id="ParkingBeepLevelSelect">
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
                                    <select class="form-select float-end setting-checkbox-child driver-input-child" id="PreferredMusicSelect">
                                        <option id="optionClosedOnSunday" value="ClosedOnSunday">Closed on Sunday</option>
                                        <option id="optionYikes" value="Yikes">Yikes</option>
                                        <option id="optionGhostTown" value="GhostTown">Ghost Town</option>
                                        <option id="optionRidiculous" value="Ridiculous">Ridiculous</option>
                                        <option id="optionWithoutYou" value="WithoutYou">WithoutYou</option>
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
                                    ADAS Beep level
                                </span>
                            </div>
                            <div class="col-4">
                                <select class="form-select float-end setting-checkbox-child driver-input-child" id="ADASBeepLevelSelect">
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
                                    <input class="form-check-input float-end setting-checkbox-child driver-input-child" type="checkbox" role="switch" id="SeatPositionCheck">
                                </div>
                        </td>
                    </tr>
                    <tr>
              
                        <td>
                                <span class="float-start" style="margin-left:8px">
                                AC temperature
                                </span>
                                <div class="form-switch clearfix">
                                    <input class="form-check-input float-end setting-checkbox-child driver-input-child" type="checkbox" role="switch" id="ACTemperatureCheck">
                                </div>
                        </td>
                    </tr>
                    <tr>
             
                        <td>

                                <span class="float-start" style="margin-left:8px">
                                AC Air Flow Level 
                                    </span>
                                    <div class="form-switch clearfix">
                                        <input class="form-check-input float-end setting-checkbox-child driver-input-child" type="checkbox" role="switch" id="ACAirFlowLevelCheck">
                                    </div>
                        </td>
                    </tr>
                    <tr>
             
                    <td>

                            <span class="float-start" style="margin-left:8px">
                            Steering Wheel Warm
                                </span>
                                <div class="form-switch clearfix">
                                    <input class="form-check-input float-end setting-checkbox-child driver-input-child" type="checkbox" role="switch" id="SteeringWheelWarmCheck">
                                </div>
                    </td>
                     </tr>
                     <tr>
             
                    <td>

                            <span class="float-start" style="margin-left:8px">
                            Seat Heat Level
                                </span>
                                <div class="form-switch clearfix">
                                    <input class="form-check-input float-end setting-checkbox-child driver-input-child" type="checkbox" role="switch" id="SeatHeatLevelCheck">
                                </div>
                    </td>
                     </tr>
                     <tr>
             
                    <td>

                            <span class="float-start" style="margin-left:8px">
                            Seat Ventilation
                                </span>
                                <div class="form-switch clearfix">
                                    <input class="form-check-input float-end setting-checkbox-child driver-input-child" type="checkbox" role="switch" id="SeatVentilationCheck">
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
                                    <input class="form-check-input float-end setting-checkbox-child driver-input-child" type="checkbox" role="switch" id="AutoHoldCheck">
                                </div>
                        </td>
                    </tr>
                    <tr>
              
                        <td>
                                <span class="float-start" style="margin-left:8px">
                                    Mirror Status
                                </span>
                                <div class="form-switch clearfix">
                                    <input class="form-check-input float-end setting-checkbox-child driver-input-child" type="checkbox" role="switch" id="MirrorStatusCheck">
                                </div>
                        </td>
                    </tr>
                    <tr>
             
                        <td>

                                <span class="float-start" style="margin-left:8px">
                                  Drive Mode
                                    </span>
                                    <div class="form-switch clearfix">
                                        <input class="form-check-input float-end setting-checkbox-child driver-input-child" type="checkbox" role="switch" id="DriveModeCheck">
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
  var DriveModeCheck = personalSettingModule.querySelector("#DriveModeCheck");

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
  var InteriorLightColor = personalSettingModule.querySelector(
    "#InteriorLightColor"
  );
  var PreferredMusicSelect = personalSettingModule.querySelector(
    "#PreferredMusicSelect"
  );
  var ParkingBeepLevelSelect = personalSettingModule.querySelector(
    "#ParkingBeepLevelSelect"
  );
  var ADASBeepLevelSelect = personalSettingModule.querySelector(
    "#ADASBeepLevelSelect"
  );
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
      Object.entries(systemDictionary).forEach(([key, value]) => {
        value.onOff = false;
      });
      personalSettingModule.querySelector("#SeatPositionCheck").checked = false;
      personalSettingModule.querySelector(
        "#ACTemperatureCheck"
      ).checked = false;
      personalSettingModule.querySelector(
        "#ACAirFlowLevelCheck"
      ).checked = false;
      personalSettingModule.querySelector(
        "#SteeringWheelWarmCheck"
      ).checked = false;
      personalSettingModule.querySelector(
        "#SeatHeatLevelCheck"
      ).checked = false;
      personalSettingModule.querySelector(
        "#SeatVentilationCheck"
      ).checked = false;
      personalSettingModule.querySelector("#AutoHoldCheck").checked = false;
      personalSettingModule.querySelector("#MirrorStatusCheck").checked = false;
      personalSettingModule.querySelector("#DriveModeCheck").checked = false;
    }
  });

  welcomeWordCheck.addEventListener("click", function (event) {
    var isOn = event.target.checked;
    console.log("On/Off:", isOn);
  });

  SeatPositionCheck.addEventListener("click", function (event) {
    systemDictionary["seatPosition"].onOff = event.target.checked;
    console.log("On/Off:", systemDictionary["seatPosition"].onOff);
  });
  AutoHoldCheck.addEventListener("click", function (event) {
    var isOn = event.target.checked;
    console.log("On/Off:", isOn);
  });
  MirrorStatusCheck.addEventListener("click", function (event) {
    systemDictionary.mirrorLeftTilt.onOff = event.target.checked;
    systemDictionary.mirrorLeftPan.onOff = event.target.checked;
    systemDictionary.mirrorRightTilt.onOff = event.target.checked;
    systemDictionary.mirrorRightPan.onOff = event.target.checked;
    console.log("On/Off:", systemDictionary.mirrorLeftTilt.onOff);
  });
  DriveModeCheck.addEventListener("click", function (event) {
    systemDictionary.driveMode.onOff = event.target.checked;
    console.log("On/Off:", systemDictionary.driveMode.onOff);
  });
  ACAirFlowLevelCheck.addEventListener("click", function (event) {
    systemDictionary.ACAirFlowLevel.onOff = event.target.checked;
    console.log("On/Off:", systemDictionary.ACAirFlowLevel.onOff);
  });
  ACTemperatureCheck.addEventListener("click", function (event) {
    systemDictionary.ACTemperatureIfCold.onOff = event.target.checked;
    systemDictionary.ACTemperatureIfHot.onOff = event.target.checked;
    console.log("On/Off:", event.target.checked);
  });
  SteeringWheelWarmCheck.addEventListener("click", function (event) {
    systemDictionary.SteeringWheelWarm.onOff = event.target.checked;
    console.log("On/Off:", systemDictionary.SteeringWheelWarm.onOff);
  });
  SeatHeatLevelCheck.addEventListener("click", function (event) {
    systemDictionary.SeatHeatLevel.onOff = event.target.checked;
    console.log("On/Off:", systemDictionary.SeatHeatLevel.onOff);
  });

  SeatVentilationCheck.addEventListener("click", function (event) {
    systemDictionary.SeatVentilation.onOff = event.target.checked;
    console.log("On/Off:", systemDictionary.SeatVentilation.onOff);
  });

  LanguageSelect.onchange = function () {
    systemDictionary.language.val = this.value;
    console.log("language：", this.value);
  };

  UIStyleSelect.onchange = function () {
    systemDictionary.UIInterface.val = this.value;
    console.log("Selected UI style：", this.value);
  };

  UnitSelect.onchange = function () {
    systemDictionary.USMetricUnit.val = this.value;
    console.log("Selected Unit:", this.value);
    changeTemperatureUnit(this.value);
  };

  PreferredMusicSelect.onchange = function () {
    systemDictionary.musicURI.val = this.value;
    console.log("Selected Unit:", this.value);
  };

  InteriorLightColor.onchange = function () {
    console.log("color：", this.value);
    systemDictionary.InteriorLight.val = this.value.replace("#", "");
  };

  ParkingBeepLevelSelect.onchange = function () {
    systemDictionary.parkingBeepLevel.val = this.value;
    console.log("Parking Beep Level：", this.value);
  };

  ADASBeepLevelSelect.onchange = function () {
    systemDictionary.ADASBeepLevel.val = this.value;
    console.log("ADAS Beep Level：", this.value);
  };

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
    if (!drawFlag) {
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

  function getDirection(val) {
    if (val.state == "Driver Memory") {
      if (selectedDriverName == val.leftCondition) {
        isPersonal = true;
        return "left";
      } else if (selectedDriverName == val.middleCondition) {
        isPersonal = true;
        return "middle";
      }
      isPersonal = false;
      return "right";
    } else if (val.state == "temp < 9") {
      if (OutsideTemperature < 9) {
        return "left";
      } else {
        return "middle";
      }
    } else if (val.state == "temp > 25") {
      if (OutsideTemperature > 25) {
        return "left";
      } else {
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
  bigBoxModule.innerHTML =
    `
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
                

                <div style="height:63.5%;">   
               
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
                
                  <div id="displayVideo" style="width:100%;height:100%;border:1px solid black;display:block;"> 
                    <video class="bigBoxVideo" id="doorClose" autoplay playsinline muted src='https://digitalauto-media-data.netlify.app/DoorClose720x360.mp4' style = "display:block;height:100%;width:100%;object-fit:contain;">
                    </video>
                    <video class="bigBoxVideo" id="doorOpen" preload playsinline muted src='https://digitalauto-media-data.netlify.app/DoorOpen720x360.mp4' style = "display:none;height:100%;width:100%;object-fit:contain;">
                    </video>
                    <video class="bigBoxVideo" id="seatAdjust" preload playsinline muted src='https://digitalauto-media-data.netlify.app/SeatGoUp720x360.mp4' style = "display:none;height:100%;width:100%;object-fit:contain;">
                    </video>
                    
                  </div>
                  <div id="displayCockpit" style="width:100%;height:100%;border:1px solid black;display:none;">
                    
                    <div id="welcomeWord">

                    </div>
                    <div id="UI" style ="width:40px;height:40px;border:1px solid black">
                    </div>
                    <div id="language">

                    </div>
                    <div id="music">
                      <audio src = "" controls>
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
                                <label class="col-sm-5 col-form-label col-form-label">&nbsp;&nbsp;&nbsp;Rain Intensity</label>
                                <div class="col-sm-6" style="background-color:#CAECF4;border-radius:5px;">
                                    <label for="rainRange" class="form-label">0% ~ 100%</label>
                                    </br>
                                    Current:<span id="rainRangeDisplay" style="text-decoration:underline;">
                                        50
                                    </span>%
                                    </br>
                                    <input type="range" class="form-range" min="0" max="100" id="rainRange">
                           
                                  </div>
                            </div>
                   
                            
                            <div class="row" >
                                <label class="col-sm-5 col-form-label col-form-label">&nbsp;&nbsp;&nbsp;Outside Temperature</label>
                                <div class="col-sm-6" style="background-color:#FFBE7D;border-radius:5px;">
                                    <label for="temperatureRange" class="form-label">
                                      <span id="temperatureRangeLabel">-50°C ~ +50°C</span>
                                    </label>
                                    </br>
                                    Current:<span id="temperatureRangeDisplay" style="text-decoration:underline;">
                                        50
                                    </span>
                                    <span class="temperatureUnit">
                                      °C
                                    </span>
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
                                            ` +
    systemDictionary["seatPosition"].val +
    `
                                        </span> mm
                                    </div>
                                    <div class="col-5">
                                        <input type="range" class="form-range float-end driver-input-child" min="0" max="500" id="SeatPositionRange" value="` +
    systemDictionary["seatPosition"].val +
    `">
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
                                            <span id="ACTemperatureIfColdRangeDisplay" style="text-decoration:underline;" class="temperatureValue">
                                                ` +
    systemDictionary.ACTemperatureIfCold.val +
    `
                                            </span>
                                            <span class="temperatureUnit">
                                              °C
                                            </span>
                                        </div>
                                        <div class="col-5">
                                            <input type="range" class="form-range driver-input-child float-end" min="-50" max="50" value="` +
    systemDictionary.ACTemperatureIfCold.val +
    `" id="ACTemperatureIfColdRange">
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
                                            <span id="ACTemperatureIfHotRangeDisplay" style="text-decoration:underline;"  class="temperatureValue">
                                                ` +
    systemDictionary.ACTemperatureIfHot.val +
    `
                                            </span>
                                            <span class="temperatureUnit">
                                              °C
                                            </span>
                                        </div>
                                        <div class="col-5">
                                            <input type="range" class="form-range driver-input-child float-end" min="-50" max="50" value="` +
    systemDictionary.ACTemperatureIfHot.val +
    `" id="ACTemperatureIfHotRange">
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
                                            ` +
    systemDictionary.ACAirFlowLevel.val +
    `
                                        </span>
                                    </div>
                                    <div class="col-5">
                                        <input type="range" class="form-range driver-input-child float-end" min="-50" max="50" value="` +
    systemDictionary.ACAirFlowLevel.val +
    `" id="ACAirFlowLevelRange">
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
                                      ` +
    systemDictionary.SteeringWheelWarm.val +
    `
                                    </span>
                                </div>
                                <div class="col-5">
                                    <input type="range" class="form-range driver-input-child float-end" min="-50" max="50" value="` +
    systemDictionary.SteeringWheelWarm.val +
    `" id="SteeringWheelWarmRange">
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
                                            ` +
    systemDictionary.SeatHeatLevel.val +
    `
                                        </span>
                                    </div>
                                    <div class="col-5">
                                        <input type="range" class="form-range driver-input-child float-end" min="-50" max="50" value="` +
    systemDictionary.SeatHeatLevel.val +
    `" id="SeatHeatLevelRange">
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
                                    ` +
    systemDictionary.SeatVentilation.val +
    `
                                    </span>
                                </div>
                                <div class="col-5">
                                    <input type="range" class="form-range driver-input-child float-end" min="-50" max="50" value="` +
    systemDictionary.SeatVentilation.val +
    `" id="SeatVentilationRange">
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
                                     <input class="form-check-input driver-input-child float-end " type="checkbox" role="switch" id="AutoHoldControl">
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
                                          ` +
    systemDictionary.mirrorLeftTilt.val +
    `
                                      </span>
                                  </div>
                                  <div class="col-5">
                                      <input type="range" class="form-range driver-input-child float-end" min="-50" max="50" value="` +
    systemDictionary.mirrorLeftTilt.val +
    `" id="mirrorLeftTiltRange">
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
                                    ` +
    systemDictionary.mirrorLeftPan.val +
    `
                                    </span>
                                </div>
                                <div class="col-5">
                                    <input type="range" class="form-range driver-input-child float-end" min="-50" max="50" value="` +
    systemDictionary.mirrorLeftPan.val +
    `" id="mirrorLeftPanRange">
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
                                      ` +
    systemDictionary.mirrorRightTilt.val +
    `
                                    </span>
                                </div>
                                <div class="col-5">
                                    <input type="range" class="form-range driver-input-child float-end" min="-50" max="50" value="` +
    systemDictionary.mirrorRightTilt.val +
    `" id="mirrorRightTiltRange">
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
                                      ` +
    systemDictionary.mirrorRightPan.val +
    `
                                    </span>
                                </div>
                                <div class="col-5">
                                    <input type="range" class="form-range driver-input-child float-end" min="-50" max="50" value="` +
    systemDictionary.mirrorRightPan.val +
    `" id="mirrorRightPanRange">
                                </div>
                            </div>
                         </td>
                     </tr>
                     <tr>
              
                         <td>
 
                                 <span class="float-start" style="margin-left:8px">
                                     Drive Mode
                                     </span>
                                     <div class="form-switch clearfix">
                                         <input class="form-check-input driver-input-child float-end setting-checkbox-child" type="checkbox" role="switch" id="DriveModeControl">
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

  SignalWithMedia(
    bigBoxModule.querySelector("#displayVideo"),
    "Vehicle.Cabin.Door.Row1.Left.IsOpen",
    {
      [true]: {
        type: "video",
        url: "https://digitalauto-media-data.netlify.app/DoorOpen720x360.mp4",
      },
      [false]: {
        type: "video",
        url: "https://digitalauto-media-data.netlify.app/DoorClose720x360.mp4",
      },
    },
    vehicle
  );

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
    if (systemDictionary.USMetricUnit.val == "US") {
      bigBoxModule.querySelector("#temperatureRangeDisplay").innerHTML =
        toFahrenheit(OutsideTemperature);
    } else if (systemDictionary.USMetricUnit.val == "Metric") {
      bigBoxModule.querySelector("#temperatureRangeDisplay").innerHTML =
        OutsideTemperature;
    }
  });

  var SeatPositionRange = bigBoxModule.querySelector("#SeatPositionRange");
  SeatPositionRange.addEventListener("click", function (event) {
    systemDictionary.seatPosition.val = event.target.value;
    console.log("Seat Position:", systemDictionary.seatPosition.val);
    bigBoxModule.querySelector("#seatPositionRangeDisplay").innerHTML =
      systemDictionary.seatPosition.val;
  });

  var ACTemperatureIfHotRange = bigBoxModule.querySelector(
    "#ACTemperatureIfHotRange"
  );
  ACTemperatureIfHotRange.addEventListener("click", function (event) {
    systemDictionary.ACTemperatureIfHot.val = event.target.value;
    console.log(
      "AC Temperature IfHot:",
      systemDictionary.ACTemperatureIfHot.val
    );
    if (systemDictionary.USMetricUnit.val == "US") {
      bigBoxModule.querySelector("#ACTemperatureIfHotRangeDisplay").innerHTML =
        toFahrenheit(event.target.value);
    } else if (systemDictionary.USMetricUnit.val == "Metric") {
      bigBoxModule.querySelector("#ACTemperatureIfHotRangeDisplay").innerHTML =
        event.target.value;
    }
  });

  var ACTemperatureIfColdRange = bigBoxModule.querySelector(
    "#ACTemperatureIfColdRange"
  );
  ACTemperatureIfColdRange.addEventListener("click", function (event) {
    systemDictionary.ACTemperatureIfCold.val = event.target.value;
    console.log(
      "AC Temperature IfCold:",
      systemDictionary.ACTemperatureIfCold.val
    );
    if (systemDictionary.USMetricUnit.val == "US") {
      bigBoxModule.querySelector("#ACTemperatureIfColdRangeDisplay").innerHTML =
        toFahrenheit(event.target.value);
    } else if (systemDictionary.USMetricUnit.val == "Metric") {
      bigBoxModule.querySelector("#ACTemperatureIfColdRangeDisplay").innerHTML =
        event.target.value;
    }
  });

  var ACAirFlowLevelRange = bigBoxModule.querySelector("#ACAirFlowLevelRange");
  ACAirFlowLevelRange.addEventListener("click", function (event) {
    systemDictionary.ACAirFlowLevel.val = event.target.value;
    console.log("AC Air Flow Level:", systemDictionary.ACAirFlowLevel.val);
    bigBoxModule.querySelector("#ACAirFlowLevelRangeDisplay").innerHTML =
      systemDictionary.ACAirFlowLevel.val;
  });
  var SteeringWheelWarmRange = bigBoxModule.querySelector(
    "#SteeringWheelWarmRange"
  );
  SteeringWheelWarmRange.addEventListener("click", function (event) {
    systemDictionary.SteeringWheelWarm.val = event.target.value;
    console.log("Steering Wheel Warm:", systemDictionary.SteeringWheelWarm.val);
    bigBoxModule.querySelector("#SteeringWheelWarmRangeDisplay").innerHTML =
      systemDictionary.SteeringWheelWarm.val;
  });

  var SeatHeatLevelRange = bigBoxModule.querySelector("#SeatHeatLevelRange");
  SeatHeatLevelRange.addEventListener("click", function (event) {
    systemDictionary.SeatHeatLevel.val = event.target.value;
    console.log("Seat Heat Level:", systemDictionary.SeatHeatLevel.val);
    bigBoxModule.querySelecto("#SeatHeatLevelRangeDisplay").innerHTML =
      systemDictionary.SeatHeatLevel.val;
  });

  var SeatVentilationRange = bigBoxModule.querySelector(
    "#SeatVentilationRange"
  );
  SeatVentilationRange.addEventListener("click", function (event) {
    systemDictionary.SeatVentilation.val = event.target.value;
    console.log("Seat Ventilation:", systemDictionary.SeatVentilation.val);
    bigBoxModule.querySelector("#SeatVentilationRangeDisplay").innerHTML =
      systemDictionary.SeatVentilation.val;
  });

  var mirrorLeftTiltRange = bigBoxModule.querySelector("#mirrorLeftTiltRange");
  mirrorLeftTiltRange.addEventListener("click", function (event) {
    systemDictionary.mirrorLeftTilt.val = event.target.value;
    console.log("mirrorLeftTilt:", systemDictionary.mirrorLeftTilt.val);
    bigBoxModule.querySelector("#mirrorLeftTiltRangeDisplay").innerHTML =
      systemDictionary.mirrorLeftTilt.val;
  });

  var mirrorLeftPanRange = bigBoxModule.querySelector("#mirrorLeftPanRange");
  mirrorLeftPanRange.addEventListener("click", function (event) {
    systemDictionary.mirrorLeftPan.val = event.target.value;
    console.log("mirrorLeftPan:", systemDictionary.mirrorLeftPan.val);
    bigBoxModule.querySelector("#mirrorLeftPanRangeDisplay").innerHTML =
      systemDictionary.mirrorLeftPan.val;
  });

  var mirrorRightTiltRange = bigBoxModule.querySelector(
    "#mirrorRightTiltRange"
  );
  mirrorRightTiltRange.addEventListener("click", function (event) {
    systemDictionary.mirrorRightTilt.val = event.target.value;
    console.log("mirrorRightTilt:", systemDictionary.mirrorRightTilt.val);
    bigBoxModule.querySelector("#mirrorRightTiltRangeDisplay").innerHTML =
      systemDictionary.mirrorRightTilt.val;
  });

  var mirrorRightPanRange = bigBoxModule.querySelector("#mirrorRightPanRange");
  mirrorRightPanRange.addEventListener("click", function (event) {
    systemDictionary.mirrorRightPan.val = event.target.value;
    console.log("mirrorRightPan:", systemDictionary.mirrorRightPan.val);
    bigBoxModule.querySelector("#mirrorRightPanRangeDisplay").innerHTML =
      systemDictionary.mirrorRightPan.val;
  });

  var AutoHoldControl = bigBoxModule.querySelector("#AutoHoldControl");

  var DriveModeControl = bigBoxModule.querySelector("#DriveModeControl");

  var closeAlert = bigBoxModule.querySelector("#closeAlert");
  var alertDiv = bigBoxModule.querySelector("#liveToast");
  closeAlert.addEventListener("click", function (event) {
    alertDiv.setAttribute("class", "toast");
  });

  AutoHoldControl.addEventListener("click", function (event) {
    AutoHoldIsOn = event.target.checked;
    console.log("On/Off:", AutoHoldIsOn);
  });

  DriveModeControl.addEventListener("click", function (event) {
    systemDictionary.driveMode.val = event.target.checked;
    console.log("On/Off:", systemDictionary.driveMode.val);
  });

  var personDic = {
    Person1: ["custom", "Customize your own"],
    Person2: ["Kyrie_Irving", "NBA all star"],
    Person3: ["Default_Driver", "Pre-set driver"],
  };

  var usrAvatar = personalSettingModule.querySelector("#avatar");

  var driverName = personalSettingModule.querySelector("#driver-name-span");

  var driverWelcome = personalSettingModule.querySelector(
    "#driver-name-bottom-span"
  );

  var html = "";
  html += `<div class="row">
                <div class="col-7">
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
            <div class="col-5">
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
    bigBoxModule
      .querySelector("#" + key)
      .addEventListener("click", function (event) {
        selectedDriverName = personDic[this.id][0];
        console.log(this.id);
        bigBoxModule.querySelector("#pickDriver").style.border =
          "1px solid #CCCCCC";
        bigBoxModule.querySelector("#pickDriver").style.boxShadow =
          "0px 0px 0px 0px";
        alertDiv.setAttribute("class", "toast");
        switchSystemDictionary(personDic[this.id][0]);
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

        let inputList = personalSettingModule.querySelectorAll(
          ".driver-input-child"
        );
        let inputList2 = bigBoxModule.querySelectorAll(".driver-input-child");
        if (personDic[this.id][0] == "custom") {
          for (let item of inputList) {
            if (item.getAttribute("disabled")) {
              item.removeAttribute("disabled");
            }
          }
          for (let item of inputList2) {
            if (item.getAttribute("disabled")) {
              item.removeAttribute("disabled");
            }
          }
        } else {
          for (let item of inputList) {
            item.setAttribute("disabled", "disabled");
          }
          for (let item of inputList2) {
            item.setAttribute("disabled", "disabled");
          }
        }

        updateWebpage(personDic[this.id][0]);
        previousSelectedDriverName = selectedDriverName;
      });
  }

  var dividing = false;
  function nextStep() {
    if (!dividing) {
      if (curTree.type == "activity") {
        drawTree(curTree);
        curTree = curTree.middle;
      } else if (curTree.type == "judge") {
        moveDirection = getDirection(curTree.val);
        dividing = true;
        drawTree(curTree);
      }
    } else {
      dividing = false;
      if (moveDirection == "left") {
        curTree = curTree.left;
        drawTree(curTree);
      } else if (moveDirection == "middle") {
        curTree = curTree.middle;
        drawTree(curTree);
      } else if (moveDirection == "right") {
        curTree = curTree.right;
        drawTree(curTree);
      }

      if (curTree.type == "judge") {
        moveDirection = getDirection(curTree.val);
        dividing = true;
        console.log(moveDirection);
      } else {
        curTree = curTree.middle;
      }
    }
  }
  var videoDiv = bigBoxModule.querySelector("#displayVideo");
  var cockpitDiv = bigBoxModule.querySelector("#displayCockpit");

  var did = setInterval(catchDoorSignal, 500);
  async function catchDoorSignal() {
    console.log("catch door signal")
    var doorSignal = await vehicle["Cabin.Door.Row1.Left.IsOpen"].get();
    if (doorSignal == true) {
      console.log("door true")
      playVideo(
        "doorOpen",
        "https://digitalauto-media-data.netlify.app/DoorOpen720x360.mp4"
      );
  
      clearInterval(did);
    }
  }

  var sid = setInterval(catchSeatSignal, 500);

  async function catchSeatSignal() {
    console.log("catch seat signal")
    var seatSignal = await vehicle["Cabin.Seat.Row1.Pos1.Height"].get();
    if (seatSignal == "100" || seatSignal == 100) {
      console.log("seat true")
      playVideo(
        "seatAdjust",
        "https://digitalauto-media-data.netlify.app/SeatGoUp720x360.mp4"
      );
  
      clearInterval(sid);
    }
  }

  function displayVideo(){

    cockpitDiv.style.display = "none";
    videoDiv.style.display = "block";
  }

  function displayCockpit(){

    cockpitDiv.style.display = "block";
    videoDiv.style.display = "none";
  }
  function playVideo(target, url) {
    console.log("play")

    let videoList = bigBoxModule.querySelectorAll(".bigBoxVideo");
    for(let videoItem of videoList){
      videoItem.style.display = "none";
    }
    let targetVideo = bigBoxModule.querySelector("#"+target);
    targetVideo.style.display = "block";
    targetVideo.play();
    // videoDiv.innerHTML =
    //   `
    //     <video id='` +
    //   target +
    //   `'
    //     playsinline autoplay muted
    //     src='` +
    //   url +
    //   `'
    //     style="display:block;height: 100%; width: 100%; object-fit: contain;"
    //     ></video>
    //   `;
    displayVideo();
  }
  

  // clearInterval(catchSignal)

  function updateWebpage(pickedDriverName) {
    if (
      pickedDriverName == "Default_Driver" ||
      pickedDriverName == "Kyrie_Irving"
    ) {
      updateWebpageContent(allDriverDictionary[pickedDriverName]);
    } else {
      updateWebpageContent(customizedDictionary);
    }
  }
  function updateWebpageContent(dictionary) {
    console.log("update webpage");
    console.log(dictionary["seatPosition"].val);
    changeTemperatureUnit(dictionary["USMetricUnit"].val);
    personalSettingModule.querySelector(
      "#" + dictionary["language"].val
    ).selected = true;

    personalSettingModule.querySelector(
      "#" + dictionary["UIInterface"].val
    ).selected = true;

    personalSettingModule.querySelector(
      "#" + dictionary["USMetricUnit"].val
    ).selected = true;

    personalSettingModule.querySelector(
      "#optionParking" + dictionary["parkingBeepLevel"].val
    ).selected = true;

    personalSettingModule.querySelector(
      "#optionADAS" + dictionary["ADASBeepLevel"].val
    ).selected = true;

    personalSettingModule.querySelector(
      "#option" + dictionary["musicURI"].val
    ).selected = true;

    personalSettingModule.querySelector("#InteriorLightColor").value =
      "#" + dictionary["InteriorLight"].val;

    personalSettingModule.querySelector("#SeatPositionCheck").checked =
      dictionary["seatPosition"].onOff;

    personalSettingModule.querySelector("#ACTemperatureCheck").checked =
      dictionary["ACTemperatureIfCold"].onOff;

    personalSettingModule.querySelector("#ACAirFlowLevelCheck").checked =
      dictionary["ACAirFlowLevel"].onOff;

    personalSettingModule.querySelector("#SteeringWheelWarmCheck").checked =
      dictionary["SteeringWheelWarm"].onOff;

    personalSettingModule.querySelector("#SeatHeatLevelCheck").checked =
      dictionary["SeatHeatLevel"].onOff;

    personalSettingModule.querySelector("#SeatVentilationCheck").checked =
      dictionary["SeatVentilation"].onOff;

    personalSettingModule.querySelector("#AutoHoldCheck").checked =
      dictionary["AutoHold"].onOff;

    personalSettingModule.querySelector("#MirrorStatusCheck").checked =
      dictionary["mirrorLeftTilt"].onOff;

    personalSettingModule.querySelector("#DriveModeCheck").checked =
      dictionary["driveMode"].onOff;

    bigBoxModule.querySelector("#seatPositionRangeDisplay").innerHTML =
      dictionary["seatPosition"].val;
    bigBoxModule.querySelector("#SeatPositionRange").value =
      dictionary["seatPosition"].val;

    bigBoxModule.querySelector("#ACTemperatureIfColdRangeDisplay").innerHTML =
      dictionary["ACTemperatureIfCold"].val;
    bigBoxModule.querySelector("#ACTemperatureIfColdRange").value =
      dictionary["ACTemperatureIfCold"].val;

    bigBoxModule.querySelector("#ACTemperatureIfHotRangeDisplay").innerHTML =
      dictionary["ACTemperatureIfHot"].val;
    bigBoxModule.querySelector("#ACTemperatureIfHotRange").value =
      dictionary["ACTemperatureIfHot"].val;

    bigBoxModule.querySelector("#ACAirFlowLevelRangeDisplay").innerHTML =
      dictionary["ACAirFlowLevel"].val;
    bigBoxModule.querySelector("#ACAirFlowLevelRange").value =
      dictionary["ACAirFlowLevel"].val;

    bigBoxModule.querySelector("#SteeringWheelWarmRangeDisplay").innerHTML =
      dictionary["SteeringWheelWarm"].val;
    bigBoxModule.querySelector("#SteeringWheelWarmRange").value =
      dictionary["SteeringWheelWarm"].val;

    bigBoxModule.querySelector("#SeatHeatLevelRangeDisplay").innerHTML =
      dictionary["SeatHeatLevel"].val;
    bigBoxModule.querySelector("#SeatHeatLevelRange").value =
      dictionary["SeatHeatLevel"].val;

    bigBoxModule.querySelector("#SeatVentilationRangeDisplay").innerHTML =
      dictionary["SeatVentilation"].val;
    bigBoxModule.querySelector("#SeatVentilationRange").value =
      dictionary["SeatVentilation"].val;

    // autohold

    bigBoxModule.querySelector("#mirrorLeftTiltRangeDisplay").innerHTML =
      dictionary["mirrorLeftTilt"].val;
    bigBoxModule.querySelector("#mirrorLeftTiltRange").value =
      dictionary["mirrorLeftTilt"].val;

    bigBoxModule.querySelector("#mirrorLeftPanRangeDisplay").innerHTML =
      dictionary["mirrorLeftPan"].val;
    bigBoxModule.querySelector("#mirrorLeftPanRange").value =
      dictionary["mirrorLeftPan"].val;

    bigBoxModule.querySelector("#mirrorRightTiltRangeDisplay").innerHTML =
      dictionary["mirrorRightTilt"].val;
    bigBoxModule.querySelector("#mirrorRightTiltRange").value =
      dictionary["mirrorRightTilt"].val;

    bigBoxModule.querySelector("#mirrorRightPanRangeDisplay").innerHTML =
      dictionary["mirrorRightPan"].val;
    bigBoxModule.querySelector("#mirrorRightPanRange").value =
      dictionary["mirrorRightPan"].val;

    // drive mode
  }

  function switchSystemDictionary(pickedDriverName) {
    if (previousSelectedDriverName == "custom") {
      console.log(originalCustomDictionary);
      customizedDictionary = systemDictionary;
      Object.entries(customizedDictionary).forEach(([key, value]) => {
        if (value.onOff == false) {
          customizedDictionary[key].val = originalCustomDictionary[key].val;
        }
      });
      console.log(originalCustomDictionary);
    }

    if (
      pickedDriverName == "Kyrie_Irving" ||
      pickedDriverName == "Default_Driver"
    ) {
      systemDictionary = allDriverDictionary[pickedDriverName];
    } else {
      systemDictionary = customizedDictionary;
    }
  }

  function pasteToNewDictionary(oldDictionary) {
    let newDictionary = {};
    let tempValue = {};
    Object.entries(oldDictionary).forEach(([key, value]) => {
      tempValue = {
        val: value.val,
        onOff: value.onOff,
      };
      newDictionary[key] = tempValue;
      tempValue = {};
    });

    return newDictionary;
  }

  function changeTemperatureUnit(targetUnit) {
    if (targetUnit == "US") {
      bigBoxModule.querySelector("#temperatureRangeLabel").innerHTML =
        "-58°F ~ +122°F";
      bigBoxModule.querySelector("#temperatureRangeDisplay").innerHTML =
        toFahrenheit(OutsideTemperature);
      for (let item of bigBoxModule.querySelectorAll(".temperatureValue")) {
        let name = item.id.replace("RangeDisplay", "");
        item.innerHTML = toFahrenheit(systemDictionary[name].val);
      }
      for (let item of bigBoxModule.querySelectorAll(".temperatureUnit")) {
        item.innerHTML = "°F";
      }
    } else if (targetUnit == "Metric") {
      bigBoxModule.querySelector("#temperatureRangeLabel").innerHTML =
        "-50°C ~ +50°C";
      bigBoxModule.querySelector("#temperatureRangeDisplay").innerHTML =
        OutsideTemperature;
      for (let item of bigBoxModule.querySelectorAll(".temperatureValue")) {
        let name = item.id.replace("RangeDisplay", "");
        item.innerHTML = systemDictionary[name].val;
      }
      for (let item of bigBoxModule.querySelectorAll(".temperatureUnit")) {
        item.innerHTML = "°C";
      }
    }
  }

  function toFahrenheit(value) {
    return Math.floor((parseInt(value) * 1.8 + 32) * 100) / 100;
  }

  // function toCelsius(value){
  //   return (parseInt(value) - 32)/1.8;
  // }

  simulator("Vehicle.Cabin.Seat.Row1.Pos1.Position", "get", async () => {
    return systemDictionary.seatPosition.val;
  });
  simulator("Vehicle.Cabin.Lights.Spotlight.Row1.IsLeftOn", "get", async () => {
    return interiorLight;
  });
  simulator("Vehicle.Cabin.Infotainment.Media.Played.URI", "get", async () => {
    return systemDictionary.musicURI.val;
  });
  simulator("Vehicle.Body.Mirrors.Left.Tilt", "get", async () => {
    return systemDictionary.mirrorLeftTilt.val;
  });
  simulator("Vehicle.Body.Mirrors.Left.Pan", "get", async () => {
    return systemDictionary.mirrorLeftPan.val;
  });
  simulator("Vehicle.Body.Mirrors.Right.Tilt", "get", async () => {
    return systemDictionary.mirrorRightTilt.val;
  });
  simulator("Vehicle.Body.Mirrors.Right.Pan", "get", async () => {
    return systemDictionary.mirrorRightPan.val;
  });

  widgets.register("BigBox", (box) => {
    box.injectNode(bigBoxModule);
  });

  return {
    nextStepPY: function () {
      nextStep();
      return "return";
    },
    isPersonalPY: function () {
      return isPersonal;
    },
    selectDriver: function () {
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

      if (isPersonal == false) {
        setTimeout(function () {
          nextStep();
        }, 10000);
      }
      return [true, isPersonal];
    },
    setWelcome: function () {
      if (systemDictionary.welcomeWord.val != null) {
        bigBoxModule.querySelector("#welcomeWord").innerHTML =
          systemDictionary.welcomeWord.val;
      }
    },
    setPersonalizedWelcomeWord: function () {
      if (systemDictionary.welcomeWord.val != null) {
        bigBoxModule.querySelector("#welcomeWord").innerHTML =
          systemDictionary.welcomeWord.val;
      }
    },
    setPersonalizedUIInterface: function () {
      if (systemDictionary.UIInterface.val != null) {
        bigBoxModule.querySelector("#UI").style.background =
          systemDictionary.UIInterface.val;
      }
    },
    setPreferLanguage: function () {
      if (systemDictionary.language.val != null) {
        bigBoxModule.querySelector("#language").innerHTML =
          systemDictionary.language.val;
      }
    },
    setUSMetricUnits: function () {
      if (systemDictionary.USMetricUnit.val != null) {
        bigBoxModule.querySelector("#units").innerHTML =
          systemDictionary.USMetricUnit.val;
      }
    },
    setInteriorLight: function () {
      return interiorLight;
    },
    setParkingWarningBeepLevel: function () {},
    turnOnPreferredMusic: function () {
      if (systemDictionary.musicURI.val != null) {
        bigBoxModule.querySelector("#music").innerHTML =
          systemDictionary.musicURI.val;
      }
      return systemDictionary.musicURI.val;
    },
    setSeatPosition: function () {
      return systemDictionary.seatPosition.val;
    },
    setAutoHold: function () {
      if (AutoHoldIsOn) {
        bigBoxModule.querySelector("#autoHoldImage").style.display = "block";
      }
    },
    setMirrorStatus: function () {},
    setSteeringMode: function () {
      if (SteeringMode) {
        bigBoxModule.querySelector("#steeringImage").style.display = "block";
      }
    },
    setBrakingMode: function () {
      if (BrakingMode) {
        bigBoxModule.querySelector("#brakingImage").style.display = "block";
      }
    },
    setPowerMode: function () {
      if (PowerMode) {
        bigBoxModule.querySelector("#powerImage").style.display = "block";
      }
    },
    setDriveMode: function () {
      if (systemDictionary.driveMode.val) {
        bigBoxModule.querySelector("#powerImage").style.display = "block";
      }
    },
    getOutsideTemperature: function () {
      return OutsideTemperature;
    },
    turnOnSetAC: function (ACMode) {
      if (ACMode == "warm AC") {
        bigBoxModule.querySelector("#warmACImage").style.display = "block";
      } else if ((ACMode = "cool AC")) {
        bigBoxModule.querySelector("#coolACImage").style.display = "block";
      }
      console.log(ACMode);
    },
    turnOnSeatHeat: function () {
      if (systemDictionary.SeatHeatLevel.val > 0) {
        bigBoxModule.querySelector("#SeatHeatImage").style.display = "block";
      }
    },
    turnSteeringWheelWarm: function () {
      if (systemDictionary.SteeringWheelWarm.val > 0) {
        bigBoxModule.querySelector("#SteeringWheelWarmImage").style.display =
          "block";
      }
    },
    turnOnSeatVentilation: function () {
      if (systemDictionary.SeatVentilation.val > 0) {
        bigBoxModule.querySelector("#SeatVentilationImage").style.display =
          "block";
      }
    },
    setACAirFlow: function () {},
    setADASWarningBeepLevel: function () {},
    displayCockpitPY: function(){
      displayCockpit();
    },
    displayVideoPY: function(){

    },
    refresh: function () {
      selectedDriverName = "";
      curTree = flowChartTree;
      drawFlag = true;
      dividing = false;
      previousVal = null;
      previousType = null;
      moveDirection = null;
      isPersonal = false;
    },
  };
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

function analysisTxt(txt) {
  console.log("analysis");

  let dictionaryInfo = {};
  let dictionaryDriver = {};
  let identInfo = null;
  let identName = null;
  let key;
  let value;

  for (var i = 0; i < txt.length; i++) {
    identInfo = txt[i].split("#");
    identName = identInfo.shift().split(":")[1];
    var innerTuple = {};
    for (var j = 0; j < identInfo.length; j++) {
      key = identInfo[j].split(":")[0];
      value = identInfo[j].split(":")[1];
      innerTuple = {
        val: value,
        onOff: false,
      };
      dictionaryInfo[key] = innerTuple;
    }
    dictionaryDriver[identName] = dictionaryInfo;
    dictionaryInfo = {};
    innerTuple = {};
  }

  console.log(dictionaryDriver);
  return dictionaryDriver;
}

export default plugin;
