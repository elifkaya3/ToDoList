console.log("I am Here!!");

const newTask = document.querySelector('.input-task');
const addNewTaskBtn = document.querySelector('.btn-task-add');
const taskList = document.querySelector('.task-list')

addNewTaskBtn.addEventListener('click', addTask);
taskList.addEventListener('click', deleteTask);
document.addEventListener('DOMContentLoaded', localStorageOku);

function addTask(e) {
   console.log("tıklandı");
   e.preventDefault();

   createTaskItem(newTask.value);

   // localestorage kaydetme
   saveLocalStorage(newTask.value);
   newTask.value = ''; 
   
}

function deleteTask(e) {      
      const tiklanilanEleman = e.target;

      if (tiklanilanEleman.classList.contains('task-btn-completed')) {
         console.log('Checked Button Clicked');
         tiklanilanEleman.parentElement.classList.toggle('task-completed');
      }
      if (tiklanilanEleman.classList.contains('task-btn-delete')) {
         console.log('Delete Button Clicked');
         tiklanilanEleman.parentElement.classList.toggle('kaybol');

         const silinecekTask = tiklanilanEleman.parentElement.children[0].innerText;
         deleteLocaleStorage(silinecekTask);

         tiklanilanEleman.parentElement.addEventListener('transitionend', function () {
         
            tiklanilanEleman.parentElement.remove();
            
         });

      }
   
}

function saveLocalStorage(newTask) {
   let tasks;

   if (localStorage.getItem('tasks') === null) {
      tasks = [];
   }else{
      tasks = JSON.parse(localStorage.getItem('tasks'));
   }

   tasks.push(newTask);
   localStorage.setItem('tasks', JSON.stringify(tasks));
}

function localStorageOku() {
   let tasks;

   if (localStorage.getItem('tasks') === null) {
      tasks = [];
   }else{
      tasks = JSON.parse(localStorage.getItem('tasks'));
   }

   tasks.forEach(function(task) {
      createTaskItem(task);
   });
}

function createTaskItem(task) {
   // div oluşturma
   const taskDiv = document.createElement('div');
   taskDiv.classList.add('task-item');

   //li oluşturma 
   const taskLi = document.createElement('li');
   taskLi.classList.add('task-description');
   taskLi.innerText = task;
   taskDiv.appendChild(taskLi);

   // tamamlandı butonu ekle
   const taskCompleteBtn= document.createElement('button');
   taskCompleteBtn.classList.add('task-btn');
   taskCompleteBtn.classList.add('task-btn-completed');
   taskCompleteBtn.innerHTML = '<i class="fa-solid fa-square-check"></i>';
   taskDiv.appendChild(taskCompleteBtn);

   // silindi butonu ekle
   const taskDeleteBtn= document.createElement('button');
   taskDeleteBtn.classList.add('task-btn');
   taskDeleteBtn.classList.add('task-btn-delete');
   taskDeleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
   taskDiv.appendChild(taskDeleteBtn);
   
   // ul'ye oluşturduğumuz div'i ekleyelim
   taskList.appendChild(taskDiv);

   
   // input içini temizleme
   // document.querySelector('.input-task').value = ""
   // document.getElementsByClassName('task-form')[0].reset();
}

function deleteLocaleStorage(task) {
   let tasks;

   if (localStorage.getItem('tasks') === null) {
      tasks = [];
   }else{
      tasks = JSON.parse(localStorage.getItem('tasks'));
   }

   // splice ile item sil
   const silinecekElemanIndexi = tasks.indexOf(task);
   console.log(silinecekElemanIndexi);
   tasks.splice(silinecekElemanIndexi, 1);

   localStorage.setItem('tasks', JSON.stringify(tasks));
}