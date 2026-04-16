<p align="center"> 
<https://i.imgur.com/e1C1CH2.jpeg>

<p align="center"> 
<a href="#"><img title="KaynBot" src="https://img.shields.io/badge/¡Disfruta de un Bot totalmente gratuito, con múltiples funciones y de código abierto! -purple?colorA=%239b33b0&colorB=%231c007b&style=for-the-badge"></a> 
</p>

---

## 🇪🇪 Descripción.

KaynBot es un bot de WhatsApp multifuncional basado en `baileys`. Este bot ofrece una variedad de características para mejorar tu experiencia en WhatsApp.

---

## ⛈️ Características.

- Respuestas automáticas
- Gestión de grupos

---

## 🪬 Informaciones Importantes

<details>
<summary><strong>🔎 Información</strong> — Recomendado</summary>

Evita completamente usar forks, mods o versiones alteradas de Baileys.
No utilices “baileys mods” ni variantes no oficiales.
Siempre usa la librería principal y oficial de Baileys.

</details>

<details>
<summary><strong>🔎 Información</strong> — Oficial</summary>

Si editas el bot, debes mantener los créditos principales y no borrarlos bajo ninguna circunstancia.

</details>

---

### Instalaciónes Básicas
termux-setup-storage
apt update && apt upgrade -y
pkg install -y git nodejs-lts ffmpeg imagemagick
git clone https://github.com/Necrohek/KaynBot
cd KaynBot
rm -rf node_modules package-lock.json
npm install
npm rebuild
npm start
Si aparece (Y/I/N/O/D/Z) [default=N] ? usa la letra "y" y presiona ENTER
________________________________________
Ejecutar dentro de la carpeta KaynBot
termux-wake-lock
npm i -g pm2
pm2 start index.js --name kaynbot
pm2 save
pm2 logs
Opciones Disponibles
Eliminar proceso del bot:
pm2 delete kaynbot
Ver ejecución:
pm2 logs
Detener bot:
pm2 stop kaynbot
Iniciar bot:
pm2 start kaynbot
________________________________________
En caso de detenerse
Si Termux se cerró, se fue el internet o reiniciaste el dispositivo:
cd KaynBot && npm start
________________________________________
Obtener nuevo inicio de sesión
Detén el bot con CTRL + Z hasta ver algo como KaynBot $
cd KaynBot && rm -rf Sessions && npm start

---

### Obtener nuevo inicio de Sessión 
> *Detén el bot, haz click en el símbolo (ctrl) [default=z] usar la letra "z" + "ENTER" hasta que salga algo verdes similar a: `	KaynBot $`*
 
```bash 
cd && cd KaynBot && rm -rf Sessions/Owner && npm start
```
</details>

---

### 🇪🇪 Propietario
[![Kayn Necrohek]( https://i.imgur.com/DhiOyGX.jpeg)]( https://wa.me/message/S75J4FMOHHTCH1)
