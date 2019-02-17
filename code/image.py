import http.client, urllib.request, urllib.parse, urllib.error, base64
import json
import requests
import imageHelper as helper
import time
exp = 3
num = 10
face_analysis = []

subscription_key = '25e6e963140041639e8a9c9e49749237'
assert subscription_key

params = urllib.parse.urlencode({
    'returnFaceId': 'false',
    'returnFaceLandmarks': 'false',
    'returnFaceAttributes': 'emotion',
})
emotion_recognition_url = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?%s"%params
headers  = {'Ocp-Apim-Subscription-Key': subscription_key, "Content-Type": "application/octet-stream" }

for i in range(exp):
    ep = {}
    scale = num    #total
    for j in range(num):
        image_path = "Input/Images/Part"+str(i+1)+'/'+str(j+1)+".jpg"
        image_data = open(image_path, "rb").read()
        response = requests.post(emotion_recognition_url, headers=headers, data=image_data)
        response.raise_for_status()
        analysis = response.json()
        emotion = analysis[0]['faceAttributes']['emotion']
        scale -= (emotion["contempt"]+emotion["surprise"])  #amount discard
        for e in emotion:
            if e!="contempt" and e!="surprise":
                ep[e] = ep.get(e,0) +emotion[e]
        sentiment = helper.sentiment(emotion)
        ep['sentiment'] = ep.get('sentiment',[])
        ep["sentiment"].append(sentiment)
        time.sleep(5)
    scale = scale/num   #percentage
    for e in ["neutral","happiness","anger","sadness","disgust","fear"]:
        ep[e] = ep[e]/scale

    print(ep)
    face_analysis.append(ep)


with open("output/face_analysis.json", "w") as outfile:
    json.dump(str(face_analysis), outfile)
