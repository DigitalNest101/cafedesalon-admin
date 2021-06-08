const cafeList = document.querySelector('#cafe-list');
const form     = document.querySelector('#add-cafe-form')


//creates elements / rendor elements
function renderCafe(doc){
    let li    =  document.createElement('li');
    let Name  =  document.createElement('span');
    let City  =  document.createElement('span');
    let Phone  =  document.createElement('span');
    let Date  =  document.createElement('span');
    let Time  =  document.createElement('span');
    let Member  =  document.createElement('span');
    let cross =  document.createElement('div');

    li.setAttribute('data-id', doc.id);
    Name.textContent    = doc.data().Name;
    City.textContent    = doc.data().City;
    Phone.textContent    = doc.data().Phone;
    Date.textContent    = doc.data().Date;
    Time.textContent    = doc.data().Time;
    Member.textContent  = doc.data().Member;
    cross.textContent = 'x';
   
    li.appendChild(Name);
    li.appendChild(City);  
    li.appendChild(Phone);
    li.appendChild(Date);
    li.appendChild(Time); 
    li.appendChild(Member);
    li.appendChild(cross);

    cafeList.appendChild(li);

    // deleting data 
    cross.addEventListener('click',(e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('cafe').doc(id).delete();
    })  
}


// saving data
form.addEventListener('submit',(e) => {
    e.preventDefault();
    db.collection('cafe').add({
        Name:form.Name.value,
        City:form.City.value
    });
    form.Name.value = '',
    form.City.value = '';
});
// /real time
db.collection('cafe').orderBy('Name').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if(change.type == 'added'){
            renderCafe(change.doc);
        }else if(change.type == 'removed'){
            let li = cafeList.querySelector('[data-id=' + change.doc.id +']');
            cafeList.removeChild(li);
        }
    })
})

