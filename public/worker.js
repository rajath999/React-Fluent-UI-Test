// worker.js
onmessage = function (event) {
  console.log("Received message from the main thread:", event.data);

  try {
    // Perform some computation
    const result = fibo(event.data);

    // Send the result back to the main thread
    postMessage(result);
  } catch (error) {
    console.error(error)
    postMessage(error);
  }
};

function fibo(n) {
  return n > 1 ? fibo(n - 1) + fibo(n - 2) : 1;
}
