import datetime
import schedule
import time
import subprocess
print("Hello")
def execute_scripts():
    print("executing")
    subprocess.call(["python", r"backend\GNN\Python Automation\download.py"])
    subprocess.call(["python", r"backend\GNN\Python Automation\train.py"])
    subprocess.call(["python", r"backend\GNN\Python Automation\predict.py"])

schedule.every().day.at("12:25").do(execute_scripts)


while True:
    schedule.run_pending()
    time.sleep(1) 