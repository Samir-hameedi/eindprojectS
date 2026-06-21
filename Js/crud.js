// crud.js
// De CRUD-operaties voor producten: Create, Read, Update, Delete.
// Heeft app.js nodig (voor runQuery).
//
// LET OP: we plakken hier waarden rechtstreeks in de SQL-string.
// Dat is simpel om te leren, maar onveilig (SQL injection).
// In de echte cursus gebruik je hiervoor prepared statements.

// --- READ: alle producten tonen in de lijst ---
async function toonBeheerLijst() {
    const producten = await runQuery("SELECT productid, namee, price , imgURL, model, info, features FROM product");
 
    const lijst = document.getElementById("productenLijst");
    lijst.innerHTML = "";   // Eerst leegmaken
 
    for (const product of producten) {
        const item = document.createElement("li");
 
        // Tekst van het product
        const tekst = document.createTextNode(
            product.namee + " - \u20ac" + product.price + " "
        );
        item.appendChild(tekst);
 
        // Knop: bewerken -> zet het product in het formulier
        const bewerkKnop = document.createElement("button");
        bewerkKnop.textContent = "📝";
        bewerkKnop.addEventListener("click", function () {
            formulierVullen(product);
        });
        item.appendChild(bewerkKnop);
 
        // Knop: verwijderen
        const verwijderKnop = document.createElement("button");
        verwijderKnop.textContent = "🗑️";
        verwijderKnop.addEventListener("click", function () {
            productVerwijderen(product.productid);
        });
        item.appendChild(verwijderKnop);
 
        lijst.appendChild(item);
    }
}
 
// --- Formulier vullen met een bestaand product (voor bewerken) ---
function formulierVullen(product) {
    document.getElementById("productId").value = product.productid;
    document.getElementById("namee").value = product.namee;
    document.getElementById("price").value = product.price;
    document.getElementById("imgURL").value = product.imgURL;
    document.getElementById("model").value = product.model;
    document.getElementById("info").value = product.info;
    document.getElementById("features").value = product.features;
}
 
// --- Formulier leegmaken (na opslaan of bij annuleren) ---
function formulierLeegmaken() {
    document.getElementById("productId").value = "";
    document.getElementById("namee").value = "";
    document.getElementById("price").value = "";
    document.getElementById("imgURL").value = "";
    document.getElementById("model").value = "";
    document.getElementById("info").value = "";
    document.getElementById("features").value = "";
}
 
// --- CREATE of UPDATE: opslaan ---
// Is het verborgen id leeg -> nieuw product (INSERT).
// Staat er een id -> bestaand product (UPDATE).
async function productOpslaan() {
    const id = document.getElementById("productId").value;
    const namee = document.getElementById("namee").value;
    const price = document.getElementById("price").value;
    const imgURL = document.getElementById("imgURL").value;
    const model = document.getElementById("model").value;
    const info = document.getElementById("info").value;
    const features = document.getElementById("features").value;
 
    let sql;
 
    if (id === "") {
        // CREATE: nieuw product toevoegen
        sql = "INSERT INTO product (namee, price, imgURL, model, info, features) " +
              "VALUES ('" + namee + "', " + price + ", '" + imgURL + "', '" + model + "', '" + info + "', '" + features + "')";
    } else {

        
        // UPDATE: bestaand product wijzigen
        sql = "UPDATE product SET " +
              "namee = '" + namee + "', " +
              "price = " + price + ", " +
              "imgURL = '" + imgURL + "', " +
              "model = '" + model + "', " +
              "info = '" + info + "', " +
              "features = '" + features + "' " +
              "WHERE productid = " + id;
    }
 
    await runQuery(sql);
 
    // Formulier leegmaken en lijst opnieuw laden
    formulierLeegmaken();
    toonBeheerLijst();
}
 
// --- DELETE: verwijderen ---
async function productVerwijderen(id) {
    // Vraag eerst om bevestiging
    const zeker = confirm("Weet je zeker dat je dit product wilt verwijderen?");
    if (!zeker) {
        return;
    }
 
    await runQuery("DELETE FROM product WHERE productid = " + id);
 
    // Lijst opnieuw laden
    toonBeheerLijst();
}
  



