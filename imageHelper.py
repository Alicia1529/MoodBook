# positive = happiness*0.4+surprise*0.1
# negative = anger*0.1+contempt*0.1+disgust*0.1+fear*0.1+sadness*0.1
# 0 = netural
# score = positive-negative

def sentiment(dic):
  positive = dic["happiness"]*0.4+dic["surprise"]*0.1
  negative = dic["anger"]*0.1+dic["contempt"]*0.1+dic["disgust"]*0.1+dic["fear"]*0.1+dic["sadness"]*0.1
  score = (positive-negative)*2 #scale
  return score
