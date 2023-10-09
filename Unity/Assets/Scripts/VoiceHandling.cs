using System.Collections;
using UnityEngine;
using UnityEngine.Networking;


public class VoiceHandling : MonoBehaviour
{
    public AudioClip clip;
    public DataHandler dataHandler;
    public string prev_msg;
    private void Start()
    {
        dataHandler = GetComponent<DataHandler>();
        Debug.Log("Step 1");
        // Subscribe to the event
    }
    private void Update()
    {
        string message = dataHandler.message;
        if (prev_msg!= message)
        {
            prev_msg = message;
            clip = TTS(message);
        }
    }
    

    public AudioClip TTS(string message)
    {
        StartCoroutine(PostData_Coroutine(message));
        return clip;
    }

    [System.Obsolete]
    IEnumerator PostData_Coroutine(string content)
    {
        Debug.Log("Entered");
        string input = textchange(content);
        string url = $"https://microsoft-edge-text-to-speech.p.rapidapi.com/TTS/EdgeTTS?text={input}%3F&voice_name=en-US-AriaNeural";
        string uri = $"https://text-to-speech27.p.rapidapi.com/speech?text={input}&lang=en-us";
        WWWForm form = new WWWForm();
        form.AddField("X-RapidAPI-Key", "917be27556mshcc19497235eae66p1ca93djsndc190416ec6b");
        form.AddField("X-RapidAPI-Host", "microsoft-edge-text-to-speech.p.rapidapi.com");
        using (UnityWebRequest request = UnityWebRequestMultimedia.GetAudioClip(uri, AudioType.MPEG))
        {

            request.SetRequestHeader("X-RapidAPI-Key", "917be27556mshcc19497235eae66p1ca93djsndc190416ec6b");
            request.SetRequestHeader("X-RapidAPI-Host", "text-to-speech27.p.rapidapi.com");
            DownloadHandlerAudioClip dHA = new DownloadHandlerAudioClip(string.Empty, AudioType.MPEG);
            dHA.streamAudio = false;
            request.downloadHandler = dHA;
            string filePath = Application.persistentDataPath + "/audiofile.mp3";


            yield return request.SendWebRequest();
            while (request.downloadProgress < 1)
            {
                Debug.Log(request.downloadProgress);
                yield return new WaitForSeconds(.1f);
            }
            if (request.isNetworkError || request.isHttpError)
            {
                Debug.Log(request.error);

            }
            else
            {


                clip = DownloadHandlerAudioClip.GetContent(request);
                AudioSource audioSource = GetComponent<AudioSource>();
                audioSource.clip = clip;
                audioSource.Play();

            }
        }
    }
    public string textchange(string url)
    {
        url.Trim();
        url = url.Replace(" ", "%20");
        return url;
    }

}
