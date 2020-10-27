# JsfrontendProject

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.6.

## Tekniker
De tekniker som jag har valt att använda är SQlite3, Angular och Websocket. Jag valde att använda mig utav Sqlite3 för att det har jag jobbat med en del tidigare och att jag tyckte att det skulle passa bra till det projekt som jag skulle göra. Jag visste innan jag började med projektet att jag behövde ha någon form av databas där jag kunde spara all data för användarna, objekten och köpta objekt. Då tyckte jag att en Sqlite3 databas var det som skulle passa bäst då det är den jag har mest erfarenhet av och hur lätt det är att använda det.

Angular är ett ramverk som jag har fattat tycke för sedan tidigare och som jag ville fortsätta att jobba med och utveckla min kunskaper inom. Jag visste också sedan tidigare att man kan göra väldigt mycket med angular både snabbare och enklare än om man skulle använda vanilla javascript.

Websocket är väldigt nytt för mig och jag har aldrig använt de tidigare förutom i de tidigare kursmoment som vi har haft där vi gjorde en live chatt. Och eftersom realtid var en utav kraven i projektet valde jag att fortsätta använda websockets som jag precis har lärt mig att använda. Det kändes mest säkert att jobba med det då jag vet ungefär hur man kan göra för att implementera websockets till detta projektet.

## Realtid
Som jag tidigare skrev så använde jag mig utav websockets för att göra en realtid anpassad struktur för projektet. Jag gjorde så att i mitt API så ligger det en websocket server som ligger och lyssnar efter anrop från mitt frontend, och när den får ett anrop så hämtar den ny data ifrån databasen och skickar vidare till angular som sedan visar upp det på en sida. Det anropas varje gång någon lägger till ett objekt, tar bort objekt och när man går in på /home.
