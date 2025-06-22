// sshController.js
import { Client } from 'ssh2';

export function handleSSHSession(socket) {
  socket.on('start-ssh-session', ({ host, port, username, password }) => {
    if (!host || !username || !password || !port) {
      socket.emit('ssh-error', 'Missing SSH credentials.');
      return;
    }

    const conn = new Client();

    conn
      .on('ready', () => {
        console.log('🔐 SSH Connected');

        conn.shell((err, stream) => {
          if (err) {
            socket.emit('ssh-error', 'Shell error');
            return;
          }

          stream.on('data', (data) => {
            socket.emit('ssh-data', data.toString());
          });

          stream.stderr?.on('data', (data) => {
            socket.emit('ssh-data', data.toString());
          });

          socket.on('ssh-input', (data) => {
            stream.write(data);
          });

          socket.on('resize', ({ cols, rows }) => {
            stream.setWindow(rows, cols, 600, 800);
          });

          socket.on('disconnect', () => {
            stream.end();
            conn.end();
          });

          stream.on('close', () => {
            socket.emit('session-closed');
          });
        });
      })
      .on('error', (err) => {
        socket.emit('ssh-error', `SSH Connection error: ${err.message}`);
      })
      .connect({ host, port, username, password });
  });
}