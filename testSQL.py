import pymysql

# Connect to the database
def connect():
    connection = pymysql.connect(
        host='localhost',
        user='root',
        password='dai200921',
        port=3306,
    )
    return connection

# Add an entry to the database
def add_entry(connection, name, age):
    try:
        with connection.cursor() as cursor:
            sql = "INSERT INTO test_table (`name`, `age`) VALUES (%s, %s)"
            cursor.execute(sql, (name, age))
        connection.commit()
        print("Entry added successfully!")
    except Exception as e:
        print("Error adding entry:", str(e))

# Delete an entry from the database
def delete_entry(connection, name):
    try:
        with connection.cursor() as cursor:
            sql = "DELETE FROM `entries` WHERE `name` = %s"
            cursor.execute(sql, (name,))
        connection.commit()
        if cursor.rowcount > 0:
            print("Entry deleted successfully!")
        else:
            print("Entry not found in the database.")
    except Exception as e:
        print("Error deleting entry:", str(e))

# Check an entry in the database
def check_entry(connection, name):
    try:
        with connection.cursor() as cursor:
            sql = "SELECT * FROM test_table WHERE name = %s"
            cursor.execute(sql, (name,))
            result = cursor.fetchone()
            if result:
                print(f"Name: {result['name']}, Age: {result['age']}")
            else:
                print("Entry not found in the database.")
    except Exception as e:
        print("Error checking entry:", str(e))

# Display the menu
def display_menu():
    print("\n--- Database Menu ---")
    print("1. Add entry")
    print("2. Delete entry")
    print("3. Check entry")
    print("4. Create Database")
    print("5. Exit")

def create_database(connection,db_name):
    try:
        with connection.cursor() as cursor:
            sql = "CREATE DATABASE %s IF NOT EXISTS"
            cursor.execute(sql, (db_name,))
            result = cursor.fetchone()
            if result:
                print(result)
    except Exception as e:
        print("Error creating database:", str(e))

def create_table(connection):
    try:
        with connection.cursor() as cursor:
            sql = "CREATE TABLE test_table (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), age INT)"
            cursor.execute(sql)
            result = cursor.fetchone()
            if result:
                print(result)
    except Exception as e:
        print("Error creating database:", str(e))


# Main program
def main():
    connection = connect()
    create_database(connection, 'test')
    create_table(connection)
    while True:
        display_menu()
        choice = input("Enter your choice (1-5): ")

        if choice == '1':
            name = input("Enter name: ")
            age = input("Enter age: ")
            add_entry(connection, name, age)
        elif choice == '2':
            name = input("Enter name to delete: ")
            delete_entry(connection, name)
        elif choice == '3':
            name = input("Enter name to check: ")
            check_entry(connection, name)
        elif choice == '4':
            name = input("Enter database name to create: ")
            create_database(connection, name)
        elif choice == '5':
            print("Exiting the program...")
            break
        else:
            print("Invalid choice. Please try again.")

    connection.close()

if __name__ == '__main__':
    main()