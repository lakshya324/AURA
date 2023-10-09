using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerHandler : MonoBehaviour
{
    public GameObject dataManager;
    public GameObject voiceManager;
    string response;
    [SerializeField]public AudioClip clip;

    void Start()
    {
        response = dataManager.GetComponent<DataHandler>().message;
        Debug.Log("Message is"+response);
    }

    // Add this method to receive the audio clip
    public void ReceiveAudioClip(AudioClip receivedClip)
    {
        clip = receivedClip;
        // You can now use the 'clip' variable for audio playback or any other purpose.
        Debug.Log("Audio recieveed");
        PlayAudio(clip);
    }

    void PlayAudio(AudioClip clip)
    {
        AudioSource audioSource = GetComponent<AudioSource>();
        audioSource.clip = clip; // Assign the received clip to the AudioSource
        Debug.Log("Audio plyed");
        audioSource.Play(); // Play the audio
    }
}
