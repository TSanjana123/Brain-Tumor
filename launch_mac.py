# import tkinter as tk
# import subprocess
# import os
# import signal

# # Store process objects, not just PIDs
# processes = {
#     "flask": None,
#     "server": None,
#     "frontend": None
# }

# # Start functions
# def start_flask():
#     if processes["flask"] is None or processes["flask"].poll() is not None:
#         try:
#             processes["flask"] = subprocess.Popen(
#                 ["osascript", "-e",
#                  f'tell app "Terminal" to do script "cd {os.getcwd()} && python3 backend/app.py"'],
#                 stdout=subprocess.PIPE,
#                 stderr=subprocess.PIPE
#             )
#             print("Flask backend started in a new Terminal window.")
#         except Exception as e:
#             print(f"Error starting Flask: {e}")
#             processes["flask"] = None

# def start_server():
#     if processes["server"] is None or processes["server"].poll() is not None:
#         try:
#             processes["server"] = subprocess.Popen(
#                 ["osascript", "-e",
#                  f'tell app "Terminal" to do script "cd {os.getcwd()} && node backend/server.js"'],
#                 stdout=subprocess.PIPE,
#                 stderr=subprocess.PIPE
#             )
#             print("Node backend started in a new Terminal window.")
#         except Exception as e:
#             print(f"Error starting Node server: {e}")
#             processes["server"] = None

# def start_frontend():
#     if processes["frontend"] is None or processes["frontend"].poll() is not None:
#         try:
#             processes["frontend"] = subprocess.Popen(
#                 ["osascript", "-e",
#                  f'tell app "Terminal" to do script "cd {os.getcwd()} && cd frontend && npm start"'],
#                 stdout=subprocess.PIPE,
#                 stderr=subprocess.PIPE
#             )
#             print("Frontend started in a new Terminal window.")
#         except Exception as e:
#             print(f"Error starting frontend: {e}")
#             processes["frontend"] = None

# # Stop functions
# def stop_process(process_name):
#     process = processes.get(process_name)
#     if process:
#         pid = process.pid
#         try:
#             os.kill(pid, signal.SIGINT)  # Try graceful termination
#             process.wait(timeout=5)  # Give it a few seconds to stop
#             if process.poll() is None:
#                 os.kill(pid, signal.SIGKILL) # Forcefully kill if it didn't stop
#             processes[process_name] = None
#             print(f"{process_name.capitalize()} stopped.")
#         except ProcessLookupError:
#             print(f"No {process_name} process found.")
#             processes[process_name] = None
#         except Exception as e:
#             print(f"Error stopping {process_name}: {e}")

# def stop_all():
#     stop_process("flask")
#     stop_process("server")
#     stop_process("frontend")

# # GUI
# root = tk.Tk()
# root.title("🚀 Project Launcher (MacOS)")
# root.geometry("400x450")
# root.config(bg="#f0f0f0")

# title = tk.Label(root, text="Project Launcher", font=("Helvetica", 20, "bold"), bg="#f0f0f0", fg="#333")
# title.pack(pady=20)

# frame = tk.Frame(root, bg="#f0f0f0")
# frame.pack(pady=10)

# # Flask controls
# tk.Label(frame, text="Flask Backend", font=("Helvetica", 12), bg="#d1ffd6").grid(row=0, column=0, pady=5, sticky="w")
# tk.Button(frame, text="Start Flask", command=start_flask, width=15, bg="#d1ffd6").grid(row=0, column=1, padx=5)
# tk.Button(frame, text="Stop Flask", command=lambda: stop_process("flask"), width=15, bg="#ffdddd").grid(row=0, column=2, padx=5)

# # Server controls
# tk.Label(frame, text="Node Backend", font=("Helvetica", 12), bg="#b3ffd1").grid(row=1, column=0, pady=5, sticky="w")
# tk.Button(frame, text="Start Server", command=start_server, width=15, bg="#d1ffd6").grid(row=1, column=1, padx=5)
# tk.Button(frame, text="Stop Server", command=lambda: stop_process("server"), width=15, bg="#ffdddd").grid(row=1, column=2, padx=5)

# # Frontend controls
# tk.Label(frame, text="Frontend (React/Vue)", font=("Helvetica", 12), bg="#b3ffd1").grid(row=2, column=0, pady=5, sticky="w")
# tk.Button(frame, text="Start Frontend", command=start_frontend, width=15, bg="#d1ffd6").grid(row=2, column=1, padx=5)
# tk.Button(frame, text="Stop Frontend", command=lambda: stop_process("frontend"), width=15, bg="#ffdddd").grid(row=2, column=2, padx=5)

# # Divider
# tk.Label(root, text="").pack()

# # All controls
# tk.Button(root, text="🚀 Start ALL", command=lambda: [start_flask(), start_server(), start_frontend()], width=30, height=2, bg="#b3ffd1", font=("Helvetica", 12)).pack(pady=5)
# tk.Button(root, text="🛑 Stop ALL", command=stop_all, width=30, height=2, bg="#ffb3b3", font=("Helvetica", 12)).pack(pady=5)

# root.mainloop()



import tkinter as tk
import subprocess
import os
import signal
import http.server
import socketserver
import threading

# Store process objects
processes = {
    "flask": None,
    "server": None,
    "frontend": None,
    "index_server": None
}

# --- Helper Functions ---

def execute_in_new_terminal(command, process_name):
    """Executes a command in a new macOS Terminal window."""
    try:
        processes[process_name] = subprocess.Popen(
            ["osascript", "-e", f'tell app "Terminal" to do script "{command}"'],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        print(f"{process_name.capitalize()} command executed in a new Terminal.")
    except Exception as e:
        print(f"Error executing {process_name} command: {e}")
        processes[process_name] = None

def stop_process(process_name):
    """Stops a process given its name in the processes dictionary."""
    process = processes.get(process_name)
    if process:
        pid = process.pid
        try:
            os.kill(pid, signal.SIGINT)
            process.wait(timeout=5)
            if process.poll() is None:
                os.kill(pid, signal.SIGKILL)
            processes[process_name] = None
            print(f"{process_name.capitalize()} stopped.")
        except ProcessLookupError:
            print(f"No {process_name} process found.")
            processes[process_name] = None
        except Exception as e:
            print(f"Error stopping {process_name}: {e}")

# --- Start Functions (New Logic for Index.html) ---

def start_flask():
    command = f"cd {os.getcwd()} && python3 backend/app.py"
    execute_in_new_terminal(command, "flask")

def start_server():
    command = f"cd {os.getcwd()} && node backend/server.js"
    execute_in_new_terminal(command, "server")

def start_frontend():
    command = f"cd {os.getcwd()} && cd frontend && npm start"
    execute_in_new_terminal(command, "frontend")

def start_index_html():
    """Starts a simple HTTP server to serve index.html in a new Terminal."""
    port = 8000  # You can choose a different port
    directory = os.getcwd()

    command = f'cd "{directory}" && python3 -m http.server {port}'
    execute_in_new_terminal(command, "index_server")
    print(f"Serving index.html at http://localhost:{port} in a new Terminal.")

# --- Stop Functions ---

def stop_all():
    stop_process("flask")
    stop_process("server")
    stop_process("frontend")
    stop_process("index_server")

# --- GUI ---

root = tk.Tk()
root.title("🚀 Project Launcher (MacOS)")
root.geometry("450x500")  # Increased height to accommodate the new button
root.config(bg="#f0f0f0")

title = tk.Label(root, text="Project Launcher", font=("Helvetica", 20, "bold"), bg="#f0f0f0", fg="#333")
title.pack(pady=20)

frame = tk.Frame(root, bg="#f0f0f0")
frame.pack(pady=10)

# Flask controls
tk.Label(frame, text="Flask Backend", font=("Helvetica", 12), bg="#d1ffd6").grid(row=0, column=0, pady=5, sticky="w")
tk.Button(frame, text="Start Flask", command=start_flask, width=15, bg="#d1ffd6").grid(row=0, column=1, padx=5)
tk.Button(frame, text="Stop Flask", command=lambda: stop_process("flask"), width=15, bg="#ffdddd").grid(row=0, column=2, padx=5)

# Server controls
tk.Label(frame, text="Node Backend", font=("Helvetica", 12), bg="#b3ffd1").grid(row=1, column=0, pady=5, sticky="w")
tk.Button(frame, text="Start Server", command=start_server, width=15, bg="#d1ffd6").grid(row=1, column=1, padx=5)
tk.Button(frame, text="Stop Server", command=lambda: stop_process("server"), width=15, bg="#ffdddd").grid(row=1, column=2, padx=5)

# Frontend controls
tk.Label(frame, text="Frontend (React/Vue)", font=("Helvetica", 12), bg="#b3ffd1").grid(row=2, column=0, pady=5, sticky="w")
tk.Button(frame, text="Start Frontend", command=start_frontend, width=15, bg="#d1ffd6").grid(row=2, column=1, padx=5)
tk.Button(frame, text="Stop Frontend", command=lambda: stop_process("frontend"), width=15, bg="#ffdddd").grid(row=2, column=2, padx=5)

# Index.html controls
tk.Label(frame, text="Serve index.html", font=("Helvetica", 12), bg="#ffe0b2").grid(row=3, column=0, pady=5, sticky="w")
tk.Button(frame, text="Serve index.html", command=start_index_html, width=15, bg="#ffe0b2").grid(row=3, column=1, padx=5)
tk.Button(frame, text="Stop index.html", command=lambda: stop_process("index_server"), width=15, bg="#ffdddd").grid(row=3, column=2, padx=5)

# Divider
tk.Label(root, text="").pack()

# All controls
tk.Button(root, text="🚀 Start ALL", command=lambda: [start_flask(), start_server(), start_frontend(), start_index_html()], width=30, height=2, bg="#b3ffd1", font=("Helvetica", 12)).pack(pady=5)
tk.Button(root, text="🛑 Stop ALL", command=stop_all, width=30, height=2, bg="#ffb3b3", font=("Helvetica", 12)).pack(pady=5)

root.mainloop()