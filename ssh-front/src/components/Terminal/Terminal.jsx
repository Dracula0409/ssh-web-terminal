import { useEffect, useRef } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";
import { io } from "socket.io-client";

function TerminalComponent({ host, port, username, password, onClose }) {
  const terminalRef = useRef(null);
  const socketRef = useRef(null);
  const xterm = useRef(null);
  const fitAddon = useRef(null);

  useEffect(() => {
    xterm.current = new Terminal({
      cursorBlink: true,
      scrollback: 1000,
      convertEol: true
    });

    fitAddon.current = new FitAddon();
    xterm.current.loadAddon(fitAddon.current);
    xterm.current.open(terminalRef.current);

    // Delay fit to ensure layout is ready
    setTimeout(() => {
      fitAddon.current.fit();
      const { cols, rows } = xterm.current;
      socketRef.current.emit("resize", { cols, rows });
    }, 10);

    xterm.current.focus();

    socketRef.current = io("http://localhost:5001");
    socketRef.current.emit("start-ssh-session", { host, port: parseInt(port), username, password });

    socketRef.current.on("ssh-data", data => {
      xterm.current.write(data);
    });

    socketRef.current.on("session-closed", () => {
      xterm.current.writeln("\r\n\n*** Session closed ***");
      xterm.current.writeln("\n\nPress any key to continue...");
      xterm.current.options.disableStdin = true; // Disable typing into terminal

      // Listen for any key press
      const anyKeyListener = xterm.current.onKey(() => {
        anyKeyListener.dispose(); // Remove the listener after first key
        onClose(); // Exit / close the terminal
      });
    });

    xterm.current.onData(data => {
      socketRef.current.emit("ssh-input", data);
    });

    const handleResize = () => {
      fitAddon.current.fit();
      const { cols, rows } = xterm.current;
      socketRef.current.emit("resize", { cols, rows });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      socketRef.current.disconnect();
      xterm.current.dispose();
    };
  }, []);

  return (
    <div
      ref={terminalRef}
      style={{
        height: "100vh",
        width: "100vw",
        outline: "none",
        backgroundColor: "black",
      }}
    />
  );
}

export default TerminalComponent;