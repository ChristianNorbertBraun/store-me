Aufbau des Repository:

	- Android:
		Under diesem Ordner finden Sie alle relevanten Files für die Android Applikation. Dabei beherbergt der src/java-Ordner die Activities sowie unter dem Unterordner Adapter die benötigten Klassen zur Verbindung zur Datenbank und zur Registierung der Activities. In src/res finden Sie die benötigten UI-Dateien.
	- server:
		- server.js: Hauptfile für den Node.js-Server
		- database: beinhaltet alle Files zur Sicherstellung der Existens und Erstellung aller relevanten Datenbanken
		- webapp: beinhaltet die eigentliche Webanwendung
			- design: Main-Style-Sheets und grundlegende Ractive Templates
			- js: beinhaltet alle JavaScript-Files
				- data_structure: grundlegende Datenstruktur (Container, Attributes, User, etc)
				- dbConnectorAttributes/Container: beinhaltet Files mit CRUD - Operationen
				- encryption: StoreMe-Crypt
				- QRCodeGenerate
				- searchFunction
				- sessions: beinhaltet alle Funktionalitäten die im Bezug zur Session benötigt werden
				- storegeFunctions: Funktionen zum Ein- und Auslagern
				- *container: Ractive-Components können wieder aus weiteren Components aufgebaut sein.
				- app.js: File zum Binden von Ractive-Templates zu Ractive-Objekten
			- ressources: Bilder
			- string: Beherbergt config-Files und Strings
			- theme: less-Files von Bootstrap
			- *.html: Grundgerüst der einzelnen Seiten
	- dokumentation:
		- JSDocs: Über Index.html starten
		- Dokumentation: Bitte Lesen





Installation Details:

- After cloning move into directory
- run "npm install"

- open all html files
- change CouchDB jQuery Plugin URL to your CouchDB
    e.g.: <script src="http://your_domain.com:5984/_utils/script/jquery.couch.js"></script>

- navigate to server directory
- execute "node server.js"

Have Fun!
