# Final Validation

This document captures the final validation steps I used after the Harness pipeline completed successfully.

## Pipeline Result

The Harness pipeline completed both stages successfully:

1. Build and Push Image
2. Deploy to Kubernetes

## DockerHub Artifacts

Harness pushed the following image tags to DockerHub:

```text
robertgusmann/harness-demo-lab:2
robertgusmann/harness-demo-lab:latest
```

## Kubernetes Validation

I validated the deployment with the following commands:

```sh
kubectl get pods -n demo-lab
kubectl get deploy -n demo-lab
kubectl get svc -n demo-lab
curl http://localhost:8080
curl http://localhost:8080/health
```

The Kubernetes deployment showed two running pods:

```text
NAME                                READY   STATUS    RESTARTS
harness-demo-lab-6b9ff8f6d5-464dd   1/1     Running   0
harness-demo-lab-6b9ff8f6d5-zcwsj   1/1     Running   0
```

The deployment was available:

```text
NAME               READY   UP-TO-DATE   AVAILABLE
harness-demo-lab   2/2     2            2
```

The service was available internally on port 80:

```text
NAME               TYPE        PORT(S)
harness-demo-lab   ClusterIP   80/TCP
```

## Application Test

After port-forwarding the service locally, the app responded successfully.

Root endpoint:

```text
Harness Demo Lab is running.
```

Health endpoint:

```json
{"status":"healthy"}
```

## Deployment Strategy

The Harness CD stage used a Kubernetes canary strategy:

```text
Canary Deployment: 1 instance
Canary Delete
Rolling Deployment
```

This confirmed that the image built in Harness CI was successfully deployed to Kubernetes through Harness CD.
