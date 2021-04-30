document.querySelector('deleteBtn).addEventListener('click', deletePost);

async function deletePost() {
  
}


// document.querySelector('#')
// Array.from(deleteBtn).forEach((el)=>{
//     el.addEventListener('click', deleteTodo)
// })

// Array.from(todoItem).forEach((el)=>{
//     el.addEventListener('click', markComplete)
// })

// Array.from(todoComplete).forEach((el)=>{
//     el.addEventListener('click', markIncomplete)
// })

// //event listener:
// document.querySelector('#addCommentBtn').addEventListener('click', addNewComment)

// async function deleteTodo(){
//     const todoId = this.parentNode.dataset.id
//     try{
//         const response = await fetch('todos/deleteTodo', {
//             method: 'delete',
//             headers: {'Content-type': 'application/json'},
//             body: JSON.stringify({
//                 'todoIdFromJSFile': todoId
//             })
//         })
//         const data = await response.json()
//         console.log(data)
//         location.reload()
//     }catch(err){
//         console.log(err)
//     }
// }

// //:localhost2121/post/:id/addComment
// // req.params.id = abcdefghijklmon (on back end)

// async function addNewComment() {
//     const newComment = document.querySelector('#message').textContent;
//     try{
//         const response = await fetch(`/addComment`, {
//             method: 'put',
//             headers: {'Content-type': 'application/json'},
//             body: JSON.stringify({
//                 'newComment': newComment
//             })
//         })
//         const data = await response.json()
//         console.log(data)
//         location.reload()
//     }catch(err){
//         console.log(err)
//     }
// }

// async function markIncomplete(){
//     const todoId = this.parentNode.dataset.id
//     try{
//         const response = await fetch('todos/markIncomplete', {
//             method: 'put',
//             headers: {'Content-type': 'application/json'},
//             body: JSON.stringify({
//                 'todoIdFromJSFile': todoId
//             })
//         })
//         const data = await response.json()
//         console.log(data)
//         location.reload()
//     }catch(err){
//         console.log(err)
//     }
// }