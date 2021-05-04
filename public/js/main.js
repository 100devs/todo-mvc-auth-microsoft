if(document.getElementById('deleteBtn')){
  document.getElementById('deleteBtn').addEventListener('click', deletePost);
}
document.getElementById('likeBtn').addEventListener('click', likePost)
document.getElementById('commentBtn').addEventListener('click', commentPost)

console.log('hello world');
async function deletePost() {
  const imgID = document.querySelector('#mainImg').dataset.imgid;
  //console.log(imgID);
  try {
    const response = await fetch('deletePost', {
      method: 'delete',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        'id': imgID
      })
    });
    const data = await response.json();
    console.log(data);
    window.location = '/dashboard';
  } catch(err) {
    console.error(err);
  }
}

async function likePost() {
  const imgID = document.querySelector('#mainImg').dataset.imgid;
  const likesCount = Number(document.querySelector('#grabLikes').innerText.trim());
  console.log(likesCount);
  //console.log(imgID);
  try {
    const response = await fetch('likePost', {
      method: 'put',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        'id': imgID,
        'likes': likesCount
      })
    });
    const data = await response.json();
    if(data.message == 'exists') {
      console.log(data);
      document.querySelector('#errorMsg').innerText = "cant like post twice";
    } else {
    console.log(data);
    location.reload();
    }
  } catch(err) {
    console.error(err);
  }
}

async function commentPost() {
  const imgID = document.querySelector('#mainImg').dataset.imgid;
  const comment = document.querySelector('#message').value.trim();
  try {
    const response = await fetch('commentPost', {
      method: 'put',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        'id': imgID,
        'comment': comment
      })
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch(err) {
    console.error(err);
  }
}