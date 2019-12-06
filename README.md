# biblioteca-rest
Es un api rest basado en el registro de prestamos y devoluciones de recursos bibliotecarios 

***Requisitos Previos**
- Tener instalado Ubuntu 18.14
- Visual studiocode
- Nvm y node 12.13.1
- Mongose 
- Robo3t
- Postman

 
                              Instalacion de nvm nodeJS y Mongodb
                              Copiar cada comando en el terminal en orden 
                              a excepcion de los que se tenga comando informativo no ejecutar 
1.-  sudo apt install curl (cURL es una utilidad de línea de comando que nos permite transferir información a través de varios protocolos (HTTPS, HTTP, FTP, etc).)

2.-  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.1/install.sh | bash 

3.- Versiones disponibles 

nvm ls-remote 

4.- instalación de versiones de node (cada node viene con su propio npm) 

nvm install v12.13.1 

5.- verificamos la lista   

nvm list 

6.- elegir una version en si  

nvm use 12.13.1 

7.- definir una version por default  

nvm alias default 12.13.1 

***fin de instalacion***
                                  *Datos Informativos 

8.-desistalar una version 

nvm uninstall <VERSIÓN> (Comando informativo no ejecutar)

9.- Activar cada version según mi proyecto de manera facil  

9.1 Crea un la raiz de mi proyecto un archivo llamado .nvmrc 

9.2 ingreso dentro solo la version (para hacerlo x consola nano .nvmrc) y se escribe ejemplo:12.13.1 

9.10 dentro de la carpeta del proyecto escribimos nvm use y listo 
                              *Fin dato informativo*


                                Instalacion de Mongodb y herramientas Correr los comandos 
                               
1.- Mongodb 

sudo apt install mongodb 
    Verificar que este funcionando bien  

     mongo --eval 'db.runCommand({ connectionStatus: 1 })' 

     sudo systemctl status mongodb 

2.- Robot3t 

(desde la tienda ubuntu) 


Postman (Control de urls y respuestas rest) 

(desde la tienda ubuntu) 

 
*Dependencias* **NO instalar, Instalaremos en clase **
Mongoose 

npm install mongoose --save 

npm i mongoose-unique-validator –save 

 
                                
