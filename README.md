# Minecraft server Kube pods & Webhook backend

## Webhook backend

This is for sending command in a game server when a webhook url is called.
A simple back end in NodeJS that receive webhook request and trigger actions on game servers running in Kubernetes pod

Initialize with :

```bash
npm i
```

Run with:

```bash
npm run start
```


## Setting up Minecraft Server with Persistent Volume

#### Prerequisites:

Kubernetes cluster configured and running.
kubectl CLI installed and configured to interact with your cluster.

##### Steps:

**Create Persistent Volume Claim (PVC):**

```bash
kubectl apply -f minecraft-pvc.yaml
```

Content of minecraft-pvc.yaml:

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: minecraft-data
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 5Gi  # Adjust storage size as needed
```

**Deploy Minecraft Server:**

```bash
kubectl apply -f minecraft-server.yaml
```

Adjust paths, configurations, and resource requests according to your specific setup and requirements.


## RCON and Minecraft setup

In the '*minecraft-server.yaml*', you can set up all the server-properties of Minecraft Server beside the SERVER_NAME,
and for RCON, setup the password to be the same in both fields, do not forget to use secrets to hide important informations.

