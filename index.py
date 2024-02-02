import setup
import pyttsx3
import glob
import os
import sys

class TextToSpeech:
    def __init__(self,):
      self.engine = pyttsx3.init()
      
    def initSetup(self):
        try:
            rate = self.engine.getProperty('rate')  
            self.engine.setProperty('rate', 130) 
            
            volume = self.engine.getProperty('volume')   
            self.engine.setProperty('volume',setup.volume)
            
            voices = self.engine.getProperty('voices')      
            self.engine.setProperty('voice', voices[setup.voice_id].id)
        except Exception as e:
            print(e)
        
    def convertToSpeech(self,file_path_name):
        try:
            path = '../Text/'+file_path_name+'.txt'
            name =file_path_name
            with open(path, encoding="utf8") as fp:
                contents = fp.read().splitlines()
                file = '../speech/'+name+'.mp3'
                self.engine.save_to_file(contents, file)
                self.engine.runAndWait()
        except Exception as e:
            print(e)
         
def getfile():
    os.chdir(r'Text')
    Text = glob.glob('*.txt')
    mytext = []
    myspeech = []
    for i in Text:
        mytext.append(i[:-4])
    os.chdir(r'../speech')
    Speech = glob.glob('*.mp3')
    for i in Speech:
        myspeech.append(i[:-4])
    return Diff(mytext,myspeech)

def Diff(li1, li2):
    return list(set(li1) - set(li2)) + list(set(li2) - set(li1))

def run():
    s = TextToSpeech()
    s.initSetup()
    for i in getfile():
        print('text converting to speech of '+ i + " ..........." )
        s.convertToSpeech(i)
        print('finish')
    
if __name__ == '__main__':
    run()  
            