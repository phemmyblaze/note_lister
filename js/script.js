document.addEventListener("DOMContentLoaded", function(){
    //get the list items
    let saved_notes = getSavedNotes();
    let h3 = document.querySelector(".list-area h3");
    let list_items_content = document.querySelector(".list-items-content")

    if(saved_notes.length == 0){
        //there are no notes at the moments
        h3.innerHTML = "You have 0 notes at the moment";
    }else{
        h3.innerHTML = `You have ${saved_notes.length} notes at the moment`;


         let items_code = `<table>
                                                <thead>
                                                    <th>Item</th>
                                                    <th></th>
                                                </thead>
                                                <tbody>
                                            `

        for(let i = 0; i < saved_notes.length; i++){

            items_code += `<tr>
                                            <td colspan="2" align="left">${saved_notes[i]['item_name']}</td>
                                            <td><a href=''>Edit</a> | <a href=''>Delete</a></td>
                                    </tr>`


        }
        items_code += `</tbody>
                                            </table>
                                            `

        list_items_content.innerHTML = items_code;

    }



})



function createNewItem(event){
    event.preventDefault();

    const createItemDialog = document.querySelector(".create-item-dialog");

    createItemDialog.style.display = "block";
}


const closeDialog = document.querySelector(".close-dialog");

closeDialog.addEventListener("click", function(event){
    const createItemDialog = document.querySelector(".create-item-dialog");
    event.preventDefault();

    createItemDialog.style.display = "none";

})


const createItemForm = document.querySelector("#create-item-form");

//once the form is submitted
createItemForm.addEventListener("submit", function(event){
    event.preventDefault();

    let item_name = this.item_name.value.trim();
    let item_category = this.item_category.value;

    if(item_name.length != 0){
        //proceed
        const feedback = saveItem(item_name, item_category);

        if(feedback){
            alert("Item saved");
            location.reload()
        }
    }
})


function saveItem(item_name, item_category){
    //save to localStorage
    const list_object = {
        item_name: item_name,
        item_category: item_category
    }

    //check if the storage exists already
    let result = localStorage.getItem("lists");

    if(result == null || typeof result == undefined){
        let list_storage = [];

        list_storage.push(list_object);

        localStorage.setItem("lists", JSON.stringify(list_storage));
    }else{
        result = JSON.parse(result);

        result.push(list_object);

        localStorage.setItem("lists", JSON.stringify(result));

    }
    

    return true;
}


function getSavedNotes(){

    let result = localStorage.getItem("lists");

    if(result == null || typeof result == undefined){
        return [];
    }else{

        result = JSON.parse(result);

        return result;

    }

}