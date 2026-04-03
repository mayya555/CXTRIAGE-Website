import sqlalchemy
from sqlalchemy import create_engine, text

# Database connection
DB_URL = "mysql+pymysql://root:@localhost/chestxraydb"
engine = create_engine(DB_URL)

def add_columns():
    cols_to_add = [
        ("specialization", "VARCHAR(100)"),
        ("license_number", "VARCHAR(50)"),
        ("department", "VARCHAR(100)"),
        ("location", "VARCHAR(200)")
    ]
    
    with engine.connect() as conn:
        # Get existing columns
        result = conn.execute(text("DESCRIBE doctors"))
        existing_cols = [row[0] for row in result]
        
        for col_name, col_type in cols_to_add:
            if col_name not in existing_cols:
                try:
                    conn.execute(text(f"ALTER TABLE doctors ADD COLUMN {col_name} {col_type}"))
                    print(f"✅ Added column: {col_name}")
                except Exception as e:
                    print(f"❌ Failed to add {col_name}: {e}")
            else:
                print(f"ℹ️ Column already exists: {col_name}")
        
        conn.commit()

if __name__ == "__main__":
    print("🚀 Starting database migration for doctors table...")
    add_columns()
    print("✨ Migration complete.")
