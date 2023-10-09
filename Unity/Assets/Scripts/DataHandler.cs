using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using WebSocketSharp;

public class DataHandler : MonoBehaviour
{
    WebSocket ws;
    public string message;

    public event Action<string> OnMessageReceived;
    
    
    private void Start()
    {
        // ws = new WebSocket("ws://localhost:8888");
        // ws.Connect();
        // ws.OnMessage += (sender, e) =>
        // {
        //     Debug.Log("Message Recieved");
        //     message = e.Data;

        //     // Invoke the event
        // };

    }

    // get message from js
    public void GetMessage(string message)
    {
        Debug.Log("Message Recieved");
        this.message = message;
        OnMessageReceived?.Invoke(message);
    }
     
}
