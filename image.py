import http.client, urllib.request, urllib.parse, urllib.error, base64
import requests
import imageHelper as helper
exp = 1;
num = 10;
face_analysis = []
emotion = []
sentiment = []
f =  open("face_analysis.txt", "w")
f.write(str(num))

subscription_key = '25e6e963140041639e8a9c9e49749237'
assert subscription_key

params = urllib.parse.urlencode({
    # Request parameters
    'returnFaceId': 'false',
    'returnFaceLandmarks': 'false',
    'returnFaceAttributes': 'emotion',
})
emotion_recognition_url = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?%s"%params
headers  = {'Ocp-Apim-Subscription-Key': '25e6e963140041639e8a9c9e49749237', "Content-Type": "application/octet-stream" }

for i in range(exp):
    for j in range(num):
        image_path = "Input/Images/Part"+str(i+1)+'/'+str(j+1)+".jpg"
        image_data = open(image_path, "rb").read()
        response = requests.post(emotion_recognition_url, headers=headers, data=image_data)
        response.raise_for_status()
        analysis = response.json()
        emotion.append(analysis[0]['faceAttributes']["emotion"])
        sentiment.append(helper.sentiment(analysis[0]['faceAttributes']["emotion"]))
face_analysis.append(emotion)
face_analysis.append(sentiment)
f.write(str(face_analysis))
