#!/usr/bin/env node

import { get } from 'http';

const request = get(process.argv[2]);

request.on('error', (e) => console.error(`Connection Error: ${e.message}`));
request.on('response', (res) => {
  const { statusCode } = res;
  const contentType = res.headers['content-type'];

  let error;
  if (statusCode !== 200) {
    error = new Error(`Request Failed. Status Code: ${statusCode}`);
  }
  if (error) {
    console.error(error.message);
    res.resume(); // Consume response data to free up memory
    return;
  }

  let response = [];

  res.setEncoding('utf8');
  res.on('data', (chunk) => response.push(chunk));
  res.on('end', () => {
    try {
      if (/^application\/json/.test(contentType)) {
        console.log(JSON.parse(response.join()));
      } else {
        console.log(response.join());
      }
    } catch (e) {
      console.error(e.message);
    }
  });
});
