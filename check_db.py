
import sqlite3
import os

db_path = r'c:\xampp\htdocs\chestxray\fallback.db'

if not os.path.exists(db_path):
    print(f"File not found: {db_path}")
else:
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        print("--- Doctors ---")
        cursor.execute("SELECT first_name, last_name, hospital_email FROM doctors")
        for row in cursor.fetchall():
            print(row)
            
        print("\n--- Technicians ---")
        cursor.execute("SELECT first_name, last_name, email FROM technicians")
        for row in cursor.fetchall():
            print(row)
            
        conn.close()
    except Exception as e:
        print(f"Error: {e}")
