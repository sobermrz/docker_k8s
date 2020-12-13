# docker_k8s
BASIC FUNCTION:  
Implemented the frontend with React, backend with sprintboot and sentimental analysis with python flask. In this application, when we enter words like 'happy' or 'sad' in the frontend, the data will be sent to backend. Then backend will send the data to sentimental analysis to analyze the polarity of the word and give it back to the frontend.

MICROSERVICE IMPLEMENTATION:  
1. Containerize each service as an image and push them into Docker Hub.  
2. Write YMAL file to deploment services and use k8s to manage these pods  
3. Run services in minikube
