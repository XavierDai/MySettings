import asyncio
import sys
from kuksa_client.grpc import VSSClient
from kuksa_client.grpc import Datapoint
from kuksa_client import KuksaClientThread  

import time
with VSSClient('127.0.0.1', 55556) as client:

    def key_detect():
        keyDetection = False
        keyID = input("车钥匙序列号:")
        print(type(keyID),keyID)
        keyFile = open("key.txt","r")
        keyContent = keyFile.readlines()
        i = 1
        for keyTemp in keyContent:
            if keyTemp == keyID:
                keyDetection = True
                break
            i+=1
        keyFile.close()
        return keyDetection

    def face_ident():
        faceDetection = False
        ident = input("进入车的人名：")
        identFile = open("ident.txt","r")
        identContent = identFile.readlines()
        dictionary = {}
        for identTemp in identContent:
            identInfo = identTemp.split("#")
            identInfo.pop()
            identName = identInfo[0].split(":")[1]
            if ident == identName:
                faceDetection = True
                dictionary = {}
                for i in identInfo:
                    print(i)
                    key,value = i.split(":")
                    dictionary[key] = value
                break
        identFile.close()
        if faceDetection:
            print("ident detected!")
        else:
            print(f"no record of: {ident}")
        return dictionary

    def welcome(dictionary):
        # unsolved display interface
        print(dictionary["welcome"])

        # set personalized UI interface

        ###### new path needed here to change style: Vehicle.Cabin.Infotainment.HMI.Style #####

        # set prefer language
        client.set_target_values({
                        'Vehicle.Cabin.Infotainment.HMI.CurrentLanguage':Datapoint(dictionary["language"])
                    })
        print(f"Feeding Vehicle.Cabin.Infotainment.HMI.CurrentLanguage to: {dictionary['language']}")
        language = dictionary["language"]
        if language == "Chinese":
            client.set_target_values({
                'Vehicle.Cabin.Infotainment.HMI.DistanceUnit':Datapoint('KILOMETERS')
            })
            print(f"Feeding Vehicle.Cabin.Infotainment.HMI.DistanceUnit to: KILOMETERS")
        elif language == "English":
            client.set_target_values({
                'Vehicle.Cabin.Infotainment.HMI.DistanceUnit':Datapoint("MILES")
                })
            print(f"Feeding Vehicle.Cabin.Infotainment.HMI.DistanceUnit to: MILES")

    def setInteriorLight(dictionary):
        print("-------------------- Setting Interior Light --------------------")
        client.set_target_values({
                        'Vehicle.Cabin.Lights.Spotlight.Row1.IsSharedOn':Datapoint(True),
                        'Vehicle.Cabin.Lights.AmbientLight':Datapoint(30),
                        'Vehicle.Cabin.Lights.IsDomeOn':Datapoint(True),
                    })
        print(f"Feeding Vehicle.Cabin.Lights.Spotlight.Row1.IsSharedOn to: True")
        print(f"Feeding Vehicle.Cabin.Lights.AmbientLight to: 30%")
        print(f"Feeding Vehicle.Cabin.Lights.IsDomeOn to: True")

    def setParkingWarningBeepLevel(dictionary):

        print("-------------- Setting Parking Warning Beep Level --------------")

        # no available function yet

    def turnOnPreferredMusic(dictionary):
        print("------------------ Turning on Preferred Music ------------------")
        client.set_target_values({
                        'Vehicle.Cabin.Infotainment.Media.SelectedURI':Datapoint(dictionary['music']),
                        'Vehicle.Cabin.Infotainment.Media.Volume':Datapoint(30),
                        
                    })
        print(f"Feeding Vehicle.Cabin.Infotainment.Media.SelectedURI to: {dictionary['music']}")
        print(f"Feeding Vehicle.Cabin.Infotainment.Media.Volume to: 30%")


    def setSeatPosition(dictionary):
        print("-------------------- Setting Seat Position --------------------")
        vSpeed = client.get_current_values([
            'Vehicle.Speed'
        ])['Vehicle.Speed']
        if vSpeed is None or vSpeed == 0:
            client.set_target_values({
                        'Vehicle.Cabin.Seat.Row1.Pos1.Position':Datapoint(dictionary['seatPosition']),
                        'Vehicle.Cabin.Seat.Row1.Pos1.Height':Datapoint(dictionary['seatHeight']),
                        
                    })
            print(f"Feeding Vehicle.Cabin.Seat.Row1.Pos1.Position to: {dictionary['seatPosition']}mm")
            print(f"Feeding Vehicle.Cabin.Seat.Row1.Pos1.Height to: {dictionary['seatHeight']}mm")
        else:
            print("Request blocked! The vehicle is moving")


    def setAutoHold(dictionary):
        print("--------------------- Setting Auto Hold ---------------------")
        client.set_target_values({
                        'Vehicle.Chassis.ParkingBrake.IsEngaged':Datapoint(False),
                    })
        print(f"Feeding Vehicle.Chassis.ParkingBrake.IsEngaged to: False")

    def setMirrorStatus(dictionary):
        print("--------------------- Setting Mirror Status ---------------------")
        client.set_target_values({
                        'Vehicle.Body.Mirrors.Left.Tilt':Datapoint(dictionary['leftMirrorTilt']),
                        'Vehicle.Body.Mirrors.Left.Pan':Datapoint(dictionary['leftMirrorPan']),
                        'Vehicle.Body.Mirrors.Right.Tilt':Datapoint(dictionary['rightMirrorTilt']),
                        'Vehicle.Body.Mirrors.Right.Pan':Datapoint(dictionary['rightMirrorPan']),
                    })
        print(f"Feeding Vehicle.Body.Mirrors.Left.Tilt to: {dictionary['leftMirrorTilt']}")
        print(f"Feeding Vehicle.Body.Mirrors.Left.Pan to: {dictionary['leftMirrorPan']}")
        print(f"Feeding Vehicle.Body.Mirrors.Right.Tilt to: {dictionary['rightMirrorTilt']}")
        print(f"Feeding Vehicle.Body.Mirrors.Right.Pan to: {dictionary['rightMirrorPan']}")


    def setDriveMode(dictionary):
        print("---------------------- Setting Drive Mode ----------------------")
        rainIntensity = client.get_current_values([
            'Vehicle.Body.Raindetection.Intensity'
        ])['Vehicle.Body.Raindetection.Intensity']
        if rainIntensity is not None and rainIntensity >= 80:
            print("Heavy rain! Turning on RAIN mode automatically")
            driveMode = "SNOW"
        else:
            driveMode = dictionary['driveMode']
        client.set_target_values({
                        'Vehicle.Powertrain.Transmission.PerformanceMode':Datapoint(driveMode),
                        'Vehicle.PowerOptimizeLevel':Datapoint(dictionary['powerMode']),
                        'Vehicle.ADAS.ABS.IsEnabled':Datapoint(True),
                        'Vehicle.ADAS.EBD.IsEnabled':Datapoint(True)
                    })
        print(f"Feeding Vehicle.Powertrain.Transmission.PerformanceMode to: {driveMode}")
        print(f"Feeding Vehicle.PowerOptimizeLevel to: {dictionary['powerMode']}")
        print(f"Feeding Vehicle.ADAS.ABS.IsEnabled to: True")
        print(f"Feeding Vehicle.ADAS.EBD.IsEnabled to: True")
        # 刹车和转向的力道


    def setComfortSetting(dictionary):
        print("-------------------- Setting Comfort Setting --------------------")
        outsideTemperature = client.get_current_values([
            'Vehicle.Exterior.AirTemperature',
        ])['Vehicle.Exterior.AirTemperature']
        
        if outsideTemperature:
            if outsideTemperature < 9:
                client.set_target_values({
                    'Vehicle.Cabin.HVAC.IsAirConditioningActive':Datapoint(True),
                    'Vehicle.Cabin.HVAC.Station.Row1.Left.FanSpeed':Datapoint(30),
                    'Vehicle.Cabin.HVAC.Station.Row1.Left.Temperature':Datapoint(25),
                    'Vehicle.Cabin.Seat.Row1.Pos1.Heating':Datapoint(50)
                })
                print("~ Turning on & Setting AC:")
                print(f"Feeding Vehicle.Cabin.HVAC.Station.IsAirConditioningActive to: True")
                print(f"Feeding Vehicle.Cabin.HVAC.Station.Row1.Left.FanSpeed: 30%")
                print(f"Feeding Vehicle.Cabin.HVAC.Station.Row1.Left.Temperature: 25 celsius")
                print("~ Turning on Seat Heat:")
                print(f"Feeding Vehicle.Cabin.Seat.Row1.Pos1.Heating: 50% heating")
                # print("~ Turning Steering Wheel Warm")
                # SteerWheel warm needed additionally
                # Vehicle.Chassis.SteeringWheel.Warm
            elif outsideTemperature > 25:
                client.set_target_values({
                    'Vehicle.Cabin.HVAC.IsAirConditioningActive':Datapoint(True),
                    'Vehicle.Cabin.HVAC.Station.Row1.Left.FanSpeed':Datapoint(30),
                    'Vehicle.Cabin.HVAC.Station.Row1.Left.Temperature':Datapoint(22),
                    'Vehicle.Cabin.Seat.Row1.Pos1.Heating':Datapoint(-50)
                })
                print("~ Turning on & Setting AC:")
                print(f"Feeding Vehicle.Cabin.HVAC.Station.IsAirConditioningActive to: True")
                print(f"Feeding Vehicle.Cabin.HVAC.Station.Row1.Left.FanSpeed: 30%")
                print(f"Feeding Vehicle.Cabin.HVAC.Station.Row1.Left.Temperature: 22 celsius")
        
                print("~ Turning on Seat Ventilation:")
                print(f"Feeding Vehicle.Cabin.Seat.Row1.Pos1.Heating: 50% cooling")
                # additional seat ventilation needed
            
            client.set_target_values({
                'Vehicle.Cabin.HVAC.Station.Row1.Left.AirDistribution':Datapoint('MIDDLE'),
            })
            print("~ Setting AC Air Flow:")
            print(f"Feeding Vehicle.Cabin.HVAC.Station.Row1.Left.AirDistribution: MIDDLE")
                
        # client.set_target_values({'Vehicle.ADAS.WarningBeepLevel':Datapoint(30)})
        # print("~ Setting ADAS warning beep level:")
        # print("Feeding Vehicle.ADAS.WarningBeepLevel to: 30%")
    
    async def main():

        
            keyResult = key_detect()
            if keyResult:
                print("key detected!")
                dictionary = face_ident()
                if dictionary:
                    welcome(dictionary)
                    setInteriorLight(dictionary)
                    setParkingWarningBeepLevel(dictionary)
                    turnOnPreferredMusic(dictionary)
                    setSeatPosition(dictionary)
                    setAutoHold(dictionary)
                    setMirrorStatus(dictionary)
                    setDriveMode(dictionary)
                    setComfortSetting(dictionary)


                else:
                    print("Using default setting...")



            else:
                print("no key detected")
        
            



    LOOP = asyncio.get_event_loop()
    LOOP.run_until_complete(main())
    LOOP.close()
