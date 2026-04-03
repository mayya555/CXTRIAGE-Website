
import sqlalchemy
from sqlalchemy import create_engine
import os

DATABASE_URL = "mysql+pymysql://root:@localhost/chestxraydb"

def check_data():
    output = []
    try:
        engine = create_engine(DATABASE_URL)
        with engine.connect() as conn:
            output.append("--- Doctors (chestxraydb) ---")
            result = conn.execute(sqlalchemy.text("SELECT id, first_name, last_name, hospital_email, password FROM doctors"))
            for row in result:
                output.append(f"ID: {row[0]} | Name: {row[1]} {row[2]} | Email: {row[3]} | Pwd: {row[4]}")
                
            output.append("\n--- Technicians (chestxraydb) ---")
            result = conn.execute(sqlalchemy.text("SELECT id, first_name, last_name, email, password FROM technicians"))
            for row in result:
                output.append(f"ID: {row[0]} | Name: {row[1]} {row[2]} | Email: {row[3]} | Pwd: {row[4]}")
    except Exception as e:
        output.append(f"Error: {e}")
    
    with open("db_content.txt", "w") as f:
        f.write("\n".join(output))

if __name__ == "__main__":
    check_data()
