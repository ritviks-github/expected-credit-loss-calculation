from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler
from collections import defaultdict

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/ecl-data")
def get_ecl_data():
    df = pd.read_excel("Bank_Personal_Loan_Modelling.xlsx", sheet_name="Data")
    df.drop(['ID', 'ZIP Code'], axis=1, inplace=True)

    df['EAD'] = df['CCAvg'] * 1000
    df['PD'] = df['Personal Loan']
    df['LGD'] = 0.6
    df['ECL'] = df['PD'] * df['LGD'] * df['EAD']
    df.drop(['PD', 'LGD', 'EAD'], axis=1, inplace=True)

    X = df.drop('ECL', axis=1)
    y = df['ECL']

    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_scaled, y)
    df['Pred_ECL'] = model.predict(scaler.transform(X))

    result = defaultdict(list)
    for col in X.columns:
        grouped = df.groupby(col)['Pred_ECL'].mean().reset_index()
        for _, row in grouped.iterrows():
            result[col].append({
                "label": str(row[col]),
                "ecl": round(row["Pred_ECL"], 2)
            })

    return result


@app.get("/healthz")
def health_check():
    return {"status": "ok"}


