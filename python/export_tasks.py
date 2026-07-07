import psycopg2
import csv
from datetime import datetime

DB_CONFIG = {
    'host': 'localhost',
    'port': 5432,
    'database': 'tasklist',
    'user': 'postgres',
    'password': 'hjvfirf'
}

CSV_FILENAME = 'tasks_export.csv'

def export_tasks_to_csv():
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        cursor = conn.cursor()

        cursor.execute("SELECT id, title, description, status, created_at FROM tasks ORDER BY id;")
        rows = cursor.fetchall()

        column_names = [desc[0] for desc in cursor.description]

        with open(CSV_FILENAME, 'w', newline='', encoding='utf-8-sig') as csvfile:
            writer = csv.writer(csvfile, delimiter=';')
            writer.writerow(column_names)
            writer.writerows(rows)

        print(f"Экспорт выполнен успешно!")
        print(f"Файл сохранён: {CSV_FILENAME}")
        print(f"Экспортировано задач: {len(rows)}")

    except Exception as e:
        print(f"Ошибка при экспорте: {e}")

    finally:
        if 'cursor' in locals():
            cursor.close()
        if 'conn' in locals():
            conn.close()

if __name__ == "__main__":
    export_tasks_to_csv()