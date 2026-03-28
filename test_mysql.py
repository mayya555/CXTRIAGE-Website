
import sqlalchemy
from sqlalchemy import create_engine
import os

DATABASE_URL = "mysql+pymysql://root:@localhost/hospitaldb"

def test_connection():
    try:
        engine = create_engine(DATABASE_URL)
        with engine.connect() as conn:
            print("SUCCESS: Successfully connected to MySQL 'hospitaldb'")
            # Check if tables exist
            from sqlalchemy import inspect
            inspector = inspect(engine)
            tables = inspector.get_table_names()
            print(f"Tables found: {tables}")
    except Exception as e:
        print(f"FAILURE: Could not connect to MySQL.")
        print(f"Error details: {e}")
        print("\nPossible solutions:")
        print("1. Ensure XAMPP MySQL is started.")
        print("2. Ensure a database named 'hospitaldb' exists in phpMyAdmin.")
        print("3. Check if your MySQL user 'root' has a password (the script assumed no password).")

if __name__ == "__main__":
    test_connection()
