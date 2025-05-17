#!/bin/bash

# Set -e: Exit immediately if a command exits with a non-zero status.
set -e

# Function to handle each command execution
run_command() {
  cd "$1" || exit 1  # Change directory, exit if it fails
  shift             # Remove the directory argument
  "$@"             # Execute the command and its arguments
}

# Run commands concurrently, capturing pids
run_command "backend" npm run start:dev &
backend_pid=$!
run_command "frontend" npm run dev &
frontend_pid=$!
run_command "embed-model-finetuning" source ./venv/bin/activate && fastapi dev server.py --port 5000 &
finetuning_pid=$!

# Trap signals for graceful shutdown
trap 'kill $backend_pid $frontend_pid $finetuning_pid; exit 1' SIGINT SIGTERM SIGQUIT

# Wait for all processes to complete
wait $backend_pid
wait $frontend_pid
wait $finetuning_pid

# If the script gets here, all commands completed successfully
echo "All services stopped successfully."
