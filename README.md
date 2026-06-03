# Harness Demo Lab

This repo contains a simple Node.js application that I used to complete the Harness Enterprise Sales Engineer candidate lab.

The goal of this project was not to build a complex application. Instead, I wanted to demonstrate a clean end-to-end CI/CD workflow using GitHub, Harness, DockerHub, and Kubernetes.

## What I Built

I created a small Node.js app with two endpoints:

- `/` returns a basic application response
- `/health` returns a simple health check response

The app is containerized with Docker and deployed to Kubernetes using manifests stored in the `k8s/` directory.

## CI/CD Workflow

The Harness pipeline performs the following flow:

1. Clones the source code from GitHub
2. Installs dependencies with `npm ci`
3. Runs the test script with `npm test`
4. Builds a Docker image
5. Pushes the image to DockerHub
6. Deploys the Kubernetes manifests to a local Minikube cluster
7. Uses a canary deployment strategy before completing the rollout

## Technologies Used

- Harness CI/CD
- GitHub
- DockerHub
- Docker
- Kubernetes
- Minikube
- Node.js
- Kubernetes manifests

## Application Endpoints

Root endpoint:

```text
/
```

Expected response:

```text
Harness Demo Lab is running.
```

Health endpoint:

```text
/health
```

Expected response:

```json
{"status":"healthy"}
```

## Docker Image

DockerHub repository:

```text
robertgusmann/harness-demo-lab
```

Image tags created by the Harness pipeline:

```text
robertgusmann/harness-demo-lab:latest
robertgusmann/harness-demo-lab:2
```

## Kubernetes Deployment

The application was deployed into the following namespace:

```text
demo-lab
```

Kubernetes manifests are stored here:

```text
k8s/deployment.yaml
k8s/service.yaml
```

## Harness Configuration

The Harness pipeline was created inline in Harness. For visibility, I included a sanitized reference copy of the pipeline structure here:

```text
harness/pipeline.yaml
```

That file is included for documentation only. I intentionally did not include secrets, tokens, account IDs, delegate tokens, or connector credentials.

## Final Validation

After the deployment completed, I validated the application directly from Kubernetes using:

```sh
kubectl get pods -n demo-lab
kubectl get deploy -n demo-lab
kubectl get svc -n demo-lab
kubectl port-forward svc/harness-demo-lab 8080:80 -n demo-lab
curl http://localhost:8080
curl http://localhost:8080/health
```

The app returned:

```text
Harness Demo Lab is running.
```

And the health check returned:

```json
{"status":"healthy"}
```

This confirmed that the image built and pushed by Harness CI was successfully deployed to Kubernetes through Harness CD.
