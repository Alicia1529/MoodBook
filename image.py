import http.client, urllib.request, urllib.parse, urllib.error, base64

subscription_key = '25e6e963140041639e8a9c9e49749237'
assert subscription_key

params = urllib.parse.urlencode({
    # Request parameters
    'returnFaceId': 'true',
    'returnFaceLandmarks': 'false',
    'returnFaceAttributes': 'age,gender,smile,emotion',
})


emotion_recognition_url = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?%s"%params

# 'https://eastus.api.cognitive.microsoft.com/face/v1.0/detect'
# "https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize"

image_path = "Input/Images/1.png"
image_data = open(image_path, "rb").read()

import requests
headers  = {'Ocp-Apim-Subscription-Key': '25e6e963140041639e8a9c9e49749237', "Content-Type": "application/octet-stream" }
response = requests.post(emotion_recognition_url, headers=headers, data=image_data)
response.raise_for_status()
analysis = response.json()
print(analysis)
