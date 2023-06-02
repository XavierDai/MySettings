import pymysql
db = pymysql.connect(host="localhost", user="root", password="dai200921", port=3306)

cursor = db.cursor()

cursor.execute("CREATE DATABASE IF NOT EXISTS test_2")

sql = "DROP TABLE IF EXISTS test_2.students"
cursor.execute(sql)

sql = "CREATE TABLE test_2.students (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(254) NOT NULL, age INT NULL)"
cursor.execute(sql)



sql = "INSERT INTO test_2.students (name,age) VALUES ('dai',22)"
cursor.execute(sql)



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

