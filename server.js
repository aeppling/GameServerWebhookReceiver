const express = require('express');
const { exec } = require('child_process');
const { error } = require('console');

const app = express();
const PORT = 3000;

app.post('/webhook', (req, res) => {

  console.log("got request");
  exec(`echo "list" | kubectl exec -i papermc-server -- rcon`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error.message}`);
      res.status(500).send('Error executing command');
      return;
    }
    console.log(`Command executed successfully: ${stdout}`);
    res.status(200).send('Command executed successfully');
  });
});

app.listen(PORT, () => {
  console.log(`Webhook server is running on port ${PORT}`);
});
