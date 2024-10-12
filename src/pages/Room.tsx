import React, { useState, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import Editor from "@monaco-editor/react";
import Video from "../components/Video";

const Room = () => {
  const [code, setCode] = useState("// Write your code here");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState<string>("javascript");
  const [socket, setSocket] = useState<Socket | null>(null);
  const { username, roomId } = useParams();

  useEffect(() => {
    if (!roomId && !username) return;
    const newSocket = io("https://pair-code-backend.onrender.com/");
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("user connected");
      newSocket.emit("joinRoom", roomId);
    });

    newSocket.on("initialize", (roomState) => {
      setCode(roomState.code);
      setLanguage(roomState.language);
      setOutput(roomState.output);
    });

    newSocket.on("code", (code: any) => {
      setCode(code);
    });

    newSocket.on("language", (lang: any) => {
      setLanguage(lang);
    });

    newSocket.on("output", (output: any) => {
      setOutput(output);
    });

    return () => {
      newSocket.close();
    };
  }, [roomId]);

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
      if (socket) {
        socket.emit("code", { roomId, code: value });
      }
    }
  };

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setLanguage(event.target.value);
    if (socket) {
      socket.emit("language", { roomId, language: event.target.value });
    }
  };

  const handleRunCode = async () => {
    const submitUrl =
      "https://judge029.p.rapidapi.com/submissions?base64_encoded=true&wait=true&fields=*";
    const createOptions = {
      method: "POST",
      headers: {
        "x-rapidapi-key": "7fad73f80fmsh117796e83fe8bd8p14c245jsnb0c26613a453",
        "x-rapidapi-host": "judge029.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source_code: btoa(code),
        language_id: getLanguageId(language),
      }),
    };

    try {
      const submitResponse = await fetch(submitUrl, createOptions);
      const submitResult = await submitResponse.json();
      let resultOutput = "";
      if (submitResult.stdout) {
        resultOutput = atob(submitResult.stdout);
      } else if (submitResult.stderr) {
        resultOutput = atob(submitResult.stderr);
      } else if (submitResult.compile_output) {
        resultOutput = atob(submitResult.compile_output);
      } else {
        resultOutput = "No output or error occurred.";
      }
      setOutput(resultOutput);
      if (socket) {
        socket.emit("output", { roomId, output: resultOutput });
      }
    } catch (error) {
      console.error(error);
      setOutput("Error executing the code.");
    }
  };

  const getLanguageId = (language: string) => {
    switch (language) {
      case "javascript":
        return 63;
      case "python":
        return 71;
      case "java":
        return 62;
      default:
        return 63;
    }
  };
  if (!username) return;
  const videoComponent = useMemo(() => {
    return <Video username={username} />;
  }, [username]);

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-gray-100">
      <main className="flex-grow flex flex-col lg:flex-row">
        <section className="flex-grow lg:w-1/2 p-4 flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold mb-2">Code Editor</h2>
            <div className="flex items-center">
              <label htmlFor="language-select" className="mr-2 text-xl">
                Language:
              </label>
              <select
                id="language-select"
                value={language}
                onChange={handleLanguageChange}
                className="p-1 border border-gray-700 rounded-md bg-gray-800 text-gray-100"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
              </select>
            </div>
          </div>
          <div className="flex-grow border border-gray-700 rounded-md overflow-hidden">
            <Editor
              height="100%"
              theme="vs-dark"
              defaultLanguage="javascript"
              language={language}
              value={code}
              onChange={handleEditorChange}
              options={{
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                fontSize: 14,
                wordWrap: "on",
              }}
              aria-label="Code editor"
            />
          </div>
          <button
            onClick={handleRunCode}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Run Code
          </button>
        </section>
        <section className="lg:w-1/2 pt-4 pb-4 flex flex-col">
          <h2 className="text-xl font-bold mb-3 mt-1">RoomId: {roomId}</h2>
          {videoComponent}
        </section>
      </main>
      <section className="h-1/4 p-2 bg-gray-800">
        <h2 className="text-xl font-bold mb-2">Output</h2>
        <textarea
          value={output}
          className="w-full h-[calc(100%-2rem)] p-2 font-mono text-sm bg-gray-900 text-gray-100 border border-gray-700 rounded-md resize-none"
          aria-label="Code output"
        />
      </section>
    </div>
  );
};

export default Room;
