from sdv_model import Vehicle
import plugins
from browser import aio
Welcome_plugin = plugins.get_plugin("Welcome_plugin")

# Welcome_plugin.refresh()
print = plugins.Terminal.print

vehicle = Vehicle()
plugins.Terminal.reset()

driverPickFlag = False


interval = 0.5

print("hello passenger!")

### select driver

# Vehicle Key Detection
await Welcome_plugin.nextStepPY()
await aio.sleep(interval)

# Driver Identification
await Welcome_plugin.nextStepPY()
await aio.sleep(interval)

# Check Memory Data
await Welcome_plugin.nextStepPY()
await aio.sleep(interval)

# Judge
await Welcome_plugin.nextStepPY()
isPersonal = await Welcome_plugin.isPersonalPY()
#print(isPersonal)
await aio.sleep(interval)

# Pull Driver
Welcome_plugin.nextStepPY()
await aio.sleep(interval)

if(isPersonal == True or isPersonal == "true"):
    ### Welcome
    await Welcome_plugin.nextStepPY()
    await Welcome_plugin.setPersonalizedWelcomeWord()
    await aio.sleep(interval)

    await Welcome_plugin.nextStepPY()
    await Welcome_plugin.setPersonalizedUIInterface()
    await aio.sleep(interval)

    await Welcome_plugin.nextStepPY()
    await Welcome_plugin.setPreferLanguage()
    await aio.sleep(interval)

    await Welcome_plugin.nextStepPY()
    await Welcome_plugin.setUSMetricUnits()
    await aio.sleep(interval)

    ### Serval Settings
    await Welcome_plugin.nextStepPY()
    await Welcome_plugin.setInteriorLight()
    await aio.sleep(interval)

    await Welcome_plugin.nextStepPY()
    await Welcome_plugin.setParkingWarningBeepLevel()
    await aio.sleep(interval)

    await Welcome_plugin.nextStepPY()
    await Welcome_plugin.turnOnPreferredMusic()
    await aio.sleep(interval)

    await Welcome_plugin.nextStepPY()
    await Welcome_plugin.setSeatPosition()
    await aio.sleep(interval)

    await Welcome_plugin.nextStepPY()
    await Welcome_plugin.setAutoHold()
    await aio.sleep(interval)

    await Welcome_plugin.nextStepPY()
    await Welcome_plugin.setMirrorStatus()
    await aio.sleep(interval)

    ### Set Drive Mode
    await Welcome_plugin.nextStepPY()
    await Welcome_plugin.setSteeringMode()
    await aio.sleep(interval)

    await Welcome_plugin.nextStepPY()
    await Welcome_plugin.setBrakingMode()
    await aio.sleep(interval)

    await Welcome_plugin.nextStepPY()
    await Welcome_plugin.setPowerMode()
    await aio.sleep(interval)

    ### Set Comfort Setting
    await Welcome_plugin.nextStepPY()
    outsideTemperature = int(await Welcome_plugin.getOutsideTemperature()) 
    print("outside temperature is: %d"%(outsideTemperature))
    await aio.sleep(interval)

    await Welcome_plugin.nextStepPY()
    await aio.sleep(interval)

    if(outsideTemperature < 9):
        # too cold
        print("too cold, open warm AC")
        await Welcome_plugin.nextStepPY()
        await Welcome_plugin.turnOnSetAC("warm AC")
        await aio.sleep(interval)

        await Welcome_plugin.nextStepPY()
        await Welcome_plugin.turnOnSeatHeat()
        await aio.sleep(interval)

        await Welcome_plugin.nextStepPY()
        await Welcome_plugin.turnSteeringWheelWarm()
        await aio.sleep(interval)
    else:
        await Welcome_plugin.nextStepPY()
        await aio.sleep(interval)
        # too hot
        if(outsideTemperature > 25):
            print("too hot, open cool AC")
            await Welcome_plugin.nextStepPY()
            await Welcome_plugin.turnOnSetAC("cool AC")
            await aio.sleep(interval)

            await Welcome_plugin.nextStepPY()
            await Welcome_plugin.turnOnSeatVentilation()
            await aio.sleep(interval) 
        else:
            print("normal temperature, no automatic AC")

    await Welcome_plugin.nextStepPY()
    await Welcome_plugin.setACAirFlow()
    await aio.sleep(interval)

    await Welcome_plugin.nextStepPY()
    await Welcome_plugin.setADASWarningBeepLevel()
    await aio.sleep(interval)


else:
    ### Default Setting
    await Welcome_plugin.nextStepPY()




test3 = await vehicle.Cabin.HVAC.Station.Row1.Left.Temperature.get()
# print(test3)
test1 = await vehicle.Body.Lights.IsHighBeamOn.get()
# print(test1)
test2 = await vehicle.Cabin.Seat.Row1.Pos1.Position.get()
# print(test2)

Welcome_plugin.refresh()
