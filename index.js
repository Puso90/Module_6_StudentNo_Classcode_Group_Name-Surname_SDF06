//Database Setup | Importing and Exporting - included moduule in script link at HTML
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
//Databse Setup | Communicating with databse attributes
const appSettings = { 
    databaseURL:"https://realtime-database-6328b-default-rtdb.europe-west1.firebasedatabase.app/" 
} 

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

//Attributes for web app interface
const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")



addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value

    push(shoppingListInDB, inputValue)

    clearInputFieldEl()

})


onValue(shoppingListInDB, function(snapshot) {

    if (snapshot.exists()) {

        let itemsArray = Object.entries(snapshot.val())
    
        clearShoppingListEl()

        for ( let i = 0; i < itemsArray.length; i ++ ) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]

            appendItemToShoppingListEl(currentItem)
        }
    } else { 
        shoppingListEl.innerHTML ="No Items Here...Yet"
    } 
   
})

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToShoppingListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    //shoppingListEl.innerHTML += `<li>${itemValue}</li>`
    let newEl = document.createElement("li")
    newEl.textContent = itemValue

    newEl.addEventListener('click', function() {
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)

        remove(exactLocationOfItemInDB)

    })

    shoppingListEl.append(newEl)
}

