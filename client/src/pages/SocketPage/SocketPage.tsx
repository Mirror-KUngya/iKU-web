import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://127.0.0.1:5000";

function SocketPage() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("message", (data) => {
      setResponse(data);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <p>Message from Flask: {response}</p>
    </div>
  );
}

export default SocketPage;
