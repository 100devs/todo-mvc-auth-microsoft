document.getElementById('deleteBtn').addEventListener('click', deletePost);

async function deletePost() {
  const imgID = document.querySelector('#mainImg').dataset.imgid;
  //console.log(imgID);
  try {
    const response = await fetch('deletePost', {
      method: 'DELETE',
      headers: {'Content-type': 'application/json'},
      body: {
        'imgIDFromDom': imgID
      }
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch(err) {
    console.error(err);
  }
}