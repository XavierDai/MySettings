const plugin=({widgets, simulator, vehicle}) =>{

    var txt = readTextFile("http://127.0.0.1:5500/ident.txt");


    // widget for setting1
    const settingModule1 =document.createElement("div")
    settingModule1.setAttribute("style", `height: 100%; width: 100%;margin-left:10px`)
    settingModule1.innerHTML=(`
        <head>
            <link rel="stylesheet" href=https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous">
        </head>

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
        <script src=https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
        <script src=https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js integrity="sha384-7ymO4nGrkm372HoSbq1OY2DP4pEZnMiA+E0F3zPr+JQQtQ82gQ1HPY3QIVtztVua" crossorigin="anonymous"></script>

    `)

    // Accessing the temperature form
    var temperatureForm = settingModule1.querySelector('#temperature-form');

    // Accessing the radio form
    var radioForm =  settingModule1.querySelector('#radio-form');

    // Accessing the on/off button
    var onOffButton = settingModule1.querySelector('#on-off-button');

    // Event listener for the temperature form submission
    temperatureForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevents the form from submitting

        // Accessing the temperature input value
        var temperatureInput = settingModule1.querySelector('#temperature-input').value;
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


    widgets.register("Setting1",
        (box) =>{
        box.injectNode(settingModule1)
    })


    // widget for setting2
    const settingModule2 =document.createElement("div")
    settingModule2.setAttribute("style", `height: 100%; width: 100%;`)
    settingModule2.innerHTML=(`
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
    widgets.register("Setting2",
        (box) =>{
        box.injectNode(settingModule2)
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
 

}

export default plugin
