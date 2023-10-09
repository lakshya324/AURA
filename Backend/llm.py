import requests

#! Output Function
def result( input_text, full=False):
    url = "https://open-ai21.p.rapidapi.com/conversationmpt"

    payload = {
        "messages": [
            {
                "role": "user",
                "content":'I will give you some instructions\nPlease follow then while generating output:\n1.Word Limit 100 words.\n2.Denote yourself as AURA instead of ChatGPT\n\n Your Problem: {'+input_text+'}'
            }
        ],
        "stream": False
    }
    headers = {
        "content-type": "application/json",
        "X-RapidAPI-Key": "d646f7e495mshb9c44148d6a8fdfp1a52ffjsn7c392d37ddc0",
        "X-RapidAPI-Host": "open-ai21.p.rapidapi.com"
    }

    response = requests.post(url, json=payload, headers=headers)
    if(full):
        return response.json()
    else:
        return response.json()['MPT']
        





