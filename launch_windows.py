# # # import tkinter as tk
# # # import subprocess
# # # import os

# # # # Paths to your scripts
# # # BACKEND_APP_PATH = os.path.join("backend", "app.py")
# # # BACKEND_SERVER_PATH = os.path.join("backend", "server.js")
# # # FRONTEND_DIR = "frontend"

# # # # Function to start Flask app
# # # def start_flask():
# # #     subprocess.Popen(["python", BACKEND_APP_PATH])

# # # # Function to start backend server
# # # def start_backend_server():
# # #     subprocess.Popen(["node", BACKEND_SERVER_PATH])

# # # # Function to start frontend (assuming using npm start)
# # # def start_frontend():
# # #     subprocess.Popen(["npm", "start"], cwd=FRONTEND_DIR)

# # # # Create UI
# # # root = tk.Tk()
# # # root.title("Project Launcher")

# # # tk.Button(root, text="Start Backend Flask", command=start_flask, width=30).pack(pady=10)
# # # tk.Button(root, text="Start Backend Server", command=start_backend_server, width=30).pack(pady=10)
# # # tk.Button(root, text="Start Frontend", command=start_frontend, width=30).pack(pady=10)

# # # root.mainloop()




# # import tkinter as tk
# # import subprocess
# # import os
# # import signal

# # # Store process handles
# # processes = {
# #     "flask": None,
# #     "server": None,
# #     "frontend": None
# # }

# # # Commands
# # def start_flask():
# #     if not processes["flask"]:
# #         processes["flask"] = subprocess.Popen(
# #             ['start', 'cmd', '/k', 'python backend\\app.py'],
# #             shell=True
# #         )

# # def stop_flask():
# #     if processes["flask"]:
# #         processes["flask"].terminate()
# #         processes["flask"] = None

# # def start_server():
# #     if not processes["server"]:
# #         processes["server"] = subprocess.Popen(
# #             ['start', 'cmd', '/k', 'node backend\\server.js'],
# #             shell=True
# #         )

# # def stop_server():
# #     if processes["server"]:
# #         processes["server"].terminate()
# #         processes["server"] = None

# # def start_frontend():
# #     if not processes["frontend"]:
# #         processes["frontend"] = subprocess.Popen(
# #             ['start', 'cmd', '/k', 'cd frontend && npm start'],
# #             shell=True
# #         )

# # def stop_frontend():
# #     if processes["frontend"]:
# #         processes["frontend"].terminate()
# #         processes["frontend"] = None

# # # All in one
# # def start_all():
# #     start_flask()
# #     start_server()
# #     start_frontend()

# # def stop_all():
# #     stop_flask()
# #     stop_server()
# #     stop_frontend()

# # # GUI
# # root = tk.Tk()
# # root.title("Project Launcher")

# # tk.Button(root, text="Start Backend Flask", command=start_flask, width=30).pack(pady=2)
# # tk.Button(root, text="Stop Backend Flask", command=stop_flask, width=30).pack(pady=2)

# # tk.Button(root, text="Start Backend Server", command=start_server, width=30).pack(pady=2)
# # tk.Button(root, text="Stop Backend Server", command=stop_server, width=30).pack(pady=2)

# # tk.Button(root, text="Start Frontend", command=start_frontend, width=30).pack(pady=2)
# # tk.Button(root, text="Stop Frontend", command=stop_frontend, width=30).pack(pady=2)

# # tk.Label(root, text="").pack()

# # tk.Button(root, text="START ALL", command=start_all, bg='green', fg='Black', width=30).pack(pady=5)
# # tk.Button(root, text="STOP ALL", command=stop_all, bg='red', fg='Black', width=30).pack(pady=5)

# # root.mainloop()





# import tkinter as tk
# import subprocess
# import os

# # Store process IDs (PIDs) instead of process objects
# processes = {
#     "flask": None,
#     "server": None,
#     "frontend": None
# }

# # Commands
# def start_flask():
#     if not processes["flask"]:
#         proc = subprocess.Popen(
#             ['start', 'cmd', '/k', 'python backend\\app.py'],
#             shell=True
#         )
#         processes["flask"] = proc

# def start_server():
#     if not processes["server"]:
#         proc = subprocess.Popen(
#             ['start', 'cmd', '/k', 'node backend\\server.js'],
#             shell=True
#         )
#         processes["server"] = proc

# def start_frontend():
#     if not processes["frontend"]:
#         proc = subprocess.Popen(
#             ['start', 'cmd', '/k', 'cd frontend && npm start'],
#             shell=True
#         )
#         processes["frontend"] = proc

# def stop_all():
#     os.system('taskkill /IM cmd.exe /F')

# # GUI
# root = tk.Tk()
# root.title("Project Launcher")

# tk.Button(root, text="Start Backend Flask", command=start_flask, width=30).pack(pady=2)
# tk.Button(root, text="Start Backend Server", command=start_server, width=30).pack(pady=2)
# tk.Button(root, text="Start Frontend", command=start_frontend, width=30).pack(pady=2)

# tk.Label(root, text="").pack()

# tk.Button(root, text="START ALL", command=lambda: [start_flask(), start_server(), start_frontend()], bg='green', fg='Black', width=30).pack(pady=5)

# tk.Button(root, text="STOP ALL (kill all CMDs)", command=stop_all, bg='red', fg='Black', width=30).pack(pady=5)

# root.mainloop()





import tkinter as tk
import subprocess
import os

# Store window titles
window_titles = {
    "flask": "FlaskAppWindow",
    "server": "NodeServerWindow",
    "frontend": "FrontendWindow"
}

# Start functions
def start_flask():
    os.system(f'start "{window_titles["flask"]}" cmd /k "python backend\\app.py"')

def start_server():
    os.system(f'start "{window_titles["server"]}" cmd /k "node backend\\server.js"')

def start_frontend():
    os.system(f'start "{window_titles["frontend"]}" cmd /k "cd frontend && npm start"')

# Stop functions
def stop_flask():
    os.system(f'taskkill /FI "WINDOWTITLE eq {window_titles["flask"]}" /F')

def stop_server():
    os.system(f'taskkill /FI "WINDOWTITLE eq {window_titles["server"]}" /F')

def stop_frontend():
    os.system(f'taskkill /FI "WINDOWTITLE eq {window_titles["frontend"]}" /F')

# Start all
def start_all():
    start_flask()
    start_server()
    start_frontend()

# Stop all
def stop_all():
    stop_flask()
    stop_server()
    stop_frontend()

# -------------------
# GUI Section
# -------------------

root = tk.Tk()
root.title("🚀 Project Launcher")
root.geometry("400x450")
root.config(bg="#f0f0f0")

title = tk.Label(root, text="Project Launcher", font=("Helvetica", 20, "bold"), bg="#f0f0f0", fg="#333")
title.pack(pady=20)

frame = tk.Frame(root, bg="#f0f0f0")
frame.pack(pady=10)

# Flask controls
tk.Label(frame, text="Flask Backend", font=("Helvetica", 12), bg="#f0f0f0").grid(row=0, column=0, pady=5, sticky="w")
tk.Button(frame, text="Start Flask", command=start_flask, width=15, bg="#d1ffd6").grid(row=0, column=1, padx=5)
tk.Button(frame, text="Stop Flask", command=stop_flask, width=15, bg="#ffd1d1").grid(row=0, column=2, padx=5)

# Server controls
tk.Label(frame, text="Node Backend", font=("Helvetica", 12), bg="#f0f0f0").grid(row=1, column=0, pady=5, sticky="w")
tk.Button(frame, text="Start Server", command=start_server, width=15, bg="#d1ffd6").grid(row=1, column=1, padx=5)
tk.Button(frame, text="Stop Server", command=stop_server, width=15, bg="#ffd1d1").grid(row=1, column=2, padx=5)

# Frontend controls
tk.Label(frame, text="Frontend (React/Vue)", font=("Helvetica", 12), bg="#f0f0f0").grid(row=2, column=0, pady=5, sticky="w")
tk.Button(frame, text="Start Frontend", command=start_frontend, width=15, bg="#d1ffd6").grid(row=2, column=1, padx=5)
tk.Button(frame, text="Stop Frontend", command=stop_frontend, width=15, bg="#ffd1d1").grid(row=2, column=2, padx=5)

# Divider
tk.Label(root, text="").pack()

# All controls
tk.Button(root, text="🚀 Start ALL", command=start_all, width=30, height=2, bg="#b3ffd1", font=("Helvetica", 12)).pack(pady=5)
tk.Button(root, text="🛑 Stop ALL", command=stop_all, width=30, height=2, bg="#ffb3b3", font=("Helvetica", 12)).pack(pady=5)

root.mainloop()

