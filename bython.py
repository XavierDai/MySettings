from sdv_model import Vehicle
import plugins
from browser import aio
Welcome_plugin = plugins.get_plugin("Welcome_plugin")

Welcome_plugin.refresh()
print = plugins.Terminal.print

vehicle = Vehicle()


plugins.Terminal.reset()
print("hello passenger")

Welcome_plugin.nextStep()

await aio.sleep(2)
Welcome_plugin.nextStep()

await aio.sleep(2)
Welcome_plugin.nextStep()

await aio.sleep(2)
Welcome_plugin.nextStep()

await aio.sleep(2)
Welcome_plugin.nextStep()


test3 = await vehicle.Cabin.HVAC.Station.Row1.Left.Temperature.get()
print(test3)
test1 = await vehicle.Body.Lights.IsHighBeamOn.get()
print(test1)
test2 = await vehicle.Cabin.Seat.Row1.Pos1.Position.get()
print(test2)
