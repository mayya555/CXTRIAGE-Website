
import sqlalchemy
from sqlalchemy import create_engine

DATABASE_URL = "mysql+pymysql://root:@localhost/hospitaldb"

def check_data():
    try:
        engine = create_engine(DATABASE_URL)
        with engine.connect() as conn:
            print("--- Doctors (MySQL) ---")
            result = conn.execute(sqlalchemy.text("SELECT first_name, last_name, hospital_email FROM doctors"))
            rows = result.fetchall()
            if not rows:
                print("No doctors found in MySQL.")
            for row in rows:
                print(row)
                
            print("\n--- Technicians (MySQL) ---")
            result = conn.execute(sqlalchemy.text("SELECT first_name, last_name, email FROM technicians"))
            rows = result.fetchall()
            if not rows:
                print("No technicians found in MySQL.")
            for row in rows:
                print(row)
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    check_data()
