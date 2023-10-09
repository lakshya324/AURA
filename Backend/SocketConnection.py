import websockets
import asyncio
from llm import result

print("Server Started") 

async def get_result(data):
  response = result(data , full=False)
  return response

connected = set()

async def handler(websocket , path):
  print("Client Connected")
  connected.add(websocket)
  try:
    async for data in websocket:
      result = await get_result(data)
      # result = "This is sample text"
      print("Messagge recieved")
      print(data)
      for connection in connected:
        if connection != websocket:
          await connection.send(result)
          print("sended to client")
  except websockets.exceptions.ConnectionClosed as e:
    print("Client Dissconnected")
  finally:
    connected.remove(websocket)


async def main():
  server = await websockets.serve(handler, "localhost", 8888)
  await server.serve_forever()

asyncio.run(main())