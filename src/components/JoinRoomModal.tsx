"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { AlertCircle } from "lucide-react";

export default function JoinRoomModal() {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const [error, setError] = useState("");
  const [generatedRoomId, setGeneratedRoomId] = useState("");
  const navigate = useNavigate();

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !roomId.trim()) {
      setError("Please enter both username and room ID.");
      return;
    }
    navigate(`/room/${username}/${roomId}`);
  };

  const handleCreateRoom = () => {
    const newRoomId = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");
    setRoomId(newRoomId);
    setGeneratedRoomId(newRoomId);
    console.log("Creating new room with ID:", newRoomId);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="mt-3 text-black font-semibold bg-white px-5 py-3 rounded-full hover:cursor-pointer hover:bg-gray-200 transition z-10">
          Join Room
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-black bg-opacity-80 text-white rounded-lg shadow-lg backdrop-filter backdrop-blur-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Join Chat Room
          </DialogTitle>
          <DialogDescription>
            Enter your username and room ID to join a chat room.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleJoinRoom}>
          <div className="grid gap-4 py-4">
            <div className="grid items-center gap-4">
              <input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 border border-gray-500 rounded bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your username"
              />
            </div>
            <div className="grid items-center gap-4">
              <input
                id="roomId"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                className="w-full p-3 border border-gray-500 rounded bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter the room ID"
              />
            </div>
            {generatedRoomId && (
              <div className="flex items-center gap-2 text-green-500">
                <span className="text-sm">
                  Generated Room ID: {generatedRoomId}
                </span>
              </div>
            )}
            {error && (
              <div className="flex items-center gap-2 text-red-500">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{error}</span>
              </div>
            )}
          </div>
          <DialogFooter className="flex flex-col items-center sm:items-start">
            <button
              type="submit"
              className="mt-1 w-full text-black font-semibold bg-white px-5 py-3 rounded-full hover:bg-gray-200 transition z-10"
            >
              Join Room
            </button>

            <div className="mt-2 text-sm text-gray-300">
              Don't have a room ID?{" "}
              <button
                type="button" // Make sure this is a button to prevent form submission
                className="p-0 text-sm text-blue-400 hover:underline"
                onClick={handleCreateRoom}
              >
                Create a new room
              </button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
