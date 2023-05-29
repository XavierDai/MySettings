const plugin=({widgets, simulator, vehicle}) =>{
    const container=document.createElement("div")
    container.setAttribute("style", `height: 100%; width: 100%;color:red`)
    container.innerHTML=(`
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
        box.injectNode(container)
    })
     
    
    const lightState= container.querySelector("#headlight")
    let btnLightOn=container.querySelector("#btn_head_light_on")
    let btnLightOff=container.querySelector("#btn_head_light_off")
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
     
    
    simulator(
        "Vehicle.Body.Lights.IsHighBeamOn",
        "subscribe",
        async({args}) =>{
            listeners[0] = args[0];
        }
    );
    return {}
    }
     
    export default plugin