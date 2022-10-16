import numpy as np
import pandas as pd

##########################
# TRANSFORMA CSV CARDANO #
##########################

datos = pd.read_csv(r"dosmedia.csv")
datos1 = pd.read_csv(r"dosmediaM.csv")

datos['MediaMujeres'] = datos1["Media_Col"]



datos.to_csv('mediaDos.csv', index=False)