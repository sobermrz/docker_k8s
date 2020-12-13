#!/bin/bash
kubectl delete --all deployments
kubectl delete --all services
kubectl delete --all pods

kubectl apply -f sa-logic-deployment.yaml
kubectl apply -f sa-web-app-deployment.yaml
kubectl apply -f sa-frontend-deployment.yaml

kubectl create -f service-sa-logic-lb.yaml
kubectl create -f service-sa-web-app-lb.yaml
kubectl create -f service-sa-frontend-lb.yaml

kubectl get svc
minikube service sa-web-app-lb
minikube service sa-frontend-lb
minikube service list 