const plugin=({widgets, simulator, vehicle}) =>{

    var txt = readTextFile("http://127.0.0.1:5500/ident.txt");


    // widget for setting1
    const personalSettingModule =document.createElement("div")
    personalSettingModule.setAttribute("style", `height: 100%; width: calc(100% - 10px);margin-left:10px;`)
    personalSettingModule.innerHTML=(`
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
        <div style="background-color:#F1F1F1;border:8px solid black;border-radius:35px;height:100%;">
        <div id="top-phone-box"style="height：15%">
            <h1 class="setting-h1" style="margin-left:20px;margin-top:5px;">
                Settings:
            </h1>
            <div class="alert alert-light setting-table" role="alert" style="margin-left:10px;margin-right:10px;">
                <!-- On/Off Button -->
                <span class="float-start" >
                    Use personal setting or not:
                </span>
                
                <div class="clearfix">
                    <input class="form-check-input float-end" type="checkbox" id="on-off-button" checked>
                </div>
                
            </div>

        </div>
        

        <div class="phone-container" style="height:calc(85% - 25px);overflow-y:auto;margin-top:5px;margin-bottom:15px;">
            


            <h3 class="setting-h3" style="margin-left:20px;">Screen</h3>
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
                                <span class="float-start" style="margin-left:8px">
                                Language
                                </span>
                                <div class="form-switch clearfix">
                                    <input class="form-check-input float-end setting-checkbox-child" type="checkbox" role="switch" id="LanguageCheck">
                                </div>
                        </td>
                    </tr>
                    <tr>
             
                        <td>

                                <span class="float-start" style="margin-left:8px">
                                UI Interface
                                    </span>
                                    <div class="form-switch clearfix">
                                        <input class="form-check-input float-end setting-checkbox-child" type="checkbox" role="switch" id="UIInterfaceCheck">
                                    </div>
                        </td>
                    </tr>
                    <tr>
             
                        <td>

                                <span class="float-start" style="margin-left:8px">
                                    US/Metric Units
                                    </span>
                                    <div class="form-switch clearfix">
                                        <input class="form-check-input float-end setting-checkbox-child" type="checkbox" role="switch" id="USMetricUnitsCheck">
                                    </div>
                        </td>
                    </tr>

                </tbody>
            </table>
            </div>



            <h3 class="setting-h3"  style="margin-left:20px;">Environment</h3>
            <div style="background-color:white;border-radius:10px;margin-left:10px;margin-right:10px;margin-top:5px">
            <table class = "table setting-table">
                <tbody>
                    <tr>
      
                        <td>
                                <span class="float-start" style="margin-left:8px">
                                    Interior Light
                                </span>
                                <div class="form-switch clearfix">
                                    <input class="form-check-input float-end setting-checkbox-child" type="checkbox" role="switch" id="InteriorLightCheck">
                                </div>
                        </td>
                    </tr>
                    <tr>
              
                        <td>
                                <span class="float-start" style="margin-left:8px">
                                    Parking Warning Beep Level
                                </span>
                                <div class="form-switch clearfix">
                                    <input class="form-check-input float-end setting-checkbox-child" type="checkbox" role="switch" id="ParkingWarningBeepLevelCheck">
                                </div>
                        </td>
                    </tr>
                    <tr>
             
                        <td>

                                <span class="float-start" style="margin-left:8px">
                                Preferred Music
                                    </span>
                                    <div class="form-switch clearfix">
                                        <input class="form-check-input float-end setting-checkbox-child" type="checkbox" role="switch" id="PreferredMusicCheck">
                                    </div>
                        </td>
                    </tr>
                    <tr>
             
                    <td>

                            <span class="float-start" style="margin-left:8px">
                            ADAS Warning beep level
                                </span>
                                <div class="form-switch clearfix">
                                    <input class="form-check-input float-end setting-checkbox-child" type="checkbox" role="switch" id="ADASWarningBeepLevelCheck">
                                </div>
                    </td>
                </tr>
                </tbody>
            </table>
            </div>




            <h3 class="setting-h3" style="margin-left:20px;">Comfort</h3>
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
        `)

 

    // Accessing the on/off button
    var onOffButton = personalSettingModule.querySelector('#on-off-button');

    var welcomeWordCheck = personalSettingModule.querySelector('#welcomeWordCheck');
    var LanguageCheck = personalSettingModule.querySelector('#LanguageCheck');
    var UIInterfaceCheck = personalSettingModule.querySelector('#UIInterfaceCheck');
    var USMetricUnitsCheck = personalSettingModule.querySelector('#USMetricUnitsCheck');
    var InteriorLightCheck = personalSettingModule.querySelector('#InteriorLightCheck');
    var ParkingWarningBeepLevelCheck = personalSettingModule.querySelector('#ParkingWarningBeepLevelCheck');
    var PreferredMusicCheck= personalSettingModule.querySelector('#PreferredMusicCheck');
    var SeatPositionCheck = personalSettingModule.querySelector('#SeatPositionCheck');
    var AutoHoldCheck = personalSettingModule.querySelector('#AutoHoldCheck');
    var MirrorStatusCheck = personalSettingModule.querySelector('#MirrorStatusCheck');
    var SteeringModeCheck = personalSettingModule.querySelector('#SteeringModeCheck');
    var BrakingModeCheck = personalSettingModule.querySelector('#BrakingModeCheck');
    var PowerModeCheck = personalSettingModule.querySelector('#PowerModeCheck');
    var ACTemperatureCheck = personalSettingModule.querySelector('#ACTemperatureCheck');
    var ACAirFlowLevelCheck = personalSettingModule.querySelector('#ACAirFlowLevelCheck');
    var SteeringWheelWarmCheck = personalSettingModule.querySelector('#SteeringWheelWarmCheck');
    var SeatHeatLevelCheck = personalSettingModule.querySelector('#SeatHeatLevelCheck');
    var SeatVentilationCheck = personalSettingModule.querySelector('#SeatVentilationCheck');
    var ADASWarningBeepLevelCheck = personalSettingModule.querySelector('#ADASWarningBeepLevelCheck');



    // Event listener for the on/off button click
    onOffButton.addEventListener('click', function(event) {
        var isOn = event.target.checked;
        console.log('On/Off:', isOn);
        let childrenList = personalSettingModule.querySelectorAll(".setting-checkbox-child")
        if(isOn == true){
            for(let item of childrenList){
                if(item.getAttribute('disabled')){
                    item.removeAttribute('disabled')
                }
                
            }
        }else{
            for(let item of childrenList){
                item.setAttribute('disabled','disabled');
            }
        }   
    });

    welcomeWordCheck.addEventListener('click', function(event) {
        var isOn = event.target.checked;
        console.log('On/Off:', isOn);
    });

    LanguageCheck.addEventListener('click', function(event) {
        var isOn = event.target.checked;
        console.log('On/Off:', isOn);
    });
    UIInterfaceCheck.addEventListener('click', function(event) {
        var isOn = event.target.checked;
        console.log('On/Off:', isOn);
    });
    USMetricUnitsCheck.addEventListener('click', function(event) {
        var isOn = event.target.checked;
        console.log('On/Off:', isOn);
    });
    InteriorLightCheck.addEventListener('click', function(event) {
        var isOn = event.target.checked;
        console.log('On/Off:', isOn);
    });
    ParkingWarningBeepLevelCheck.addEventListener('click', function(event) {
        var isOn = event.target.checked;
        console.log('On/Off:', isOn);
    });
    PreferredMusicCheck.addEventListener('click', function(event) {
        var isOn = event.target.checked;
        console.log('On/Off:', isOn);
    });
    SeatPositionCheck.addEventListener('click', function(event) {
        var isOn = event.target.checked;
        console.log('On/Off:', isOn);
    });
    AutoHoldCheck.addEventListener('click', function(event) {
        var isOn = event.target.checked;
        console.log('On/Off:', isOn);
    });
    MirrorStatusCheck.addEventListener('click', function(event) {
        var isOn = event.target.checked;
        console.log('On/Off:', isOn);
    });
    SteeringModeCheck.addEventListener('click', function(event) {
        var isOn = event.target.checked;
        console.log('On/Off:', isOn);
    });
    BrakingModeCheck.addEventListener('click', function(event) {
        var isOn = event.target.checked;
        console.log('On/Off:', isOn);
    });
    PowerModeCheck.addEventListener('click', function(event) {
        var isOn = event.target.checked;
        console.log('On/Off:', isOn);
    });
    ACAirFlowLevelCheck.addEventListener('click', function(event) {
        var isOn = event.target.checked;
        console.log('On/Off:', isOn);
    });
    ACTemperatureCheck.addEventListener('click', function(event) {
        var isOn = event.target.checked;
        console.log('On/Off:', isOn);
    });
    SteeringWheelWarmCheck.addEventListener('click', function(event) {
        var isOn = event.target.checked;
        console.log('On/Off:', isOn);
    });
    SeatHeatLevelCheck.addEventListener('click', function(event) {
        var isOn = event.target.checked;
        console.log('On/Off:', isOn);
    });

    SeatVentilationCheck.addEventListener('click', function(event) {
        var isOn = event.target.checked;
        console.log('On/Off:', isOn);
    });

    ADASWarningBeepLevelCheck.addEventListener('click', function(event) {
        var isOn = event.target.checked;
        console.log('On/Off:', isOn);
    });


    widgets.register("Setting1",
        (box) =>{
        box.injectNode(personalSettingModule)
    })


    // widget for externalSetting
    const externalSettingModule =document.createElement("div")
    externalSettingModule.setAttribute("style", `height: 100%; width: 100%;`)
    externalSettingModule.innerHTML=(`
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
        </head>

        <body>
            <div class="card" style="margin-left:10px;margin-right:10px;margin-top:5px;">
                <h5 class="card-title">External Setting</h5>
                <span class="placeholder col-12 bg-info placeholder-xs"></span>

                <label for="rainRange" class="form-label">Rain Intensity (0% ~ 100%)：</label>
                <span id="rainRangeDisplay">
                    50
                </span>%
                </br>
                <input type="range" class="form-range w-50" min="0" max="100" id="rainRange">

                <label for="temperatureRange" class="form-label">Outside Temperature (-50°C ~ +50°C)：</label>
                <span id="temperatureRangeDisplay">
                    0
                </span>°C
                </br>
                <input type="range" class="form-range w-50" min="-50" max="50" id="temperatureRange">
            </div>
        
            <script src=https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.7/dist/umd/popper.min.js" integrity="sha384-zYPOMqeu1DAVkHiLqWBUTcbYfZ8osu1Nd6Z89ify25QV9guujx43ITvfi12/QExE" crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script>
        </body>   
    `)

    var RainIntensityRange = externalSettingModule.querySelector('#rainRange');
    RainIntensityRange.addEventListener('click',function(event){
        var rainIntensity = event.target.value;
        console.log('rainIntensity:',rainIntensity);
        externalSettingModule.querySelector('#rainRangeDisplay').innerHTML = rainIntensity

    })

    var temperatureRange = externalSettingModule.querySelector('#temperatureRange');
    temperatureRange.addEventListener('click',function(event){
        var OutsideTemperature = event.target.value;
        console.log('OutsideTemperature:',OutsideTemperature);
        externalSettingModule.querySelector('#temperatureRangeDisplay').innerHTML = OutsideTemperature

    })

    widgets.register("Setting2",
        (box) =>{
        box.injectNode(externalSettingModule)
    })




    // widget for car display1
    const displayModule1 =document.createElement("div")
    displayModule1.setAttribute("style", `height: 100%; width: 100%;`)
    displayModule1.innerHTML=(`
        <div id="switch1" style="height:100px;padding: 20px; text-align:center;background-color:red">
            <div style="font-size: 18px;">
                Webpage1
            </div>
            <form id="switch-form">
                <button class="btn btn-outline-primary w-30" type="submit">Switch</button>
            </form>
        </div>
        <div id="switch2" style="height:100px;padding: 20px; text-align:center;background-color:blue;display:none">
            <div style="font-size: 18px;">
                HeadLight: <span id="headlight">OFF</span>
            </div>
            <div style="margin-top: 10px;font-size: 16px;">
                <button id="btn_head_light_on" style="padding: 8px; margin-left: 8px;background-color:blue;color:white;">ON</button>
                <button id="btn_head_light_off" style="padding: 8px; margin-left: 8px;background-color:red;color:white;">OFF</button>
            </div>
        </div>
    `)
    var switchForm = displayModule1.querySelector('#switch-form');
    switchForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevents the form from submitting
        var switch1 = displayModule1.querySelector('#switch1');
        var switch2 = displayModule1.querySelector('#switch2');
        switch1.style.display = "none";
        switch2.style.display = "block";

    });
    widgets.register("Display1",
        (box) =>{
        box.injectNode(displayModule1)
    })



    // widget for car display2
    const displayModule2 =document.createElement("div")
    displayModule2.setAttribute("style", `height: 100%; width: 100%;`)
    displayModule2.innerHTML=(`
        <div style="height:100px;padding: 20px; text-align:center;">
            <div style="font-size: 18px;">
                HeadLight: <span id="headlight">OFF</span>
            </div>
            <div style="margin-top: 10px;font-size: 16px;">
                <button id="btn_head_light_on" style="padding: 8px; margin-left: 8px;background-color:blue;color:white;">ON</button>
                <button id="btn_head_light_off" style="padding: 8px; margin-left: 8px;background-color:red;color:white;">OFF</button>
            </div>
        </div>
    `)
    widgets.register("Display2",
        (box) =>{
        box.injectNode(displayModule2)
    })


    const personModule =document.createElement("div")
    personModule.setAttribute("style", `height: 100%; width: 100%;`)
    personModule.innerHTML=(`
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">

            <style>
                .driver-name{
                    font-size:4.5vw;
                }
                .driver-description{
                    font-size:4.5vw;
                }
                .driver-card-h5{
                    font-size:6vw;
                }
                .list-group-item:hover{
                    cursor:pointer;
                }
            </style>



            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
        </head>

        <body>
            <div class="card" style="margin-left:10px;margin-right:10px;margin:top:10px;">
                <h5 class="card-header driver-card-h5">Pick a driver</h5>
                <div class="card-body">
                    <div id="multipleUsersDiv"></div>
                </div>
            </div>
            <script src=https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.7/dist/umd/popper.min.js" integrity="sha384-zYPOMqeu1DAVkHiLqWBUTcbYfZ8osu1Nd6Z89ify25QV9guujx43ITvfi12/QExE" crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script>
        </body>   
    `)

    var personDic = {"Person1":["Yilong Dai","xxxxxxxxx"],"Person2":["Kyrie Irving","Asdadasdadadasd"],"Person3":["Ziyi Wang","abaaba"]};


    var html = '';
    html+=`<div class="row">
                <div class="col-5">
                    <div class="list-group driver-name" id="list-tab" role="tablist">`
    for(var key in personDic){
        html+='<a class="list-group-item list-group-item-action " id="'+key+'" data-bs-toggle="list" role="tab" aria-controls="'+personDic[key][1]+'Content">'+personDic[key][0]+'</a>'
    }
    html+=`
        </div>
                </div>
            <div class="col-7">
                <div class="tab-content driver-description" id="nav-tabContent">
    `
    for(var key in personDic){
        html+='<div class="tab-pane fade " id="'+key+'Content" role="tabpanel" aria-labelledby="'+key+'">'+personDic[key][1]+'</div>'
    }
    html+=`
    </div>
            </div>
          </div>
    `
    personModule.querySelector('#multipleUsersDiv').innerHTML = html;

    var previousTab = null;
    var previousContent = null;
    for(var key in personDic){

        personModule.querySelector('#'+key).addEventListener('click',function(event){
            console.log(this.id)
            
            if(previousTab != null){
                previousTab.setAttribute("class","list-group-item list-group-item-action");
                previousContent.setAttribute("class","tab-pane fade");
            }
            previousTab = personModule.querySelector('#'+this.id);
            previousContent = personModule.querySelector('#'+this.id+"Content");
            previousTab.setAttribute("class","list-group-item list-group-item-action active");
            previousContent.setAttribute("class","tab-pane fade show active");
        })
        console.log(key)

    }

    

    widgets.register("Person",
        (box) =>{
        box.injectNode(personModule)
    })





    const subscribeHighBeamLight=document.createElement("div")
    subscribeHighBeamLight.setAttribute("style", `height: 100%; width: 100%;color:red`)
    subscribeHighBeamLight.innerHTML=(`
        <div style="height:100px;padding: 20px; text-align:center;">
        <div style="font-size: 18px;">HeadLight: <span id="headlight">OFF</span></div>
        <div style="margin-top: 10px;font-size: 16px;">
        <button id="btn_head_light_on" style="padding: 8px; margin-left: 8px;background-color:blue;color:white;">ON</button>
        <button id="btn_head_light_off" style="padding: 8px; margin-left: 8px;background-color:red;color:white;">OFF</button>
        </div>
        </div>
    `)
    widgets.register("Headlight",
        (box) =>{
        box.injectNode(subscribeHighBeamLight)
    })
     
    
    const lightState= subscribeHighBeamLight.querySelector("#headlight")
    let btnLightOn=subscribeHighBeamLight.querySelector("#btn_head_light_on")
    let btnLightOff=subscribeHighBeamLight.querySelector("#btn_head_light_off")
    const listeners = [];
     
    if(btnLightOn) {
        btnLightOn.addEventListener("click", () =>{
            for(const listener of listeners){
                //'Body.Lights.IsHighBeamOn'
                listener("True")
            }
        })
    }
     
    if(btnLightOff) {
        btnLightOff.addEventListener("click", () =>{
            for(const listener of listeners){
                //'Body.Lights.IsHighBeamOn'
                listener("False")
            }
        })
    }
     
    setInterval(async() =>{
        let value =await vehicle['Body.Lights.IsHighBeamOn'].get()
        lightState.innerHTML=value?'ON':'OFF'
    }, 1000)
     
    




    const flowChartModule=document.createElement("div")
    flowChartModule.innerHTML=(`
    <head>
    <title>Tree Diagram</title>
    <style>
      .topNode{
          height:13%;
          width:23%;
          position:absolute;
          left: 40%;
          top:10%;
          background-color:aquamarine;
          text-align:center;
          border-radius: 5px;
          border: 1px solid gray;
          font-size:80% ;
      }
      .middleNode {
        height:13%;
        width:23%;
          position:absolute;
          left: 40%;
          top:40%;
          background-color:aquamarine;
          text-align:center;
          border-radius: 5px;
          border: 1px solid gray;
          font-size:80% ;
      }
      .bottomNode {
        height:13%;
        width:23%;
          position:absolute;
          left: 40%;
          top:75%;
          background-color:aquamarine;
          text-align:center;
          border-radius: 5px;
          border: 1px solid gray;
          font-size:80% ;
      }
      .bottomLeftNode {
        height:13%;
        width:23%;
          position:absolute;
          left: 10%;
          top:75%;
          background-color:aquamarine;
          text-align:center;
          border-radius: 5px;
          border: 1px solid gray;
          font-size:80% ;
      }
      .bottomRightNode {
        height:13%;
        width:23%;
          position:absolute;
          left: 70%;
          top:75%;
          background-color:aquamarine;
          text-align:center;
          border-radius: 5px;
          border: 1px solid gray;
          font-size:80% ;
      }
    </style>
  </head>
  <body>
  
      <div id="flowChart" style="position: block;">
      </div>
      <button id="drawTree" type="submit">test</button>

    </body> 
    `)


    const tt ={
        val:"Vehicle Key Detection",
        left:null,
        right:null,
        middle:{
            val:"Driver Identification",
            left:null,
            right:null,
            middle:{
                val:"Check Memory Data",
                left:null,
                right:null,
                middle:{
                    val:"Judge",
                    left:{
                        val:"Pull Driver 1",
                        left:null,
                        right:null,
                        middle:{}
                    },
                    right:{
                        val:"Pull Driver 2",
                        left:null,
                        right:null,
                        middle:{}
                    },
                    middle:{
                        val:"Pull Driver 3",
                        left:null,
                        right:null,
                        middle:{}
                    }
                }
            }
        }
    }   

    flowChartModule.querySelector('#drawTree').addEventListener('click',function(){
        drawTree(tt);
    })

    var previousVal = null;
    function drawTree(tree) {
        var space = flowChartModule.querySelector('#flowChart');
        var html = "";
        var option = 0;
        if(tree.left==null){
            if(tree.right==null){
                option = 4;
            }else{
                option = 2;
            }
        }else{
            if(tree.right==null){
                option = 3;
            }else{
                option = 1;
            }
        }
        html += `
        <div style="height: 200px;width:200px;background-image:url(./`+ option +`.png);background-size: 100%;background-repeat:no-repeat;border-width:1px;border-color:#000">
        `;
        html += `
        <div class="middleNode">
        `+tree.val +`
        </div>
        `;
        if(previousVal!=null){
            html += `
            <div class="topNode">
            `+previousVal +`
            </div>
            `;
        }else{

        }
        if(tree.left!=null){
            html += `
            <div class="bottomLeftNode">
            `+tree.left.val +`
            </div>
            `;
        }
        if(tree.right!=null){
            html += `
            <div class="bottomRightNode">
            `+tree.right.val +`
            </div>
            `;
        }
        if(tree.middle!=null){
            html += `
            <div class="bottomNode">
            `+tree.middle.val +`
            </div>
            `;
        }
        html += `          </div>`
        space.innerHTML = html;
        previousVal = tree.val;
        setTimeout(function(){
            drawTree(tree.middle)
        },2000)
    }








    widgets.register("FlowChart",
        (box) =>{
        box.injectNode(flowChartModule)
    })























    simulator(
        "Vehicle.Body.Lights.IsHighBeamOn",
        "subscribe",
        async({args}) =>{
            listeners[0] = args[0];
        }
    );







}


function readTextFile(fileName){
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", fileName, false);
    rawFile.onreadystatechange = function(){
        if(rawFile.readyState === 4){
            if(rawFile.status === 200 || rawFile.status == 0){
                var allText = rawFile.responseText;
                // alert(allText);
                console.log(allText.split("\n"));
            }
        }
    }
    rawFile.send(null);
}


export default plugin
