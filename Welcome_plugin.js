const plugin=({widgets, simulator, vehicle}) =>{

    var txt = readTextFile("http://127.0.0.1:5500/ident.txt");


    // widget for setting1
    const personalSettingModule =document.createElement("div")
    personalSettingModule.setAttribute("style", `height: 100%; width: 100%;margin-left:10px`)
    personalSettingModule.innerHTML=(`
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
        </head>

        <body>
            <!-- Temperature Form -->
            <h3>Outside Temperature:</h3>
            <form id="temperature-form">
                <input type="number" class="form-control form-control-rounded mb-2 w-25" id="temperature-input" placeholder="°C" required>
                <button class="btn btn-outline-primary w-30" type="submit">Submit</button>
            </form>

            <!-- Radio Form -->
            <h3>Rain Level:</h3>
            <form id="radio-form">
                <label class="form-check form-check-inline" for="empty-radio">Empty~</label>
                <input type="radio" id="empty-radio" name="radio-option" value="empty" required>

                <label class="form-check form-check-inline" for="medium-radio">Medium</label>
                <input  type="radio" id="medium-radio" name="radio-option" value="medium">

                <label class="form-check form-check-inline" for="strong-radio">Strong</label>
                <input type="radio" id="strong-radio" name="radio-option" value="strong">
            </form>

            <!-- On/Off Button -->
            <h3>Personalize:</h3>
            <label for="on-off-button">Use personal setting or not:</label>
            <input type="checkbox" id="on-off-button">

            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="welcomeWordCheck" >
                <label class="form-check-label" for="welcomeWordCheck">
                    Welcome Word
                </label>
            </div>

            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="LanguageCheck" >
                <label class="form-check-label" for="LanguageCheck">
                Language
                </label>
            </div>
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="UIInterfaceCheck" >
                <label class="form-check-label" for="UIInterfaceCheck">
                UI Interface
                </label>
            </div>
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="USMetricUnitsCheck" >
                <label class="form-check-label" for="USMetricUnitsCheck">
                    US/Metric Units
                </label>
            </div>
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="InteriorLightCheck" >
                <label class="form-check-label" for="InteriorLightCheck">
                    Interior Light
                </label>
            </div>
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="ParkingWarningBeepLevelCheck">
                <label class="form-check-label" for="ParkingWarningBeepLevelCheck">
                    Parking Warning Beep Level
                </label>
            </div>
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="PreferredMusicCheck" >
                <label class="form-check-label" for="PreferredMusicCheck">
                    Preferred Music
                </label>
            </div>
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="SeatPositionCheck">
                <label class="form-check-label" for="SeatPositionCheck">
                    Seat Position
                </label>
            </div>
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="AutoHoldCheck" >
                <label class="form-check-label" for="AutoHoldCheck">
                    AutoHold
                </label>
            </div>
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="MirrorStatusCheck">
                <label class="form-check-label" for="MirrorStatusCheck">
                    Mirror Status
                </label>
            </div>
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="SteeringModeCheck" >
                <label class="form-check-label" for="SteeringModeCheck">
                    Steering Mode
                </label>
            </div>
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="BrakingModeCheck" >
                <label class="form-check-label" for="BrakingModeCheck">
                    BrakingMode
                </label>
            </div>
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="PowerModeCheck">
                <label class="form-check-label" for="PowerModeCheck">
                    Power Mode
                </label>
            </div>
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="ACTemperatureCheck">
                <label class="form-check-label" for="ACTemperatureCheck">
                    AC temperature
                </label>
            </div>
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="ACAirFlowLevelCheck" >
                <label class="form-check-label" for="ACAirFlowLevelCheck">
                    AC Air Flow Level 
                </label>
            </div>
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="SteeringWheelWarmCheck">
                <label class="form-check-label" for="SteeringWheelWarmCheck">
                    Steering Wheel Warm
                </label>
            </div>
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="SeatHeatLevelCheck">
                <label class="form-check-label" for="SeatHeatLevelCheck">
                    Seat Heat Level
                </label>
            </div>
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="SeatVentilationCheck">
                <label class="form-check-label" for="SeatVentilationCheck">
                    Seat Ventilation
                </label>
            </div>
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="ADASWarningBeepLevelCheck">
                <label class="form-check-label" for="ADASWarningBeepLevelCheck">
                    ADAS Warning beep level
                </label>
            </div>




            <script src=https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.7/dist/umd/popper.min.js" integrity="sha384-zYPOMqeu1DAVkHiLqWBUTcbYfZ8osu1Nd6Z89ify25QV9guujx43ITvfi12/QExE" crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script>
        </body>    
        `)

    // Accessing the temperature form
    var temperatureForm = personalSettingModule.querySelector('#temperature-form');

    // Accessing the radio form
    var radioForm =  personalSettingModule.querySelector('#radio-form');

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


    // Event listener for the temperature form submission
    temperatureForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevents the form from submitting

        // Accessing the temperature input value
        var temperatureInput = personalSettingModule.querySelector('#temperature-input').value;
        console.log('Temperature:', temperatureInput);
    });

    // Event listener for the radio form selection
    radioForm.addEventListener('change', function(event) {
        // Accessing the selected radio option value
        var selectedOption = event.target.value;
        console.log('Selected option:', selectedOption);
    });

    // Event listener for the on/off button click
    onOffButton.addEventListener('click', function(event) {
        var isOn = event.target.checked;
        console.log('On/Off:', isOn);
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
            <div>
                <label for="rainRange" class="form-label">Rain Intensity (0% ~ 100%)：</label>
                <span id="rainRangeDisplay">
                    50
                </span>%
                </br>
                <input type="range" class="form-range w-50" min="0" max="100" id="rainRange">
            </div>
            <div>
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
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
        </head>

        <body>
            <div>
            <div id="multipleUsersDiv"></div>
            
            </div>
            <script src=https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.7/dist/umd/popper.min.js" integrity="sha384-zYPOMqeu1DAVkHiLqWBUTcbYfZ8osu1Nd6Z89ify25QV9guujx43ITvfi12/QExE" crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script>
        </body>   
    `)

    var personDic = {"Person1":["Yilong Dai","xxxxxxxxx"],"Person2":["Kyrie Irving","Asdadasdadadasd"],"Person3":["Ziyi Wang","abaaba"]};


    var html = '';
    html+=`<div class="row">
                <div class="col-4">
                    <div class="list-group" id="list-tab" role="tablist">`
    for(var key in personDic){
        html+='<a class="list-group-item list-group-item-action " id="'+key+'" data-bs-toggle="list" role="tab" aria-controls="'+personDic[key][1]+'Content">'+personDic[key][0]+'</a>'
    }
    html+=`
        </div>
                </div>
            <div class="col-8">
                <div class="tab-content" id="nav-tabContent">
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

// widget for car flow chart
    const flowChartModule =document.createElement("div")
    flowChartModule.setAttribute("style", `height: 100%; width: 100%;`)
    flowChartModule.innerHTML=(`
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
    widgets.register("FlowChart",
        (box) =>{
        box.injectNode(flowChartModule)
    })
 

}


function readTextFile(fileName){
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", fileName, false);
    rawFile.onreadystatechange = function(){
        if(rawFile.readyState === 4){
            if(rawFile.status === 200 || rawFile.status == 0){
                var allText = rawFile.responseText;
                alert(allText);
                console.log(allText.split("\n"));
            }
        }
    }
    rawFile.send(null);
}


export default plugin
