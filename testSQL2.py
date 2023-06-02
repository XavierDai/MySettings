import pymysql

def connect():
    db = pymysql.connect(host="localhost", user="root", password="dai200921", port=3306)
    return db

def createDatabase(connection):
    cursor = connection.cursor()
    cursor.execute("CREATE DATABASE IF NOT EXISTS test_2")

def dropTable(connection):
    cursor = connection.cursor()
    sql = "DROP TABLE IF EXISTS test_2.students"
    cursor.execute(sql)

def createTable(connection):
    cursor = connection.cursor()
    sql = "CREATE TABLE test_2.students (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(254) NOT NULL, age INT NULL)"
    cursor.execute(sql)

def insertData(connection):
    cursor = connection.cursor()
    sql = "INSERT INTO test_2.students (name,age) VALUES ('dai',22)"
    cursor.execute(sql)

def searchData(connection):
    cursor = connection.cursor()
    sql = "SELECT * FROM test_2.students WHERE age >= 20"
    try:
        cursor.execute(sql)
        print("count:", cursor.rowcount)
        row = cursor.fetchone()
        while row:
            print("Row:", row)
            row = cursor.fetchone()
    except:
        print('error')

def main():
    connection = connect()
    createDatabase(connection)
