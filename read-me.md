Sample microservice to convert text-to-speech 
Sample curl to hit this microservice is.

curl --location 'http://localhost:4001/synthesize' \
--header 'Content-Type: application/json' \
--data '{"text": "Hello, world!"}'