import numpy as np
import csv
import pandas as pd


datos = pd.read_csv(r"heart.csv")
datos['Edad'] = datos['Age']
datos['Sexo'] = datos['Sex']
datos['Colesterol'] = datos['Cholesterol']

del(datos['ChestPainType'])
del(datos['RestingBP'])
del(datos['FastingBS'])
del(datos['RestingECG'])
del(datos['MaxHR'])
del(datos['ExerciseAngina'])
del(datos['ST_Slope'])
del(datos['Oldpeak'])
del(datos['HeartDisease'])
del(datos['Age'])
del(datos['Sex'])
del(datos['Cholesterol'])
#datos['Age'] = datos['Edad']
#datos['Sex'] = datos['Sexo']
#datos['Cholesterol'] = datos['Colesterol']

datos.to_csv('corazon.csv', index=False)