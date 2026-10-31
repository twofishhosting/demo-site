# Templates

One file per template on the template page (twofishhosting.com/design.html). The musician's content form says which one they picked, for example "Jubilee · Christian (jubilee)": the word in brackets is the file name.

To use one, open content/layout.json (not a file in this folder), click the pencil, and set `template` to the file name without .json, for example `frontporch`. Set `domain` and `timezone` in the same file, then Commit changes. To switch a musician to another template later, change that one word.

Don't edit the files in this folder. `demo.json` is the Grace Miller demo.

Each template also picks a press kit design for the musician's /epk/ page (headliner, broadsheet, onesheet, liner or sanctuary). To use a different one, add `"epk": "onesheet"` (or another name) to content/layout.json. `"epk": "none"` turns the press kit page off.

| Template | Group | For | Press kit | File |
|---|---|---|---|---|
| Crossroads | Christian and secular | Americana and country | liner | templates/crossroads.json |
| Front Porch | Christian and secular | Bluegrass, folk and hymns | liner | templates/frontporch.json |
| Velvet Hour | Christian and secular | Jazz, standards and hymns | broadsheet | templates/velvet.json |
| Neon Revival | Christian and secular | Rock and pop bands | headliner | templates/revival.json |
| Sunday Soul | Christian and secular | Soul, R&B and gospel | headliner | templates/sundaysoul.json |
| Coastline | Christian and secular | Acoustic and coffeehouse | broadsheet | templates/coastline.json |
| Heartland | Christian and secular | Country and southern gospel | liner | templates/heartland.json |
| Garage | Secular | Indie and alternative rock | headliner | templates/garage.json |
| Afterglow | Secular | R&B and hip-hop | headliner | templates/afterglow.json |
| Two Lane | Secular | Country | liner | templates/twolane.json |
| Ballroom | Secular | Wedding and party bands | onesheet | templates/ballroom.json |
| Signal | Secular | Electronic and DJ | headliner | templates/signal.json |
| Recital | Secular | Classical and piano | broadsheet | templates/recital.json |
| Paper Moon | Secular | Folk and singer-songwriter | broadsheet | templates/papermoon.json |
| Lumen | Christian | Modern worship | sanctuary | templates/lumen.json |
| Jubilee | Christian | Gospel and choirs | sanctuary | templates/jubilee.json |
| Homecoming | Christian | Southern gospel | sanctuary | templates/homecoming.json |
| Hymnal | Christian | Hymns and sacred piano | sanctuary | templates/hymnal.json |
| New Morning | Christian | Christian singer-songwriter | sanctuary | templates/morning.json |
| Testimony | Christian | Christian hip-hop and youth | headliner | templates/testimony.json |
| Sprout | Christian | Kids and family worship | sanctuary | templates/sprout.json |
