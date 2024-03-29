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

## Creating Minecraft Kubernetes pod

##### Creation

If you already have a server running in a pod, and just want to learn how to trigger alerts with specifics logs, skip to the next point "Configuration of the Alert system"

You have different options to create your Minecraft server pod, for this tutorial we will use an existing docker image of PaperMC to build our '*minecraft-server.yaml*'

We got something like :

```
apiVersion: v1
kind: Pod
metadata:
  name: papermc-server
spec:
  restartPolicy: Always
  volumes:
  - name: minecraft-data
    persistentVolumeClaim:
      claimName: minecraft-data
  containers:
  - name: papermc
    image: phyremaster/papermc
    ports:
    - containerPort: 25565
    env:
    - name: EULA
      value: "true"
    - name: ONLINE_MODE
      value: "true"
    - name: SERVER_NAME
      value: "yourserverName"
    volumeMounts:
    - name: minecraft-data
      mountPath: /minecraft
```

You can use whatever server image you want, as well as creating your own Docker image with a Dockerfile and standard Minecraft server executable for example.

To set up the persistent data on your Minecraft server, follow the following section

**( Bonus : Rcon for sending command to games servers )** 

For Rcon game server, download and edit the 'minecraft-server.yaml' available in this repository

To understand how Rcon communicate with game servers :
[gorcon/rcon-cli: RCON client for executing queries on game server. (github.com)](https://github.com/gorcon/rcon-cli)


##### Running the server pod

You can edit the container name and pod name as you wish, to start the server, simply run the Kubenertes pod.

Create a namespace :
```
kubectl create namespace yourNamespaceName
```

To run the pod :
```
kubectl apply -f minecraft-server.yaml -n yourNamespaceName
```

Verify it is running:
```
kubectl get pods
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

Now we will setup the backend to receive alerts from your game servers with Kexa, and send commands to the servers.

For this, you can clone this repository, the required files are server.js and package_lock.json and package.json

Create a route and with the Rcon-cli command to send, and set the route as the webhook in the Kexa configuration !

You can edit this as you wish, and to test the commands you can use the Rcon-cli available here: [gorcon/rcon-cli: RCON client for executing queries on game server. (github.com)](https://github.com/gorcon/rcon-cli)



## Using Kexa to trigger RCON commands on Logs event

This will learn you how to call your webhook backend when a specific log appear in your game server logs !
You will get notify by SMS and will be able to trigger commands into your server



Once you've set up you Minecraft server and Rcon pods, you can use Kexa script
by following this tutorial on Medium :

